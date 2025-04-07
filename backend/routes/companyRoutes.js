import express from "express";
import { companySignup } from "../controllers/companyController.js"; // Placeholder

const router = express.Router();

// Company signup (similar to student signup for now)
router.post("/signup", companySignup);

export default router;
