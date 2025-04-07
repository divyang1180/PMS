
import express from "express";
import { getSelectedCompanies } from "../controllers/SApplicationController.js";
import { authenticate, verifyStudent } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Only authenticated students can access selected companies
router.get("/selected-companies/:studentId", authenticate, verifyStudent, getSelectedCompanies);

export default router;
