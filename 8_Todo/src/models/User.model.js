import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true
    },

    username:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
      trim:true,
      index:true, 
    },

    email:{
    type:String,
    required:true,
    },
    password:{
      type:String,
      required:true
    },
    profileImg:{
      type:String, //cloudinary url
    },

   userTodo:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:"MainTodo"
   }],

    refreshToken:{
      type:String,
    }

  },
  {timestamps:true}
);

userSchema.pre("save" , async function (next) {
  if(!this.isModified("password")){
    return next()
  }
 this.password =  await bcrypt.hash(this.password , 10)
 return next()
})

userSchema.methods.isPasswordCorrect = async function (password){
 const isMatch = await bcrypt.compare(password , this.password);
 return isMatch;
}

userSchema.methods.GenerateAccessToken = async function(){
 const user = this
 const AccessToken =  jwt.sign(
  {
   _id:user._id,
   email:user.email,
   username:user.username,
  },

   process.env.ACCESS_TOKEN_SECRET,

   {
     expiresIn:process.env.ACCESS_TOKEN_EXPIRY
   },
 )

 return AccessToken;
}


userSchema.methods.GenerateRefreshToken = async function(){
  const RefreshToken =   jwt.sign(
    {
      _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )

  return RefreshToken;
}


export const User = mongoose.model('User' , userSchema)