import React from 'react';
import { useSelector } from 'react-redux';

const SliceDetails = () => {
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
    grossAmount,
    totalGrossAmount,
    CgstAmount: cgstAmount,
    SgstAmount: sgstAmount,
  } = useSelector((state) => state.invoice);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
      <div className="space-y-2">
        <div><strong>Date:</strong> {date}</div>
        <div><strong>Invoice No:</strong> {invoiceNo}</div>
        <div><strong>Address:</strong> {address}</div>
        <div><strong>Company Name:</strong> {companyname}</div>
        <div><strong>Door No/Flat No/Bld No:</strong> {add1}</div>
        <div><strong>Street-1:</strong> {street1}</div>
        <div><strong>Street-2:</strong> {street2}</div>
        <div><strong>Town/City/Village:</strong> {town}</div>
        <div><strong>State:</strong> {state}</div>
        <div><strong>Pin Code:</strong> {pin}</div>
        <div><strong>Transport:</strong> {transport}</div>
        <div><strong>Payment Method:</strong> {payment}</div>
        <div><strong>Number of Items:</strong> {numItems}</div>
        <div><strong>Total Gross Amount:</strong> {totalGrossAmount}</div>
        <div><strong>Total Tax:</strong> {totalTax}</div>
        <div><strong>CGST Amount:</strong> {cgstAmount}</div>
        <div><strong>SGST Amount:</strong> {sgstAmount}</div>
        <div><strong>Rate</strong> {rate}</div>
        <div><strong>QTY</strong> {qty}</div>
        <div><strong>Total Amount</strong> {totalAmount}</div>
        <div><strong>CTax:</strong> {ctax}</div>
        <div><strong>STax:</strong> {stax}</div>
        <div><strong>Final Amount:</strong> {finalAmount}</div>
      </div>
      <h3 className="text-lg font-bold mt-4">Items</h3>
      {items.map((item, index) => (
        <div key={index} className="space-y-1 border-t pt-2 mt-2">
          <div><strong>Item {index + 1} Name:</strong> {item.name}</div>
          <div><strong>Quantity:</strong> {item.qty}</div>
          <div><strong>Rate:</strong> {item.rate}</div>
          <div><strong>Amount:</strong> {item.amount}</div>
          <div><strong>CGST:</strong> {item.Cgst}</div>
          <div><strong>SGST:</strong> {item.Sgst}</div>
          <div><strong>CTax:</strong> {item.ctax}</div>
          <div><strong>STax:</strong> {item.stax}</div>
          <div><strong>Total Tax:</strong> {item.totalTax}</div>
          <div><strong>Gross Amount:</strong> {item.grossAmount}</div>
        </div>
      ))}
    </div>
  );
};

export default SliceDetails;
