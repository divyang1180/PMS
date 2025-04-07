import express from "express";
import { sendOtpForCompany, signupCompany } from "../controllers/companySignupController.js";
const router = express.Router();

router.post("/send-otp", sendOtpForCompany);
router.post("/signup", signupCompany);

export default router;
