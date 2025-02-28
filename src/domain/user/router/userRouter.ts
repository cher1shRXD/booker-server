import express from "express";
import {UserController} from "../controller/userController.js";
import {jwtProvider} from "../../../global/middleware/jwtProvider.js";

const userRouter = express.Router();
const controller = new UserController();

userRouter.get("/users/me", jwtProvider, async (req, res) => {
  await controller.getMe(req, res);
})

export default userRouter;