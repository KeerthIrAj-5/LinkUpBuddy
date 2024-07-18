import React from 'react';
import axios from 'axios';

const QueryList = ({ queries, deleteQuery }) => {
    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Student ID</th>
                            <th scope="col" className="px-6 py-3">Query Text</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queries && queries.map(query => (
                            <tr key={query._id}>
                                <td className="px-6 py-4">{query.studentId}</td>
                                <td className="px-6 py-4">{query.queryText}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => deleteQuery(query._id)}
                                        className="text-red-600 bg-gray-600 hover:bg-gray-100 hover:text-red-900"
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

export default QueryList;
