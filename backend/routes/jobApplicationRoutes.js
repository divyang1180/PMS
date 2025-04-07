import express from "express";
import { getAllJobs, applyForJob, getAppliedJobs, postJob ,} from "../controllers/jobApplicationController.js";

const router = express.Router();

router.get("/jobs", getAllJobs); // ✅ Get all jobs posted by companies
router.post("/apply", applyForJob); // ✅ Student applies for a job
router.get("/applied/:studentId", getAppliedJobs); // ✅ Get jobs a student has applied for
router.post("/post", postJob); // ✅ Ensure this route exists

export default router;
