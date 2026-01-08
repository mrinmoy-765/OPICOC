import express from "express";
import multer from "multer";
import {
  getAllUsers,
  getAllAdmins,
  createProduct,
} from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const adminRouter = express.Router();

adminRouter.get("/get-users", adminAuth, getAllUsers);
adminRouter.get("/get-admins", adminAuth, getAllAdmins);
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
adminRouter.post(
  "/create-product",
  adminAuth,
  upload.single("productImage"),
  createProduct
);

export default adminRouter;
