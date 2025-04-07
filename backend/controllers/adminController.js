import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await prisma.admin.findUnique({
            where: { email },
        });

        if (!admin || admin.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate a token
        const token = jwt.sign({ id: admin.id, role: "admin" }, "your_secret_key", { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error in /admin/login:", error);
        res.status(500).json({ message: "Something went wrong." });
    }
};
