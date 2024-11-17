import dotenv from 'dotenv'
import { app } from './app.js';
import connectDB from './db/mongoose.connect.js';

dotenv.config({
  path:'./.env',
})



const port = process.env.PORT || 8080;



connectDB()
.then(()=>{
  app.listen(port , ()=>{
    console.log(`server is running ${port}`)
  })
})

.catch(error => {
  console.error(`Error connecting to database: ${error.message}`)
  process.exit(1)
 
})