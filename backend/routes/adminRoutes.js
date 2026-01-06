import express from "express";
import { getAllUsers, getAllAdmins } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const adminRouter = express.Router();

adminRouter.get("/get-users", adminAuth, getAllUsers);
adminRouter.get("/get-admins", adminAuth, getAllAdmins);

export default adminRouter;
