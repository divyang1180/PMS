import React, { useEffect, useState } from "react";
import axios from "axios";
import EditCompanyModal from "./EditCompanyModal";
import styles from "./CompaniesList.module.css";

const CompaniesList = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/companies`);
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const openModal = (company) => {
    setSelectedCompany(company); // ✅ Set selected company (includes jobs)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  return (
    <div className={styles.container}>
      <h2>Companies List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.name}</td>
              <td>{company.email}</td>
              <td>
                <button className={styles.editBtn} onClick={() => openModal(company)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && <EditCompanyModal company={selectedCompany} onClose={closeModal} refresh={fetchCompanies} />}
    </div>
  );
};

export default CompaniesList;
