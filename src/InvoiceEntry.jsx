import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setCgst,
  setSgst,
  setInvoiceData,
  setNumItems,
  updateItem,
  setTotalGrossAmount,
  setTotalTax,
  setCgstAmount,
  setTotalAmount,
  setSgstAmount,
} from './invoiceSlice';
import { useNavigate } from 'react-router-dom';

const InvoiceEntry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    date: '',
    invoiceNo: '',
    items: [
      {
        date: '',
        invoiceNo: '',
        companyname: '',
        address: '',
        name: '',
        qty: '',
        rate: '',
        amount: 0,
        Cgst: 0,
        Sgst: 0,
        ctax: 0,
        stax: 0,
        totalTax: 0,
        grossAmount: 0,
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const taxRates = {
    'Fly Ash Bricks-White': { cgst: 6, sgst: 6 },
    'Fly Ash Bricks-Brown': { cgst: 6, sgst: 6 },
    'Fly Ash Bricks-Normal': { cgst: 6, sgst: 6 },
    'Solid Bricks-8': { cgst: 18, sgst: 18 },
    'Solid Bricks-6': { cgst: 18, sgst: 18 },
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...formState.items];

    if (name === 'name') {
      const selectedItem = taxRates[value];
      items[index] = {
        ...items[index],
        [name]: value,
        Cgst: selectedItem ? selectedItem.cgst : 0,
        Sgst: selectedItem ? selectedItem.sgst : 0,
      };
    } else {
      items[index] = { ...items[index], [name]: value };
    }

    if (name === 'qty' || name === 'rate') {
      items[index].amount = items[index].qty * items[index].rate || 0;
      items[index].ctax = items[index].amount * items[index].Cgst * 0.01;
      items[index].stax = items[index].amount * items[index].Sgst * 0.01;
      items[index].totalTax = items[index].ctax + items[index].stax;
      items[index].grossAmount = items[index].amount + items[index].totalTax;
    }

    const totalTax = items.reduce((sum, item) => sum + item.totalTax, 0);
    const grossAmount = items.reduce((sum, item) => sum + item.amount, 0);

    setFormState({
      ...formState,
      items,
      totalTax,
      finalAmount: grossAmount + totalTax,
    });
    
    dispatch(updateItem({ index, item: items[index] }));
    dispatch(setTotalGrossAmount(grossAmount));
    dispatch(setCgstAmount(items[index].ctax));
    dispatch(setSgstAmount(items[index].stax));
    dispatch(setCgst(items[index].Cgst));
    dispatch(setSgst(items[index].Sgst));
  };

  const addItemRow = () => {
    setFormState({
      ...formState,
      items: [
        ...formState.items,
        {
          date: formState.date,
          invoiceNo: formState.invoiceNo,
          companyname: formState.companyname,  // Populate with existing companyname
          address: formState.address,          // Populate with existing address
          name: '',
          qty: '',
          rate: '',
          amount: 0,
          Cgst: 0,
          Sgst: 0,
          ctax: 0,
          stax: 0,
          totalTax: 0,
          grossAmount: 0,
        },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTotalAmount(formState.finalAmount));
    dispatch(setInvoiceData(formState));
    dispatch(setTotalTax(formState.totalTax));
    navigate('/invoice');
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-auto">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Date</th>
                <th className="border border-gray-300 p-2">Invoice No</th>
                <th className="border border-gray-300 p-2">Company Name</th>
                <th className="border border-gray-300 p-2">Address</th>
                <th className="border border-gray-300 p-2">Item Name</th>
                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">Rate</th>
                <th className="border border-gray-300 p-2">Amount</th>
                <th className="border border-gray-300 p-2">CGST (%)</th>
                <th className="border border-gray-300 p-2">SGST (%)</th>
                <th className="border border-gray-300 p-2">CTax</th>
                <th className="border border-gray-300 p-2">STax</th>
                <th className="border border-gray-300 p-2">Total Tax</th>
                <th className="border border-gray-300 p-2">Gross Amount</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {formState.items.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">
                    <input type="date" name="date" value={formState.date} onChange={handleChange} className="w-full p-1" />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="text" name="invoiceNo" value={formState.invoiceNo} onChange={handleChange} className="w-full p-1" />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="text" name="companyname" value={item.companyname} onChange={(e) => handleItemChange(index, e)} className="w-full p-1" />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="text" name="address" value={item.address} onChange={(e) => handleItemChange(index, e)} className="w-full p-1" />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select name="name" value={item.name} onChange={(e) => handleItemChange(index, e)} className="w-full">
                      <option value="" disabled>Select Item</option>
                      <option value="Fly Ash Bricks-White">Fly Ash Bricks-White</option>
                      <option value="Fly Ash Bricks-Brown">Fly Ash Bricks-Brown</option>
                      <option value="Fly Ash Bricks-Normal">Fly Ash Bricks-Normal</option>
                      <option value="Solid Bricks-8">Solid Bricks-8"</option>
                      <option value="Solid Bricks-6">Solid Bricks-6"</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" name="qty" value={item.qty} onChange={(e) => handleItemChange(index, e)} className="w-full p-1" />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" name="rate" value={item.rate} onChange={(e) => handleItemChange(index, e)} className="w-full p-1" />
                  </td>
                  <td className="border border-gray-300 p-2">{item.amount.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">{item.Cgst}</td>
                  <td className="border border-gray-300 p-2">{item.Sgst}</td>
                  <td className="border border-gray-300 p-2">{item.ctax.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">{item.stax.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">{item.totalTax.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">{item.grossAmount.toFixed(2)}</td>
                  {index === formState.items.length - 1 && (
                    <td className="border border-gray-300 p-2">
                      <div className="flex space-x-2">
                        <button type="button" onClick={addItemRow} className="bg-green-500 text-white px-4 py-2 rounded">Add New</button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Print</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default InvoiceEntry;
