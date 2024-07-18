import React from "react";
import axios from 'axios';

const CompanyList = ({ companies, setCompanies }) => {
  const handleDelete = async (companyId) => {
    try {
      const response = await axios.delete(`http://localhost:3004/admin/company/${companyId}/remove`);
      if (response.status === 200) {
        setCompanies((prevCompanies) =>
          prevCompanies.filter((company) => company._id !== companyId)
        );
      } else {
        console.error("Failed to delete the company");
      }
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Company Name</th>
              <th scope="col" className="px-6 py-3">Location</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies &&
              companies.map((company) => (
                <tr key={company._id}>
                  <td className="px-6 py-4">{company.companyName || "N/A"}</td>
                  <td className="px-6 py-4">{company.location}</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-red-600 bg-gray-700 hover:text-red-900"
                      onClick={() => handleDelete(company._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyList;
