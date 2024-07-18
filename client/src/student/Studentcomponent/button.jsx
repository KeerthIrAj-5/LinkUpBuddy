import React, { useState } from 'react';
import Modal from './modal';
const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [companyId, setCompanyId] = useState(null);

  const openModal = (id) => {
    setCompanyId(id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = (companyId, query) => {
    console.log(`Company ID: ${companyId}, Query: ${query}`);
    closeModal();
  };

  return (
    <div>
      <button
        onClick={() => openModal('{companyId}')}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Submit Query
      </button>
      {modalVisible && (
        <Modal companyId={companyId} onSubmit={handleSubmit} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
