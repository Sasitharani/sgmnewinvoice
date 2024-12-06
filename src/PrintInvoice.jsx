import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './index.css'; // Import the custom CSS file
import Header from './Header'; // Import the Header component
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import Firstrow from './Firstrow';
import Desctable from './Desctable';
import Calc from './Calc';
import Footer from './Footer';

const PrintInvoice = () => {
  const { srNo } = useParams(); // Access the srNo parameter from the URL
  const [invoiceData, setInvoiceData] = useState(null);
  const componentRef = useRef(); // Create a ref to reference the entire content

  console.log('Outside useEffect:', srNo);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      console.log('Inside useEffect:', srNo);
      try {
        const response = await axios.get(`https://sgmnewinvoice.onrender.com/api/invoices/${srNo}`);
        setInvoiceData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchInvoiceData();
  }, [srNo]); // Dependency array includes srNo to ensure it runs when srNo changes

  const handleSaveAsPDF = async () => {
    console.log('Handle print');
    const input = componentRef.current;
    console.log("Component---" + input);

    if (input) {
      const invoiceNo = invoiceData.InvoiceNo; // Make sure invoiceNo is correctly accessed
      const currentYear = new Date().getFullYear();
      const financialYear = `${currentYear}-${currentYear + 1}`;
      const margin = 10; // Define the margin value

      try {
        const canvas = await html2canvas(input, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth, pdfHeight); // Adjust the position by adding the margin
        pdf.save(`${invoiceNo}Invoice${financialYear}.pdf`);
      } catch (error) {
        console.error("Error generating PDF:", error);
        Swal.fire("Error", "Could not generate PDF.", "error");
      }
    } else {
      Swal.fire("Error", "Could not find the invoice component.", "error");
    }
  };

  if (!invoiceData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button
        onClick={handleSaveAsPDF}
        className="px-4 py-2 bg-green-500 text-white rounded mt-4"
      >Print</button>
      <div className='m-4' ref={componentRef}>
        <Header srNo={srNo} /> {/* Pass srNo as a prop to Header */}
        <Firstrow srNo={srNo} /> {/* Pass srNo as a prop to Header */}
        <Desctable srNo={srNo} /> {/* Pass srNo as a prop to Header */}
        <Calc srNo={srNo} /> 
        <Footer /> {/* Pass srNo as a prop to Header */}    
      </div>
    </div>
  );
};

export default PrintInvoice;