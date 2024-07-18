import React, { useState } from 'react';
import { Navbar } from './Studentcomponent/Navbar';
import List from './Studentcomponent/list';
import Button from './Studentcomponent/button';

const Queries = () => {
  const [queries, setQueries] = useState([]);

  const addQuery = (newQuery) => {
    setQueries([newQuery, ...queries]);
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="p-4 sm:ml-64">
        <Button />
      </div>
      <div className="p-4 sm:ml-64">
        <div className="grid flex grid-cols-1 gap-4">
          <List queries={queries} />
        </div>
      </div>
    </>
  );
};

export default Queries;
