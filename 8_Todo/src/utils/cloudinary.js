import dotenv from 'dotenv';

// Initialize dotenv to load .env file
dotenv.config();

import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});





const uploadOnCloudinary = async (localFilePath) => {
  console.log(localFilePath)


try {

  if(!localFilePath){
    return null
  }
  const response = await cloudinary.uploader.upload(localFilePath , {
    resource_type:'auto'
  })

  console.log(response)

  fs.unlinkSync(localFilePath)

  console.log('file is uploaded on cloudinary' , response)
  return response
  
} catch (error) {
  fs.unlinkSync(localFilePath);
  console.error('Error uploading to Cloudinary:', error);
  return null;
}

}

export {uploadOnCloudinary}