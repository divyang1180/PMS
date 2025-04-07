import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSelectedCompanies = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Ensure studentId is provided
    if (!studentId) {
      return res.status(400).json({ error: "Student ID is required" });
    }

    // Fetch companies that selected this student
    const selectedCompanies = await prisma.selected.findMany({
      where: { studentId },
      include: { company: true }, // Include company details
    });

    res.status(200).json(selectedCompanies);
  } catch (error) {
    console.error("❌ Error fetching selected companies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
