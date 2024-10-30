import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInvoiceData, setNumItems, updateItem, setTotalGrossAmount, setTotalTax, setCgstAmount, setSgstAmount } from './invoiceSlice';
import { useNavigate } from 'react-router-dom';

const InvoiceEntry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    date: '',
    invoiceNo: '',
    address: '',
    companyname: '',
    add1: '',
    street1: '',
    street2: '',
    town: '',
    state: '',
    pin: '',
    numItems: 1,
    transport: '',
    payment: '',
    finalAmount: 0,
    totalTax: 0,
    Cgst: 0,
    Sgst: 0,
    Ctax: 0,
    Stax: 0,
    totalAmount:0,
    items: [{ name: '', qty: '', rate: '', amount: 0, Cgst: 0, Sgst: 0, ctax: 0, stax: 0, totalTax: 0, grossAmount: 0 }],
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleNumItemsChange = (e) => {
    const numItems = parseInt(e.target.value, 10) || 1;
    setFormState({
      ...formState,
      numItems,
      items: Array(numItems).fill({ name: '', qty: '', rate: '', amount: 0, Cgst: 0, Sgst: 0, ctax: 0, stax: 0, totalTax: 0, grossAmount: 0 }),
    });
    dispatch(setNumItems(numItems));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...formState.items];
    items[index] = { ...items[index], [name]: value };

    if (name === 'qty' || name === 'rate') {
      items[index].amount = items[index].qty * items[index].rate || 0;
    }

    if (name === 'Cgst' || name === 'Sgst') {
      if (items[index].amount > 0) {
        if (name === 'Cgst') {
          items[index].ctax = items[index].amount * items[index].Cgst * 0.01;
        }
        if (name === 'Sgst') {
          items[index].stax = items[index].amount * items[index].Sgst * 0.01;
        }
        setError('');
      } else {
        setError('ENTER RATE AND QUANTITY');
      }
      items[index].totalTax = items[index].ctax + items[index].stax;
      items[index].grossAmount = items[index].totalTax + items[index].amount;
    }

    const totalTax = items.reduce((sum, item) => sum + item.totalTax, 0);
    const ctax = items.reduce((sum, item) => sum + item.ctax, 0);
    const stax = items.reduce((sum, item) => sum + item.stax, 0);

    setFormState({ ...formState, items, totalTax, Ctax: ctax, Stax: stax });
    dispatch(updateItem({ index, item: items[index] }));
    calculateFinalAmount(items);
    calculateGrossAmount(items);
  };

  const calculateFinalAmount = (items) => {
    const finalAmount = items.reduce((sum, item) => sum + item.grossAmount, 0);
    setFormState((prevState) => ({
      ...prevState,
      finalAmount,
    }));
    dispatch(calculateFinalAmount(finalAmount));
  };
  const calculateGrossAmount = (items) => {
    const grossAmount = items.reduce((sum, item) => sum + item.grossAmount, 0);
    setFormState((prevState) => ({
      ...prevState,
      grossAmount,
    }));
    dispatch(calculateGrossAmount(grossAmount));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      dispatch(setInvoiceData(formState));
      dispatch(setTotalTax(formState.totalTax));
      dispatch(setCgstAmount(formState.Ctax));
      dispatch(setSgstAmount(formState.Stax));
      navigate('/invoice');
      //navigate('/sliceDetails');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-lg mx-auto mt-10 p-6 border border-gray-300 rounded shadow">
      <label>Date</label>
      <input type="date" name="date" value={formState.date} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
      
      <label>Invoice No</label>
      <input type="text" name="invoiceNo" value={formState.invoiceNo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
      
      <label>Address</label>
      <select name="address" value={formState.address} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
        <option value="" disabled>Select Address</option>
        <option value="Address 1">Address 1</option>
        <option value="Address 2">Address 2</option>
        <option value="Address 3">Address 3</option>
        <option value="Address 4">Address 4</option>
      </select>
      
      <label>Company Name</label>
      <input type="text" name="companyname" value={formState.companyname} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
      
      <label>Door No/Flat No/Bld No</label>
      <input type="text" name="add1" value={formState.add1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
      
      <label>Street-1</label>
      <input type="text" name="street1" value={formState.street1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
      
      <label>Street-2</label>
      <input type="text" name="street2" value={formState.street2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
      
      <label>Town/City/Village</label>
      <input type="text" name="town" value={formState.town} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
      
      <label>State</label>
      <input type="text" name="state" value={formState.state} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
      
      <label>Pin Code</label>
      <input type="number" name="pin" value={formState.pin} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
      
      <label>Transport</label>
      <select name="transport" value={formState.transport} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
        <option value="" disabled>Select Transport</option>
        <option value="SGM Transport">SGM Transport</option>
        <option value="Own Transport">Own Transport</option>
      </select>
      
      <label>Payment Method</label>
      <select name="payment" value={formState.payment} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
        <option value="" disabled>Select Payment Method</option>
        <option value="Cash">Cash</option>
        <option value="Online">Online</option>
        <option value="Gpay">Gpay</option>
      </select>
      
      <label>Number of Items</label>
      <input type="number" name="numItems" value={formState.numItems} onChange={handleNumItemsChange} className="w-full p-2 border border-gray-300 rounded" />
      
      {formState.items.map((item, index) => (
        <div key={index} className="space-y-2">
          <label>Item Name</label>
          <select name="name" value={item.name} onChange={(e) => handleItemChange(index, e)} className="w-full p-2 border border-gray-300 rounded">
            <option value="" disabled>Select Item</option>
            <option value="Fly Ash Bricks-White">Fly Ash Bricks-White</option>
            <option value="Fly Ash Bricks-Brown">Fly Ash Bricks-Brown</option>
            <option value="Fly Ash Bricks-Normal">Fly Ash Bricks-Normal</option>
            <option value="Solid Bricks-8">Solid Bricks-8"</option>
            <option value="Solid Bricks-6">Solid Bricks-6"</option>
          </select>
          
          <label>Quantity</label>
          <input type="number" name="qty" value={item.qty} onChange={(e) => handleItemChange(index, e)} className="w-full p-2 border border-gray-300 rounded" />
          
          <label>Rate</label>
          <input type="number" name="rate" value={item.rate} onChange={(e) => handleItemChange(index, e)} className="w-full p-2 border border-gray-300 rounded" />
          
          <label>Amount</label>
          <input type="number" name="amount" value={item.amount} readOnly className="w-full p-2 border border-gray-300 rounded" />
          
          <label>CGST</label>
          <input type="number" name="Cgst" value={item.Cgst} onChange={(e) => handleItemChange(index, e)} className="w-full p-2 border border-gray-300 rounded" />
          
          <label>SGST</label>
          <input type="number" name="Sgst" value={item.Sgst} onChange={(e) => handleItemChange(index, e)} className="w-full p-2 border border-gray-300 rounded" />
          
          <div><strong>CTax:</strong> {item.ctax}</div>
          <div><strong>STax:</strong> {item.stax}</div>
          <div><strong>Total Tax:</strong> {item.totalTax}</div>
          <div><strong>Gross Amount:</strong> {item.grossAmount}</div>
        </div>
      ))}
      
      <div className="text-lg font-bold">
        Total Gross Amount: {formState.finalAmount}
      </div>
      
      {error && <div className="text-red-500">{error}</div>}
      
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default InvoiceEntry;
