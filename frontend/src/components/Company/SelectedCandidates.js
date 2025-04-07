import React, { useState, useEffect } from "react";
import styles from "./SelectedCandidates.module.css";

const SelectedCandidates = () => {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const company = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (company?.id) {
      fetchSelectedCandidates(company.id);
    }
  }, [company?.id]);

  const fetchSelectedCandidates = async (companyId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/selected-candidates/${companyId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      setSelectedCandidates(data);
    } catch (error) {
      console.error("❌ Error fetching selected candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.selectedCandidatesContainer}>
      <h2 className={styles.selectedCandidatesTitle}>Selected Candidates</h2>
      {loading ? (
        <div className={styles.spinner}></div>
      ) : selectedCandidates.length > 0 ? (
        <table className={styles.selectedCandidatesTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Branch</th>
              <th>Resume</th>
            </tr>
          </thead>
          <tbody>
            {selectedCandidates.map((cand) => (
              <tr key={cand.studentId}>
                <td>{cand.student?.name || "N/A"}</td>
                <td>{cand.student?.profile?.branch || "N/A"}</td>
                <td>
                  {cand.student?.profile?.filePath ? (
                    <a href={cand.student.profile.filePath} target="_blank" rel="noopener noreferrer">
                      View Resume
                    </a>
                  ) : (
                    "No Resume"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No selected candidates found.</p>
      )}
    </div>
  );
};

export default SelectedCandidates;
