import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Modal = ({ onSubmit, onClose }) => {
  const [query, setQuery] = useState('');
  const [companyId, setCompanyId] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const url = window.location.href;
    const companyIdFromUrl = url.split('/').pop();
    setCompanyId(companyIdFromUrl);
    const userIdFromUrl = url.split('/')[4];
    setUserId(userIdFromUrl);
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3004/student/addQuery', {
        companyId: companyId,
        query: query,
        userId: userId
      });
      
      console.log('Query submitted:', response.data);
    } catch (error) {
      console.error('Error submitting query:', error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-xl font-semibold text-gray-900">Enter Query</h3>
          <button onClick={handleClose} className="w-8 bg-red-600 hover:bg-red-200 h-8">
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="query" className="block text-sm font-medium text-gray-900">
              Query
            </label>
            <input
              type="text"
              id="query"
              value={query}
              onChange={handleChange}
              className="mt-1 p-2.5 border rounded-lg text-gray-500 w-full h-50 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg py-2.5"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
