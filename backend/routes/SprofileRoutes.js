import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js"; // Ensure this is correctly exported
import multer from "multer";
import {
  createStudentProfile,
  getStudentProfile,
} from "../controllers/SprofileController.js";

const router = express.Router();

// ✅ Multer Setup for Memory Storage (Cloudinary Upload)
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Routes
router.post("/create", authenticate, upload.single("file"), createStudentProfile);
router.get("/:id", authenticate, getStudentProfile);

export default router;
