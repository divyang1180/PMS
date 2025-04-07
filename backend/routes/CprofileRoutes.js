import express from "express";
import { createJob, getAllJobs, getJobsByCompany } from "../controllers/CprofileController.js";

const router = express.Router();

// ✅ Route to create a job posting
router.post("/post", createJob);

// ✅ Route to fetch all job postings
router.get("/all", getAllJobs);

// ✅ Route to fetch jobs by company ID
router.get("/company/:companyId", getJobsByCompany);

export default router;
