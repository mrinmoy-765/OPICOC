import express from "express";
import {
  login,
  logout,
  register,
  verifyEmailOtp,
} from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/verify-otp", verifyEmailOtp);

export default authRouter;
