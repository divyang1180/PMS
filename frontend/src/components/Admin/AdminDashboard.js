import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import StudentsList from "./StudentsList"; 
import CompaniesList from "./CompaniesList"; 
import SelectedStudents from "./SelectedStudents";
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [counts, setCounts] = useState({ companies: 0, students: 0, selected: 0 });
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    if (tab === 'logout') {
      localStorage.removeItem('token');
      navigate('/login');
    } else {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    // Fetch all counts from /api/counts
    fetch("http://localhost:5000/api/counts")
      .then(res => res.json())
      .then(data => setCounts(data))
      .catch(err => console.error("Error fetching counts:", err));
  }, []);

  return (
    <div className={styles.adminDashboardContainer}>
      <div className={styles.header}>
        <span className={styles.portalTitle}>Placement Portal</span>
        <div className={styles.rightSection}>
          <span className={styles.welcomeText}>Welcome!</span>
          <div className={styles.adminInfo}>
            <img
              className={styles.adminLogo}
              src="https://img.icons8.com/?size=512w&id=23280&format=png"
              alt="admin-logo"
            />
          </div>
        </div>
      </div>

      <div className={styles.contentArea}>
        <div className={styles.sideContainer}>
          {["dashboard", "students", "companies", "selected-students", "logout"].map(tab => (
            <div
              key={tab}
              className={`${styles.menuItem} ${activeTab === tab ? styles.active : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              <span className={styles.menuLink}>
                {tab.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.mainContent}>
          {activeTab === 'dashboard' && (
            <div className={styles.container}>
              <h2 className={styles.adminDashboard}>Admin Dashboard</h2>
              <div className={styles.cardGrid}>
                <div className={styles.card}>
                  <h3>Companies</h3>
                  <p>{counts.companies}</p>
                </div>
                <div className={styles.card}>
                  <h3>Students</h3>
                  <p>{counts.students}</p>
                </div>
                <div className={styles.card}>
                  <h3>Selected Students</h3>
                  <p>{counts.selected}</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === "students" && <StudentsList />}
          {activeTab === "companies" && <CompaniesList />}
          {activeTab === 'selected-students' && <SelectedStudents />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
