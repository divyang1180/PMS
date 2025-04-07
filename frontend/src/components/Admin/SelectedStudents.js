import React, { useState, useEffect } from "react";
import styles from "./SelectedStudents.module.css";

const SelectedStudents = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 Add loading state

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/selected-students/selected`)
      .then((res) => res.json())
      .then((data) => setSelectedStudents(data))
      .catch((err) =>
        console.error("Error fetching selected students:", err)
      )
      .finally(() => setLoading(false)); // 👈 End loading
  }, []);

  return (
    <div className={styles.selectedContainer}>
      <h2>Selected Students</h2>
      {loading ? (
        <div className={styles.spinner}></div> // 👈 Show spinner
      ) : selectedStudents.length > 0 ? (
        <table className={styles.selectedTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Branch</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {selectedStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.branch}</td>
                <td>{student.companyName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students selected yet.</p>
      )}
    </div>
  );
};

export default SelectedStudents;
