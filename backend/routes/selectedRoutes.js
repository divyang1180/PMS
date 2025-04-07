import express from "express";
import { selectStudent , getSelectedCandidates} from "../controllers/selectedController.js";

const router = express.Router();

router.post("/select-student/:studentId", selectStudent);
router.get("/selected-candidates/:companyId", getSelectedCandidates);

export default router;
