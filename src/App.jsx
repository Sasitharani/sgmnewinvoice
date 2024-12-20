import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useSelector } from 'react-redux';
import Header from './Header';
import Firstrow from './Firstrow';
import Desctable from './Desctable';
import Calc from './Calc';
import Footer from './Footer';
import InvoiceEntry from './InvoiceEntry';
import InsertDb from './editRow';
import EditRow from './editRow';
import PrintInvoice from './PrintInvoice'; // Import PrintInvoice component



// import SliceDetails from './sliceDetails';

const InvoicePage = () => {
  const invoiceData = useSelector((state) => state.invoice.invoiceData);
  const componentRef = React.useRef();

  const handleSaveAsPDF = async () => {
    const input = componentRef.current;

    if (input) {
      const invoiceNo = invoiceData.invoiceNo; // Make sure invoiceNo is correctly accessed
      const currentYear = new Date().getFullYear();
      const financialYear = `${currentYear}-${currentYear + 1}`;

      try {
        const canvas = await html2canvas(input, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${invoiceNo}Invoice${financialYear}.pdf`);
      } catch (error) {
        console.error("Error generating PDF:", error);
        Swal.fire("Error", "Could not generate PDF.", "error");
      }
    } else {
      Swal.fire("Error", "Could not find the invoice component.", "error");
    }
  };

  return (
    <div className="center-content">
      <div className="flex justify-center items-center min-h-screen bg-gray-50 py-6 sm:py-12 print:min-h-auto print:py-0 print:bg-white my-border">
        <div className="flex justify-center items-center min-h-screen my-vertical-center">
          <form
            className="relative flex flex-col overflow-hidden bg-white p-6 print:w-[210mm] print:h-[297mm] print:shadow-none print:border-none"
            ref={componentRef}
          >
            <div className="my-border me-2">
              <div className="grid grid-cols-8 items-center">
                <div className="col-span-8">
                  <Header />
                  <Firstrow />
                  <Desctable />
                  <Calc />
                  <Footer />
                </div>
              </div>
            </div>
          </form>
        </div>
        <button
          onClick={handleSaveAsPDF}
          className="px-4 py-2 bg-green-500 text-white rounded mt-4"
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<InvoiceEntry />} />
      </Routes>
    </Router>
  );
};

export default App;
