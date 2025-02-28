import express from "express";
import {AuthController} from "../controller/authController.js";

const authRouter = express.Router();
const controller = new AuthController();

authRouter.post("/login", async (req, res) => {
  await controller.login(req, res);
});

authRouter.post("/signup", async (req, res) => {
  await controller.signup(req, res);
});

authRouter.post("/reissue", async (req, res) => {
  await controller.reissue(req, res);
})

export default authRouter;