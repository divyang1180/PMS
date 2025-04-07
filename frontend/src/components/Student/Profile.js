import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    enrollmentNo: "",
    gender: "",
    branch: "",
    birthdate: "",
    age: "",
    passingYearSSC: "",
    percentageSSC: "",
    passingYearHSC: "",
    percentageHSC: "",
    passingYearD2D: "",
    percentageD2D: "",
    studyGap: "",
    mediumSchool: "",
    spiSem1: "",
    spiSem2: "",
    spiSem3: "",
    spiSem4: "",
    spiSem5: "",
    currentCGPA: "",
    percentageBE: "",
    totalBacklogs: "",
    backlogTitles: "",
    currentBacklogs: "",
    currentBacklogTitles: "",
    mobileNumber: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    district: "",
    file: null, // File object
    fileUrl: "", // Cloudinary URL
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found, redirecting to login...");
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setCurrentUserId(decoded.id);
      localStorage.setItem("userId", decoded.id);
      fetchStudentData(decoded.id, token);
    } catch (err) {
      console.error("Error decoding token:", err);
      setLoading(false);
    }
  }, []);

  const fetchStudentData = async (userId, token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/student/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data) {
        setFormData((prevData) => ({
          ...prevData,
          ...response.data,
          file: null, // Reset file input
        }));
        setSubmitted(true);
      } else {
        console.warn("No student data found.");
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

   
    if (name === "percentageSSC" && (value < 0 || value > 100)) return; // prevent values over 100
    if (name === "percentageHSC" && (value < 0 || value > 100)) return; // prevent values over 100
    if (name === "percentageD2D" && (value < 0 || value > 100)) return; // prevent values over 100
    if (name === "totalBacklogs" && value < 0) return; // prevent negative values
    if (name === "currentBacklogs" && value < 0) return; // prevent negative values
   
    if (name === "mobileNumber" && value.length > 10) return; // prevent values over 10 digits

    if (name === "spiSem1" && (value < 0 || value > 10)) return; // prevent values over 10
    if (name === "spiSem2" && (value < 0 || value > 10)) return; // prevent values over 10
    if (name === "spiSem3" && (value < 0 || value > 10)) return; // prevent values over 10
    if (name === "spiSem4" && (value < 0 || value > 10)) return; // prevent values over 10
    if (name === "spiSem5" && (value < 0 || value > 10)) return; // prevent values over 10       
    if (name === "percentageBE" && (value < 0 || value > 100)) return; // prevent values over 100
    if (name === "currentCGPA" && (value < 0 || value > 10)) return; // prevent values over 10
    if (name === "backlogTitles" && value.length > 100) return; // prevent values over 100 characters
    if (name === "currentBacklogTitles" && value.length > 100) return; // prevent values over 100 characters
    if (name === "address" && value.length > 200) return; // prevent values over 200 characters
    if (name === "city" && value.length > 50) return; // prevent values over 50 characters
    if (name === "district" && value.length > 50) return; // prevent values over 50 characters  
    

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication required.");
      return;
    }

    let studentId;
    try {
      const decoded = jwtDecode(token);
      studentId = decoded.id;
    } catch (err) {
      console.error("Error decoding token:", err);
      return;
    }

    let uploadedFileUrl = formData.fileUrl;

    if (formData.file) {
      // ✅ Upload file to Cloudinary
      const fileData = new FormData();
      fileData.append("file", formData.file);
      fileData.append("upload_preset", "ml_default"); // Ensure preset is correct

      console.log("Uploading file:", formData.file);

      try {
        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dhx6meatb/upload", // ✅ Corrected URL
          fileData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        uploadedFileUrl = uploadResponse.data.secure_url; // ✅ Get file URL
        console.log("✅ File uploaded successfully:", uploadedFileUrl);
      } catch (uploadError) {
        console.error(
          "❌ File upload error:",
          uploadError.response?.data || uploadError
        );
        alert("Failed to upload file. Please try again.");
        return; // ❌ Stop submission if file upload fails
      }
    }

    // ✅ Prepare Data for Submission
    const { file, ...formDataWithoutFile } = formData; // Remove file field
    const formDataToSend = {
      ...formDataWithoutFile,
      fileUrl: uploadedFileUrl,
      studentId,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/student/create`,
        formDataToSend,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("✅ Server Response:", response.data);
      alert("Profile created successfully!");
      setSubmitted(true);
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert(error.response?.data?.error || "Something went wrong!");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      {!submitted && (
        <>
          <h2>Instructions for Form Submission</h2>
          <p>
            <strong>Accuracy:</strong> Please ensure all information provided in
            the form is accurate and without any discrepancies.
            <br />
            <strong>Contact:</strong> For any queries or clarifications, please
            reach out to the branch Student Coordinator.
            <br />
            <strong>Deadline:</strong> Submission of forms after the deadline
            will not be accepted under any circumstances.
            <br />
            <strong>Precision:</strong> Do not round off your percentage or SPI
            (Semester Performance Index). For example, if your SPI is 7.68,
            please enter it exactly as 7.68 without rounding off.
          </p>

          <h2>Student Registration Form</h2>
        </>
      )}

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Student Name (According to 12th marksheet) </label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Enrollment No.</label>
            <input
              type="text"
              name="enrollmentNo"
              value={formData.enrollmentNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="form-group">
            <label>Branch Name</label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Birthdate</label>
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              max="30"
              min="16"
            />
          </div>

          <div className="form-group">
            <label>Passing Year SSC (10th) [YYYY] </label>
            <input
              type="number"
              name="passingYearSSC"
              value={formData.passingYearSSC}
              onChange={handleChange}
              required
              

            />
          </div>

          <div className="form-group">
            <label>Percentage SSC </label>
            <input
              type="number"
              name="percentageSSC"
              step="0.01"
              value={formData.percentageSSC}
              onChange={handleChange}
              required
              max="100"
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Passing Year HSC (if you are D2D Student write 0)</label>
            <input
              type="text"
              name="passingYearHSC"
              value={formData.passingYearHSC}
              onChange={handleChange}
              required

            />
          </div>

          <div className="form-group">
            <label>Percentage HSC (if you are D2D Student write 0)</label>
            <input
              type="number"
              name="percentageHSC"
              value={formData.percentageHSC}
              onChange={handleChange}
              required
              max="100"
              min="0"
            />
          </div>
          <div className="form-group">
            <label>Passing Year D2D (if not D2D than enter 0)</label>
            <input
              type="text"
              name="passingYearD2D"
              value={formData.passingYearD2D}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Percentage D2D (if not D2D than enter 0)</label>
            <input
              type="text"
              name="percentageD2D"
              value={formData.percentageD2D}
              onChange={handleChange}
              required
              max="100"
              min="0"
            />
          </div>
          <div className="form-group">
            <label>
              Any gap between studies (i.e for JEE preparation or anything else)
              (Ex :- "1 year -JEE preparation") (None :- 0)
            </label>
            <input
              type="text"
              name="studyGap"
              value={formData.studyGap}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Medium School</label>
            <select
              name="mediumSchool"
              value={formData.mediumSchool}
              onChange={handleChange}
              required
            >
              <option value="">Select Medium</option>
              <option value="Gujarati">Gujarati</option>
              <option value="English">English</option>
            </select>
          </div>

          <div className="form-group">
            <label>SPI (Semester Performance Index)</label>
            <input
              type="text"
              name="spiSem1"
              placeholder="SPI Sem 1 (updated after clearing of backlog)(if D2D enter NA)"
              value={formData.spiSem1}
              onChange={handleChange}
              required
              max="10"
              min="0"
            />
            <input
              type="text"
              name="spiSem2"
              placeholder="SPI Sem 2 (updated after clearing of backlog)(if D2D enter NA)"
              value={formData.spiSem2}
              onChange={handleChange}
              required
              max="10"
              min="0"
            />

            <input
              type="text"
              name="spiSem3"
              placeholder="SPI Sem 3 (updated after clearing of backlog)"
              value={formData.spiSem3}
              onChange={handleChange}
              required
              max="10"
              min="0"
            />
            <input
              type="text"
              name="spiSem4"
              placeholder="SPI Sem 4 (updated after clearing of backlog)"
              value={formData.spiSem4}
              onChange={handleChange}
              required
              max="10"
              min="0"
            />
            <input
              type="text"
              name="spiSem5"
              placeholder="SPI Sem 5 (updated after clearing of backlog)"
              value={formData.spiSem5}
              onChange={handleChange}
              required
              max="10"
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Current CGPA</label>
            <input
              type="number"
              name="currentCGPA"
              value={formData.currentCGPA}
              onChange={handleChange}
              required
              max="10"
              min="0"
            />
          </div>
          <div className="form-group">
            <label>Percentage BE = (latest CPI - 0.5)*10</label>
            <input
              type="number"
              name="percentageBE"
              value={formData.percentageBE}
              onChange={handleChange}
              required
              max="100"
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Total Backlogs (both current as well as cleared)</label>
            <input
              type="number"
              name="totalBacklogs"
              value={formData.totalBacklogs}
              onChange={handleChange}
              required
              max="10"
              min="0"
            />
          </div>

          <div className="form-group">
            <label>
              Title of Total Backlog (name of subjects having backlog both
              current as well as cleared) (None:- 0)
            </label>
            <input
              type="text"
              name="backlogTitles"
              value={formData.backlogTitles}
              onChange={handleChange}
              required
              max="100"
              min="0"
            />
          </div>
          <div className="form-group">
            <label>
              Total number of current backlog (uncleared backlog only)(None:- 0)
            </label>
            <input
              type="text"
              name="currentBacklogs"
              value={formData.currentBacklogs}
              onChange={handleChange}
              required
              max="100"
              min="0"
            />
          </div>
          <div className="form-group">
            <label>
              Title of Current backlog (name of subject having backlog which is
              uncleared)(None:- 0)
            </label>
            <input
              type="text"
              name="currentBacklogTitles"
              value={formData.currentBacklogTitles}
              onChange={handleChange}
              required
              max="100"
              min="0"
            />
          </div>

          <div className="form-group">
            <label>
              Mobile Number (Available everytime and whatsapp activated) (avoid
              +91 or 0 or spaces)
            </label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
            />
          </div>

          <div className="form-group">
            <label>Email Address (check twice) </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required

            />
          </div>

          <div className="form-group">
            <label>Permanent Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="4"
              cols="50"
              placeholder="Enter your permanent address here..."
              style={{ resize: "none" }} // Prevent resizing
            ></textarea>
          </div>

          <div className="form-group">
            <label>Permanent City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required

            />
          </div>

          <div className="form-group">
            <label>Permanent Pincode</label>
            <input
              type="Number"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              pattern="[0-9]{6}"
              maxLength="6"
              minLength="6"

            />
          </div>

          <div className="form-group">
            <label>Permanent District</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required

            />
          </div>

          <div className="form-group">
            <label>
              Upload Resume (Note: THE FILE NAME MUST BE ENROLLMENT NUMBER_VF.
              Ex: 12202050501001_VF) MAXIMUM FILE SIZE - 10MB
            </label>
            <input
              type="file"
              name="file"
              accept=".pdf,.doc,.docx,.jpg,.png" // Restrict file types if needed
              onChange={(e) => {
                const file = e.target.files[0];

                if (!file) {
                  alert("Please select a file.");
                  return;
                }

                // ✅ Validate file size (Max: 10MB)
                const maxSize = 10 * 1024 * 1024; // 10MB in bytes
                if (file.size > maxSize) {
                  alert(
                    "File size exceeds 10MB. Please upload a smaller file."
                  );
                  e.target.value = ""; // Reset input
                  return;
                }

                // // ✅ Validate file name format
                const fileNameRegex = /^\d{14}_VF\.[a-zA-Z0-9]+$/; // Example: 12202050501001_VF.pdf
                if (!fileNameRegex.test(file.name)) {
                  alert(
                    "Invalid file name format. Use ENROLLMENT_NUMBER_VF (e.g., 12202050501001_VF)."
                  );
                  e.target.value = ""; // Reset input
                  return;
                }

                // ✅ Update state if all validations pass
                handleChange(e);
              }}
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="submitted-data">
          <h2>Submitted Details</h2>

          <p>
            <strong>Student Name.:</strong> {formData.studentName}
          </p>
          <p>
            <strong>Enrollment No.:</strong> {formData.enrollmentNo}
          </p>
          <p>
            <strong>Gender:</strong> {formData.gender}
          </p>
          <p>
            <strong>Branch Name:</strong> {formData.branch}
          </p>
          <p>
            <strong>Birthdate:</strong>{" "}
            {formData.birthdate
              ? new Date(formData.birthdate).toLocaleDateString("en-GB")
              : "Not provided"}
          </p>
          <p>
            <strong>Age:</strong> {formData.age}
          </p>
          <p>
            <strong>Passing Year SSC (10th):</strong> {formData.passingYearSSC}
          </p>
          <p>
            <strong>Percentage SSC:</strong> {formData.percentageSSC}%
          </p>
          <p>
            <strong>Passing Year HSC (12th):</strong> {formData.passingYearHSC}
          </p>
          <p>
            <strong>Percentage HSC:</strong> {formData.percentageHSC}%
          </p>
          <p>
            <strong>passing Year D2D:</strong> {formData.passingYearD2D}
          </p>
          <p>
            <strong>Percentage D2D:</strong> {formData.percentageD2D}%
          </p>
          <p>
            <strong>Study Gap:</strong> {formData.studyGap}
          </p>
          <p>
            <strong>Medium School:</strong> {formData.mediumSchool}
          </p>
          <p>
            <strong>SPI Sem 1:</strong> {formData.spiSem1}
          </p>
          <p>
            <strong>SPI Sem 2:</strong> {formData.spiSem2}
          </p>
          <p>
            <strong>SPI Sem 3:</strong> {formData.spiSem3}
          </p>
          <p>
            <strong>SPI Sem 4:</strong> {formData.spiSem4}
          </p>
          <p>
            <strong>SPI Sem 5:</strong> {formData.spiSem5}
          </p>
          <p>
            <strong>Current CGPA:</strong> {formData.currentCGPA}
          </p>
          <p>
            <strong>Percentage BE:</strong> {formData.percentageBE}%
          </p>

          <p>
            <strong>Total Backlogs:</strong> {formData.totalBacklogs}
          </p>
          <p>
            <strong>Backlog Titles:</strong> {formData.backlogTitles}
          </p>
          <p>
            <strong>Current Backlogs:</strong> {formData.currentBacklogs}
          </p>
          <p>
            <strong>Current Backlog Titles:</strong>{" "}
            {formData.currentBacklogTitles}
          </p>
          <p>
            <strong>Mobile Number:</strong> {formData.mobileNumber}
          </p>
          <p>
            <strong>Email Address:</strong> {formData.email}
          </p>
          <p>
            <strong>Permanent Address:</strong> {formData.address}
          </p>
          <p>
            <strong>Permanent City:</strong> {formData.city}
          </p>
          <p>
            <strong>Permanent Pincode:</strong> {formData.pincode}
          </p>
          <p>
            <strong>Permanent District:</strong> {formData.district}
          </p>
          <p>
            <strong>File:</strong>{" "}
            {formData.filePath ? (
              <a
                href={formData.filePath}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <button
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  📥 Download File
                </button>
              </a>
            ) : (
              "No file uploaded"
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
