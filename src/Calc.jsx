import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Calc({ srNo }) {
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
  console.log(invoiceData)
  if (!invoiceData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-12 border border-black p-3">
        <div className="grid col-span-9">
          {/* Bank Details */}
          <div className="grid grid-cols-[13%_40%_30%]">
            <div>
              <div className="h-8 text-left font-bold">Bank Name</div>
              <div className="h-8 text-left font-bold">Acc No:</div>
              <div className="h-8 text-left font-bold">Ifsc Code:</div>
              <div className="h-8 text-left font-bold">Account Name</div>
              <div className="h-8 text-left font-bold">Branch Name:</div>
            </div>
            <div>
              <div className="h-8 text-left">KVB</div>
              <div className="h-8 text-left">1791280000000159</div>
              <div className="h-8 text-left">KVBL0001791</div>
              <div className="h-8 text-left">Sri Gowmari Modern Bricks</div>
              <div className="h-8 text-left">R.M Colony</div>
            </div>
            <div></div>
          </div>
          {/* Bank details end */}
        </div>
        <div className="grid col-span-3 "><div>
              {/* Outline of the amounts starting */}
              <table class ="border-collapse ">
                <tr>
                  <td className="font-bold text-left h-8 border border-black">Net Amount:</td>
                  <td className="border border-black font-bold text-left h-8 w-32"></td>
                  <td className="border border-black text-left h-8 w-32">{invoiceData.NetRate}</td>
                </tr>
                <tr>
                  <td className="border border-black font-bold text-left h-8 w-32">CGST %:</td>
                  <td className="border border-black font-bold text-left h-8 w-32">{invoiceData.cgst+"%"}</td>
                  <td className="border border-black text-left h-8 w-32">{invoiceData.ctax}</td>
                </tr>
                <tr>
                  <td className="border border-black font-bold text-left h-8 w-32">SGST %:</td>
                  <td className="border border-black  text-left h-8">{invoiceData.sgst+"%"}</td>
                  <td className="border border-black  text-left h-8">{invoiceData.stax}</td>
                </tr>
                <tr>
                  <td className="border border-black font-bold text-left h-8">Total Tax Amount</td>
                  <td className="border border-black text-left h-8"></td>
                  <td className="border border-black text-left h-8">{invoiceData.TotalTax}</td>
                </tr>
                <tr>
                  <td className="border border-black font-bold text-left h-8">Gross Amount</td>
                  <td className="border border-black  text-left h-8"></td>
                  <td className="border border-black font-extrabold text-left h-8">{invoiceData.Amount}</td>
                </tr>
              </table>

              {/* End of the amounts */}
            </div>
       
        </div>
      </div>
      {/* Rupees in words */}
      <div className="grid grid-cols-12 border-black border-2">
        <div className="col-span-2 h-9 font-bold">Rupees</div>
        <div className="col-span-10 h-9">
{invoiceData.AmountWords}

        </div>

      </div>
    </div>
  );
}
