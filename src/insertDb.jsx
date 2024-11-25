import React from 'react';
import { useSelector } from 'react-redux';
import './index.css'; // Assuming you have a CSS file for styling
import axios from 'axios';
import cors from 'cors'; // Import cors

const InsertDb = () => {
  const formState = useSelector((state) => state.invoice); // Access the Redux state

  
  const handleInsert = async () => {
    try {
     const response = await axios.post('https://sgmnewinvoice.onrender.com/api/insertInvoice', formState);
    
      console.log(response.data);
      alert('Data inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
      alert('Error inserting data');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Invoice Details</h1>
      <div className="details">
        {console.log(formState)}
        <p><strong>Date:</strong> {formState.date}</p>
        <p><strong>Invoice No:</strong> {formState.invoiceNo}</p>
        <p><strong>Company Name:</strong> {formState.company[0].companyname}</p>
        <p><strong>GST:</strong> {formState.company[0].gst}</p>
        <p><strong>Flat/Door No:</strong> {formState.company[0].flatDoorNo}</p>
        <p><strong>Street 1:</strong> {formState.company[0].street1}</p>
        <p><strong>Street 2:</strong> {formState.company[0].street2}</p>
        <p><strong>Town/City:</strong> {formState.company[0].townCity}</p>
        <p><strong>State:</strong> {formState.company[0].state}</p>
        <p><strong>PIN:</strong> {formState.company[0].pin}</p>
        <p><strong>Transport:</strong> {formState.transport}</p>
        <p><strong>Payment:</strong> {formState.payment}</p>
        <p><strong>Amount:</strong> {formState.amount}</p>
        <p><strong>Rate:</strong> {formState.rate}</p>
        <p><strong>Quantity:</strong> {formState.qty}</p>
        <p><strong>CGST:</strong> {formState.Cgst}</p>
        <p><strong>SGST:</strong> {formState.Sgst}</p>
        <p><strong>CTax:</strong> {formState.ctax}</p>
        <p><strong>STax:</strong> {formState.stax}</p>
        <p><strong>Total Tax:</strong> {formState.totalTax}</p>
        <p><strong>Gross Amount:</strong> {formState.grossAmount}</p>
      </div>
      <button onClick={handleInsert} className="btn btn-primary">Insert into DB</button>
    </div>
  );
};

export default InsertDb;