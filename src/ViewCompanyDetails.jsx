import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewCompanyDetails = ({ isOpen, onClose, initialValues }) => {
const [invoices, setInvoices] = useState([]); //State for fetching data from API
const [companyDetails, setcompanyDetails] = useState({
  companyName: '',
  gst: '',
  flatDoorNo: '',
  street1: '',
  street2: '',
  townCity: '',
  state: '',
  pin: ''
});
useEffect(() => {
  // Fetch data from the API when the component mounts
  axios.get(`https://sgmnewinvoice.onrender.com/api/invoices?SrNo=${initialValues}`)
    .then(response => {
      setInvoices(response.data); // Store fetched invoices in state
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);
console.log("Intial Values", invoices)

  const closeViewCompanyModal = (e) => {
    e.preventDefault();
    onClose();
  };


  if (!isOpen) return null;

  return (
    <div className="modal ">
      <div className="modal-content ">
      <span className="close cursor-pointer text-xl font-bold" onClick={onClose}>&times;</span>
        <h2 className="text-2xl mb-4">Company Details</h2>
        {console.log('Specific Invoice-'+JSON.stringify(invoices))}
        {/* <p className='inside-modal'><strong>Company Name:</strong> {invoices[0].CompanyName}</p>
        <p className='inside-modal'><strong>GST:</strong> {invoices[0].Gst}</p>
        <p className='inside-modal'><strong>Flat/Door No:</strong> {invoices[0].DoorNo}</p>
        <p className='inside-modal'><strong>Street 1:</strong> {invoices[0].Street1}</p>
        <p className='inside-modal'><strong>Street 2:</strong> {invoices[0].Street2}</p>
        <p className='inside-modal'><strong>Town/City:</strong> {invoices[0].Town}</p>
        <p className='inside-modal'><strong>State:</strong> {invoices[0].State}</p>
        <p className='inside-modal'><strong>PIN:</strong> {invoices[0].Pincode}</p> */}
 
        <button onClick={closeViewCompanyModal} className="bg-blue-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};


export default ViewCompanyDetails;