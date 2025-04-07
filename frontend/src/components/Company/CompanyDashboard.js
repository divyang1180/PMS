import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CompanyDashboard.module.css";
import JobPostings from "./JobPosting";
import Application from "./Application";
import SelectedCandidates from "./SelectedCandidates";

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [counts, setCounts] = useState({
    jobPostings: 0,
    applications: 0,
    selectedCandidates: 0,
  });

  const company = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    if (tab === "logout") {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    const fetchCounts = async () => {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      try {
        const [jobRes, appRes, selRes] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_BASE_URL}/api/counts/job-postings/${company.id}`, { headers }),
          fetch(`${process.env.REACT_APP_API_BASE_URL}/api/counts/applications/${company.id}`, { headers }),
          fetch(`${process.env.REACT_APP_API_BASE_URL}/api/counts/selected-candidates/${company.id}`, { headers }),
        ]);
        

        const [jobData, appData, selData] = await Promise.all([
          jobRes.json(),
          appRes.json(),
          selRes.json(),
        ]);

        setCounts({
          jobPostings: jobData.count || 0,
          applications: appData.count || 0,
          selectedCandidates: selData.count || 0,
        });
      } catch (error) {
        console.error("❌ Error fetching counts:", error);
      }
    };

    if (company?.id) {
      fetchCounts();
    }
  }, [company?.id]);

  return (
    <div className={styles.companyDashboardContainer}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.portalTitle}>Placement Portal</span>
        <div className={styles.rightSection}>
          <span className={styles.welcomeText}>Welcome, Company!</span>
          <div className={styles.companyInfo}>
            <img
              className={styles.companyLogo}
              src="https://img.icons8.com/?size=512w&id=23280&format=png"
              alt="company-logo"
            />
            <span className={styles.companyName}></span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className={styles.contentArea}>
        <div className={styles.sideContainer}>
          {["dashboard", "job-postings", "applications", "selected-candidates"].map((tab) => (
            <div
              key={tab}
              className={`${styles.menuItem} ${activeTab === tab ? styles.active : ""}`}
              onClick={() => handleTabClick(tab)}
            >
              <Link to="#" className={styles.menuLink}>
                {tab.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              </Link>
            </div>
          ))}
          <div className={`${styles.menuItem} ${styles.logout}`} onClick={() => handleTabClick("logout")}>
            <span className={styles.menuLink}>Logout</span>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {activeTab === "dashboard" && (
            <div className={styles.container}>
              <h2 className={styles.companyDashboardTitle}>Company Dashboard</h2>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <h3>Job Posted</h3>
                  <p>{counts.jobPostings}</p>
                </div>
                <div className={styles.statCard}>
                  <h3>Applications</h3>
                  <p>{counts.applications}</p>
                </div>
                <div className={styles.statCard}>
                  <h3>Selected Candidates</h3>
                  <p>{counts.selectedCandidates}</p>
                </div>
              </div>
              <p className={styles.helperText}>Post jobs, track applications, and manage selected students.</p>
            </div>
          )}
          {activeTab === "job-postings" && <JobPostings />}
          {activeTab === "applications" && <Application />}
          {activeTab === "selected-candidates" && <SelectedCandidates />}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
