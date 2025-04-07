import express from "express";
import { sendOtpForSignup, verifyOtpAndRegister } from "../controllers/studentSignupController.js";

const router = express.Router();

router.post("/send-otp", sendOtpForSignup);
router.post("/signup", verifyOtpAndRegister);

export default router;
