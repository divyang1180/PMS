import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./LoginPage.module.css"; // Import the CSS Module
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email: emailOrUsername,
        password,
        role,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "student") navigate("/student-dashboard");
      else if (user.role === "admin") navigate("/admin-dashboard");
      else if (user.role === "company") navigate("/company-dashboard");
    } catch (error) {
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles['login-container']}>
        <div className={styles['login-card']}>
          <h2>Login </h2>
          <form onSubmit={handleLogin}>
            <div className={styles['input-group']}>
              <label>Email</label>
              <input
                type="text"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={styles['input-group']}>
              <label>Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className={styles.passwordInput}
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={styles.eyeIcon}
                  role="button"
                  tabIndex={0}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            <div className={styles['input-group']}>
              <label>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="company">Company</option>
              </select>
            </div>

            <div className={styles.options}>
              <a href="/login/ForgetPassword" className={styles['forgot-password']}>
                Forgot Password?
              </a>
            </div>
            <button type="submit" className={styles['login-button']}>Login</button>

            <div className={styles['signup-section']}>
              <p>Don't have an account?</p>
              <a href="/signup" className={styles['signup-button']}>Sign Up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
