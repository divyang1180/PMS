import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

// Send OTP for sign-up
export const sendOtpForSignup = async (req, res) => {
  const { email } = req.body;

  const existingStudent = await prisma.student.findUnique({ where: { email } });
  if (existingStudent) {
    return res.status(400).json({ error: "Email is already registered" });
  }

  const otp = crypto.randomInt(100000, 999999).toString();

  try {
    await prisma.otp.create({
      data: { email, otp, createdAt: new Date() },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSKEY,
      },
    });

    await transporter.sendMail({
      from: `GCET <${process.env.EMAIL}>`,
      to: email,
      subject: "Verify your Email - GCET Placement Portal",
      text: `Welcome to GCET!\n\nYour OTP is: ${otp}. It is valid for 5 minutes.`,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send OTP: " + err.message });
  }
};

// Verify OTP and register student
export const verifyOtpAndRegister = async (req, res) => {
  const { name, email, password, otp } = req.body;

  const storedOtp = await prisma.otp.findFirst({ where: { email, otp } });
  if (!storedOtp) return res.status(400).json({ error: "Invalid OTP" });

  const age = (Date.now() - new Date(storedOtp.createdAt).getTime()) / 60000;
  if (age > 5) {
    await prisma.otp.deleteMany({ where: { email } });
    return res.status(400).json({ error: "OTP expired" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.student.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await prisma.otp.deleteMany({ where: { email } });

    res.json({ message: "Student registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering student: " + error.message });
  }
};
