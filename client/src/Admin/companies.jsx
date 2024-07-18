import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from './admincomponents/Navbar';
import AddCompany from './admincomponents/addcompany';
import CompanyList from './admincomponents/companylist';

const Companies = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        async function fetchCompanies() {
            try {
                const response = await axios.get('http://localhost:3004/admin/company');
                setCompanies(response.data);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        }

        fetchCompanies();
    }, []);

    const handleAddCompany = (company) => {
        setCompanies((prevCompanies) => [...prevCompanies, company]);
    };

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="p-4 sm:ml-64">
                <div className="grid grid-cols-1 gap-4">
                    <div className='p-4'>
                        <AddCompany onAddCompany={handleAddCompany} />
                    </div>
                    <CompanyList companies={companies} setCompanies={setCompanies} />
                </div>
            </div>
        </>
    );
};

export default Companies;
