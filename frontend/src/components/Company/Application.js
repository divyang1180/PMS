import React, { useState, useEffect } from "react";
import styles from "./Application.module.css";

const Application = () => {
  const [applications, setApplications] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // 👈 Loading state added

  const company = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchApplications();
  }, [company.id]);

  const fetchApplications = async () => {
    try {
      setLoading(true); // Start loading

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Session expired. Please log in again.");
        window.location.href = "/login";
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/applications/${company.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();

      const selectedResponse = await fetch(
        `http://localhost:5000/api/selected-candidates/${company.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!selectedResponse.ok) throw new Error("Error fetching selected students");

      const selectedData = await selectedResponse.json();
      const selectedStudentIds = new Set(selectedData.map((student) => student.studentId));

      const updatedSelection = {};
      data.forEach((app) => {
        updatedSelection[app.studentId] = selectedStudentIds.has(app.studentId);
      });

      setSelectedStudents(updatedSelection);
      setApplications(data);
    } catch (err) {
      console.error("❌ Error fetching applications:", err);
    } finally {
      setLoading(false); // End loading
    }
  };

  const fetchStudentProfile = async (studentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/student1/${studentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      setSelectedStudent(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("❌ Error fetching student profile:", error);
      setSelectedStudent(null);
    }
  };

  const handleSelectStudent = async (studentId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/select-student/${studentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ companyId: company.id }),
        }
      );

      if (!response.ok) throw new Error("Failed to mark student as selected");

      setSelectedStudents((prevState) => ({
        ...prevState,
        [studentId]: true,
      }));

      alert("✅ Student selected successfully!");
    } catch (error) {
      console.error("❌ Error selecting student:", error);
      alert("❌ Failed to select student.");
    }
  };

  return (
    <div className={styles.applicationContainer}>
      <h2>Applications</h2>

      {loading ? (
        <div className={styles.spinner}></div> // 👈 Show spinner
      ) : applications.length > 0 ? (
        <table className={styles.applicationTable}>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Job Applied For</th>
              <th>Application Date</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td
                  className={styles.clickable}
                  onClick={() => fetchStudentProfile(app.studentId)}
                >
                  {app.student.name}
                </td>
                <td>{app.job.designation}</td>
                <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className={styles.selectButton}
                    onClick={() => handleSelectStudent(app.studentId)}
                    disabled={selectedStudents[app.studentId]}
                  >
                    {selectedStudents[app.studentId] ? "✅ Selected" : "Select"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No applications found.</p>
      )}

      {isModalOpen && selectedStudent && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <span className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <h3>Student Profile</h3>
            <table className={styles.profileTable}>
              <tbody>
                <tr><td><strong>Name:</strong></td><td>{selectedStudent.studentName}</td></tr>
                <tr><td><strong>Email:</strong></td><td>{selectedStudent.email}</td></tr>
                <tr><td><strong>Mobile:</strong></td><td>{selectedStudent.mobileNumber}</td></tr>
                <tr><td><strong>Branch:</strong></td><td>{selectedStudent.branch}</td></tr>
                <tr><td><strong>CGPA:</strong></td><td>{selectedStudent.currentCGPA}</td></tr>
                <tr>
                  <td><strong>Resume:</strong></td>
                  <td>
                    <a href={selectedStudent.filePath} target="_blank" rel="noopener noreferrer">
                      View File
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Application;
