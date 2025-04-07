import express from "express";
import { getCounts } from "../controllers/CountController.js";

const router = express.Router();

router.get("/", getCounts);

export default router;
