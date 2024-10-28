import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Header from './Header';
import Firstrow from './Firstrow';
import Desctable from './Desctable';
import Calc from './Calc';
import Footer from './Footer';
import { useSelector, useDispatch } from 'react-redux';
import { setGrossAmount, setCgstAmount, setSgstAmount, setTotalTax, setTotalAmount } from './invoiceSlice';

const App = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const { items, grossAmount, cgstAmount, sgstAmount, totalTax, totalAmount } = useSelector((state) => state.invoice);

  const [formData, setFormData] = useState({
    address1: '',
    address2: '',
    address3: '',
    address4: '',
    address6: '',
    items: Array(8).fill({
      item1: '',
      description: '',
      pack: '',
      hsn: '',
      qty: '',
      rate: '',
      amount: 0,
    }),
    accNo: '',
    ifscCode: '',
    bankName: '',
    branch: '',
    paymentMode: '',
    transportMode: '',
    cgstPercent: 0,
    sgstPercent: 0,
    cgstAmount: 0,
    sgstAmount: 0,
    grossAmount: 0,
    totalTax: 0,
    totalAmount: 0,
    totalTaxInWords: '',
    date: '',
    invoiceNo: '',
  });

  const handleSaveAsPDF = () => {
    const input = componentRef.current;
    const invoiceNo = formData.invoiceNo;
    const currentYear = new Date().getFullYear();
    const financialYear = `${currentYear}-${currentYear + 1}`;
  
    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${invoiceNo}Invoice${financialYear}.pdf`);
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/invoices', formData);
      Swal.fire('Success', 'Data saved successfully', 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to save data', 'error');
    }
  };

  return (
    <div className="center-content">
      <div className="flex justify-center items-center min-h-screen bg-gray-50 py-6 sm:py-12 print:min-h-auto print:py-0 print:bg-white my-border">
        <div className="flex justify-center items-center min-h-screen my-vertical-center">
          <form
            onSubmit={handleSubmit}
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
                </div>
              </div>
              <Footer />
            </div>
          </form>
        </div>
        <button
          onClick={handleSaveAsPDF}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
};

export default App;
