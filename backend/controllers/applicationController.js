import prisma from "../prismaClient.js";

// ✅ Get Applications by Company ID
export const getApplicationsByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    const applications = await prisma.appliedJob.findMany({
      where: {
        job: {
          companyId: companyId,  // Ensure companyId is correct
        },
      },
      include: {
        job: true,
        student: true,
      },
    });

    res.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Applications by Student ID
export const getStudentProfile = async (req, res) => {
  try {
    const { studentId } = req.params;
    console.log(`🔍 Fetching student profile for studentId: ${studentId}`);

    // Fetch the student profile where studentId matches the student table ID
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { studentId: studentId },
    });

    if (!studentProfile) {
      console.log(`❌ No profile found for studentId: ${studentId}`);
      return res.status(404).json({ error: "Student profile not found" });
    }

    console.log("✅ Student profile found:", studentProfile);
    res.json(studentProfile);
  } catch (error) {
    console.error("❌ Error fetching student profile:", error);
    res.status(500).json({ error: "Failed to fetch student profile" });
  }
};

// ✅ Select a student and store it in the Selected table
export const selectStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const companyId = req.user.id; // Authenticated company's ID

    console.log(`📌 Selecting student ${studentId} for company ${companyId}`);

    // Check if the student is already selected
    const existingSelection = await prisma.selected.findFirst({
      where: { studentId, companyId },
    });

    if (existingSelection) {
      return res.status(400).json({ message: "Student already selected!" });
    }

    // Insert into Selected table
    const selectedStudent = await prisma.selected.create({
      data: {
        studentId,
        companyId,
      },
    });

    res.status(201).json({
      message: "Student selected successfully!",
      selectedStudent,
    });
  } catch (error) {
    console.error("❌ Error selecting student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};







