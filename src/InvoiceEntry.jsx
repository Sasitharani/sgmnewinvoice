import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
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
  updateAddress,
  openModal // Import the openModal action
} from './invoiceSlice';
import { useNavigate } from 'react-router-dom';
import AddressModal from './AddressModal';

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
    items: [{ name: '', quantity: 0, rate: 0, amount: 0, cgst: 0, sgst: 0, ctax: 0, stax: 0, totalTax: 0, grossAmount: 0 }]
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressAdded, setAddressAdded] = useState(false);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get('https://sgmnewinvoice.onrender.com/api/invoices')
      .then(response => {
        const invoiceData = response.data[0]; // Assuming you want to display the first invoice
        setFormState({
          ...formState,
          date: invoiceData.date,
          invoiceNo: invoiceData.invoiceNo,
          address: invoiceData.address,
          companyname: invoiceData.companyname,
          add1: invoiceData.add1,
          street1: invoiceData.address.street1,
          street2: invoiceData.address.street2,
          town: invoiceData.address.townCity,
          state: invoiceData.address.state,
          pin: invoiceData.address.pin,
          numItems: invoiceData.items.length,
          transport: invoiceData.transport,
          payment: invoiceData.payment,
          finalAmount: invoiceData.totalAmount,
          totalTax: invoiceData.totalTax,
          items: invoiceData.items
        });
        setAddressAdded(true);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddressSubmit = (address) => {
    dispatch(updateAddress(address));
    setFormState({
      ...formState,
      street1: address.street1,
      street2: address.street2,
      town: address.townCity,
      state: address.state,
      pin: address.pin
    });
    setAddressAdded(true);
    handleCloseModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleNumItemsChange = (e) => {
    const numItems = parseInt(e.target.value, 10) || 1;
    setFormState({
      ...formState,
      numItems,
      items: Array(numItems).fill({ name: '', quantity: 0, rate: 0, amount: 0, cgst: 0, sgst: 0, ctax: 0, stax: 0, totalTax: 0, grossAmount: 0 }),
    });
    dispatch(setNumItems(numItems));
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
        qty: 0,
        rate: 0,
        amount: 0,
        ctax: 0,
        stax: 0,
        totalTax: 0,
        grossAmount: 0,
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
      Ctax: items[index].ctax,
      Stax: items[index].stax,
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
          date: formState.date,      // Include date in each new row
          invoiceNo: formState.invoiceNo, // Include invoice number in each new row
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

  const addAddress = () => {
    dispatch(openModal());
  };

  const saveInvoice = () => {
    axios.post('http://localhost:5000/api/invoices', formState)
      .then(response => {
        console.log('Invoice saved:', response.data);
        // Optionally, you can reset the form or navigate to another page
      })
      .catch(error => {
        console.error('Error saving invoice:', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full max-w-screen-xl mx-auto mt-10 p-6 border border-gray-300 rounded shadow" style={{ margin: '30px' }}>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Date</th>
                <th className="border border-gray-300 p-2">Invoice No</th>
                <th className="border border-gray-300 p-2">Add Address</th> {/* New column for Add Address */}
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
                    {addressAdded ? (
                      <div className="p-2 bg-green-100 border border-green-500 rounded">
                        <span className="text-green-700">{`${formState.street1}, ${formState.street2}, ${formState.town}, ${formState.state}, ${formState.pin}`}</span>
                      </div>
                    ) : (
                      <button type="button" onClick={addAddress} className="w-full p-1 bg-green-500 text-white rounded">Add Address</button>
                    )}
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
                  {index === 0 && ( // Only show buttons in the first row
                    <td className="border border-gray-300 p-2">
                      <div className="flex space-x-2">
                        <button type="button" onClick={addItemRow} className="bg-green-500 text-white px-4 py-2 rounded">Add New</button>
                        <button type="button" onClick={saveInvoice} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
      <AddressModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleAddressSubmit} />
    </div>
  );
};

export default InvoiceEntry;
