import express from "express";
import {
  subscribe,
  getAllEmails,
} from "../controllers/newsletterController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/subscribe", subscribe);
router.get("/get-emails", adminAuth, getAllEmails);

export default router;
