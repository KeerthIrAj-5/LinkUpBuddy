import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from './admincomponents/Navbar';
import AlumniList from './admincomponents/alumlist'; 

const Alumni = () => {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    async function fetchAlumni() {
      try {
        const response = await axios.get('http://localhost:3004/admin/alumni');
        console.log(response.data);
        setAlumni(response.data);
      } catch (error) {
        console.error('Error fetching alumni:', error);
      }
    }

    fetchAlumni();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="p-4 sm:ml-64">
        <div className="grid grid-cols-1 gap-4">
          <h1 className="text-2xl text-gray-700 font-bold">Alumni</h1>
          <AlumniList alumni={alumni} />
        </div>
      </div>
    </>
  );
};

export default Alumni;
