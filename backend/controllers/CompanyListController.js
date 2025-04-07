import prisma from "../prismaClient.js";

// ✅ Fetch jobs for a specific company by companyId
export const getJobsByCompanyId = async (req, res) => {
  const { companyId } = req.params;

  try {
    const jobs = await prisma.job.findMany({
      where: { companyId },
    });

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this company" });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all companies
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await prisma.company.findMany();
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Fetch a single company with jobs by ID
export const getCompanyById = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        jobs: true,
      },
    });

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.json(company);
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Update a company
export const updateCompany = async (req, res) => {
  const { id } = req.params;
  const { name, email, location, industry, website } = req.body;

  try {
    const updatedCompany = await prisma.company.update({
      where: { id },
      data: { name, email, location, industry, website },
    });

    res.status(200).json(updatedCompany);
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update job by ID
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const {
    designation,
    description,
    experience,
    percentage,
    gpa,
    seats,
    salary,
  } = req.body;

  try {
    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        designation,
        description,
        experience: experience ? parseInt(experience) : null,
        percentage: percentage ? parseFloat(percentage) : null,
        gpa: gpa ? parseFloat(gpa) : null,
        seats: seats ? parseInt(seats) : 0,
        salary,
      },
    });

    res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(404).json({ error: "Job not found or update failed" });
  }
};
