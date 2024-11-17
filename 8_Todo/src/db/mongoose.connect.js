import mongoose from "mongoose";
import { MONGO_DATABASE_NAME } from "../constant.js";


const connectDB = async () => {
  try {

    const mongoInstance = await mongoose.connect(`${process.env.MONGO_URI}/${MONGO_DATABASE_NAME}`)
    console.log(`mongodb is connected !! ${mongoInstance.connection.host}`)
  } catch (error) {
    console.error('connection failed', error.message)
  }
}

export default connectDB
