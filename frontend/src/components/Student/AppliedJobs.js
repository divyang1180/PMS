import React, { useState, useEffect } from "react";
import styles from "./AppliedJobs.module.css";

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        console.log("🔍 Fetching job listings...");
        const response = await fetch("http://localhost:5000/api/jobs");
        if (!response.ok) throw new Error(`Server error: ${response.status}`);

        const data = await response.json();
        console.log("✅ Job Listings:", data);
        setJobs(data);
      } catch (err) {
        console.error("❌ Error fetching jobs:", err);
        setError("Failed to fetch job listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await fetch("http://localhost:5000/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: user.id, jobId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to apply.");
      }

      alert("✅ Application successful!");
    } catch (err) {
      console.error("❌ Error applying for job:", err);
      alert(err.message);
    }
  };

  return (
    <div className={styles.appliedJobsContainer}>
      <h2>Job Listings</h2>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}

      {!loading && !error && jobs.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.jobTable}>
            <thead>
              <tr>
                <th>Designation</th>
                <th>Company</th>
                <th>Description</th>
                <th>Min CGPA</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.designation}</td>
                  <td>{job.company.name}</td>
                  <td>{job.description}</td>
                  <td>{job.gpa}</td>
                  <td>{job.salary}</td>
                  <td>
                    <button onClick={() => handleApply(job.id)} className={styles.applyButton}>
                      Apply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p>No jobs available.</p>
      )}
    </div>
  );
};

export default AppliedJobs;
