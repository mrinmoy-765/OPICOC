import express from "express";
import multer from "multer";
import userAuth from "../middleware/userAuth.js";
// import upload from "../middleware/upload.js";
import {
  createRequest,
  getAllRequests,
} from "../controllers/requestController.js";

const requestRouter = express.Router();

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

requestRouter.post(
  "/create",
  userAuth,
  upload.single("requestImage"),
  createRequest,
);
requestRouter.get("/get-requests", getAllRequests);

export default requestRouter;
