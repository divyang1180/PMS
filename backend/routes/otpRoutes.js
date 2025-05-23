import express from "express";
import { sendOtp, verifyOTP, resetPassword } from "../controllers/otpController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOTP)
router.post("/reset-password", resetPassword)

export default router;
