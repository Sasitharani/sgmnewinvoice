// AddressModal.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddress, closeModal } from './invoiceSlice';

const AddressModal = () => {
  const [address, setAddress] = useState({
    flatDoorNo: '',
    street1: '',
    street2: '',
    townCity: '',
    state: '',
    pin: ''
  });

  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.invoice.isModalOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(updateAddress(address));
    dispatch(closeModal());
  };

  if (!isOpen) return null;

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-96">
        <span className="close cursor-pointer text-xl font-bold" onClick={() => dispatch(closeModal())}>&times;</span>
        <h2 className="text-2xl mb-4">Enter Address Details</h2>
        <input
          name="flatDoorNo"
          placeholder="Flat Door No"
          onChange={handleChange}
          className="input-box w-full p-2 mb-2 border border-gray-300 rounded bg-gray-100"
        />
        <input
          name="street1"
          placeholder="Street 1"
          onChange={handleChange}
          className="input-box w-full p-2 mb-2 border border-gray-300 rounded bg-gray-100"
        />
        <input
          name="street2"
          placeholder="Street 2"
          onChange={handleChange}
          className="input-box w-full p-2 mb-2 border border-gray-300 rounded bg-gray-100"
        />
        <input
          name="townCity"
          placeholder="Town/City"
          onChange={handleChange}
          className="input-box w-full p-2 mb-2 border border-gray-300 rounded bg-gray-100"
        />
        <input
          name="state"
          placeholder="State"
          onChange={handleChange}
          className="input-box w-full p-2 mb-2 border border-gray-300 rounded bg-gray-100"
        />
        <input
          name="pin"
          placeholder="Pin"
          onChange={handleChange}
          className="input-box w-full p-2 mb-4 border border-gray-300 rounded bg-gray-100"
        />
        <button onClick={handleSubmit} className="submit-button w-full p-2 bg-green-500 text-white rounded">Submit</button>
      </div>
    </div>
  );
};

export default AddressModal;