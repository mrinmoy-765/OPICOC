import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  getUserData,
  updateProfile,
  changePassword,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);
userRouter.patch("/update-profile", userAuth, updateProfile);
userRouter.put("/changePassword", userAuth, changePassword);

export default userRouter;
