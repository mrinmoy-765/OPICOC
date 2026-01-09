import express from "express";
import multer from "multer";
import {
  getAllUsers,
  getAllAdmins,
  createProduct,
  getBases,
  getSpecificBase,
  updateBase,
  deleteBase,
} from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const adminRouter = express.Router();

adminRouter.get("/get-users", adminAuth, getAllUsers);
adminRouter.get("/get-admins", adminAuth, getAllAdmins);
adminRouter.get("/get-bases", adminAuth, getBases);
adminRouter.get("/get-base/:id", adminAuth, getSpecificBase);
adminRouter.put("/update-base/:id", adminAuth, updateBase);
adminRouter.delete("/deleteBase/:id", adminAuth, deleteBase);
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
