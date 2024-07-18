
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const MyList = ({ loggedInUserId }) => {
    const [myQueries, setMyQueries] = useState([]);
    const location = useLocation();
    const userIdFromUrl = location.pathname.split('/')[2];

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await axios.get(`http://localhost:3004/student/${userIdFromUrl}/queries`);
                const filteredQueries = response.data.filter(query => query.userId === loggedInUserId);
                setMyQueries(filteredQueries);
            } catch (error) {
                console.error('Error fetching queries:', error);
            }
        };

        fetchQueries();
    }, [userIdFromUrl, loggedInUserId]);

    const handleDelete = async (queryId) => {
        try {
            await axios.delete(`http://localhost:3004/student/${userIdFromUrl}/queries/${queryId}/remove`);
            setMyQueries(myQueries.filter(query => query._id !== queryId));
        } catch (error) {
            console.error('Error deleting query:', error);
        }
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-lg font-semibold text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    My Queries
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Query</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {myQueries.map((query, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4 text-lg">{query.queryText}</td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => handleDelete(query._id)}
                                    className="text-red-600 bg-gray-700 hover:bg-gray-100 hover:text-red-900"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyList;
