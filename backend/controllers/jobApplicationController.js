import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Fetch all jobs (posted by companies)
export const getAllJobs = async (req, res) => {
  try {
    console.log("🔍 Fetching all jobs...");
    const jobs = await prisma.job.findMany({
      include: { company: true }, // Include company details
    });

    console.log("✅ Jobs fetched:", jobs);
    res.json(jobs);
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

// ✅ Student applies for a job — with profile completeness check
export const applyForJob = async (req, res) => {
  try {
    const { studentId, jobId } = req.body;

    // 🔍 Fetch student's profile
    const profile = await prisma.studentProfile.findUnique({
      where: { studentId },
    });

    if (!profile) {
      return res
        .status(400)
        .json({ message: "Please complete your profile before applying." });
    }

    const requiredFields = [
      "studentName",
      "enrollmentNo",
      "gender",
      "branch",
      "birthdate",
      "age",
      "passingYearSSC",
      "percentageSSC",
      "passingYearHSC",
      "percentageHSC",
      "passingYearD2D",
      "percentageD2D",
      "studyGap",
      "mediumSchool",
      "spiSem1",
      "spiSem2",
      "spiSem3",
      "spiSem4",
      "spiSem5",
      "currentCGPA",
      "percentageBE",
      "totalBacklogs",
      "backlogTitles",
      "currentBacklogs",
      "currentBacklogTitles",
      "mobileNumber",
      "email",
      "address",
      "city",
      "pincode",
      "district",
      "filePath",
    ];

    for (const field of requiredFields) {
      if (
        profile[field] === null ||
        profile[field] === undefined ||
        profile[field] === ""
      ) {
        return res.status(400).json({
          message: `Please complete your profile before applying. Missing field: "${field}"`,
        });
      }
    }

    // 🔄 Check if already applied
    const existingApplication = await prisma.appliedJob.findFirst({
      where: { studentId, jobId },
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job." });
    }

    // ✅ Apply for the job
    const appliedJob = await prisma.appliedJob.create({
      data: { studentId, jobId },
    });
    res
      .status(201)
      .json({ message: "Job application submitted successfully!", appliedJob });
  } catch (error) {
    console.error("❌ Error applying for job:", error);
    res.status(500).json({ error: "Failed to apply for job" });
  }
};

// ✅ Fetch jobs a student has applied for
export const getAppliedJobs = async (req, res) => {
  try {
    const studentId = parseInt(req.params.studentId);
    console.log(`🔍 Fetching applied jobs for student ID: ${studentId}`);

    const appliedJobs = await prisma.appliedJob.findMany({
      where: { studentId },
      include: {
        job: { include: { company: true } }, // Include job & company details
      },
    });

    console.log("✅ Applied jobs fetched:", appliedJobs);
    res.json(appliedJobs);
  } catch (error) {
    console.error("❌ Error fetching applied jobs:", error);
    res.status(500).json({ error: "Failed to fetch applied jobs" });
  }
};

// ✅ Company posts a new job
export const postJob = async (req, res) => {
  try {
    const {
      designation,
      description,
      experience,
      percentage,
      gpa,
      seats,
      salary,
      companyId,
    } = req.body;

    // Ensure required fields are provided
    if (!designation || !companyId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const job = await prisma.job.create({
      data: {
        designation,
        description,
        experience,
        percentage,
        gpa,
        seats,
        salary,
        companyId,
      },
    });

    res.status(201).json({ message: "Job posted successfully!", job });
  } catch (error) {
    console.error("❌ Error posting job:", error);
    res.status(500).json({ error: "Failed to post job" });
  }
};
