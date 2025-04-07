import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // Keep bcrypt for student & company
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const login = async (req, res) => {
  console.log("Login request received:", req.body);

  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    let user;

    if (role === "student") {
      user = await prisma.student.findUnique({ where: { email } });
    } else if (role === "company") {
      user = await prisma.company.findUnique({ where: { email } });
    } else if (role === "admin") {
      user = await prisma.admin.findUnique({ where: { email } }); // ✅ Check in admin table
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let passwordMatch = false;

    if (role === "admin") {
      // ✅ Admin passwords are stored in plain text (No hashing)
      passwordMatch = user.password === password;
    } else {
      // ✅ Students & Companies use hashed passwords
      passwordMatch = await bcrypt.compare(password, user.password);
    }

    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: user.id, role }, JWT_SECRET, { expiresIn: "2h" });

    console.log("Login successful for:", email);

    // ✅ Return token and user info
    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, email: user.email, role }
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Login error: " + error.message });
  }
};
