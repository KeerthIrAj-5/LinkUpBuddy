import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import { useLocation } from "react-router-dom";

const List = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [queries, setQueries] = useState([]);
  const location = useLocation();
  const userId = location.pathname.split("/")[2]; 

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/alumni/${userId}/queries`
        );
        setQueries(response.data);
      } catch (error) {
        console.error("Error fetching queries:", error);
      }
    };

    fetchQueries();
  }, [userId]);

  const openModal = (query) => {
    setSelectedQuery(query);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (answer) => {
    console.log("Submitted answer:", answer);
    closeModal();
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Recent Queries
          </p>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Query
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Respond</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{query.queryText}</td>
              <td className="px-6 py-4 text-right">
                <button
                  type="button"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => openModal({ ...query, queryId: query._id })}
                >
                  Respond
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <Modal
          username={userId}
          queryId={selectedQuery.queryId}
          closeModal={closeModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default List;
