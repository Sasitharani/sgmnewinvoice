import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css'; // Import the custom CSS file

const Firstrow = ({ srNo }) => {
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      if (srNo) {
        try {
          const response = await axios.get(`https://sgmnewinvoice.onrender.com/api/invoices/${srNo}`);
          setInvoiceData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchInvoiceData();
  }, [srNo]); // Dependency array includes srNo to ensure it runs when srNo changes

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
    <table className="border-collapse border border-black w-full">
      <tbody>
        {/* Company Name and Date */}
        <tr className="h-8">
          <td className="border border-black ps-3" colSpan="5">{invoiceData?.CompanyName || 'Name of the Company'}</td>
          <td className='w-96 border border-black text-left ps-3'>&nbsp;</td>
          <td className='w-96 border border-black text-left ps-3'>&nbsp;</td>
          <td className="border border-black text-left ps-3 font-semibold">Date:-</td>
          <td className="border border-black">{formatDate(invoiceData?.Date)}</td>
        </tr>

        {/* Address 1 */}
        <tr className="h-8">
          <td className="border border-black ps-3" colSpan="5">{invoiceData?.DoorNo || 'Name of the Company'}</td>
          <td className='w-96 border border-black text-left ps-3'>&nbsp;</td>
          <td className='w-96 border border-black text-left ps-3'>&nbsp;</td>
          <td className="border border-black text-left ps-3 font-semibold"></td>
          <td className="border border-black"></td>
        </tr>

        {/* Street1 and Invoice No */}
        <tr className="h-8">
          <td className="border border-black ps-3" colSpan="5">{invoiceData?.Street1|| 'Street1'}</td>
          <td className='w-96 border border-black text-left ps-3'>&nbsp;</td>
          <td className='w-96 border border-black text-left ps-3'>&nbsp;</td>
          <td className="border border-black text-left ps-3 font-semibold">Invoice No:-</td>
          <td className="border border-black">{invoiceData?.InvoiceNo}</td>
        </tr>

        {/* Street1 and Delivery Mode */}
        <tr className="h-8">
          <td className="border border-black ps-3" colSpan="5">{invoiceData?.Street2|| 'Street2'}</td>
          <td className='w-96 border border-black text-left ps-3'>&nbsp;</td>
          <td className='w-96 border border-black text-left ps-3'>&nbsp;</td>
          <td className="border border-black text-left ps-3"></td>
          <td className="border border-black"></td>
        </tr>

        {/* Town and Payment Mode */}
        <tr className="h-8">
          <td className="border border-black ps-3" colSpan="5">{invoiceData?.Town|| 'Town'}</td>
          <td className='w-96 border border-black text-left ps-3'>&nbsp;</td>
          <td className='w-96 border border-black text-left ps-3'>&nbsp;</td>
          <td className="border border-black text-left ps-3 font-semibold">Delivery Mode:-</td>
          <td className="border border-black">{invoiceData?.Transport}</td>
        </tr>

        {/* Pin Code */}
        <tr className="h-8">
          <td className="border border-black ps-3" colSpan="5">{invoiceData?.Pincode|| 'Town'}</td>
          <td className='w-96 border border-black text-left ps-3'>&nbsp;</td>
          <td className='w-96 border border-black text-left ps-3'>&nbsp;</td>
          <td className="border border-black text-left ps-3"></td>
          <td className="border border-black"></td>
        </tr>

        
        {/* GST of the Company*/}
        <tr className="h-8">
          <td className="border border-black ps-3" colSpan="5">{invoiceData?.Gst|| 'GST of the Company'}</td>
          <td className='w-96'>&nbsp;</td>
          <td className='w-96'>&nbsp;</td>
          <td className="border border-black text-left ps-3 font-semibold">Payment Mode:-</td>
          <td className="border border-black">{invoiceData?.Payment}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Firstrow;
