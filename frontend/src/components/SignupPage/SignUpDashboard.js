import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./SignUpDashboard.module.css";  // Import the CSS Module

const SignUpDashboard = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className={styles["signup-dashboard"]}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className={styles["glass-container"]}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className={styles["dashboard-heading"]}>Sign Up As</h1>
        <div className={styles["dashboard-buttons"]}>
          <motion.button
            className={`${styles["dashboard-button"]} ${styles["student"]}`}
            onClick={() => navigate("/signup/student")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Student
          </motion.button>
          <motion.button
            className={`${styles["dashboard-button"]} ${styles["company"]}`}
            onClick={() => navigate("/signup/company")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Company
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SignUpDashboard;
