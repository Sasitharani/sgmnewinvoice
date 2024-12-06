import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    handleInsert(name, value);
  };

  const handleInsert = async (name, value) => {
    try {
      const response = await axios.put(`https://sgmnewinvoice.onrender.com/api/invoices/${invoiceData.SrNo}`, {
        [name]: value,
      });
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
    <div>
      <h2>Edit Invoice</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleInsert(); }}>
        <div className="details-item">
          <label className="block text-gray-700"><strong>Date:</strong></label>
          <input type="date" name="date" value={invoiceData.Date} onChange={handleChange} className="input-box" />
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>Invoice No:</strong></label>
          <input type="text" name="invoiceNo" value={invoiceData.InvoiceNo} onChange={handleChange} className="input-box" />
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>Company Name:</strong></label>
          <input type="text" name="companyName" value={invoiceData.CompanyName} onChange={handleChange} className="input-box" />
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>GST:</strong></label>
          <input type="text" name="gst" value={invoiceData.Gst} onChange={handleChange} className="input-box" />
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>Flat/Door No:</strong></label>
          <input type="text" name="flatDoorNo" value={invoiceData.DoorNo} onChange={handleChange} className="input-box" />
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>Street 1:</strong></label>
          <input type="text" name="street1" value={invoiceData.Street1} onChange={handleChange} className="input-box" />
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>Street 2:</strong></label>
          <input type="text" name="street2" value={invoiceData.Street2} onChange={handleChange} className="input-box" />
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>Town/City:</strong></label>
          <input type="text" name="townCity" value={invoiceData.Town} onChange={handleChange} className="input-box" />
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>State:</strong></label>
          <input type="text" name="state" value={invoiceData.State} onChange={handleChange} className="input-box" />
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>PIN:</strong></label>
          <input type="text" name="pin" value={invoiceData.Pincode} onChange={handleChange} className="input-box" />
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>Transport:</strong></label>
          <select name="transport" value={invoiceData.Transport} onChange={handleChange} className="input-box">
            <option value="" disabled>Select Transport</option>
            <option value="SGM">SGM</option>
            <option value="Own">Own</option>
          </select>
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>Payment:</strong></label>
          <select name="payment" value={invoiceData.Payment} onChange={handleChange} className="input-box">
            <option value="" disabled>Select Payment</option>
            <option value="Cash">Cash</option>
            <option value="Online/Gpay">Online/Gpay</option>
          </select>
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>Item Name:</strong></label>
          <input type="text" name="itemName" value={invoiceData.ItemName} onChange={handleChange} className="input-box" />
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>Amount:</strong></label>
          <input type="number" name="amount" value={invoiceData.Amount} onChange={handleChange} className="input-box" />
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>Rate:</strong></label>
          <input type="number" name="rate" value={invoiceData.Rate} onChange={handleChange} className="input-box" />
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>Quantity:</strong></label>
          <input type="number" name="qty" value={invoiceData.Quantity} onChange={handleChange} className="input-box" />
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>CGST:</strong></label>
          <input type="number" name="cgst" value={invoiceData.Cgst} onChange={handleChange} className="input-box" />
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>SGST:</strong></label>
          <input type="number" name="sgst" value={invoiceData.Sgst} onChange={handleChange} className="input-box" />
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>CTax:</strong></label>
          <input type="number" name="ctax" value={invoiceData.Ctax} onChange={handleChange} className="input-box" />
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>STax:</strong></label>
          <input type="number" name="stax" value={invoiceData.Stax} onChange={handleChange} className="input-box" />
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>Total Tax:</strong></label>
          <input type="number" name="totalTax" value={invoiceData.TotalTax} onChange={handleChange} className="input-box" />
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>Gross Amount:</strong></label>
          <input type="number" name="grossAmount" value={invoiceData.Amount} onChange={handleChange} className="input-box" />
        </div>
        <div className="details-item">
          <label className="block text-gray-700"><strong>Amount In Words:</strong></label>
          <input type="text" name="amountWords" value={invoiceData.AmountWords} onChange={handleChange} className="input-box" />
        </div>
        <button type="submit" className="btn btn-primary">Update Invoice</button>
      </form>
    </div>
  );
};

export default EditRow;
