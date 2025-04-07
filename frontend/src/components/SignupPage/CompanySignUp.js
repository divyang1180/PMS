import React, { useState } from "react";
import axios from "axios";
import styles from "./CompanySignUp.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👁️ import icons

const CompanySignUp = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);           // 👁️ toggle state
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 👁️ toggle state

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

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
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/company/signup/send-otp`, {
        email: formData.email,
      });
      alert("OTP sent to your email");
      setStep(2);
    } catch (error) {
      alert(error.response?.data?.error || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/company/signup/signup`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        password: formData.password,
        otp: formData.otp,
      });
      alert("Company registered successfully!");
      window.location.href = "/login";
    } catch (error) {
      alert(error.response?.data?.error || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["company-signup-page"]}>
      <div className={styles["company-signup-container"]}>
        <h2>Company Sign-Up</h2>
        <form onSubmit={step === 1 ? handleSendOtp : handleRegister}>
          {step === 1 && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Company Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="url"
                name="website"
                placeholder="Website"
                value={formData.website}
                onChange={handleChange}
                required
              />

              {/* Password with toggle */}
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

              {/* Confirm Password with toggle */}
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

          {step === 2 && (
            <button type="button" onClick={() => setStep(1)} className={styles["back-btn"]}>
              Go Back
            </button>
          )}
        </form>

        <p className={styles["login-link"]}>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default CompanySignUp;
