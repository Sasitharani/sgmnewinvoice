import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';


import {
  setCompanyName,
  setGst,
  setFlatDoorNo,
  setStreet1,
  setStreet2,
  setTownCity,
  setState,
  setPin,
}from './invoiceSlice';


const AddressModal = ({ isOpen, onClose, onSubmit, initialValues }) => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState({
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
    if (initialValues) {
      setAddress({
        companyname: initialValues.companyname,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
    console.log(address)
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setCompanyName(address.companyName));
    dispatch(setGst(address.gst));
    dispatch(setFlatDoorNo(address.flatDoorNo));
    dispatch(setStreet1(address.street1));
    dispatch(setStreet2(address.street2));
    dispatch(setTownCity(address.townCity));
    dispatch(setState(address.state));
    dispatch(setPin(address.pin));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal ">
      <div className="modal-content ">
        <span className="close cursor-pointer text-xl font-bold" onClick={onClose}>&times;</span>
        <h2 className="text-2xl mb-4">Enter Address Details</h2>
        <input
          name="companyName"
          placeholder="Company Name"
          value={address.companyName}
          onChange={handleChange}
          className="inside-modal"
        />
        <input
          name="gst"
          placeholder="GST"
          value={address.gst}
          onChange={handleChange}
          className="inside-modal"
        />
        <input
          name="flatDoorNo"
          placeholder="Flat Door No"
          value={address.flatDoorNo}
          onChange={handleChange}
          className="inside-modal"
        />
        <input
          name="street1"
          placeholder="Street 1"
          value={address.street1}
          onChange={handleChange}
          className="inside-modal"
        />
        <input
          name="street2"
          placeholder="Street 2"
          value={address.street2}
          onChange={handleChange}
          className="inside-modal"
        />
        <input
          name="townCity"
          placeholder="Town/City"
          value={address.townCity}
          onChange={handleChange}
          className="inside-modal"
        />
        <input
          name="state"
          placeholder="State"
          value={address.state}
          onChange={handleChange}
          className="inside-modal"
        />
        <input
          name="pin"
          placeholder="Pincode"
          value={address.pin}
          onChange={handleChange}
          className="inside-modal"
        />
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </div>
    </div>
  );
};

export default AddressModal;