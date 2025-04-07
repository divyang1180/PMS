import React, { useState } from "react";
import axios from "axios";
import styles from "./StudentSignUp.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👁️ import icons

const StudentSignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [showPassword, setShowPassword] = useState(false);       // 👁️ new state
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 👁️ new state
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      alert(
        "Password must be at least 8 characters and include one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/signup/send-otp", {
        email: formData.email,
      });
      alert("OTP sent to your email.");
      setStep(2);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/signup/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        otp: formData.otp,
      });
      alert("Student registered successfully!");
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.error || "Failed to register.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["student-signup-container"]}>
      <div className={styles["signup-card"]}>
        <h2>Student Sign-Up</h2>

        <form onSubmit={step === 1 ? handleSendOtp : handleVerifyAndRegister}>
          {step === 1 && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              {/* Password field with toggle icon */}
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className={styles.eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              {/* Confirm Password field with toggle icon */}
              <div className={styles.passwordWrapper}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span
                  className={styles.eyeIcon}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </>
          )}

          {step === 2 && (
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
            />
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : step === 1 ? "Send OTP" : "Verify & Register"}
          </button>
        </form>

        <p className={styles["login-link"]}>
          Already have an account? <a href="/login">Login here</a>
        </p>

        {step === 2 && (
          <button onClick={() => setStep(1)} className={styles["back-btn"]}>
            Go Back
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentSignUp;
