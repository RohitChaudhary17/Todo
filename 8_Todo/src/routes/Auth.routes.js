import {Router} from 'express'
import { is_LoggedIn, LoginUser, LogOutUser, RegisterUser } from '../controllers/Auth.controller.js';
import { VerifyJWT } from '../middlewares/JwtVerify.middleware.js';

const authRouter = Router()


authRouter.route("/register").post(RegisterUser);
authRouter.route("/login").post(LoginUser)
authRouter.route("/logout").get(VerifyJWT , LogOutUser)
authRouter.route('/is_logged_in').get(VerifyJWT , is_LoggedIn)


export default authRouter


