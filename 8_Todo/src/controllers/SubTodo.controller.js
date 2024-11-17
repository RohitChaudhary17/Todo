import { MainTodo } from "../models/MainTodo.model.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { SubTodo } from "../models/SubTodo.model.js";
import mongoose from "mongoose";



const CreateSubTodo = asyncHandler(async (req, res) => {

  const { subTodoHead, dueDate } = req.body
  const {MainTodoID} = req.params
  let {description} = req.body


  if (!subTodoHead && !dueDate) {
    throw new ApiError(400, "heading or dueDate is not given");
  }

  if(!description) {
    description = subTodoHead
  }

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(400, "user not exist")
  }

  const mainTodo = await MainTodo.findById(MainTodoID);

  if (!mainTodo) {
    throw new ApiError(400, "sub Todo must be belong to main Todo there is no parent of subtodo")
  }

  const newSubTodo = new SubTodo({
    subTodoHead,
    description,
    dueDate,
    createdBy: user?._id,
    belongTo: mainTodo?._id 
  });

  await newSubTodo.save()

  mainTodo.subTodo.push(newSubTodo._id);
  await mainTodo.save();


  return res
    .status(200)
    .json(
      new ApiResponse(200, newSubTodo, "subTodo created successfully")
    )
 

})



const updateSubTodo = asyncHandler(async (req, res) => {
  const { description, isCompleted, dueDate } = req.body;
  const { subTodoID } = req.params;

  if (!subTodoID) {
    throw new ApiError(400, "subTodoID is required");
  }

 
  const subTodo = await SubTodo.findById(subTodoID);
  
  if (!subTodo) {
    throw new ApiError(404, "subTodo not found");
  }


  const updateData = {};

 
  if (description) updateData.description = description;
  if (isCompleted !== undefined) updateData.completed = isCompleted;

  
  if (dueDate !== undefined && dueDate !== "") {
    updateData.dueDate = dueDate;
  } else {
  
    updateData.dueDate = subTodo.dueDate; 
  }

 
  const updatedSubTodo = await SubTodo.findByIdAndUpdate(
    subTodoID,
    updateData,
    { new: true }
  ).select("-password");

  return res.status(200).json(
    new ApiResponse(200, updatedSubTodo, "subTodo updated successfully")
  );
});





const DeleteSubTodo = asyncHandler(async (req, res) => {

  const { subTodoID } = req.params



  if (!subTodoID) {
    throw new ApiError(400, "subTodoID is require in order to delete subTodo")
  }

  const subTodo = await SubTodo.findByIdAndDelete(subTodoID);

  if (!subTodo) {
    throw new ApiError(400, "subTodo not found in db")
  }

  const mainTodo = await MainTodo.findByIdAndUpdate(subTodo.belongTo, { $pull: { subTodo: subTodoID } }, { new: true });

  if (!mainTodo) {
    throw new ApiError(400, "mainTodo not found in db")
  }

  // {const subTodo = await SubTodo.findById(subTodoID);

  // if(!subTodo){
  //   throw new ApiError(400 , "subTodo is not present in db")
  // }

  // await subTodo.remove();

  //this second approach}

  return res
    .status(200)
    .json(
      new ApiResponse(200, subTodo, "subTodo deleted successfully")
    )


})




const getSubTodosForMainTodo = asyncHandler( async(req, res) => {
  const MaintodoID = req.params.MainTodoID;
  console.log("MaintodoID :" , MaintodoID)

  try {
    
    const result = await MainTodo.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(MaintodoID) } 
      },

      {
        $unwind: "$subTodo" 
      },
      {
        $lookup: {
          from: "subtodos", 
          localField: "subTodo", 
          foreignField: "_id", 
          as: "subTodoDetails" 
        }
      },
      {
        $unwind: "$subTodoDetails" 
      },
      {
        $project: {
          _id: 0,
          subTodoId: "$subTodoDetails._id", 
          subTodoHead: "$subTodoDetails.subTodoHead", 
          description: "$subTodoDetails.description",
          completed: "$subTodoDetails.completed", 
          dueDate: "$subTodoDetails.dueDate", 
        }
      }
    ]);

    if (result.length === 0) {
      throw new ApiError(404, "No subTodos found for the given MainTodo");
    }


    return res.status(200).json(
      new ApiResponse(200, result, "SubTodos fetched successfully")
    );
    
  } catch (err) {
    console.error(err);
    throw new ApiError(500, "Server Error");
  }
});




export {
  CreateSubTodo,
  updateSubTodo,
  DeleteSubTodo,
  getSubTodosForMainTodo,
}