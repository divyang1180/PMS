import React, { useState, useEffect } from "react";
import styles from "./StudentsList.module.css";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/students`);
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      console.log("Fetched Students Data:", data); // ✅ Debugging line
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleEdit = (student) => {
    // Convert birthdate to DD/MM/YYYY format
    const formattedDate = student.profile?.birthdate
      ? new Date(student.profile.birthdate).toLocaleDateString("en-GB") // Converts to "DD/MM/YYYY"
      : "";

    setEditingStudent(student);
    setUpdatedData({
      studentName: student.profile?.studentName || "",
      enrollmentNo: student.profile?.enrollmentNo || "",
      gender: student.profile?.gender || "",
      branch: student.profile?.branch || "",
      birthdate: formattedDate,
      age: student.profile.age || "",
      passingYearSSC: student.profile?.passingYearSSC || "",
      percentageSSC: student.profile?.percentageSSC || "",
      passingYearHSC: student.profile?.passingYearHSC || "",
      percentageHSC: student.profile?.percentageHSC || "",
      passingYearD2D: student.profile?.passingYearD2D || "",
      percentageD2D: student.profile?.percentageD2D || "",
      studyGap: student.profile?.studyGap ?? "", // 🔍 Check here
      mediumSchool: student.profile?.mediumSchool || "",
      spiSem1: student.profile?.spiSem1 || "",
      spiSem2: student.profile?.spiSem2 || "",
      spiSem3: student.profile?.spiSem3 || "",
      spiSem4: student.profile?.spiSem4 || "",
      spiSem5: student.profile?.spiSem5 || "",
      currentCGPA: student.profile?.currentCGPA || "",
      percentageBE: student.profile?.percentageBE || "",
      totalBacklogs: student.profile?.totalBacklogs ?? "", // 🔍 Check here
      backlogTitles: student.profile?.backlogTitles || "",
      currentBacklogs: student.profile?.currentBacklogs ?? "", // 🔍 Check here
      currentBacklogTitles: student.profile?.currentBacklogTitles || "",
      mobileNumber: student.profile?.mobileNumber || "",
      email: student.email || "",
      address: student.profile?.address || "",
      city: student.profile?.city || "",
      pincode: student.profile?.pincode || "",
      district: student.profile?.district || "",
      fileUrl: student.profile?.filePath || "",
    });

    setIsEditModalOpen(true); // ✅ Open modal
  };

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    console.log("Updating Student Data:", updatedData); // ✅ Log data before sending

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/students/${editingStudent.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profile: updatedData }), // ✅ Ensure correct structure
        }
      );

      if (!response.ok) throw new Error("Failed to update student");

      alert("Profile updated successfully!");
      setIsEditModalOpen(false);
      fetchStudents(); // Refresh student list
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Error updating profile!");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Students List</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Enrollment No</th>
            <th>Branch</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.profile?.studentName || "-"}</td>
              <td>{student.email}</td>
              <td>{student.profile?.enrollmentNo || "-"}</td>
              <td>{student.profile?.branch || "-"}</td>
              <td>
                <button
                  className={styles.editButton}
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* ✅ Modal for Editing Student */}
      {isEditModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Edit Student</h3>
            <input
              type="text"
              name="studentName"
              value={updatedData.studentName}
              onChange={handleChange}
              placeholder="Student Name"
            />
            <input
              type="text"
              name="enrollmentNo"
              value={updatedData.enrollmentNo}
              onChange={handleChange}
              placeholder="Enrollment No"
            />
            <input
              type="text"
              name="gender"
              value={updatedData.gender}
              onChange={handleChange}
              placeholder="Gender"
            />
            <input
              type="text"
              name="branch"
              value={updatedData.branch}
              onChange={handleChange}
              placeholder="Branch"
            />
            <input
              type="text"
              value={updatedData.birthdate} // ✅ Shows as DD/MM/YYYY
              onChange={(e) =>
                setUpdatedData({ ...updatedData, birthdate: e.target.value })
              }
            />

            <input
              type="number"
              name="age"
              value={updatedData.age}
              onChange={handleChange}
              placeholder="Age"
            />
            <input
              type="number"
              name="passingYearSSC"
              value={updatedData.passingYearSSC}
              onChange={handleChange}
              placeholder="Passing Year SSC"
            />
            <input
              type="number"
              name="percentageSSC"
              value={updatedData.percentageSSC}
              onChange={handleChange}
              placeholder="Percentage SSC"
            />
            <input
              type="number"
              name="passingYearHSC"
              value={updatedData.passingYearHSC}
              onChange={handleChange}
              placeholder="Passing Year HSC"
            />
            <input
              type="number"
              name="percentageHSC"
              value={updatedData.percentageHSC}
              onChange={handleChange}
              placeholder="Percentage HSC"
            />
            <input
              type="number"
              name="passingYearD2D"
              value={updatedData.passingYearD2D}
              onChange={handleChange}
              placeholder="Passing Year D2D"
            />
            <input
              type="number"
              name="percentageD2D"
              value={updatedData.percentageD2D}
              onChange={handleChange}
              placeholder="Percentage D2D"
            />
            <input
              type="text"
              name="studyGap"
              value={updatedData.studyGap}
              onChange={handleChange}
              placeholder="Study Gap"
            />
            <input
              type="text"
              name="mediumSchool"
              value={updatedData.mediumSchool}
              onChange={handleChange}
              placeholder="Medium of School"
            />
            <input
              type="number"
              step="0.01"
              name="spiSem1"
              value={updatedData.spiSem1}
              onChange={handleChange}
              placeholder="SPI Semester 1"
            />
            <input
              type="number"
              step="0.01"
              name="spiSem2"
              value={updatedData.spiSem2}
              onChange={handleChange}
              placeholder="SPI Semester 2"
            />
            <input
              type="number"
              step="0.01"
              name="spiSem3"
              value={updatedData.spiSem3}
              onChange={handleChange}
              placeholder="SPI Semester 3"
            />
            <input
              type="number"
              step="0.01"
              name="spiSem4"
              value={updatedData.spiSem4}
              onChange={handleChange}
              placeholder="SPI Semester 4"
            />
            <input
              type="number"
              step="0.01"
              name="spiSem5"
              value={updatedData.spiSem5}
              onChange={handleChange}
              placeholder="SPI Semester 5"
            />
            <input
              type="number"
              step="0.01"
              name="currentCGPA"
              value={updatedData.currentCGPA}
              onChange={handleChange}
              placeholder="Current CGPA"
            />
            <input
              type="number"
              name="percentageBE"
              value={updatedData.percentageBE}
              onChange={handleChange}
              placeholder="BE Percentage"
            />
            <input
              type="number"
              name="totalBacklogs"
              value={updatedData.totalBacklogs}
              onChange={handleChange}
              placeholder="Total Backlogs"
            />
            <input
              type="text"
              name="backlogTitles"
              value={updatedData.backlogTitles}
              onChange={handleChange}
              placeholder="Backlog Titles"
            />
            <input
              type="number"
              name="currentBacklogs"
              value={updatedData.currentBacklogs}
              onChange={handleChange}
              placeholder="Current Backlogs"
            />
            <input
              type="text"
              name="currentBacklogTitles"
              value={updatedData.currentBacklogTitles}
              onChange={handleChange}
              placeholder="Current Backlog Titles"
            />
            <input
              type="tel"
              name="mobileNumber"
              value={updatedData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number"
            />
            <input
              type="email"
              name="email"
              value={updatedData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="address"
              value={updatedData.address}
              onChange={handleChange}
              placeholder="Address"
            />
            <input
              type="text"
              name="city"
              value={updatedData.city}
              onChange={handleChange}
              placeholder="City"
            />
            <input
              type="text"
              name="pincode"
              value={updatedData.pincode}
              onChange={handleChange}
              placeholder="Pincode"
            />
            <input
              type="text"
              name="district"
              value={updatedData.district}
              onChange={handleChange}
              placeholder="District"
            />
            <input
              type="text"
              name="fileUrl"
              value={updatedData.fileUrl}
              onChange={handleChange}
              placeholder="File URL"
            />

            <div className={styles.modalButtons}>
              <button className={styles.saveButton} onClick={handleUpdate}>
                Save
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsList;
