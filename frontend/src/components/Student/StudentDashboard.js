
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./StudentDashboard.module.css";
import Profile from "./Profile"; // Import Profile Component
import AppliedJobs from "./AppliedJobs";
import SApplication from "./SApplication"; // Import Application Component
const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    if (tab === "logout") {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className={styles.studentDashboardContainer}>
      {/* Header Section */}
      <div className={styles.header}>
        <span className={styles.portalTitle}>Placement Portal</span>
        <div className={styles.rightSection}>
          <span className={styles.welcomeText}>Welcome, Student!</span>
          <div className={styles.studentInfo}>
            <img
              className={styles.studentLogo}
              src="https://img.icons8.com/?size=512w&id=23280&format=png"
              alt="student-logo"
            />
          </div>
        </div>
      </div>

      <div className={styles.contentArea}>
        {/* Sidebar */}
        <div className={styles.sideContainer}>
          <div
            className={`${styles.menuItem} ${activeTab === "dashboard" ? styles.active : ""}`}
            onClick={() => handleTabClick("dashboard")}
          >
            <span className={styles.menuLink}>Dashboard</span>
          </div>
          <div
            className={`${styles.menuItem} ${activeTab === "profile" ? styles.active : ""}`}
            onClick={() => handleTabClick("profile")}
          >
            <span className={styles.menuLink}>Profile</span>
          </div>
          <div
            className={`${styles.menuItem} ${activeTab === "applied-jobs" ? styles.active : ""}`}
            onClick={() => handleTabClick("applied-jobs")}
          >
            <span className={styles.menuLink}>Applied Jobs</span>
          </div>
          <div
            className={`${styles.menuItem} ${activeTab === "Application" ? styles.active : ""}`}
            onClick={() => handleTabClick("Application")}
          >
            <span className={styles.menuLink}>Application</span>
          </div>
          <div
            className={`${styles.menuItem} ${activeTab === "logout" ? styles.active : ""}`}
            onClick={() => handleTabClick("logout")}
          >
            <span className={styles.menuLink}>Logout</span>
          </div>
        </div>

            {/* Main Content Area */}
            <div className={styles.mainContent}>
          {activeTab === "dashboard" && (
            <div className={styles.container}>
              <h2 className={styles.studentDashboardTitle}>
                Training and Placement Cell
              </h2>
              <p className={styles.studentDashboardText}>
                G H Patel College Of Engineering & Technology leaves no stone
                unturned in providing support to students by giving them
                opportunities to showcase their talents in front of various
                companies. It endeavors to provide the best platform to the
                Graduates and Post-Graduates by professionally working and
                reaching out to the best Companies for them.
              </p>
              <p className={styles.studentDashboardText}>
                The growth of GCET Placements and the number of recruiters is
                conspicuous. But along with the placements, GCET has never
                forgotten to emphasize the moral qualities, ethics, and values.
              </p>
              <p className={styles.studentDashboardText}>
                Each & every year, the Training & Placement Cell upholds the
                best accomplishments with various organizations including
                start-ups, multinational companies, etc., which in turn help the
                graduates discover and grab opportunities to be a part of the
                industrial world.
              </p>
              <p className={styles.studentDashboardText}>
                GCET Training & Placement Cell facilitates the companies with a
                professional environment for conducting campus drives such as
                two fully equipped space conference halls, a seminar hall with a
                capacity of 120 students, an auditorium with a capacity of 450
                students, laboratories, and necessary classrooms with high-speed
                internet in the vicinity of the GCET campus.
              </p>

              <div className={styles.contactInfo}>
                <h3>Contact Information</h3>
                <p>
                  <strong>Dr. Hardik R Pathak</strong>
                  <br />
                  Training & Placement Officer
                  <br />
                  📞 +91 999 804 0035
                </p>
                <p>
                  <strong>Dr. Anand V Metre</strong>
                  <br />
                  Training & Placement Coordinator
                  <br />
                  📞 +91 982 448 8458
                </p>
                <p>
                  📧 <a href="mailto:tpo@gcet.ac.in">tpo@gcet.ac.in</a>
                  <br />
                  📧{" "}
                  <a href="mailto:gcet_tpo@yahoo.co.in">gcet_tpo@yahoo.co.in</a>
                </p>
              </div>
            </div>
          )}

          {activeTab === "profile" && <Profile />}  {/* ✅ Profile Component Appears Here */}
          {activeTab === "Application" && <SApplication />} {/* ✅ Application Component Appears Here */}
          {activeTab === "applied-jobs" && <AppliedJobs />}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
