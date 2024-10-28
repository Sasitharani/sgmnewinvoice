import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setInvoiceData, setNumItems, updateItem } from './invoiceSlice';
import { useNavigate } from 'react-router-dom';

const InvoiceEntry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    date: '',
    invoiceNo: '',
    address: '',
    add1: '',
    street1: '',
    street2: '',
    town: '',
    state: '',
    pin: '',
    numItems: 1,
    transport: '',
    payment: '',
    companyname: '',
    items: [{ name: '', qty: '', rate: '', amount: 0 }],
  });

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
      items: Array(numItems).fill({ name: '', qty: '', rate: '', amount: 0 }),
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

    setFormState({ ...formState, items });
    dispatch(updateItem({ index, item: items[index] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setInvoiceData(formState));
    navigate('/invoice');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-lg mx-auto mt-10 p-6 border border-gray-300 rounded shadow"
    >
      <input
        type="date"
        name="date"
        value={formState.date}
        onChange={handleChange}
        placeholder="Date"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="invoiceNo"
        value={formState.invoiceNo}
        onChange={handleChange}
        placeholder="Invoice No"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <select
        name="address"
        value={formState.address}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      >
        <option value="" disabled>
          Select Address
        </option>
        <option value="Address 1">Address 1</option>
        <option value="Address 2">Address 2</option>
        <option value="Address 3">Address 3</option>
        <option value="Address 4">Address 4</option>
      </select>
      <input
        type="text"
        name="companyname"
        value={formState.companyname}
        onChange={handleChange}
        className="w-full h-8"
        placeholder="Company Name"
      />
      <input
        type="text"
        name="add1"
        value={formState.add1}
        onChange={handleChange}
        placeholder="Door No/Flat No/Bld No"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="street1"
        value={formState.street1}
        onChange={handleChange}
        placeholder="Street-1"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="street2"
        value={formState.street2}
        onChange={handleChange}
        placeholder="Street 2"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="town"
        value={formState.town}
        onChange={handleChange}
        placeholder="Town/City/Village"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="state"
        value={formState.state}
        onChange={handleChange}
        placeholder="State"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        name="pin"
        value={formState.pin}
        onChange={handleChange}
        placeholder="Pin Code"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        name="numItems"
        value={formState.numItems}
        onChange={handleNumItemsChange}
        placeholder="Number of Items"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {formState.items.map((item, index) => (
        <div key={index} className="space-y-2">
          <select
            name="name"
            value={item.name}
            onChange={(e) => handleItemChange(index, e)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Select Item
            </option>
            <option value="Fly Ash Bricks-White">Fly Ash Bricks-White</option>
            <option value="Fly Ash Bricks-Brown">Fly Ash Bricks-Brown</option>
            <option value="Fly Ash Bricks-Normal">Fly Ash Bricks-Normal</option>
            <option value="Solid Bricks-8">Solid Bricks-8"</option>
            <option value="Solid Bricks-6">Solid Bricks-6"</option>
          </select>
          <input
            type="number"
            name="qty"
            value={item.qty}
            onChange={(e) => handleItemChange(index, e)}
            placeholder={`Item ${index + 1} Quantity`}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="rate"
            value={item.rate}
            onChange={(e) => handleItemChange(index, e)}
            placeholder={`Item ${index + 1} Rate`}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="amount"
            value={item.amount}
            readOnly
            placeholder="Amount"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="font-semibold">
            <div className="grid grid-cols-1">
              <div className="b">
                <select
                  name="transport"
                  value={formState.transport}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Transport Mode</option>
                  <option value="SGM Transport">SGM Transport</option>
                  <option value="Own Transport">Own Transport</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1">
              <div>
                <select
                  name="payment"
                  value={formState.payment}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                >
                  <option value="">Select Payment Mode</option>
                  <option value="Cash">Cash</option>
                  <option value="Online">Online</option>
                  <option value="Gpay">Gpay</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default InvoiceEntry;
