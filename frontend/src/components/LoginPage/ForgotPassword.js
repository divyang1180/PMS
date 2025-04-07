import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ForgotPassword.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [role, setRole] = useState("student");
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false); // ✅ NEW STATE

  const sendOtp = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/otp/send-otp`, { email, role });
      setStep(2);
    } catch (error) {
      alert("Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/otp/verify-otp`, {
        email,
        otp,
        role,
      });
      setStep(3);
    } catch (error) {
      alert("Invalid OTP");
    }
  };

  const resetPassword = async () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      alert(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/otp/reset-password`, {
        email,
        newPassword,
        role,
      });
      alert("Password reset successfully");
      setStep(1);
    } catch (error) {
      alert("Error resetting password");
    }
  };

  return (
    <motion.div
      className={styles.forgotPasswordContainer}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Password Recovery
      </motion.h2>

      <motion.div
        className={styles.roleSelection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="company">Company</option>
        </select>
      </motion.div>

      <AnimatePresence>
        {step === 1 && (
          <motion.div
            className={styles.stepContainer}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendOtp}
              className={styles.actionBtn}
            >
              Send OTP
            </motion.button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            className={styles.stepContainer}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={verifyOtp}
              className={styles.actionBtn}
            >
              Verify OTP
            </motion.button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            className={styles.stepContainer}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.passwordInput}
              />
              <span
                className={styles.eyeIcon}
                onClick={() => setShowPassword((prev) => !prev)}
                role="button"
                tabIndex={0}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetPassword}
              className={styles.actionBtn}
            >
              Reset Password
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ForgotPassword;
