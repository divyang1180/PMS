import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./EditCompanyModal.module.css";

const EditCompanyModal = ({ company, onClose, refresh }) => {
  const [name, setName] = useState(company.name);
  const [email, setEmail] = useState(company.email);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (company?.id) {
      fetchJobs(company.id);
    }
  }, [company]);

  const fetchJobs = async (companyId) => {
    try {
      console.log("Fetching jobs for companyId:", companyId);
      // ✅ Corrected route
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/jobs/company/${companyId}`);
      console.log("Jobs Data:", response.data);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error.response?.data || error.message);
    }
  };

  const handleJobChange = (index, field, value) => {
    const updatedJobs = [...jobs];
    updatedJobs[index][field] = value;
    setJobs(updatedJobs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/companies/${company.id}`, {
        name,
        email,
      });

      for (const job of jobs) {
        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/companies/job/${job.id}`, job);

      }

      refresh();
      onClose();
    } catch (error) {
      console.error("Error updating company or jobs:", error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Edit Company</h2>
        <form onSubmit={handleSubmit}>
          <label>Company Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <h3>Jobs</h3>
          {jobs.length > 0 ? (
            <ul>
              {jobs.map((job, index) => (
                <li key={job.id}>
                  <label>Designation:</label>
                  <input
                    type="text"
                    value={job.designation}
                    onChange={(e) => handleJobChange(index, "designation", e.target.value)}
                  />

                  <label>Description:</label>
                  <textarea
                    value={job.description || ""}
                    onChange={(e) => handleJobChange(index, "description", e.target.value)}
                  />

                  <label>Experience (years):</label>
                  <input
                    type="number"
                    value={job.experience || ""}
                    onChange={(e) => handleJobChange(index, "experience", parseInt(e.target.value))}
                  />

                  <label>Percentage (%):</label>
                  <input
                    type="number"
                    value={job.percentage || ""}
                    onChange={(e) => handleJobChange(index, "percentage", parseFloat(e.target.value))}
                  />

                  <label>GPA:</label>
                  <input
                    type="number"
                    value={job.gpa || ""}
                    onChange={(e) => handleJobChange(index, "gpa", parseFloat(e.target.value))}
                  />

                  <label>Seats:</label>
                  <input
                    type="number"
                    value={job.seats || ""}
                    onChange={(e) => handleJobChange(index, "seats", parseInt(e.target.value))}
                  />

                  <label>Salary (LPA):</label>
                  <input
                    type="text"
                    value={job.salary || ""}
                    onChange={(e) => handleJobChange(index, "salary", e.target.value)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No jobs available</p>
          )}

          <div className={styles.buttons}>
            <button type="submit" className={styles.saveBtn}>Save</button>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCompanyModal;
