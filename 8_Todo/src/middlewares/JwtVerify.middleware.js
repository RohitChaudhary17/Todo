import {asyncHandler} from "../utils/asyncHandler.utils.js"
import { ApiError } from "../utils/ApiError.js"
import {User} from "../models/User.model.js"
import jwt from "jsonwebtoken"


export const VerifyJWT = asyncHandler(async(req, _, next)=> {
 
 try {
   const token =  req.cookies?.accessToken;
 
  if(!token){
   throw new ApiError(400, "unauthorized request")
  }
 
  const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
 
  const user = await User.findById(decodedToken?._id);
 
  if(!user){
   throw new ApiError(401 , "invalid access Token")
  }
 
  req.user = user;
  console.log("verify successfull")
  next()

 } catch (error) {
  throw new ApiError(500 , `${error.message} from Jwt`)
 }

})





