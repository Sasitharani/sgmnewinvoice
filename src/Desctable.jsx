import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateItem } from './invoiceSlice';

const Desctable = () => {
    const {
      invoiceData: {
        date,
        invoiceNo,
        address,
        companyname,
        add1,
        street1,
        street2,
        town,
        state,
        pin,
        transport,
        payment,
        items,
        finalAmount,
        totalTax,
        Ctax: ctax,
        Stax: stax,
        rate,
        qty,
        totalAmount,
      },
      numItems,
      totalGrossAmount,
      CgstAmount: cgstAmount,
      SgstAmount: sgstAmount,
    } = useSelector((state) => state.invoice);



  const dispatch = useDispatch();
  useEffect(() => { items.forEach((item, index) => { console.log(`${index + 1}: ${JSON.stringify(item)} -----Items Array`); }); }, [items]);

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItem = { ...items[index], [name]: value };
    dispatch(updateItem({ index, item: updatedItem }));
  };

  const emptyRows = Array(8).fill({
    name: "",
    pack: "",
    hsn: "",
    qty: "",
    rate: "",
    amount: "",
  });

  return (
    <div>
      <div className="grid grid-cols-12 gap-y-0 mt-12 my-border">
        <div className="my-center h-8">S.No</div>
        <div className="my-center h-8 col-span-6 mb-3">Description</div>
        <div className="my-center h-8 mb-3">Pack</div>
        <div className="my-center h-8 mb-3">HSN</div>
        <div className="my-center h-8 mb-3">Qty</div>
        <div className="my-center h-8 mb-3">Rate</div>
        <div className="my-center h-8 mb-3">Amount</div>
      </div>
      {items.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-12 shadow gap-0 gap-y-0 h-8 border"
        >
          <div className="my-border-left my-center border">
            <input
              type="text"
              name="Sno"
              value={index + 1}
              readOnly
              className="w-full h-8"
              placeholder=""
            />
          </div>
          <div className="my-border-left my-center col-span-6 border">
            <input
              type="text"
              name="description"
              value={item.name}
              readOnly
              className="w-full h-8"
              placeholder=""
            />
          </div>
          <div className="my-border-left my-center border">
            <input
              type="text"
              name="pack"
              value={item.pack}
              readOnly
              className="w-full h-8"
              placeholder=""
            />
          </div>
          <div className="my-border-left my-center border">
            <input
              type="text"
              name="hsn"
              value={item.hsn}
              readOnly
              className="w-full h-8"
              placeholder=""
            />
          </div>
          <div className="my-border-left my-center border">
            <input
              type="text"
              name="qty"
              value={item.qty}
              readOnly
              className="w-full h-6"
              placeholder=""
            />
          </div>
          <div className="my-border-left my-center border">
            <input
              type="text"
              name="rate"
              value={item.rate}
              readOnly
              className="w-full"
              placeholder=""
            />
          </div>
          <div className="my-border-left my-center border">
            <input
              type="text"
              name="amount"
              value={item.amount}
              readOnly
              className="w-full h-8"
              placeholder={"Amount"}
            />
          </div>
        </div>
      ))}

      {/* // --------------------------------------------------------------------------------Empty Rows */}
      <div>
        {emptyRows.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-12 shadow gap-0 gap-y-0 h-8 border"
          >
            <div className="my-border-left my-center border">
              <input
                type="text"
                name="Sno"
                value=""
                readOnly
                className="w-full h-8"
                placeholder=""
              />
            </div>
            <div className="my-border-left my-center col-span-6 border">
              <input
                type="text"
                name="description"
                value={item.name}
                readOnly
                className="w-full h-8"
                placeholder=""
              />
            </div>
            <div className="my-border-left my-center border">
              <input
                type="text"
                name="pack"
                value={item.pack}
                readOnly
                className="w-full h-8"
                placeholder=""
              />
            </div>
            <div className="my-border-left my-center border">
              <input
                type="text"
                name="hsn"
                value={item.hsn}
                readOnly
                className="w-full h-8"
                placeholder=""
              />
            </div>
            <div className="my-border-left my-center border">
              <input
                type="text"
                name="qty"
                value={qty}
                readOnly
                className="w-full h-8"
                placeholder=""
              />
            </div>
            <div className="my-border-left my-center border">
              <input
                type="text"
                name="rate"
                value={rate}
                readOnly
                className="w-full"
                placeholder=""
              />
            </div>
            <div className="my-border-left my-center border">
              <input
                type="text"
                name="amount"
                value=""
                readOnly
                className="w-full h-8"
                placeholder=""
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Desctable;
