import {asyncHandler} from "../utils/asyncHandler.utils.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/User.model.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { MainTodo } from "../models/MainTodo.model.js";
import { SubTodo } from "../models/SubTodo.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";








const DeleteUser = asyncHandler(async (req, res) => {
  try {
    const userID = req.user?._id;
  
    if (!userID) {
      throw new ApiError(400, "User ID must not be empty");
    }
  
   
    const mainTodos = await MainTodo.find({ createdBy: userID });
  
   
    const subTodoIds = mainTodos.flatMap(todo => todo.subTodo);
    if (subTodoIds.length > 0) {
      await SubTodo.deleteMany({ _id: { $in: subTodoIds } });
    }
  
  
    await MainTodo.deleteMany({ createdBy: userID });
  
  
    const user = await User.findByIdAndDelete(userID);
    
    if (!user) {
      throw new ApiError(404, "User does not exist");
    }
  
    return res
      .status(200)
      .json(new ApiResponse(200, "User and related todos deleted successfully"));
  } catch (error) {
    throw new ApiError(500 , error.message)
  }
});



const updateUserDetails = asyncHandler(async (req, res) => {
  const { name } = req.body;

  try {
    const updateData = {};

  
    if (name) updateData.name = name;

    
    const user = await User.findById(req.user._id).select('profileImg');

    if (!user) {
      throw new ApiError(400, "User not found");
    }

   
    const profileImgLocalPath = req.file?.path;

    console.log("profile-local: ", profileImgLocalPath);

   
    

   
    if (profileImgLocalPath) {
    
      const profileImg = await uploadOnCloudinary(profileImgLocalPath);

   
      if (!profileImg?.url) {
        throw new ApiError(500, "Cloudinary server not responding");
      }

     
      updateData.profileImg = profileImg.url;
    } else {
     
      updateData.profileImg = user.profileImg;  
    }


    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, 
      {
        $set: updateData, 
      },
      { new: true } 
    ).select("-password"); 

  
    if (!updatedUser) {
      throw new ApiError(400, "User does not exist");
    }

    // Send success response
    return res.status(200).json(
      new ApiResponse(200, updatedUser, "User profile updated successfully")
    );

  } catch (error) {
    // Handle unexpected errors
    throw new ApiError(500, error.message);
  }
});


const getUserProfile = asyncHandler(async(req , res) => {

  const userID = req.user._id;

  if(!userID){
    throw new ApiError(400, "User ID must not be empty")
  }

  try {
    
  const user = await User.findById(userID).select("-password");

  if(!user){
    throw new ApiError(404, "User does not exist")
  }

  return res.status(200).json(
    new ApiResponse(200, user, "User profile fetched successfully")
  )

  } catch (error) {
    throw new ApiError(500 , error?.message)
  }


}) 










export{
  DeleteUser,
  updateUserDetails,
  getUserProfile,
}