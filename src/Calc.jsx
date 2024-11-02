import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


export default function Calc() {
  const {totalTax, totalAmount,grossAmount,SgstAmount,CgstAmount,Cgst,Sgst } = useSelector((state) => state.invoice);
  const formData1 = useSelector((state) => state.invoice);

  console.log(formData1)
  console.log(Sgst+"--formData Sgst")
  console.log(totalAmount+"---totalAmount in calc")

  const [formData, setFormData] = useState({
    address1: '',
    address2: '',
    address3: '',
    address4: '',
    address6: '',
    items: Array(8).fill({ item1: '', description: '', pack: '', hsn: '', qty: '', rate: '', amount: 0 }),
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
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
      'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
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


  const handleTaxChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="grid grid-cols-12 border border-black">
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
        <div className="grid col-span-3 border border-black">
       
            <div>
              {/* Outline of the amounts starting */}
              <div className="grid grid-cols-[40%_30%_30%]">
                <div>
                <div className="border border-black font-bold text-left h-8">Gross Amount:</div>
                  <div className="border border-black font-bold text-left h-8">CGST %:</div>
                  <div className="border border-black font-bold text-left h-8">SGST %:</div>
                  <div className="border border-black font-bold text-left h-8">Total Tax:</div>
                  <div className="border border-black font-bold text-left h-8">Total Amount:</div>
                </div>
                <div>
                  <div className="border border-black font-bold text-left h-8">
                  <input
                      type="text"
                      name="grossAmount"
                      value=""
                      readOnly
                      className="w-full h-8 border font-bold"
                    />
                    </div>
                  <div className="border border-black font-bold text-left h-8">
                    <input
                      type="text"
                      name="CgstPercent"
                      value={Cgst+"%"}
                      className="w-full h-8 border"
                    />
                  </div>
                  <div className="h-8">
                  <div className="border border-black font-bold text-left h-8">
                    <input
                      type="text"
                      name="CgstPercent"
                      value={Sgst+"%"}
                      className="w-full h-8 border"
                    />
                  </div>
                  </div>
                  <div className="h-8"></div>
                  <div className="h-8"></div>
                </div>
                <div>
                <div className="h-8">
                <input
                      type="text"
                      name="SgstPercent"
                      value={grossAmount}
                      readOnly
                      className="w-full h-8 border font-bold"
                    />
                  </div>
                  <div className="h-8">
                    <input
                      type="text"
                      name="sgstPercent"
                      value={CgstAmount}
                      onChange={handleTaxChange}
                      className="w-full h-8 border"
                    />
                  </div>
                  <div className="h-8">
                    <input
                      type="text"
                      name="sgstPercent"
                      value={SgstAmount}
                      onChange={handleTaxChange}
                      className="w-full h-8 border"
                    />
                  </div>
                  <div className="h-8">
                    <input
                      type="text"
                      name="totalTax"
                      value={totalTax}
                      readOnly
                      className="w-full h-8 border font-bold"
                      placeholder="Total Tax"
                    />
                  </div>
          
                  <div className="h-8">
                    <input
                      type="text"
                      name="grossAmount"
                      value={totalAmount}
                      readOnly
                      className="w-full h-8 border font-bold"
                    />
                  </div>
                </div>
              </div>
              {/* End of the amounts */}
            </div>
       
        </div>
      </div>
      {/* Rupees in words */}
      <div className="grid grid-cols-12 border-black border-2">
        <div className="col-span-2 h-9">Rupees</div>
        <div className="col-span-10 h-9">
          <input
            type="text"
            name="totalTaxInWords"
            value={numberToWords(totalAmount)}
            readOnly
            className="w-full h-9 font-bold"
            placeholder="Total Amount in Words"
          />
        </div>

      </div>
    </div>
  );
}
