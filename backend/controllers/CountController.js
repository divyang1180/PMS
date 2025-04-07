import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCounts = async (req, res) => {
  try {
    const companiesCount = await prisma.company.count();
    const studentsCount = await prisma.student.count();
    const selectedCount = await prisma.selected.count();

    res.json({
      companies: companiesCount,
      students: studentsCount,
      selected: selectedCount,
    });
  } catch (error) {
    console.error("Error fetching counts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
