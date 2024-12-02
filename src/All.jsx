import React from 'react';
import { useSelector } from 'react-redux';


const AllValues = () => {
  const newValuesFromDb = useSelector((state) => state.invoice); // Access the Redux state

  return (
    <div>
      <h1>All Values from Redux State</h1>
      <pre>{JSON.stringify(newValuesFromDb, null, 2)}</pre>
    </div>
  );
};

export default AllValues;