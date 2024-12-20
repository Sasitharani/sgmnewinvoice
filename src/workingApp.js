import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const App = () => {
 
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
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = formData.items.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, [name]: value };
        if (name === 'rate' || name === 'qty') {
          updatedItem.amount = updatedItem.rate * updatedItem.qty;
        }
        return updatedItem;
      }
      return item;
    });
    setFormData({
      ...formData,
      items: updatedItems,
    });
  };

  const handleTaxChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const grossAmount = formData.items.reduce((sum, item) => sum + (item.qty * item.rate || 0), 0);
    const cgstAmount = (grossAmount * formData.cgstPercent) / 100;
    const sgstAmount = (grossAmount * formData.sgstPercent) / 100;
    const totalTax = cgstAmount + sgstAmount;
    const totalAmount = grossAmount + totalTax;

    setFormData((prevData) => ({
      ...prevData,
      grossAmount,
      cgstAmount,
      sgstAmount,
      totalTax,
      totalAmount,
      totalTaxInWords: numberToWords(totalAmount),
    }));
  }, [formData.items, formData.cgstPercent, formData.sgstPercent]);



  const numberToWords = (num) => {
    const a = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
    ];
    const b = [
      '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
    ];
  
    if ((num = num.toString()).length > 9) return 'Overflow';
    const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{1})$/);
    if (!n) return; 
    let str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + ' Crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + ' Lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + ' Thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + ' Hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'And ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + ' Only/- ' : '';
    return str.trim();
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
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleSaveAsPDF = () => {
    const input = componentRef.current;
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('invoice.pdf');
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-6 sm:py-12 print:min-h-auto print:py-0 print:bg-white my-border">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col overflow-hidden bg-white p-6 print:w-[210mm] print:h-[297mm] print:shadow-none print:border-none"
      >
        <div className='my-border me-2'>
        <div className="grid grid-cols-8 items-center">
          <div className="col-span-8">
            <div className="my-center my-border">
              <img
                src="https://www.datwebdigital.com/DWD/wp-content/uploads/2012/06/logo-design.jpg"
                alt="Logo"
                width="80"
                height="80"
              />
            </div>
            <div className="my-center my-border">
              <img
                src="https://www.datwebdigital.com/DWD/wp-content/uploads/2012/06/logo-design.jpg"
                alt="Logo"
                width="80"
                height="80"
              />
            </div>
            <div className="grid grid-cols-7 thin-border my-center">Inv</div>
            <div className="grid grid-cols-7 thin-border gap-0 p-0">
              <div className="col-span-5 thin-border">Address</div>
              <div className="col-span-2 font-semibold text-center">GSTIN:</div>
            </div>
            <div className="grid grid-cols-7 my-border">
              <div className="col-span-5 thin-border">
                <select
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  className="w-full p-1 border border-gray-300"
                >
                  <option value="">Select Address</option>
                  <option value="Address 1">Address 1</option>
                  <option value="Address 2">Address 2</option>
                  <option value="Address 3">Address 3</option>
                </select>
              </div>

              <div className="col-span-2 font-semibold text-center">
                <div className="grid grid-cols-[30%_70%]">
                  <div className="thin-border">Date</div>
                  <div className="thin-border">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full p-1 border border-gray-300"
                      placeholder="Date"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-7 thin-border">
              <div className="col-span-5 thin-border">
                <input
                  type="text"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  className="w-full p-1 border border-gray-300"
                  placeholder="Address 2"
                />
              </div>
              <div className="col-span-2 font-semibold text-center">
                <div className="grid grid-cols-[30%_70%]"></div>
              </div>
            </div>
            <div className="grid grid-cols-7 thin-border">
              <div className="col-span-5 thin-border">
                <input
                  type="text"
                  name="address3"
                  value={formData.address3}
                  onChange={handleChange}
                  className="w-full p-1 border border-gray-300"
                  placeholder="Address 3"
                />
              </div>
              <div className="col-span-2 font-semibold text-center">
                <div className="grid grid-cols-[30%_70%]">
                  <div className="thin-border">Invoice No</div>
                  <div className="thin-border">
                    <input
                      type="text"
                      name="invoiceNo"
                      value={formData.invoiceNo}
                      onChange={handleChange}
                      className="w-full p-1 border border-gray-300"
                      placeholder="Invoice No"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-7 thin-border">
              <div className="col-span-5 thin-border">
                <input
                  type="text"
                  name="address4"
                  value={formData.address4}
                  onChange={handleChange}
                  className="w-full p-1 border border-gray-300"
                  placeholder="Address 4"
                />
              </div>
              <div className="col-span-2 font-semibold text-center">
                <div className="grid grid-cols-[30%_70%]">
                  {/* <div className="thin-border">Delivery Mode</div>
                  <div className="thin-border">
                    <select
                      name */}
                  <div className="thin-border">Delivery Mode</div>
                  <div className="thin-border">
                    <select
                      name="transportMode"
                      value={formData.transportMode}
                      onChange={handleChange}
                      className="w-full p-1 border border-gray-300"
                    >
                      <option value="">Select Transport Mode</option>
                      <option value="SGM Transport">SGM Transport</option>
                      <option value="Own Transport">Own Transport</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-7 thin-border">
              <div className="col-span-5 thin-border">
                <input
                  type="text"
                  name="address6"
                  value={formData.address6}
                  onChange={handleChange}
                  className="w-full p-1 border border-gray-300"
                  placeholder="Address 6"
                />
              </div>
              <div className="col-span-2 font-semibold text-center">
                <div className="grid grid-cols-[30%_70%]">
                  <div className="thin-border">Payment Mode</div>
                  <div className="thin-border">
                    <select
                      name="paymentMode"
                      value={formData.paymentMode}
                      onChange={handleChange}
                      className="w-full p-1 border border-gray-300"
                    >
                      <option value="">Select Payment Mode</option>
                      <option value="Cash">Cash</option>
                      <option value="Online">Online</option>
                      <option value="Gpay">Gpay</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 thin-border gap-y-0">
              <div className="thin-border my-center">S.No</div>
              <div className="thin-border my-center col-span-6">
                Description
              </div>
              <div className="thin-border my-center">Pack</div>
              <div className="thin-border my-center">HSN</div>
              <div className="thin-border my-center">Qty</div>
              <div className="thin-border my-center">Rate</div>
              <div className="thin-border my-center">Amount</div>
            </div>
            {formData.items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 shadow gap-0 gap-y-0 h-8"
              >
                <div className="my-border-left my-center">
                  <input
                    type="text"
                    name="item1"
                    value={item.item1}
                    onChange={(e) => handleItemChange(index, e)}
                    className="w-full p-1"
                    placeholder="Item No"
                  />
                </div>
                <div className="my-border-left my-center col-span-6">
                  <input
                    type="text"
                    name="description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, e)}
                    className="w-full p-1"
                    placeholder="Description"
                  />
                </div>
                <div className="my-border-left my-center">
                  <input
                    type="text"
                    name="pack"
                    value={item.pack}
                    onChange={(e) => handleItemChange(index, e)}
                    className="w-full p-1"
                    placeholder="Pack"
                  />
                </div>
                <div className="my-border-left my-center">
                  <input
                    type="text"
                    name="hsn"
                    value={item.hsn}
                    onChange={(e) => handleItemChange(index, e)}
                    className="w-full p-1"
                    placeholder="HSN"
                  />
                </div>
                <div className="my-border-left my-center">
                  <input
                    type="text"
                    name="qty"
                    value={item.qty}
                    onChange={(e) => handleItemChange(index, e)}
                    className="w-full p-1"
                    placeholder="Qty"
                  />
                </div>
                <div className="my-border-left my-center">
                  <input
                    type="text"
                    name="rate"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, e)}
                    className="w-full p-1"
                    placeholder="Rate"
                  />
                </div>
                <div className="my-border-left my-center">
                  <input
                    type="text"
                    name="amount"
                    value={item.amount}
                    readOnly
                    className="w-full p-1"
                    placeholder="Amount"
                  />
                </div>
              </div>
            ))}
            <div className="grid grid-cols-[65%_35%] border-2 border-red-400">
              <div className="grid grid-cols-1 my-border">
                <div className="grid grid-rows-1">
                  <div className="grid grid-cols-[20%_80%] my-border">
                    <div>
                      <div className="thin-border h-7">Acc No:</div>
                      <div className="thin-border h-7">Ifsc Code:</div>
                      <div className="thin-border h-7">Bank Name:</div>
                      <div className="thin-border h-7">Branch:</div>
                    </div>
                    <div>
                      <div className="thin-border h-6">
                        <input
                          type="text"
                          name="accNo"
                          value={formData.accNo}
                          onChange={handleChange}
                          className="w-full p-1 thin-border"
                          placeholder="Acc No:"
                        />
                      </div>
                      <div className="thin-border h-6">
                        <input
                          type="text"
                          name="ifscCode"
                          value={formData.ifscCode}
                          onChange={handleChange}
                          className="w-full p-1 thin-border"
                          placeholder="Ifsc Code:"
                        />
                      </div>
                      <div className="thin-border h-6">
                        <input
                          type="text"
                          name="bankName"
                          value={formData.bankName}
                          onChange={handleChange}
                          className="w-full p-1 thin-border"
                          placeholder="Bank Name:"
                        />
                      </div>
                      <div className="thin-border h-6">
                        <input
                          type="text"
                          name="branch"
                          value={formData.branch}
                          onChange={handleChange}
                          className="w-full p-1 thin-border"
                          placeholder="Branch:"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 my-border">
                <div className="grid grid-rows-1">
                  <div className="grid grid-cols-[20%_20%_60%] my-border">
                    <div>
                      <div className="thin-border h-7">CGST %:</div>
                      <div className="thin-border h-7">SGST %:</div>
                      <div className="thin-border h-7">Gross Amount:</div>
                      <div className="thin-border h-7">Total Tax:</div>
                      <div className="thin-border h-7">Total Amount:</div>
                    </div>
                    <div>
                      <div className="thin-border h-6">
                        <input
                          type="text"
                          name="cgstPercent"
                          value={formData.cgstPercent}
                          onChange={handleTaxChange}
                          className="w-full p-1 thin-border"
                          placeholder="CGST %"
                        />
                      </div>
                      <div className="thin-border h-6">
                        <input
                          type="text"
                          name="sgstPercent"
                          value={formData.sgstPercent}
                          onChange={handleTaxChange}
                          className="w-full p-1 thin-border"
                          placeholder="SGST %"
                        />
                      </div>
                      <div className="thin-border h-6">
                        <input
                          type="text"
                          name="grossAmount"
                          value={formData.grossAmount}
                          readOnly
                          className="w-full p-1 thin-border"
                          placeholder="Gross Amount"
                        />
                      </div>
                      <div className="thin-border h-6">
                        <input
                          type="text"
                          name="totalTax"
                          value={formData.totalTax}
                          readOnly
                          className="w-full p-1 thin-border"
                          placeholder="Total Tax"
                        />
                      </div>
                      <div className="thin-border h-6">
                        <input
                          type="text"
                          name="totalAmount"
                          value={formData.totalAmount}
                          readOnly
                          className="w-full p-1 thin-border"
                          placeholder="Total Amount"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="thin-border h-6">
                        <input
                          type="text"
                          name="cgstAmount"
                          value={formData.cgstAmount}
                          readOnly
                          className="w-full p-1 thin-border"
                          placeholder="CGST Amount"
                        />
                      </div>
                      <div className="thin-border h-6">
                        <input
                          type="text"
                          name="sgstAmount"
                          value={formData.sgstAmount}
                          readOnly
                          className="w-full p-1 thin-border"
                          placeholder="SGST Amount"
                        />
                      </div>
                      <div className="thin-border h-6">
                        <input
                          type="text"
                          name="grossAmount"
                          value={formData.grossAmount}
                          readOnly
                          className="w-full p-1 thin-border"
                          placeholder="Gross Amount"
                        />
                      </div>
                      <div className="thin-border h-6">
                        <input
                          type="text"
                          name="totalTax"
                          value={formData.totalTax}
                          readOnly
                          className="w-full p-1 thin-border"
                          placeholder="Total Tax"
                        />
                      </div>
                      <div className="thin-border h-6">
                        <input
                          type="text"
                          name="totalAmount"
                          value={formData.totalAmount}
                          readOnly
                          className="w-full p-1 thin-border"
                          placeholder="Total Amount"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 my-border">
              <div className="thin-border h-7">Rupees:</div>
              <div className="thin-border h-6">
                <input
                  type="text"
                  name="totalTaxInWords"
                  value={formData.totalTaxInWords}
                  readOnly
                  className="w-full p-1 thin-border"
                  placeholder="Total Tax in Words"
                />
              </div>
            </div>
          </div>
          
        </div>
        <div class="h-8">&nbsp;</div>
        <div class=" grid grid-cols-2 h-24">
          <div class="my-center ">Customer's Seal With Signatory</div>
          <div class="text-center"> For Sri Gowmari Modern Bricks</div>
        </div>
        <div class=" grid grid-cols-2">
          <div class="my-center"></div>
          <div class="my-center">Signature</div>
        </div>
        </div>
      </form>
      <button onClick={handlePrint} className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">Print</button>
      <button onClick={handleSaveAsPDF} className="px-4 py-2 bg-green-500 text-white rounded">Save as PDF</button>
    </div>
  );
};

export default App;
