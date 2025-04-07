import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded; // ✅ Store user data in `req.user`
    console.log("✅ Authenticated User:", req.user);

    next();
  } catch (error) {
    console.error("❌ Authentication error:", error.message);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

// 🔒 Middleware to verify student access
export const verifyStudent = (req, res, next) => {
  if (!req.user || req.user.role !== "student") {
    return res.status(403).json({ error: "Forbidden: Access restricted to students" });
  }
  next();
};

// 🔒 Middleware to verify company access
export const verifyCompany = (req, res, next) => {
  if (!req.user || req.user.role !== "company") {
    return res.status(403).json({ error: "Forbidden: Access restricted to companies" });
  }
  next();
};
