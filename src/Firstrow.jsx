import React, { useState } from 'react';

export default function Firstrow() {
  const [formData, setFormData] = useState({
    address1: '',
    address2: '',
    address3: '',
    address4: '',
    address6: '',
    items: Array(8).fill({
      item1: '',
      description: '',
      pack: '',
      hsn: '',
      qty: '',
      rate: '',
      amount: 0,
    }),
    accNo: '',
    ifscCode: '',
    bankName: '',
    branch: '',
    paymentMode: '',
    transportMode: '',
    cgstPercent: 0,
    sgstPercent: 0,
    cgstAmount: 0,
    sgstAmount: 0,
    grossAmount: 0,
    totalTax: 0,
    totalAmount: 0,
    totalTaxInWords: '',
    date: '',
    invoiceNo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      {/* Address and Date */}
      <div className="grid grid-cols-7 my-border">
        <div className="col-span-5">
          <select
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            className="w-full h-8"
          >
            <option value="" className="w-full h-8">Select Address</option>
            <option value="Address 1">Address 1</option>
            <option value="Address 2">Address 2</option>
            <option value="Address 3">Address 3</option>
          </select>
        </div>

        <div className="col-span-2 font-semibold">
          <div className="grid grid-cols-[30%_70%]">
            <div className="text-left">Date</div>
            <div>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 h-8"
                placeholder="Date"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Address and Blank */}
      <div className="grid grid-cols-7">
        <div className="col-span-5 b">
          <input
            type="text"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            className="w-full h-8"
            placeholder="Address 1"
          />
        </div>
        <div className="col-span-2 font-semibold text-center">
          <div className="grid grid-cols-[30%_70%]"></div>
        </div>
      </div>
      {/* Address and Invoice No */}
      <div className="grid grid-cols-7 b my-border">
        <div className="col-span-5 b">
          <input
            type="text"
            name="address3"
            value={formData.address3}
            onChange={handleChange}
            className="w-full h-8"
            placeholder="Address 2"
          />
        </div>
        <div className="col-span-2 font-semibold">
          <div className="grid grid-cols-[30%_70%]">
            <div className="b text-left">Invoice No:-</div>
            <div className="b">
              <input
                type="text"
                name="invoiceNo"
                value={formData.invoiceNo}
                onChange={handleChange}
                className="w-full h-9"
                placeholder="Invoice No"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Address and Delivery Mode */}
      <div className="grid grid-cols-7 b">
        <div className="col-span-5 b">
          <input
            type="text"
            name="address4"
            value={formData.address4}
            onChange={handleChange}
            className="w-full h-8"
            placeholder="Address 3"
          />
        </div>
        <div className="col-span-2 font-semibold">
          <div className="grid grid-cols-[30%_70%]">
            <div className="b text-left">Delivery Mode:-</div>
            <div className="b">
              <select
                name="transportMode"
                value={formData.transportMode}
                onChange={handleChange}
                className="w-full h-8"
              >
                <option value="">Select Transport Mode:-</option>
                <option value="SGM Transport">SGM Transport</option>
                <option value="Own Transport">Own Transport</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* Address 4 and Payment */}
      <div className="grid grid-cols-7 my-border">
        <div className="col-span-5 b">
          <input
            type="text"
            name="address6"
            value={formData.address6}
            onChange={handleChange}
            className="w-full h-8"
            placeholder="Address 4"
          />
        </div>
        <div className="col-span-2 font-semibold">
          <div className="grid grid-cols-[30%_70%]">
            <div className="b text-left">Payment Mode:-</div>
            <div className="b">
              <select
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
                className="w-full h-8"
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
    </div>
  );
}
