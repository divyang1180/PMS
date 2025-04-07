import React, { useState, useEffect } from "react";

const SApplication = () => {
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [loading, setLoading] = useState(true); // 🔄 Loading state

  useEffect(() => {
    fetchSelectedApplications();
  }, []);

  const fetchSelectedApplications = async () => {
    try {
      const student = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Session expired. Please log in again.");
        window.location.href = "/login";
        return;
      }

      const response = await fetch(`http://localhost:5000/api/selected-companies/${student.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      setSelectedCompanies(data);
    } catch (error) {
      console.error("❌ Error fetching selected companies:", error);
      alert("❌ Error fetching selected companies.");
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div>
      <h2>Companies that Selected You</h2>
      {loading ? (
        <p>Loading...</p> // ⏳ Loading message
      ) : selectedCompanies.length > 0 ? (
        <ul>
          {selectedCompanies.map((company) => (
            <li key={company.companyId}>{company.company.name}</li>
          ))}
        </ul>
      ) : (
        <p>No company has selected you yet.</p>
      )}
    </div>
  );
};

export default SApplication;
