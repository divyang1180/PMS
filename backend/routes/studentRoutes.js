
import express from "express";
import { studentSignup } from "../controllers/studentController.js";

const router = express.Router();

router.post("/signup", studentSignup);

export default router;
