import { Router } from "express";
import { VerifyJWT } from "../middlewares/JwtVerify.middleware.js";
import { CreateSubTodo, DeleteSubTodo, getSubTodosForMainTodo, updateSubTodo } from "../controllers/SubTodo.controller.js";
import checkTodoOwnership from "../middlewares/checkOwner.middleware.js";


const subTodoRoute = Router()

// secure routes with ownership check
subTodoRoute.route('/:MainTodoID').post(VerifyJWT ,checkTodoOwnership, CreateSubTodo);
subTodoRoute.route('/:subTodoID').patch(VerifyJWT ,checkTodoOwnership, updateSubTodo);
subTodoRoute.route('/:subTodoID').delete(VerifyJWT , checkTodoOwnership , DeleteSubTodo);
subTodoRoute.route('/:MainTodoID').get(VerifyJWT , checkTodoOwnership ,getSubTodosForMainTodo );

export {subTodoRoute}