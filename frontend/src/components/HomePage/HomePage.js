import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./HomePage.module.css"; // Import CSS module
import profile from "./profile.png";
import leftLogo from "./left-logo.png";
import rightLogo from "./right-logo.png";

function HomePage() {
  return (
    <div className={styles.backgroundHomepage}>
      {/* Left & Right College Logos */}
      <img src={leftLogo} alt="Left College Logo" className={`${styles.collegeLogo} ${styles.leftCorner}`} />
      <img src={rightLogo} alt="Right College Logo" className={`${styles.collegeLogo} ${styles.rightCorner}`} />

      <motion.div 
        className={styles.homepage}
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 1 }}
      >
        <header className={styles.header}>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            Welcome to GCET Placement System
          </motion.h1>
        </header>

        <div className={styles.mainContent}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
          >
            TRAINING & PLACEMENT CELL
          </motion.h2>

          <motion.div 
            className={styles.loginCard}
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1.2 }}
          >
            <img src={profile} alt="Login Avatar" className={styles.avatar} />
            <Link to="/login">
              <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: "#0056b3" }} 
                whileTap={{ scale: 0.9 }}
                className={styles.loginButton}
              >
                Login
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default HomePage;
