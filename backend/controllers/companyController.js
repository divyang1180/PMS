import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";  // Import bcryptjs

const prisma = new PrismaClient();

export const companySignup = async (req, res) => {
  const { email, password, name ,phone ,website } = req.body;

  try {
    // Check if the company already exists
    const existingCompany = await prisma.company.findUnique({
      where: { email },
    });

    if (existingCompany) {
      return res.status(400).json({ error: "Company already exists!" });
    }

    // Hash the password before storing in the database
    const saltRounds = 10;  // Recommended number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Proceed with registration
    const newCompany = await prisma.company.create({
      data: { 
        email, 
        password: hashedPassword,  // Store the hashed password
        name,
        phone,
        website,

      },
    });

    res.status(201).json({ message: "Company registered successfully!" });
  } catch (err) {
    console.error("Signup Error:", err);

    // Check if the error is a unique constraint violation (e.g., duplicate email)
    if (err.code === "P2002") {
      return res.status(400).json({ error: "Company already exists!" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};
