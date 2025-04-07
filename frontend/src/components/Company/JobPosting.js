import React, { useState, useEffect } from "react";
import styles from "./JobPosting.module.css"; // Updated CSS module

const JobPostings = () => {
  const [formData, setFormData] = useState({
    designation: "",
    description: "",
    experience: "",
    percentage: "",
    gpa: "",
    seats: "",
    salary: "",
  });

  const [companyId, setCompanyId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.role === "company") {
      setCompanyId(storedUser.id);
    } else {
      alert("Company ID not found. Please log in again.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: ["experience", "percentage", "gpa", "seats"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyId) {
      alert("Company ID not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/jobs/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, companyId }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Job posted successfully!");
        setFormData({
          designation: "",
          description: "",
          experience: "",
          percentage: "",
          gpa: "",
          seats: "",
          salary: "",
        });
      } else {
        alert(result.error || "Failed to post job.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formBox}>
        <h2 className={styles.formTitle}>Add New Job</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formContent}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.formTextarea}
                rows="3"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Experience (years)</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>12th Percentage</label>
              <input
                type="number"
                name="percentage"
                value={formData.percentage}
                onChange={handleChange}
                className={styles.formInput}
                step="0.01"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Graduation GPA</label>
              <input
                type="number"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                className={styles.formInput}
                step="0.01"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>No of Seats</label>
              <input
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Salary Package</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className={styles.formInput}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobPostings;
