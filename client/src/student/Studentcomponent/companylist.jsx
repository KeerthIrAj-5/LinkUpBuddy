import React from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyList = ({ companies, userIdFromUrl }) => {
    const navigate = useNavigate();

    const handleButtonClick = (companyId) => {
        navigate(`/student/${userIdFromUrl}/queries/${companyId}`);
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
                                            onClick={() => handleButtonClick(company._id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                        >
                                            Go To Company
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
