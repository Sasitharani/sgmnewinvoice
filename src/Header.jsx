import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css'; // Import the custom CSS file

const Header = ({ srNo }) => {
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

  if (!invoiceData) {
    return <div>Loading...</div>;
  }


  return (
    <div>
<div className="flex justify-center">
  <img
    src="https://sgmmodernbricks.com/img/Logo.png"
    alt="Logo"
    width="180"
    height="180"
  />
</div>
<div className="flex justify-center">
  <img
    src="https://sgmmodernbricks.com/img/belowLogo.png"
    alt="Below Logo"
    width="880"
    height="80"
  />
</div>

      <div className="flex border-4 border-black mb-3 bg-[#75C043] h-20 m-auto font-bold justify-center items-center text-center text-2xl">
        Invoice
      </div>
      <div className="flex border-2 border-black mb-3 h-48 m-auto font-bold justify-center items-center text-center">
        SF NO 630/3, Mylapore road, Opp SSM College Of Engineering, Palani Road,
        Dindigul 624622
        <br />
        Mobile 9655546951, 7904010382
        <br />
        Email: sgmbricks2021@gmail.com
        <br />
        Website: www.sgmmodernbricks.com
        <br />
      </div>

      <div>
        <table className="border-collapse border border-black w-full">
          <tbody>
            <tr>
              <td className=" h-8 text-left font-bold ps-3">Address:</td>
              <td className='w-96'>&nbsp;</td>
              <td className='w-96'>&nbsp;</td>
              <td className="ps-3 font-bold">GSTIN:</td>
              <td className="ps-3">GSTIN: {invoiceData.Gst}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>


    </div>
    </div>
  );
};

export default Header;
