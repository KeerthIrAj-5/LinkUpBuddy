import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from './admincomponents/Navbar';
import List from './admincomponents/studlist';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get('http://localhost:3004/admin/students');
        console.log(response.data);
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    }

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3004/admin/student/${id}/remove`);
      setStudents(students.filter(student => student._id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="p-4 sm:ml-64">
        <div className="grid grid-cols-1 gap-4">
          <h1 className="text-2xl font-bold text-gray-700">Students</h1>
          <List students={students} onDelete={handleDelete} />
        </div>
      </div>
    </>
  );
};

export default Students;
