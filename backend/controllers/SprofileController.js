import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const prisma = new PrismaClient();

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Configure Multer (Store in memory for Cloudinary)
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Create Student Profile


export const createStudentProfile = async (req, res) => {
  try {
    console.log("Incoming Request Body:", req.body); // Debugging Step ✅

    const {
      studentId,
      studentName,
      enrollmentNo,
      gender,
      branch,
      birthdate,
      age,
      passingYearSSC,
      percentageSSC,
      passingYearHSC,
      percentageHSC,
      passingYearD2D,
      percentageD2D,
      studyGap,
      mediumSchool,
      spiSem1,
      spiSem2,
      spiSem3,
      spiSem4,
      spiSem5,
      currentCGPA,
      percentageBE,
      totalBacklogs,
      backlogTitles,
      currentBacklogs,
      currentBacklogTitles,
      mobileNumber,
      email,
      address,
      city,
      pincode,
      district,
      fileUrl, // ✅ This should be received from frontend (Cloudinary URL)
    } = req.body;

    try {
      // Check if profile already exists
      const existingProfile = await prisma.studentProfile.findUnique({
        where: { email },
      });
  
      if (existingProfile) {
        return res.status(400).json({ error: 'Profile with this email already exists.' });
      }

      if (!studentId || !studentName || !email) {
        return res.status(400).json({ error: "Required fields missing!" });
      }

      const studentProfile = await prisma.studentProfile.create({
        data: {
          studentId,
          studentName,
          enrollmentNo,
          gender,
          branch,
          birthdate: new Date(birthdate), // Ensure correct Date format
          age: Number(age),
          passingYearSSC: Number(passingYearSSC),
          percentageSSC: parseFloat(percentageSSC),
          passingYearHSC,
          percentageHSC,
          passingYearD2D,
          percentageD2D,
          studyGap: studyGap ? Number(studyGap) : null,
          mediumSchool,
          spiSem1: spiSem1 ? parseFloat(spiSem1) : null,
          spiSem2: spiSem2 ? parseFloat(spiSem2) : null,
          spiSem3: spiSem3 ? parseFloat(spiSem3) : null,
          spiSem4: spiSem4 ? parseFloat(spiSem4) : null,
          spiSem5: spiSem5 ? parseFloat(spiSem5) : null,
          currentCGPA: parseFloat(currentCGPA),
          percentageBE: parseFloat(percentageBE),
          totalBacklogs: totalBacklogs ? Number(totalBacklogs) : null,
          backlogTitles,
          currentBacklogs: currentBacklogs ? Number(currentBacklogs) : null,
          currentBacklogTitles,
          mobileNumber,
          email,
          address,
          city,
          pincode,
          district,
          filePath: fileUrl, // ✅ Save Cloudinary URL to `filePath`
        },
      });

      return res.status(201).json({ message: "Profile created successfully!", studentProfile });
    } catch (error) {
      console.error("Error creating profile:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// ✅ Fetch Student Profile using ID
export const getStudentProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);

    const student = await prisma.student.findUnique({
      where: { id: decoded.id },
      include: { profile: true },
    });

    if (!student || !student.profile) {
      return res.status(404).json({ error: "Student profile not found " });
    }

    res.json(student.profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
