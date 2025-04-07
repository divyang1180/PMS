import express from "express";
import { getAllStudents, updateStudent, getStudentById } from "../controllers/StudentListController.js";

const router = express.Router();

// ✅ Fetch all students (fix for frontend fetch request)
router.get("/", getAllStudents);

// ✅ Fetch a single student by ID
router.get("/:id", getStudentById);

// ✅ Update student profile by ID
router.put("/:id", updateStudent);

export default router;
