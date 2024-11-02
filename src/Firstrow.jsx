import React from 'react';
import { useSelector } from 'react-redux';

const Firstrow = () => {
  const invoiceData = useSelector((state) => state.invoice.invoiceData);

  const spanStyle = {
    display: 'inline-block',
    paddingLeft: '3px',
    height: '8px',
    lineHeight: '8px',
    width: '100%',
    textAlign: 'left',
  };

  // Function to format date as dd-mm-yy
  const formatDate = (dateString) => {
    if (!dateString) return 'Date';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  return (
    <div>
      {/* Company Name and Date */}
      <div className="grid grid-cols-7 my-border">
        <div className="col-span-5">
          <span style={spanStyle}>
            {invoiceData.companyname || 'Name of the Company'}
          </span>
        </div>
        <div className="col-span-2 font-semibold">
          <div className="grid grid-cols-[30%_70%]">
            <div className="text-left">Date</div>
            <div>
              <span style={spanStyle}>
                {formatDate(invoiceData.date)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Address 1 */}
      <div className="grid grid-cols-7">
        <div className="col-span-5">
          <span style={spanStyle}>
            {invoiceData.add1 || 'Address 1'}
          </span>
        </div>
        <div className="col-span-2 font-semibold text-center"></div>
      </div>

      {/* Address 2 and Invoice No */}
      <div className="grid grid-cols-7 my-border">
        <div className="col-span-5">
          <span style={spanStyle}>
            {invoiceData.street1 || 'Address 2'}
          </span>
        </div>
        <div className="col-span-2 font-semibold">
          <div className="grid grid-cols-[30%_70%]">
            <div className="text-left">Invoice No:</div>
            <div>
              <span style={spanStyle}>
                {invoiceData.invoiceNo || 'Invoice No'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Address 3 and Delivery Mode */}
      <div className="grid grid-cols-7">
        <div className="col-span-5">
          <span style={spanStyle}>
            {invoiceData.street2 || 'Address 3'}
          </span>
        </div>
        <div className="col-span-2 font-semibold">
          <div className="grid grid-cols-[30%_70%]">
            <div className="text-left">Delivery Mode:</div>
            <div>
              <span style={spanStyle}>
                {invoiceData.transport || 'Delivery Mode'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Town and Payment Mode */}
      <div className="grid grid-cols-7 my-border">
        <div className="col-span-5">
          <span style={spanStyle}>
            {invoiceData.town || 'Town'}
          </span>
        </div>
        <div className="col-span-2 font-semibold">
          <div className="grid grid-cols-[30%_70%]">
            <div className="text-left">Payment Mode:</div>
            <div>
              <span style={spanStyle}>
                {invoiceData.payment || 'Payment Mode'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pin Code */}
      <div className="grid grid-cols-7 my-border">
        <div className="col-span-5">
          <span style={spanStyle}>
            {invoiceData.pin || 'Pin Code'}
          </span>
        </div>
        <div className="col-span-2 font-semibold"></div>
      </div>
    </div>
  );
};

export default Firstrow;
