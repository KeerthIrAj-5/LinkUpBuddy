import React from 'react'
import { Navbar } from './Studentcomponent/Navbar'
import MyList from './Studentcomponent/mylist';

const MyQueries = () => {
  return (
    <div>
        <>
      <div>
        <Navbar />
      </div>
      <div className="p-4 sm:ml-64">
        <div className="grid flex grid-cols-1 gap-4">
          <MyList/>
        </div>
      </div>
      </>
    </div>
  )
}
export default MyQueries;