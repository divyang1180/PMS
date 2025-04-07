import express from "express";
import { login } from "../controllers/authController.js";
import { studentSignup } from "../controllers/studentController.js";
import { companySignup } from "../controllers/companyController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Login Route
router.post("/login", login);

// ✅ Signup Routes (Separate for each role)
router.post("/signup/student", studentSignup);
router.post("/signup/company", companySignup);

// ✅ Protected Route Example
router.get("/dashboard", authenticate, (req, res) => {
  res.status(200).json({ 
    message: "Welcome to the dashboard", 
    user: req.user 
  });
});

export default router;
