import { Router } from "express";
import { fileUpload } from "../middlewares/multer.middleware.js";
import { CreateTodo, DeleteTodo, GetAllTodos, GetAllTodosBydateSorted, updateMaintodo } from "../controllers/MainTodo.controller.js";
import { VerifyJWT } from "../middlewares/JwtVerify.middleware.js";
import checkTodoOwnership from "../middlewares/checkOwner.middleware.js";


const todoRoute = Router()

//secure routes
todoRoute.route('/create-main-todo').post(VerifyJWT, fileUpload.single("todoImg") , CreateTodo)

//secure routes with Ownership
todoRoute.route('/:MainTodoID').patch( VerifyJWT ,  fileUpload.single("todoImg") , checkTodoOwnership, updateMaintodo)
// Middleware order is important: 
// Place 'multer' middleware (file upload handler) before any middleware 
// that accesses 'req.body'. This ensures that 'req.body' is populated 
// with fields sent alongside the file before further processing.

todoRoute.route('/:MainTodoID').delete(VerifyJWT ,checkTodoOwnership ,  DeleteTodo)

todoRoute.route("/get-all-todos").get(VerifyJWT , GetAllTodos)
todoRoute.route('/get-all-todos-sorted').get(VerifyJWT , GetAllTodosBydateSorted )

export {todoRoute}