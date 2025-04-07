import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 🔹 Get company details by ID
export const getCompanyById = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 🔹 Get selected students for a specific company
export const getSelectedStudents = async (req, res) => {
  const { companyId } = req.query;

  try {
    const selected = await prisma.selected.findMany({
      where: companyId ? { companyId } : {},
      include: {
        student: {
          include: {
            profile: true,
          },
        },
        company: true,
      },
    });

    const formatted = selected.map((entry) => ({
      id: entry.id,
      name: entry.student?.profile?.studentName || entry.student?.name,
      email: entry.student?.email,
      branch: entry.student?.profile?.branch || entry.student?.branch,
      companyName: entry.company?.name,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error fetching selected students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
