import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrintInvoice = () => {
  const location = useLocation();
  const newValuesFromDb = useSelector((state) => state.invoice); // Access the Redux state
  const { invoice } = location.state || {};

  return (
    <div>
      <h1>Print Invoice</h1>
      <h1>All Values from Redux State</h1>
      <pre>{JSON.stringify(newValuesFromDb, null, 2)}</pre>
    </div>
  );
};

export default PrintInvoice;