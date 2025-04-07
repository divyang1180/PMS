import express from "express";
import {
  getSelectedStudents,
  getCompanyById,
} from "../controllers/SelectedStudentController.js";

const router = express.Router();

// GET /api/selected-students/selected?companyId=abc123
router.get("/selected", getSelectedStudents);

// GET /api/selected-students/:id (company ID)
router.get("/:id", getCompanyById);

export default router;
