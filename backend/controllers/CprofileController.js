import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Create a job posting
export const createJob = async (req, res) => {
  try {
    const { designation, description, experience, percentage, gpa, seats, salary, companyId } = req.body;

    if (!companyId) {
      return res.status(400).json({ error: "Company ID is required" });
    }

    const newJob = await prisma.job.create({  // 🔥 Ensure 'job' matches the Prisma model name
      data: {
        designation,
        description,
        experience: experience ? parseInt(experience) : null,
        percentage: percentage ? parseFloat(percentage) : null,
        gpa: gpa ? parseFloat(gpa) : null,
        seats: seats ? parseInt(seats) : null,
        salary,
        companyId,
      },
    });

    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get all job postings
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany(); // 🔥 Ensure correct model name
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get jobs by company ID
export const getJobsByCompany = async (req, res) => {
  const { companyId } = req.params;

  try {
    const jobs = await prisma.job.findMany({
      where: { companyId },
    });

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching company jobs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
