import express from "express";
import { getApplicationsByCompany, getStudentProfile, selectStudent } from "../controllers/applicationController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/applications/:companyId", authenticate, getApplicationsByCompany);
router.get("/student1/:studentId", authenticate, getStudentProfile);
router.post("/select-student/:studentId", authenticate, selectStudent); // ✅ Add this route

export default router;
