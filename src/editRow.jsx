import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css'; // Import the custom CSS file

const EditRow = () => {
  const { srNo } = useParams(); // Access the srNo parameter from the URL
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await axios.get(`https://sgmnewinvoice.onrender.com/api/invoices/${srNo}`);
        setInvoiceData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchInvoiceData();
  }, []); // Empty dependency array ensures this runs only once

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({
      ...invoiceData,
      [name]: value,
 
    });
    console.log(invoiceData);
  };

  const handleInsert = async () => {
    try {
      const response = await axios.put(`https://sgmnewinvoice.onrender.com/api/invoices/${invoiceData.SrNo}`, invoiceData);
      console.log(response.data);
      alert('Data updated successfully');
      navigate('/'); // Navigate to InvoiceEntry
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Error updating data');
    }
  };

  if (!invoiceData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Invoice</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => { e.preventDefault(); handleInsert(); }}>
          <div className="details-item">
            <label className="block text-gray-700"><strong>Date:</strong></label>
            <input type="date" name="Date" value={invoiceData.Date} onChange={handleChange} className="text-box" />
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>Invoice No:</strong></label>
            <input type="text" name="InvoiceNo" value={invoiceData.InvoiceNo} onChange={handleChange} className="text-box" />
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>Company Name:</strong></label>
            <input type="text" name="CompanyName" value={invoiceData.CompanyName} onChange={handleChange} className="text-box" />
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>GST:</strong></label>
            <input type="text" name="Gst" value={invoiceData.Gst} onChange={handleChange} className="text-box" />
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>Flat/Door No:</strong></label>
            <input type="text" name="DoorNo" value={invoiceData.DoorNo} onChange={handleChange} className="text-box" />
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>Street 1:</strong></label>
            <input type="text" name="Street1" value={invoiceData.Street1} onChange={handleChange} className="text-box" />
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>Street 2:</strong></label>
            <input type="text" name="Street2" value={invoiceData.Street2} onChange={handleChange} className="text-box" />
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>Town/City:</strong></label>
            <input type="text" name="Town" value={invoiceData.Town} onChange={handleChange} className="text-box" />
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>State:</strong></label>
            <input type="text" name="State" value={invoiceData.State} onChange={handleChange} className="text-box" />
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>PIN:</strong></label>
            <input type="text" name="Pincode" value={invoiceData.Pincode} onChange={handleChange} className="text-box" />
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>Transport:</strong></label>
            <select name="Transport" value={invoiceData.Transport} onChange={handleChange} className="text-box">
              <option value="" disabled>Select Transport</option>
              <option value="SGM">SGM</option>
              <option value="Own">Own</option>
            </select>
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>Payment:</strong></label>
            <select name="Payment" value={invoiceData.Payment} onChange={handleChange} className="text-box">
              <option value="" disabled>Select Payment</option>
              <option value="Cash">Cash</option>
              <option value="Online/Gpay">Online/Gpay</option>
            </select>
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>Item Name:</strong></label>
            <input type="text" name="itemName" value={invoiceData.itemName} onChange={handleChange} className="text-box" />
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>Amount:</strong></label>
            <input type="number" name="Amount" value={invoiceData.Amount} onChange={handleChange} className="text-box" />
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>Rate:</strong></label>
            <input type="number" name="Rate" value={invoiceData.Rate} onChange={handleChange} className="text-box" />
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>Quantity:</strong></label>
            <input type="number" name="Quantity" value={invoiceData.Quantity} onChange={handleChange} className="text-box" />
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>CGST:</strong></label>
            <input type="number" name="Cgst" value={invoiceData.cgst} onChange={handleChange} className="text-box" />
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>SGST:</strong></label>
            <input type="number" name="Sgst" value={invoiceData.sgst} onChange={handleChange} className="text-box" />
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>CTax:</strong></label>
            <input type="number" name="ctax" value={invoiceData.ctax} onChange={handleChange} className="text-box" />
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>STax:</strong></label>
            <input type="number" name="stax" value={invoiceData.stax} onChange={handleChange} className="text-box" />
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>Total Tax:</strong></label>
            <input type="number" name="TotalTax" value={invoiceData.TotalTax} onChange={handleChange} className="text-box" />
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>Gross Amount:</strong></label>
            <input type="number" name="grossAmount" value={invoiceData.Amount} onChange={handleChange} className="text-box" />
          </div>
          <div className="details-item">
            <label className="block text-gray-700"><strong>Amount In Words:</strong></label>
            <input type="text" name="AmountWords" value={invoiceData.AmountWords} onChange={handleChange} className="text-box" />
          </div>
          <div className="details-item md:col-span-2">
            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Update Invoice</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRow;
