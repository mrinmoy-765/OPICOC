import express from "express";
import multer from "multer";
import userAuth from "../middleware/userAuth.js";
// import upload from "../middleware/upload.js";
import { createReview } from "../controllers/reviewController.js";

const reviewRouter = express.Router();

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

reviewRouter.post(
  "/create",
  userAuth,
  upload.single("reviewImage"),
  createReview
);

export default reviewRouter;
