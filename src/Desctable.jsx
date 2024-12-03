import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Desctable = ({ srNo }) => {
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    const fetchInvoiceData2 = async () => {
      if (srNo) {
        try {
          const response = await axios.get(`https://sgmnewinvoice.onrender.com/api/invoices/${srNo}`);
          setInvoiceData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchInvoiceData2();
  }, [srNo]); // Dependency array includes srNo to ensure it runs when srNo changes

  if (!invoiceData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <table class='border-collapse border border-black'>
        <tbody>
          <th className='h-8 ps-3 w-6 text-left border border-black'>S.No</th>
          <th className='h-8 ps-3 w-96 text-left border border-black'>Description</th>
          <th className='h-8 ps-3 w-56 text-left border border-black'>&nbsp;</th>
          <th className='h-8 ps-3 w-36 text-left border border-black'>Pack</th>
          <th className='h-8 ps-3 w-40 text-left border border-black'>HSN</th>
          <th className='h-8 ps-3 w-44 text-left border border-black'>Qty</th>
          <th className='h-8 ps-3 w-44 text-left border border-black'>Rate</th>
          <th className='h-8 ps-3 w-44 text-left border border-black'>Amount</th>
          <tr>
            <td className='h-8 border border-black ps-3'>1</td>
            <td className='h-8 border border-black ps-3'>{invoiceData.itemName}</td>
            <td className='h-8 border border-black ps-3'>&nbsp;</td>
            <td className='h-8 border border-black ps-3'>&nbsp;</td>  
            <td className='h-8 border border-black ps-3'>&nbsp;</td> 
            <td className='h-8 border border-black ps-3'>{invoiceData.Quantity}</td>
            <td className='h-8 border border-black ps-3'>{invoiceData.Rate}</td>
            <td className='h-8 border border-black ps-3'>{invoiceData.Amount}</td>
          </tr>
          <tr>
            <td className='h-8 border border-black ps-3'></td>
            <td className='h-8 border border-black ps-3'></td>
            <td className='h-8 border border-black ps-3'></td>
            <td className='h-8 border border-black ps-3'></td>  
            <td className='h-8 border border-black ps-3'></td> 
            <td className='h-8 border border-black ps-3'></td>
            <td className='h-8 border border-black ps-3'></td>
            <td className='h-8 border border-black ps-3'></td>
          </tr>
          <tr>
            <td className='h-8 border border-black ps-3'></td>
            <td className='h-8 border border-black ps-3'></td>
            <td className='h-8 border border-black ps-3'></td>
            <td className='h-8 border border-black ps-3'></td>  
            <td className='h-8 border border-black ps-3'></td> 
            <td className='h-8 border border-black ps-3'></td>
            <td className='h-8 border border-black ps-3'></td>
            <td className='h-8 border border-black ps-3'></td>
          </tr>

          <tr>
            <td className='h-8 border border-black ps-3'></td>
            <td className='h-8 border border-black ps-3'></td>
            <td className='h-8 border border-black ps-3'></td>
            <td className='h-8 border border-black ps-3'></td>  
            <td className='h-8 border border-black ps-3'></td> 
            <td className='h-8 border border-black ps-3'></td>
            <td className='h-8 border border-black ps-3'></td>
            <td className='h-8 border border-black ps-3'></td>
          </tr>
          <tr>
            <td className='h-8 border border-black ps-3'></td>
            <td className='h-8 border border-black ps-3'></td>
            <td className='h-8 border border-black ps-3'></td>
            <td className='h-8 border border-black ps-3'></td>  
            <td className='h-8 border border-black ps-3'></td> 
            <td className='h-8 border border-black ps-3'></td>
            <td className='h-8 border border-black ps-3'></td>
            <td className='h-8 border border-black ps-3'></td>
          </tr>
        </tbody>
      </table>




   
    




    </div>
  );
};

export default Desctable;
