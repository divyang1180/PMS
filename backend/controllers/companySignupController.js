import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

// sendOtpForCompany
export const sendOtpForCompany = async (req, res) => {
    const { email } = req.body;
    const company = await prisma.company.findUnique({ where: { email } });
    if (company) return res.status(400).json({ error: "Email already registered" });
  
    const otp = crypto.randomInt(100000, 999999).toString();
    await prisma.otp.create({ data: { email, otp, createdAt: new Date() } });
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL, pass: process.env.PASSKEY },
    });
  
    await transporter.sendMail({
      from: `gcet <${process.env.EMAIL}>`,
      to: email,
      subject: "Company OTP Verification",
      text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
    });
  
    res.json({ message: "OTP sent successfully" });
  };
  
  // signupCompany
  export const signupCompany = async (req, res) => {
    const { name, email, phone, website, password, otp } = req.body;
    const storedOtp = await prisma.otp.findFirst({ where: { email, otp } });
  
    if (!storedOtp) return res.status(400).json({ error: "Invalid OTP" });
    const ageInMin = (Date.now() - new Date(storedOtp.createdAt).getTime()) / 60000;
    if (ageInMin > 5) return res.status(400).json({ error: "OTP expired" });
  
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.company.create({
      data: { name, email, phone, website, password: hashedPassword },
    });
  
    await prisma.otp.deleteMany({ where: { email } });
    res.json({ message: "Company registered successfully" });
  };
  