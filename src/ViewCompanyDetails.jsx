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
  axios.get('https://sgmnewinvoice.onrender.com/api/invoices')
    .then(response => {
      setInvoices(response.data); // Store fetched invoices in state
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);
console.log("Intial Values", initialValues)
  const handleChange = (e) => {}
  const closeViewCompanyModal = (e) => {
    e.preventDefault();
    onClose();
  };

  useEffect(() => {
    if (initialValues) {
      setcompanyDetails({
        companyName: initialValues.companyName,
        gst: initialValues.gst,
        flatDoorNo: initialValues.flatDoorNo,
        street1: initialValues.street1,
        street2: initialValues.street2,
        townCity: initialValues.townCity,
        state: initialValues.state,
        pin: initialValues.pin
      });
    }
  }, [initialValues]);

  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-96">
      <span className="close cursor-pointer text-xl font-bold" onClick={onClose}>&times;</span>
        <h2 className="text-2xl mb-4">Company Details</h2>
        <p><strong>Company Name:</strong> {address.companyName}</p>
        <p><strong>GST:</strong> {address.gst}</p>
        <p><strong>Flat/Door No:</strong> {address.flatDoorNo}</p>
        <p><strong>Street 1:</strong> {address.street1}</p>
        <p><strong>Street 2:</strong> {address.street2}</p>
        <p><strong>Town/City:</strong> {address.townCity}</p>
        <p><strong>State:</strong> {address.state}</p>
        <p><strong>PIN:</strong> {address.pin}</p>
 
        <button onClick={closeViewCompanyModal} className="bg-blue-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};


export default ViewCompanyDetails;