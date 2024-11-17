import {asyncHandler} from "../utils/asyncHandler.utils.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/User.model.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from 'jsonwebtoken'




const GenerateAccessRefreshToken = async function (userID) {

  const user =  await User.findById(userID);

  const accessToken = await user.GenerateAccessToken()
  const refreshToken = await user.GenerateRefreshToken()

  user.refreshToken = refreshToken;
  await user.save({validateBeforeSave: false});

  return {accessToken , refreshToken}


}

const options = {
  httpOnly:true, 
  //secure:true,
  sameSite: 'Strict',
  maxAge: 24 * 60 * 60 * 1000, //
  
}





const RegisterUser = asyncHandler(async(req , res)=> {
  const {name , email , password , username} =  req.body;

  if(!(name && email && password && username)){
    throw new ApiError(400 , "required feilds are empty of not valid");
  }

 const userExits = await User.findOne({username: username});

 if(userExits){
 throw new ApiError(409 , "username already exists")
 }

 const user = await User.create({
   name,
   email, 
   password,
   username: username.toLowerCase()
 })

 
if(!user){
 throw new ApiError(500 , "user is not created try after sometime")
}
console.log(`${user} successfully register`)
return res
.status(200)
.json(
 new ApiResponse(200 , user, "user created successfully")
)
})




const LoginUser = asyncHandler(async (req, res)=> {
 
  const {username , password} = req.body

  if(!(username , password)){
   throw new ApiError(400 , "username or password is empty")
  }

  const user = await User.findOne({username});

  if(!user){
   throw new ApiError(404 , "user is not exits singup first");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if(!isPasswordValid){
   throw new ApiError(400 , "incorrect password")
  }

  const {accessToken , refreshToken} = await GenerateAccessRefreshToken(user?._id);

  const LoggedInUser = await User.findById(user._id)
  .select("-password  -refreshToken")

  console.log(LoggedInUser)

  return res
  .status(200)
  .cookie("accessToken" , accessToken , options)
  .cookie("refreshToken" , refreshToken, options)
  .json(
   new ApiResponse(
     200 , 
     {
     "user":LoggedInUser, accessToken, refreshToken
     },
     "User logged in successfully"
   ))

 
})




const LogOutUser = asyncHandler(async(req , res)=> {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set:{
        refreshToken:undefined
      },
    },
    {
      new:true,
    }
  )

return res
.status(200)
.clearCookie("accessToken", options)
.clearCookie("refreshToken", options)
.json(
  new ApiResponse(200 , {} , "user logged Out successfully")
)

})




const is_LoggedIn = asyncHandler(async (req, res ) => {

try {
  const token = req.cookies.accessToken
  
  if(!token){
    return res.json(false)
  }
  
  jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err)=>{
    if(err){
      res.json(false)
    }
  })
  
  return res.json(true)
} catch (error) {
  return false
}


})


export{
  RegisterUser,
  LoginUser,
  LogOutUser,
  is_LoggedIn
}