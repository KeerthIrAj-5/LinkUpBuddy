import React from 'react';
import { Navbar } from './Alumnicomponents/Navbar';
import List from './Alumnicomponents/List';

const Queries = () => {
  return (
    <>
    <div>
      <Navbar />
    </div>
    <div className="p-4 sm:ml-64">
      <div className="grid flex grid-cols-1 gap-4">
        <List/>
      </div>
    </div>
    </>
  );
};

export default Queries;
