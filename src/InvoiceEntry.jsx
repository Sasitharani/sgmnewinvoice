import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import './index.css'; // Import the CSS file


//import from SLices
import {

  setTotalTax,
  setTotalAmount,
  setDate,
  setInvoiceNo,
  setNumItems,
  setTransport,
  setPayment,
  setAmount,
  setCtax,
  setStax,
  setGrossAmount, 
  openModal,
  setQty,
  setRate,
  setCgst,
  setSgst,
  setItemName,
  SetAmountWords

} from './invoiceSlice';

//for Navigating between pages also update in App.js
import { useNavigate } from 'react-router-dom';
import AddressModal from './AddressModal';
import ViewCompanyDetails from './ViewCompanyDetails';
import e from 'cors';
import EditRow from './editRow';
import { data } from 'autoprefixer';


const numberToWords = (num) => {
  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const b = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];
  if ((num = num.toString()).length > 9) return 'Overflow';
  const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{1})$/);
  if (!n) return;

  let str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + ' Crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + ' Lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + ' Thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + ' Hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'And ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + ' Only/- ' : '';
  return str.trim();
};


const InvoiceEntry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formState = useSelector((state) => state.invoice); // Use the Redux state
  const [editIndex, setEditIndex] = useState(null);
 


  //defining the state variables for universal access of variable
  const [addressAdded, setAddressAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [rate, setRateS] = useState(0);
  const [qty, setRQtyS] = useState(0);
  const [amount, setAmountS] = useState(0);
  let [cgst,setCgstS] = useState(0);
  let [sgst,setSgstS] = useState(0);
  let [ctax,setCtaxS] = useState(0);
  let [stax,setStaxS] = useState(0);
  let [totalTax,setTotalTaxS] = useState(0);
  let [grossAmount,setGrossAmountS] = useState(0);

  const newValuesFromDb = useSelector((state) => state.invoice); // Access the Redux state


  
  const [invoices, setInvoices] = useState([]); //State for fetching data from API

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);




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

  const numberOfRows = invoices.length;
  // console.log('Invoice values from database:--' + JSON.stringify(invoices, null, 2));

  const handleOpenModal = () => {
    setIsModalOpen(true);
    dispatch(openModal());
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    //dispatch(closeModal());
  };

    //Add the Company details Modal
  const handleAddressSubmit = (address) => {
    setAddressAdded(true);
    setIsModalOpen(false); // Close the modal
  };


  //View the Company details Modal
  const handleViewCompanyModal = () => {
    isViewModalOpen(true); // Close the modal
  };

  const closeViewCompanyModal = () => {
    isViewModalOpen(false); // Close the modal
  };
/// Change the tax rates as per your requirement
  const taxRates = {
    'Fly Ash Bricks-White': { cgst: 6, sgst: 6 },
    'Fly Ash Bricks-Brown': { cgst: 6, sgst: 6 },
    'Fly Ash Bricks-Normal': { cgst: 6, sgst: 6 },
    'Solid Bricks-8': { cgst: 18, sgst: 18 },
    'Solid Bricks-6': { cgst: 18, sgst: 18 }
  };

//When Item name is selected, the tax rates are fetched from the taxRates object
  const handleItemNameChange = (e) => {
    const { value } = e.target;
    const selectedItem = taxRates[value];
    setSelectedItem(selectedItem);
    setCgstS(selectedItem.cgst)
    setSgstS(selectedItem.sgst)
    dispatch(setItemName(value));
  };


  let [SelectedInvoice,setSelectedInvoice] = useState(0);

  const handleOpenViewModal = (SrNo) => {
    console.log(SrNo)
    setSelectedInvoice(SrNo);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
  
  };
  
  const handleItemChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'name') {
      const selectedItem = taxRates[value];


      setSelectedItem(selectedItem);
    }

    if (name === 'rate') {
      setRateS(value);
    }

    if (name === 'qty') {
      setRQtyS(value);
    }

if (name === 'qty' || name === 'rate') {
  const newQty = name === 'qty' ? value : qty;
  const newRate = name === 'rate' ? value : rate;
  const newAmount = newQty * newRate || 0;
  const newCtax = newAmount * cgst * 0.01;
  const newStax = newAmount * sgst * 0.01;
  const newTotalTax = newCtax + newStax;
  const newGrossAmount = newAmount + newTotalTax;


  setAmountS(newAmount);
  setCtaxS(newCtax);
  setStaxS(newStax);
  setTotalTaxS(newTotalTax);
  setGrossAmountS(newGrossAmount);
  setQty(newQty);
  let words=numberToWords(newGrossAmount);
  dispatch(SetAmountWords(words));
  dispatch(setAmount(newAmount));
  dispatch(setCtax(newCtax));
  dispatch(setStax(newStax));
  dispatch(setTotalTax(newTotalTax));
  dispatch(setGrossAmount(newGrossAmount));
  dispatch(setQty(newQty));
  dispatch(setRate(newRate));
  dispatch(setCgst(cgst));
  dispatch(setSgst(sgst));
}
  };

  const handleInsert = async () => {
    try {
      console.log('newValuesFromDb:', JSON.stringify(formState, null, 2));
      const newValues = await axios.post('https://sgmnewinvoice.onrender.com/api/insertInvoice', newValuesFromDb);
      console.log(newValues.data);
      alert('Data inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
      alert('Error inserting data');
    }
  };

  const saveInvoice = async (e) => {
    e.preventDefault();
    await handleInsert();
    window.location.reload(); // Refresh the page
  };

  const handleEdit = (srNo) => {
    console.log("Editing SrNo:--" + srNo);
    navigate('/edit/' + srNo);
  };
  
  return (
    <div>
      {console.log("No of rows from database:--" + numberOfRows)}
      <form
        onSubmit={saveInvoice}
        className="w-screen mx-auto mt-2 p-2  rounded-sm shadow"
      >
        <div className="overflow-x-auto ">
          <table className="">
            <thead className='bg-black rounded-sm text-white text-left p-10'>
              <tr>
                <th className=" ">Date</th>
                <th className=" ">Invoice No</th>
                <th className=" ">
                  Add Company details
                </th>
                <th className=" ">Transport</th>
                <th className=" ">Payment</th>
                <th className=" ">Item Name</th>
                <th className=" ">Quantity</th>
                <th className=" ">Rate</th>
                <th className=" ">Amount</th>
                <th className=" ">CGST (%)</th>
                <th className=" ">SGST (%)</th>
                <th className="">CTax</th>
                <th className=" ">STax</th>
                <th className=" ">Total Tax</th>
                <th className=" ">Gross Amount</th>
                <th className=" ">Actions</th>
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: numberOfRows }).map((_, index) => (
                <tr key={index} className="table-row table-row-gap table-column-gap">
                  <td className="excel-view">{invoices[index]?.Date}</td>
                  <td className="excel-view">{invoices[index]?.InvoiceNo}</td>
                  <td className="excel-view">
                    <button
                      type="button"
                      onClick={() => handleOpenViewModal(invoices[index].SrNo)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      {invoices[index]?.CompanyName}
                    </button>
                  </td>
                  <td className="excel-view">{invoices[index]?.Transport}</td>
                  <td className="excel-view">{invoices[index]?.Payment}</td>
                  <td className="excel-view">{invoices[index]?.itemName}</td>
                  <td className="excel-view">{invoices[index]?.Quantity}</td>
                  <td className="excel-view">{invoices[index]?.Rate}</td>
                  <td className="excel-view">{invoices[index]?.Amount}</td>
                  <td className="excel-view">{invoices[index]?.cgst}</td>
                  <td className="excel-view">{invoices[index]?.sgst}</td>
                  <td className="excel-view">{invoices[index]?.ctax}</td>
                  <td className="excel-view">{invoices[index]?.stax}</td>
                  <td className="excel-view">{invoices[index]?.TotalTax}</td>
                  <td className="excel-view">{invoices[index]?.Amount}</td>
                  <td className="excel-view">
                    <button
                      type="button"
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                      onClick={() => handleEdit(invoices[index].SrNo)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                      onClick={() => handleDelete(invoices[index].SrNo)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="excel-view">
                  <input
                    type="date"
                    name="date"
                    onChange={(e) => dispatch(setDate(e.target.value))}
                    className="w-full p-1"
                  />
                </td>
                <td className="excel-view">
                  <input
                    type="text"
                    name="invoiceNo"
                    onChange={(e) => dispatch(setInvoiceNo(e.target.value))}
                    className="w-full p-1"
                  />
                </td>
                <td className="excel-view">
                  {addressAdded ? (
                    <div className="p-2 bg-green-100 border border-green-500 rounded">
                      <span className="text-green-700"></span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleOpenModal}
                      className="w-full p-1 bg-green-500 text-white rounded"
                    >
                      Add
                    </button>
                  )}
                </td>
                <td className="excel-view">
                  <select
                    name="transport"
                    onChange={(e) => dispatch(setTransport(e.target.value))}
                    className="w-full"
                  >
                    <option value="" disabled selected>
                      Select Transport
                    </option>
                    <option value="SGM">SGM</option>
                    <option value="Own">Own</option>
                  </select>
                </td>
                <td className="excel-view">
                  <select
                    name="payment"
                    onChange={(e) => dispatch(setPayment(e.target.value))}
                    className="w-full"
                  >
                    <option value="" disabled selected>
                      Select Payment
                    </option>
                    <option value="Cash">Cash</option>
                    <option value="Online/Gpay">Online/Gpay</option>
                  </select>
                </td>
                <td className="excel-view">
                  <select
                    name="name"
                    onChange={handleItemNameChange}
                    className="w-full"
                  >
                    <option value="" disabled selected>
                      Select Item
                    </option>
                    <option value="Fly Ash Bricks-White">
                      Fly Ash Bricks-White
                    </option>
                    <option value="Fly Ash Bricks-Brown">
                      Fly Ash Bricks-Brown
                    </option>
                    <option value="Fly Ash Bricks-Normal">
                      Fly Ash Bricks-Normal
                    </option>
                    <option value="Solid Bricks-8">Solid Bricks-8"</option>
                    <option value="Solid Bricks-6">Solid Bricks-6"</option>
                  </select>
                </td>
                <td className="excel-view">
                  <input
                    type="number"
                    name="qty"
                    onChange={handleItemChange}
                    className="w-full p-1"
                  />
                </td>
                <td className="excel-view">
                  <input
                    type="number"
                    name="rate"
                    onChange={handleItemChange}
                    className="w-full p-1"
                  />
                </td>
                <td className="excel-view">{amount.toFixed(2)}</td>
                <td className="excel-view">{cgst}</td>
                <td className="excel-view">{sgst}</td>
                <td className="excel-view">{ctax.toFixed(2)}</td>
                <td className="excel-view">{stax.toFixed(2)}</td>
                <td className="excel-view">{totalTax.toFixed(2)}</td>
                <td className="excel-view">{grossAmount.toFixed(0)}</td>
                <td className="excel-view">
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={saveInvoice}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                    
                  
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
      <AddressModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddressSubmit}
        initialValues={formState}
      />
      <ViewCompanyDetails
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        onSubmit={handleViewCompanyModal}
        initialValues={SelectedInvoice}
      />
    </div>
  );
};

export default InvoiceEntry;