import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/authRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import SprofileRoutes from "./routes/SprofileRoutes.js";  
import selectedRoutes from "./routes/selectedRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/CprofileRoutes.js";
import jobApplicationRoutes from "./routes/jobApplicationRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import SApplicationRoutes from "./routes/SApplicationRoutes.js"; 
import StudentListRoutes from "./routes/StudentListRoutes.js";
import CompanyListRoutes from "./routes/CompanyListRoutes.js";
import selectedStudentRoutes from "./routes/SelectedStudentRoutes.js";
import countRoutes from "./routes/CountRoutes.js";
import studentSignupRoutes from "./routes/studentSignupRoutes.js";
import companySignupRoutes from "./routes/companySignupRoutes.js";
import companyCountRoutes from "./routes/CountRoutes1.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();



app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Routes
app.use("/auth", authRoutes);
app.use("/otp", otpRoutes);
app.use("/student", studentRoutes);
app.use("/company", companyRoutes);
app.use("/api/student", SprofileRoutes);
app.use("/api", jobApplicationRoutes); 
app.use("/api", applicationRoutes); 
app.use("/api/jobs", jobRoutes);
app.use("/api", selectedRoutes);
app.use("/api", SApplicationRoutes); 
app.use("/api/students", StudentListRoutes);
app.use("/api/companies", CompanyListRoutes);
app.use("/api/selected-students", selectedStudentRoutes);
app.use("/api/counts", countRoutes);
app.use("/api/signup", studentSignupRoutes); 
app.use("/api/company/signup", companySignupRoutes);
app.use("/api/counts", companyCountRoutes);





const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
