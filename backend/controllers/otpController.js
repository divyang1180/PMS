import crypto from "crypto";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import bcrypt from "bcryptjs"

dotenv.config();
const prisma = new PrismaClient();

//Send OTP

export const sendOtp = async (req, res) => {
  const { email, role } = req.body;
  console.log(`OTP request received for ${email}, Role: ${role}`);

  let user;
  if (role === "student") user = await prisma.student.findUnique({ where: { email } });
  else if (role === "admin") user = await prisma.admin.findUnique({ where: { email } });
  else if (role === "company") user = await prisma.company.findUnique({ where: { email } });

  if (!user) {
    console.log(`User not found: ${email}`);
    return res.status(404).json({ error: "User not found" });
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  console.log(`Generated OTP: ${otp}`);

  try {
    await prisma.otp.create({ data: { email, otp, createdAt: new Date() } });

    console.log("Sending OTP email...");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL, pass: process.env.PASSKEY },
    });

    const info = await transporter.sendMail({
      from: `gcet <${process.env.EMAIL}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}. It expires in 5 minutes.`,
    });

    console.log("Email sent:", info.response);
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Error sending OTP: " + error.message });
  }
};


// Verify OTP
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const storedOtp = await prisma.otp.findFirst({ where: { email, otp } });

  if (!storedOtp) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  const otpAgeInMinutes = (Date.now() - new Date(storedOtp.createdAt).getTime()) / 60000;
  if (otpAgeInMinutes > 5) {
    await prisma.otp.deleteMany({ where: { email } });
    return res.status(400).json({ error: "OTP expired" });
  }

  await prisma.otp.deleteMany({ where: { email } });
  res.json({ message: "OTP verified successfully" });
}

//Reset Password 
export const resetPassword = async (req, res) => {
  const { email, newPassword, role } = req.body;

  if (!email || !newPassword || !role) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    if (role === "student") {
      await prisma.student.update({ where: { email }, data: { password: hashedPassword } });
    } else if (role === "admin") {
      await prisma.admin.update({ where: { email }, data: { password: hashedPassword } });
    } else if (role === "company") {
      await prisma.company.update({ where: { email }, data: { password: hashedPassword } });
    }

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error resetting password: " + error.message });
  }
}