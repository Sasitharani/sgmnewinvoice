import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import {

  setTotalTax,
  setTotalAmount,
  setDate,
  setInvoiceNo,
  setNumItems,
  setTransport,
  setPayment,
  setFinalAmount,
  setCtax,
  setStax,
  setGrossAmount, 
  openModal,


} from './invoiceSlice';
import { useNavigate } from 'react-router-dom';
import AddressModal from './AddressModal';

const InvoiceEntry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formStateOld = useSelector((state) => state.invoice); // Use the Redux state
 let [isModalOpen, setIsModalOpen] = useState(false); // Define setIsModalOpen
 const [selectedItem, setSelectedItem] = useState({});
 const [rate,setRate ] = useState({});
 const [qty,setQty ] = useState({});
 const [cgst,setCgstS ] = useState({});
 const [sgst,setSgstS ] = useState({});
 const [ctax,setcstax ] = useState({});
 const [stax,setstax ] = useState({});
 const [taxamount,settaxamount ] = useState({});
 const [grossAmount,setgrossAmount ] = useState({});
 const [amount,setAmount ] = useState({});

  const [addressAdded, setAddressAdded] = useState(false);
  const [formState, setFormState] = useState({
    totalGrossAmount: 0,
    cgstAmount: 0,
    sgstAmount: 0,
    cgst: 0,
    sgst: 0,
    totalTax: 0,
    totalAmount: 0,
    date: '',
    invoiceNo: '',
    companyname: '',
    gst: '',
    flatDoorNo: '',
    street1: '',
    street2: '',
    townCity: '',
    state: '',
    pin: '',
    numItems: 1,
    transport: '',
    payment: '',
    finalAmount: 0,
    Ctax: 0,
    Stax: 0,
    totalGrossAmount: 0,
    grossAmount: 0,
    CgstAmount: 0,
    SgstAmount: 0,
    Cgst: 0,
    Sgst: 0,
    savedAddresses: []
  });
  // useEffect(() => {
  //   // Fetch data from the API when the component mounts
  //   axios.get('https://sgmnewinvoice.onrender.com/api/invoices')
  //     .then(response => {
  //       const invoiceData = response.data[0]; // Assuming you want to display the first invoice
  //       if (invoiceData && invoiceData.address) {
  //         setFormState({
  //           ...formState,
  //           date: invoiceData.date,
  //           invoiceNo: invoiceData.invoiceNo,
  //           address: invoiceData.address,
  //           companyname: invoiceData.companyname,
  //           add1: invoiceData.add1,
  //           street1: invoiceData.address.street1,
  //           street2: invoiceData.address.street2,
  //           town: invoiceData.address.townCity,
  //           state: invoiceData.address.state,
  //           pin: invoiceData.address.pin,
  //           numItems: invoiceData.items.length,
  //           transport: invoiceData.transport,
  //           payment: invoiceData.payment,
  //           finalAmount: invoiceData.totalAmount,
  //           totalTax: invoiceData.totalTax,
  //           amount: invoiceData.amount,
  //           rate: invoiceData.rate,
  //           qty: invoiceData.qty,
  //           cgst: invoiceData.cgst,
  //           sgst: invoiceData.sgst,
  //           ctax: invoiceData.ctax,
  //           stax: invoiceData.stax,
  //         });
  //         setAddressAdded(true);
  //       } else {
  //         console.error('Error');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, [dispatch]);

  useEffect(() => {
    const tempSample = () => {
      setFormState({
        date: "2023-01-01",
        invoiceNo: "INV123",
        address: "123 Sample Street",
        companyname: "Sample Company",
        gst: "1234567890",
        flatDoorNo: "123",
        street1: "Sample Street 1",
        street2: "Sample Street 2",
        townCity: "Sample Town",
        state: "Sample State",
        pin: "123456",
        numItems: 1,
        transport: "Sample Transport",
        payment: "Sample Payment",
        finalAmount: 0,
        totalTax: 0,
        name: "",
        qty: 2000,
        rate: 7,
        amount: 0,
        cgst: 0,
        sgst: 0,
        ctax: 0,
        stax: 0,
        totalTax: 0,
        grossAmount: 0,
      });
    };
  
    tempSample();
  }, []);

  const handleOpenModal = () => {
    isModalOpen=true;
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    isModalOpen=false;
    dispatch(closeModal());
  };

  const handleAddressSubmit = (address) => {
    dispatch(updateAddress(address));
    setAddressAdded(true);
    setIsModalOpen(false); // Close the modal
    dispatch(closeModal());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setDate(value));
    dispatch(setInvoiceNo(value));
    dispatch(setCompanyName(value));
    dispatch(setGst(value));
    dispatch(setFlatDoorNo(value));
    dispatch(setStreet1(value));
    dispatch(setStreet2(value));
    dispatch(setTownCity(value));
    dispatch(setState(value));
    dispatch(setPin(value));
    dispatch(setTransport(value));
    dispatch(setPayment(value));
    dispatch(setFinalAmount(value));
    dispatch(setCtax(value));
    dispatch(setStax(value));
    dispatch(setGrossAmount(value));
    dispatch(setSavedAddresses(value));
  };

  const dateChange = (e) => {}
  const invoiceNoChange = (e) => {}
  // const  = (e) => {}
  // const  = (e) => {}
  // const  = (e) => {}
  // const  = (e) => {}
  // const  = (e) => {}
  // const  = (e) => {}
  // const  = (e) => {}
  // const  = (e) => {}
  // const  = (e) => {}
  // const  = (e) => {}
  // const  = (e) => {}
  // const  = (e) => {}
  // const  = (e) => {}

  const handleNumItemsChange = (e) => {
    const numItems = parseInt(e.target.value, 10) || 1;
    dispatch(setNumItems(numItems));
  };

  const taxRates = {
    'Fly Ash Bricks-White': { cgst: 6, sgst: 6 },
    'Fly Ash Bricks-Brown': { cgst: 6, sgst: 6 },
    'Fly Ash Bricks-Normal': { cgst: 6, sgst: 6 },
    'Solid Bricks-8': { cgst: 18, sgst: 18 },
    'Solid Bricks-6': { cgst: 18, sgst: 18 },
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    if(name==='name') {
      const selectedItem = taxRates[value];
      setSelectedItem(selectedItem);
      setCgstS( selectedItem.cgst);
      setSgstS( selectedItem.sgst);
    }


    if(name==='rate') {setRate(value)}

    if(name==='qty' ) {setQty(value)}

    if (name === 'qty' || name === 'rate') {
      let amount = qty * rate || 0;
      let ctax = amount * cgst * 0.01;
      let stax = amount * sgst * 0.01;
      let taxamount = ctax + stax;
      let grossAmount = amount + taxamount;

      // setAmount(amount);
      // setcstax(ctax);
      // setstax(stax);
      // settaxamount(taxamount);
      // setgrossAmount(grossAmount);
   
      dispatch(setRate(rate));
      dispatch(setAmount(amount));
      dispatch(setCtax(ctax));
      dispatch(setStax(stax));
      dispatch(setTotalTax(totalTax));
      dispatch(setGrossAmount(grossAmount));
    }

  };

  const addItemRow = () => {
    dispatch(updateItem({
      name: 'items',
      value: [
        {
          date: '',
          invoiceNo: '',
          address: '',
          companyname: '',
          gst: '',
          flatDoorNo: '',
          street1: '',
          street2: '',
          townCity: '',
          state: '',
          pin: '',
          numItems: 1,
          transport: '',
          payment: '',
          finalAmount: 0,
          totalTax: 0,
          name: '',
          quantity: 0,
          rate: 0,
          amount: 0,
          cgst: 0, 
          sgst: 0,
          ctax: 0, 
          stax: 0,
          totalTax: 0,
          grossAmount: 0,
        },
      ],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTotalAmount(formState.finalAmount));
    dispatch(setInvoiceData(formState));
    dispatch(setTotalTax(formState.totalTax));
    navigate('/invoice');
  };

  const addAddress = () => {
    setIsModalOpen(true)
    dispatch(openModal());
  };

  const saveInvoice = () => {
    Swal.fire({
      title: 'Confirm Save',
      html: `
        <p><strong>Invoice No:</strong> ${formState.invoiceNo}</p>
        <p><strong>Company Name:</strong> ${formState.companyname}</p>
        <p><strong>Date:</strong> ${formState.date}</p>
        <p><strong>GST:</strong> ${formState.gst}</p>
        <p><strong>Door No:</strong> ${formState.flatDoorNo}</p>
        <p><strong>Street 1:</strong> ${formState.street1}</p>
        <p><strong>Street 2:</strong> ${formState.street2}</p>
        <p><strong>Town:</strong> ${formState.townCity}</p>
        <p><strong>City:</strong> ${formState.city}</p>
        <p><strong>State:</strong> ${formState.state}</p>
        <p><strong>Pincode:</strong> ${formState.pin}</p>
        <p><strong>Amount:</strong> ${formState.amount}</p>
        <p><strong>Amount:</strong> ${formState.rate}</p>
        <p><strong>Amount:</strong> ${formState.qty}</p>
        <p><strong>Amount:</strong> ${formState.ctax}</p>
        <p><strong>Amount:</strong> ${formState.stax}</p>

        <p><strong>Total Amount:</strong> ${formState.totalAmount}</p>
        <p><strong>Total Tax:</strong> ${formState.totalTax}</p>
        <p><strong>Total Gross Amount:</strong> ${formState.totalGrossAmount}</p>
      `,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post('https://sgmnewinvoice.onrender.com/api/invoices', formState)
          .then(response => {
            console.log('Invoice saved:', response.data);
            // Optionally, you can reset the form or navigate to another page
          })
          .catch(error => {
            console.error('Error saving invoice:', error);
          });
      }
    });
  };

  return (
    <div>
      {console.log(formState)}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-screen-xl mx-auto mt-10 p-6 border border-gray-300 rounded shadow"
        style={{ margin: "30px" }}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Date</th>
                <th className="border border-gray-300 p-2">Invoice No</th>
                <th className="border border-gray-300 p-2">
                  Add Company details
                </th>{" "}
                {/* New column for Add Address */}
                <th className="border border-gray-300 p-2">Transport</th>
                <th className="border border-gray-300 p-2">Payment</th>
                <th className="border border-gray-300 p-2">Item Name</th>
                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">Rate</th>
                <td className="border border-gray-300 p-2">Amount</td>
                <td className="border border-gray-300 p-2">Cgst</td>
                <td className="border border-gray-300 p-2">Sgst</td>
                <td className="border border-gray-300 p-2">Ctax</td>
                <td className="border border-gray-300 p-2">Stax</td>
                <td className="border border-gray-300 p-2">Total Tax</td>
                <td className="border border-gray-300 p-2">Gross Amount</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">
                  <input
                    type="date"
                    name="date"
                    onChange={dateChange}
                    className="w-full p-1"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    name="invoiceNo"
                    onChange={invoiceNoChange}
                    className="w-full p-1"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  {addressAdded ? (
                    <div className="p-2 bg-green-100 border border-green-500 rounded">
                      <span className="text-green-700"></span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={addAddress}
                      className="w-full p-1 bg-green-500 text-white rounded"
                    >
                      Add{" "}
                    </button>
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  <select
                    name="name"
                    onChange={handleItemChange}
                    className="w-full"
                  >
                    <option value="" disabled>
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
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    name="qty"
                    onChange={handleItemChange}
                    className="w-full p-1"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    name="rate"
                    onChange={handleItemChange}
                    className="w-full p-1"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  {amount.toFixed(2)}
                </td>
                <td className="border border-gray-300 p-2">
                  {selectedItem.cgst}
                  </td>
                <td className="border border-gray-300 p-2">
                  {selectedItem.sgst}
                  </td>
                <td className="border border-gray-300 p-2">
                  {ctax.toFixed(2)}
                </td>
                <td className="border border-gray-300 p-2">
                  {stax.toFixed(2)}
                </td>
                <td className="border border-gray-300 p-2">
                  {taxamount.toFixed(2)}
                </td>
                <td className="border border-gray-300 p-2">
                  {grossAmount.toFixed(2)}
                </td>
           
                  <td className="border border-gray-300 p-2">
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={addItemRow}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Add New
                      </button>
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
    </div>
  );
};

export default InvoiceEntry;
