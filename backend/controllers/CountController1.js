import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getJobPostingsCount = async (req, res) => {
  try {
    const { companyId } = req.params;

    const count = await prisma.job.count({
      where: { companyId },
    });

    res.json({ count });
  } catch (error) {
    console.error("❌ Error fetching job postings count:", error);
    res.status(500).json({ error: "Failed to fetch job postings count" });
  }
};

export const getApplicationsCount = async (req, res) => {
  try {
    const { companyId } = req.params;

    const count = await prisma.appliedJob.count({
      where: {
        job: {
          companyId,
        },
      },
    });

    res.json({ count });
  } catch (error) {
    console.error("❌ Error fetching applications count:", error);
    res.status(500).json({ error: "Failed to fetch applications count" });
  }
};

export const getSelectedCandidatesCount = async (req, res) => {
  try {
    const { companyId } = req.params;

    const count = await prisma.selected.count({
      where: {
        companyId,
      },
    });

    res.json({ count });
  } catch (error) {
    console.error("❌ Error fetching selected candidates count:", error);
    res.status(500).json({ error: "Failed to fetch selected candidates count" });
  }
};

