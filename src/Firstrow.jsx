import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInvoiceData } from './invoiceSlice';

const Firstrow = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.invoice);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setInvoiceData({ ...formData, [name]: value }));
  };
  console.log(formData)
  const { add1, street1, street2, town, state,pin, date, invoiceNo, transportMode, paymentMode,companyname } = useSelector((state) => state.invoice);
  return (
    <div>
      {/* Address and Date */}
      <div className="grid grid-cols-7 my-border">
        <div className="col-span-5">
        <input
                type="text"
                name="companyname"
                value={formData.companyname}
                onChange={handleChange}
                className="w-full p-3 h-8"
                placeholder="Name of the Company"
              />
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
            value={formData.add1}
            onChange={handleChange}
            className="w-full p-3 h-8"
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
            value={formData.street1}
            onChange={handleChange}
            className="w-full h-8 p-3"
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
            value={formData.street2}
            onChange={handleChange}
            className="w-full h-8 p-3"
            placeholder="Address 3"
          />
        </div>
        <div className="col-span-2 font-semibold">
          <div className="grid grid-cols-[30%_70%]">
            <div className="b text-left">Delivery Mode:-</div>
            <div className="b">
            <input
                type="text"
                name="invoiceNo"
                value={formData.transport}
                className="w-full h-9 "
                
              />
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
            value={formData.town}
            onChange={handleChange}
            className="w-full h-8 p-3"
            placeholder="town"
          />
        </div>
        <div className="col-span-2 font-semibold">
          <div className="grid grid-cols-[30%_70%]">
            <div className="b text-left">Payment Mode:-</div>
            <input
                type="text"
                name="invoiceNo"
                value={formData.payment}
                className="w-full h-9"
               
              />
          </div>
        </div>
      </div>
      {/* Pin and Blank */}
      <div className="grid grid-cols-7 my-border">
        <div className="col-span-5 b">
          <input
            type="text"
            name="Pin"
            value={formData.pin}
            onChange={handleChange}
            className="w-full h-8 p-3"
            placeholder="Pin Code"
          />
        </div>
        <div className="col-span-2 font-semibold">
          <div className="grid grid-cols-[30%_70%]">
            <div className="b text-left"></div>
          
          </div>
        </div>
      </div>
    </div>
  );
                };

                export default Firstrow;
