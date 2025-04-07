import express from "express";
import { adminSignup } from "../controllers/adminController.js";

const router = express.Router();

// Admin signup (similar to student signup for now)
router.post("/signup", adminSignup);
export default router;