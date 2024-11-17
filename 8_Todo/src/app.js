import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

app.use(cors());

app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extended: true , limit:'16kb'}));
app.use(express.static("public")); 
app.use(cookieParser());
app.use(morgan('dev'))


import userRouter from "./routes/user.routes.js";
import { todoRoute } from "./routes/mainTodo.routes.js";
import { subTodoRoute } from "./routes/subTodo.routes.js";
import authRouter from "./routes/Auth.routes.js";
import errorHandler from "./middlewares/errorHandler.js";


app.use("/api/v1/auth/" , authRouter)
app.use("/api/v1/users", userRouter);
app.use("/api/v1/todo", todoRoute);
app.use("/api/v1/subtodo", subTodoRoute)



//error handler
app.use(errorHandler)


export {app}

