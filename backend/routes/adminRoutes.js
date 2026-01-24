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
  getTownHalls,
  generateAbout,
  getAbout,
  updateAbout,
  getSpecificAbout,
  deleteAbout,
} from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const adminRouter = express.Router();

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

adminRouter.get("/get-users", adminAuth, getAllUsers);
adminRouter.get("/get-admins", adminAuth, getAllAdmins);
adminRouter.get("/get-bases", getBases);
adminRouter.get("/get-base/:id", adminAuth, getSpecificBase);
adminRouter.put(
  "/update-base/:id",
  adminAuth,
  upload.single("productImage"),
  updateBase,
);
adminRouter.delete("/deleteBase/:id", adminAuth, deleteBase);
adminRouter.post(
  "/create-product",
  adminAuth,
  upload.single("productImage"),
  createProduct,
);
adminRouter.get("/get-townHall", getTownHalls);
adminRouter.post("/create-about", adminAuth, generateAbout);
adminRouter.get("/get-about", getAbout);
adminRouter.put("/update-about/:id", adminAuth, updateAbout);
adminRouter.get("/get-about/:id", adminAuth, getSpecificAbout);
adminRouter.delete("/delete-about/:id", adminAuth, deleteAbout);
export default adminRouter;
