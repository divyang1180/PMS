import express from "express";
import {
  getJobPostingsCount,
  getApplicationsCount,
  getSelectedCandidatesCount,
} from "../controllers/CountController1.js";

const router = express.Router();

router.get("/job-postings/:companyId", getJobPostingsCount);
router.get("/applications/:companyId", getApplicationsCount);
router.get("/selected-candidates/:companyId", getSelectedCandidatesCount);

export default router;
