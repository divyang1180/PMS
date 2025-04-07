import express from "express";
import {
  getAllCompanies,
  getCompanyById,
  updateCompany,
  getJobsByCompanyId,
  updateJob,
} from "../controllers/CompanyListController.js";

const router = express.Router();

// Get all companies
router.get("/", getAllCompanies);

// Get a single company with job details
router.get("/:id", getCompanyById);

// Update a company
router.put("/:id", updateCompany);

// Get jobs for a specific company
router.get("/jobs/:companyId", getJobsByCompanyId);

// Update a job
router.put("/job/:id", updateJob);




export default router;
