import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";  // Import bcryptjs

const prisma = new PrismaClient();

export const studentSignup = async (req, res) => {
  const { email, name, password } = req.body;
  console.log("Signup request received:", { email, name });

  try {
    // Check if student already exists
    const existingStudent = await prisma.student.findUnique({
      where: { email },
    });

    if (existingStudent) {
      return res.status(400).json({ error: "Student already exists." });
    }

    // Hash the password
    const saltRounds = 10; // Recommended value
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new student with hashed password
    const newStudent = await prisma.student.create({
      data: { 
        email, 
        name, 
        password: hashedPassword  // Store hashed password
      },
    });

    res.status(201).json({ message: "Student registered successfully!" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};