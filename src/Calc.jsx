import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setGrossAmount, setCgstAmount, setSgstAmount, setTotalTax, setTotalAmount } from './invoiceSlice';

export default function Calc() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

  useEffect(() => {
    const grossAmount = items.reduce((sum, item) => sum + (item.amount || 0), 0);
    const cgstAmount = (grossAmount * formData.cgstPercent) / 100;
    const sgstAmount = (grossAmount * formData.sgstPercent) / 100;
    const totalTax = cgstAmount + sgstAmount;
    const totalAmount = grossAmount + totalTax;

    dispatch(setGrossAmount(grossAmount));
    dispatch(setCgstAmount(cgstAmount));
    dispatch(setSgstAmount(sgstAmount));
    dispatch(setTotalTax(totalTax));
    dispatch(setTotalAmount(totalAmount));
  }, [items, formData.cgstPercent, formData.sgstPercent, dispatch]);

  const handleTaxChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="">
      <div className="grid grid-cols-12  ">
        <div className="grid col-span-10  ">
          <div className="grid grid-rows-1 ">
            <div className="grid grid-cols-[20%_80%]  ">
              <div>
                <div className="border  h-8 text-left">Acc No:</div>
                <div className="border  h-8 text-left">Ifsc Code:</div>
                <div className="border  h-8 text-left">Bank Name:</div>
                <div className="border  h-8 text-left">Branch:</div>
              </div>
              <div>
                <div className="b">
                  <input
                    type="text"
                    name="accNo"
                    value={formData.accNo}
                    onChange={handleChange}
                    className="w-full h-8 border"
                    placeholder="Acc No:"
                  />

                </div>
                <div className="b">
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleChange}
                    className="w-full h-8 border"
                    placeholder="Ifsc Code:"
                  />
                </div>
                <div className="b">
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    className="w-full h-8 border"
                    placeholder="Bank Name:"
                  />
                </div>
                <div className="b  h-8">
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-full h-8 border"
                    placeholder="Branch:"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid col-span-2 ">
          {/* <div className="grid grid-rows-1 border border-cyan-300"> */}
            <div className="grid grid-cols-2  ">
              <div>
                <div className="border font-bold text-left h-8">CGST %:</div>
                <div className="border font-bold text-left h-8">SGST %:</div>
                <div className="border font-bold text-left h-8">Gross Amount:</div>
                <div className="border font-bold text-left h-8">Total Tax:</div>
                <div className="border font-bold text-left h-8">Total Amount:</div>
              </div>
              <div>
                <div className="h-8">
                  <input
                    type="text"
                    name="cgstPercent"
                    value={formData.cgstPercent>0 ? formData.cgstPercent:''}
                    onChange={handleTaxChange}
                    className="w-full h-8 border "
                    placeholder={formData.cgstPercent===0 ?'':undefined}
                  />
                </div>
                <div className="h-8">
                  <input
                    type="text"
                    name="sgstPercent"
                    value={formData.sgstPercent>0 ?formData.sgstPercent:'' }
                    onChange={handleTaxChange}
                    className="w-full h-8 border"
                    placeholder={formData.sgstPercent===0? '':undefined}
                  />
                </div>
                <div className="h-8  ">
                  <input
                    type="text"
                    name="grossAmount"
                    value={grossAmount}
                    readOnly
                    className="w-full h-8 border font-bold"
                    placeholder="Gross Amount"
                  />
                </div>
                <div className="b ">
                  <input
                    type="text"
                    name="totalTax"
                    value={totalTax}
                    readOnly
                    className="w-full h-8 border font-bold"
                    placeholder="Total Tax"
                  />
                </div>
                <div className="b">
                  <input
                    type="text"
                    name="totalAmount"
                    value={totalAmount}
                    readOnly
                    className="w-full h-8 border font-bold"
                    placeholder="Total Amount"
                  />
                </div>
              </div>
            </div>
          {/* </div> */}
        </div>
      </div>
      <div className="grid grid-cols-12 ">
        <div className="col-span-2 h-9">Rupees</div>
        <div className="col-span-10  h-9">
          <input
            type="text"
            name="totalTaxInWords"
            value={numberToWords(totalAmount)}
            readOnly
            className="w-full h-9 font-bold"
            placeholder="Total Tax in Words"
          />
          </div>
        </div>
      
    </div>
  );
}
