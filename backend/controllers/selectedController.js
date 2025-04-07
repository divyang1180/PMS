import { PrismaClient } from "@prisma/client"; // ✅ Use `import`
const prisma = new PrismaClient();


// ✅ Fetch all selected candidates for a job
export const getSelectedCandidates = async (req, res) => {
  try {
    const { companyId } = req.params;
    console.log(`🔍 Fetching selected candidates for company: ${companyId}`);

    const selectedCandidates = await prisma.selected.findMany({
      where: { companyId },
      include: {
        student: {
          include: { profile: true },
        },
      },
    });

    res.json(selectedCandidates);
  } catch (error) {
    console.error("❌ Error fetching selected candidates:", error);
    res.status(500).json({ error: "Failed to fetch selected candidates" });
  }
};


// ✅ Mark a student as selected
export const selectStudent = async (req, res) => {
  try {
    const { studentId, jobId } = req.body;

    const updatedApplication = await prisma.appliedJob.updateMany({
      where: {
        studentId: studentId,
        jobId: jobId,
      },
      data: {
        isSelected: true, // ✅ Mark student as selected
      },
    });

    if (updatedApplication.count > 0) {
      res.json({ message: "Student selected successfully!" });
    } else {
      res.status(404).json({ error: "Application not found" });
    }
  } catch (error) {
    console.error("❌ Error selecting student:", error);
    res.status(500).json({ error: "Server error" });
  }
};


