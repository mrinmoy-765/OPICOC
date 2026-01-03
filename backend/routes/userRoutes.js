import express from "express";
import multer from "multer";
import userAuth from "../middleware/userAuth.js";
// import upload from "../middleware/upload.js";
import {
  getUserData,
  updateProfile,
  changePassword,
  uploadProfileImage,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);
userRouter.patch("/update-profile", userAuth, updateProfile);
userRouter.put("/changePassword", userAuth, changePassword);
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

userRouter.post(
  "/upload-profile-image",
  userAuth,
  upload.single("image"),
  uploadProfileImage
);

export default userRouter;
