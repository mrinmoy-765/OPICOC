import express from "express";
import {
  sendContactMessage,
  getAllMessages,
  sendEmail,
  getUnreadCount,
  markMessageAsRead,
} from "../controllers/contactController.js";
import adminAuth from "../middleware/adminAuth.js";

const contactRouter = express.Router();

contactRouter.post("/send", sendContactMessage);
contactRouter.get("/all", adminAuth, getAllMessages);
contactRouter.post("/reply", adminAuth, sendEmail);
contactRouter.get("/unread-count", adminAuth, getUnreadCount);
contactRouter.patch("/mark-read/:id", adminAuth, markMessageAsRead);

export default contactRouter;
