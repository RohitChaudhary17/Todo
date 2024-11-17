import {Router} from  "express";
import { fileUpload } from "../middlewares/multer.middleware.js";
import { DeleteUser, getUserProfile, updateUserDetails } from "../controllers/User.controller.js";
import { VerifyJWT } from "../middlewares/JwtVerify.middleware.js";

const userRouter = Router()








//secure routes



userRouter.route('/delete-user').delete(VerifyJWT , DeleteUser)
userRouter.route('/update-user').patch(VerifyJWT , fileUpload.single("profileImg") , updateUserDetails )
userRouter.route('/get-user').get(VerifyJWT , getUserProfile)






export default userRouter;