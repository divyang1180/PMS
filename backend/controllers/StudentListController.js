import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      where: {
        profile: {
          // Only include students who have a profile entry
          isNot: null
        }
      },
      include: {
        profile: true
      }
    });

    console.log("Fetched Students with Profiles:", JSON.stringify(students, null, 2));
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



//✅ Use this if you need to fetch a single student.
export const getStudentById = async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: { profile: true },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




// Update full student profile
export const updateStudent = async (req, res) => {
  const studentId = req.params.id;
  let { profile } = req.body; // ✅ Extract profile object

  if (!profile) {
    return res.status(400).json({ error: "Profile data is required" });
  }

  try {
    console.log("🔄 Updating Student Data:", JSON.stringify(profile, null, 2));

    // ✅ Fix: Map `fileUrl` to `filePath`
    if (profile.fileUrl) {
      profile.filePath = profile.fileUrl;
      delete profile.fileUrl; // Remove old key
    }

    // ✅ Fix: Convert birthdate to correct Date format
    if (profile.birthdate) {
      profile.birthdate = new Date(profile.birthdate.split('/').reverse().join('-')).toISOString();
    }

    const updatedProfile = await prisma.studentProfile.upsert({
      where: { studentId },
      update: profile, // ✅ Pass unwrapped profile data
      create: {
        studentId,
        ...profile, // ✅ Use spread operator to include all fields
      },
    });

    console.log("✅ Student profile updated successfully!");
    res.json(updatedProfile);
  } catch (error) {
    console.error("❌ Error updating student profile:", error);
    res.status(500).json({ error: error.message });
  }
};



