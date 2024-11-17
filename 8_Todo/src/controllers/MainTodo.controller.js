import {User} from "../models/User.model.js"
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { MainTodo } from "../models/MainTodo.model.js";
import { SubTodo } from "../models/SubTodo.model.js"; 
import mongoose from 'mongoose';




// const CreateTodo = asyncHandler(async (req, res) => {
 
 
//   try {
//     const { todoHead, color } = req.body;
//     const TodoAvatarLocalPath = req?.file?.path

//     if (!todoHead) {
//       throw new ApiError(400, "heading is required");
//     }

//     const user = await User.findById(req.user?._id);
//     if (!user) {
//       throw new ApiError(404, "user not found");
//     }

//     if(!TodoAvatarLocalPath){
//       throw new ApiError(500, "server is busy try after some time");
//     }

    
//     const existingTodo = await MainTodo.findOne({ todoHead, createdBy: user._id });
//     if (existingTodo) {
//       console.log(existingTodo)
//       throw new ApiError(400, "This todoHead already exists for you");
//     }


//     const todoImg = await uploadOnCloudinary(TodoAvatarLocalPath)

//     if(!todoImg.url){
//       throw new ApiError(500, "cloudinary server is busy try after some time");
//     }

//     const newMainTodo = new MainTodo({
//       todoHead,
//       color: color || "blue",
//       todoImg: todoImg.url,
//       createdBy: user._id,
//     });

//     await newMainTodo.save();
   

//      user.userTodo.push(newMainTodo._id);
//      await user.save();


//     return res
//       .status(200)
//       .json(new ApiResponse(200, newMainTodo, "Main Todo created successfully"));
//   } 
  
//   catch (error) {
//     throw new ApiError(500, error.message);
//   }
// });


const CreateTodo = asyncHandler(async (req, res) => {
  try {
    const { todoHead, color } = req.body;
    const TodoAvatarLocalPath = req?.file?.path; 

    if (!todoHead) {
      throw new ApiError(400, "Heading is required");
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (!TodoAvatarLocalPath) {
      throw new ApiError(400, "Image file is required");
    }

   
    const existingTodo = await MainTodo.findOne({ todoHead, createdBy: user._id });
    if (existingTodo) {
      throw new ApiError(400, "This todoHead already exists for you");
    }


    const todoImg = await uploadOnCloudinary(TodoAvatarLocalPath);

  
    if (!todoImg || !todoImg.url) {
      throw new ApiError(500, "Cloudinary upload failed. Please try again.");
    }

   
    const newMainTodo = new MainTodo({
      todoHead,
      color: color || "blue", 
      todoImg: todoImg.url,   
      createdBy: user._id,
    });

    await newMainTodo.save();

  
    user.userTodo.push(newMainTodo._id);
    await user.save();


    return res.status(200).json(new ApiResponse(200, newMainTodo, "Main Todo created successfully"));

  } catch (error) {
    throw new ApiError(500, error.message || "An error occurred while creating the Todo");
  }
});




const updateMaintodo = asyncHandler(async (req, res) => {


  const { color, todoHead } = req.body;
  const user = req.user;
  const { MainTodoID } = req.params;

  console.log("controller MainTodoID", MainTodoID);

  if (!MainTodoID) {
    throw new ApiError(400, "MainTodoID is required");
  }

 
  const updateData = {};


  if (color) updateData.color = color;
  if (todoHead) updateData.todoHead = todoHead;

 
  const existingMainTodo = await MainTodo.findById(MainTodoID);
 
  if (!existingMainTodo) {
    throw new ApiError(404, "MainTodo not found");
  }

  const existingTodo = await MainTodo.findOne({ todoHead, createdBy: user._id });
  
  if (existingTodo) {
    throw new ApiError(400, "This todoHead already exists for you");
  }

  
  const TodoAvatarLocalPath = req.file?.path;
  console.log("Uploaded file path:", TodoAvatarLocalPath);

  if (TodoAvatarLocalPath) {

    const todoImg = await uploadOnCloudinary(TodoAvatarLocalPath);
  ;

    if (!todoImg?.url) {
      throw new ApiError(500, "Cloudinary server is busy, try again later.");
    }
    updateData.todoImg = todoImg.url;
  } else {
    updateData.todoImg = existingMainTodo.todoImg;
  }

  
  const updatedMainTodo = await MainTodo.findByIdAndUpdate(
    MainTodoID,
    { $set: updateData },
    { new: true }
  ).select("-password");

  if (!updatedMainTodo) {
    throw new ApiError(400, "Failed to update MainTodo");
  }

  return res.status(200).json(
    new ApiResponse(200, updatedMainTodo, "MainTodo updated successfully")
  );
});






const DeleteTodo = asyncHandler(async (req, res) => {
 
  try {
    
    const { MainTodoID } = req.params;
    
  
    console.log("controller MainTodoID", MainTodoID);
  
    if (!MainTodoID) {
      throw new ApiError(400, "Maintodo id is required to delete todo");
    }
  
    const mainTodo = await MainTodo.findById(MainTodoID).populate('subTodo');
  
    if (!mainTodo) {
      throw new ApiError(404, "maintodo id is not found in db");
    }
  
    
    if (mainTodo.subTodo && mainTodo.subTodo.length > 0) {
      await SubTodo.deleteMany({ _id: { $in: mainTodo.subTodo } });
    }


    const userId = mainTodo.createdBy;  

    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { userTodo: MainTodoID } },
      { new: true } 
    );
  
  
    await MainTodo.deleteOne({ _id: MainTodoID });
  
    return res
    .status(200)
    .json(new ApiResponse(200 , {} , "mainTodo and related subTodo deleted successfully"))
  } catch (error) {
   throw new ApiError(500 , error.message);
  }
});





 const GetAllTodos = asyncHandler(async (req, res) => {
  try {

    const userId = new mongoose.Types.ObjectId(req.user._id); 
    console.log('userId', userId);

   
    const todos = await MainTodo.aggregate([
      {
        $match: { createdBy: userId } 
      },
      {
        $lookup: {
          from: 'subtodos', // Name of the SubTodo collection (default plural)
          localField: 'subTodo', // Field in MainTodo
          foreignField: '_id', // Field in SubTodo
          as: 'subTodos' // Output array field
        }
      },
      {
        $project: {
          todoHead: 1,
          color: 1,
          todoImg: 1,
          createdAt: 1,
          updatedAt: 1,
          subTodos: {
            $map: {
              input: '$subTodos',
              as: 'sub',
              in: {
                subTodoHead: '$$sub.subTodoHead',
                description: '$$sub.description',
                completed: '$$sub.completed',
                dueDate: '$$sub.dueDate',
                createdAt: '$$sub.createdAt',
                updatedAt: '$$sub.updatedAt',
              }
            }
          }
        }
      }
    ]);

    // Now, we need to check if all subTodos are completed for each MainTodo
    // for (const todo of todos) {
    //   const allSubTodosCompleted = todo.subTodos.every(sub => sub.completed === true);

    //   // If all subTodos are completed, mark the MainTodo's TodosCompleted as true
    //   if (allSubTodosCompleted && !todo.TodosCompleted) {
    //     // Update TodosCompleted to true in the database
    //     await MainTodo.findByIdAndUpdate(todo._id, { TodosCompleted: true });

    //     // Refetch the updated MainTodo to return the updated value in the response
    //     const updatedTodo = await MainTodo.findById(todo._id).populate('subTodo'); // Populate subTodo if necessary
    //     todo.TodosCompleted = updatedTodo.TodosCompleted; // Update in-memory
    //   }
    // }

    // Return the updated todos with the TodosCompleted flag correctly set
    return res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});

const GetAllTodosBydateSorted = asyncHandler(async(req ,res)=> {
         const userId = req.user._id;
  try {
    
    const todos = await MainTodo.find({ createdBy: userId })
     .sort({ createdAt: -1 })
     .exec();

     if(!todos){
       throw new ApiError(404 , 'No Todos found for this user')
     }

     return res.status(200).json({
       success: true,
       todos,
     });

  }catch(error){
   throw new ApiError(500 , error , 'something went wrong')
  }
})



// const GetAllTodos = asyncHandler(async (req, res) => {
//   try {
//     // Assuming user ID is available in req.user (from middleware)
//     const userId = req.user._id;

//     // Find all main todos created by the user and populate subTodos
//     const todos = await MainTodo.find({ createdBy: userId })
//       .populate({
//         path: 'subTodo',
//         select: 'subTodoHead description completed dueDate', // Specify fields to include
//       })
//       .exec();

//     return res.status(200).json({
//       success: true,
//       todos,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message,
//     });
//   }
// });





export{
CreateTodo,
updateMaintodo,
DeleteTodo,
GetAllTodos,
GetAllTodosBydateSorted,
}



