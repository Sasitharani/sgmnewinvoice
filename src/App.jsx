
import React, { useState } from 'react';

const App = () => {
  const [addresses, setAddresses] = useState({
    address1: '',
    address2: '',
    address3: '',
    address4: '',
    address6: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddresses({
      ...addresses,
      [name]: value
    });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-50 py-6 sm:py-12 print:min-h-auto print:py-0 print:bg-white">
        <div className="relative flex flex-col overflow-hidden bg-white p-6  print:w-[210mm] print:h-[297mm] print:shadow-none print:border-none">
          <div className="grid grid-cols-8  items-center">
            <div className="col-span-8 my-border">
              <div className="my-center ">
                <img
                  src="https://www.datwebdigital.com/DWD/wp-content/uploads/2012/06/logo-design.jpg"
                  alt="Logo"
                  width="80"
                  height="80"
                />
              </div>
              <div className="my-center ">
                <img
                  src="https://www.datwebdigital.com/DWD/wp-content/uploads/2012/06/logo-design.jpg"
                  alt="Logo"
                  width="80"
                  height="80"
                />
              </div>
              <div className="grid grid-cols-7 my-border my-center">Inv</div>
   {/* ----------------------------------------Address and GST --------------------------------------------*/}
              <div className="grid grid-cols-7  my-border-top ">
                <div className="col-span-5">
                  <select
                    // value={savedAddress}
                    //onChange={handleSavedAddressChange}
                    className="w-full p-1"
                  >
                    <option value="">Address:</option>
                    <option value="address1">Address 1</option>
                    <option value="address2">Address 2</option>
                    <option value="address3">Address 3</option>
                    <option value="address4">Address 4</option>
                    <option value="address6">Address 6</option>
                  </select>
                </div>
                <div className="col-span-2 font-semibold text-center my-border-left">
                  GSTIN:33ALTPC9721G1Z0
                </div>
              </div>
             {/* ----------------------------------------Address and GST --------------------------------------------*/}           
              <div className="grid grid-cols-7  ">
                <div className="col-span-5">
                  <input
                    type="text"
                    name="address2"
                    value={addresses.address2}
                    onChange={handleChange}
                    className="w-full p-1 "
                    placeholder="Click to enter Address 1"
                  />
                </div>
                <div className="col-span-2 font-semibold text-center  my-border-left">
                  <div className="grid grid-cols-[30%_70%]">df</div>
                </div>
              </div>
              <div className="grid grid-cols-7">
                <div className="col-span-5">
                  <input
                    type="text"
                    name="address3"
                    value={addresses.address3}
                    onChange={handleChange}
                    className="w-full p-1 "
                    placeholder="Click to enter Address 2"
                  />
                </div>
                <div className="col-span-2 font-semibold p-x-3  my-border-left ">
                  <div className="grid grid-cols-[30%_70%]">
                    <div className=" text-xs">Invoice No</div>
                    <div className="">
                      <input
                        type="text"
                        name="Invoice No"
                        //value={}
                        onChange={handleChange}
                        className="w-full p-1 text-xs"
                        placeholder="Enter Invoice No"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-7 ">
                <div className="col-span-5">
                  <input
                    type="text"
                    name="address4"
                    value={addresses.address4}
                    onChange={handleChange}
                    className="w-full p-1 "
                    placeholder="Clcik to enter Address 3"
                  />
                </div>
                <div className="col-span-2 font-semibold p-x-3  my-border-left">
                  <div className="grid grid-cols-[30%_70%]">
                    <div className="text-xs">Delivery Mode</div>
                    <div className="">
                      <input
                        type="text"
                        name="Delivery Mode"
                        //value={addresses.address4}
                        onChange={handleChange}
                        className="w-full p-1 text-xs "
                        placeholder="Enter"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-7 ">
                <div className="col-span-5 ">
                  <input
                    type="text"
                    name="address6"
                    value={addresses.address6}
                    onChange={handleChange}
                    className="w-full p-1 "
                    placeholder="Click to enter Address 4"
                  />
                </div>
                <div className="col-span-2 font-semibold p-x-3  my-border-left">
                  <div className="grid grid-cols-[30%_70%]">
                    <div className=" text-xs">Payment Mode</div>
                    <div className="">
                      <input
                        type="text"
                        name="paymentMode"
                        //value={}
                        onChange={handleChange}
                        className="w-full p-1 text-xs"
                        placeholder="Enter Payment Mode"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-12  gap-y-0 my-border">
                <div className=" my-border-right my-center">S.No</div>
                <div className="my-border-right   my-center col-span-6">
                  Description
                </div>
                <div className=" my-center my-border-right">Pack</div>
                <div className="my-border-right my-center">HSN</div>
                <div className="my-border-right my-center">Qty</div>
                <div className="my-border-right my-center">Rate</div>
                <div className="my-border-right my-center">Amount</div>
              </div>
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 shadow gap-0 gap-y-0 h-8"
                >
                  <div className="my-border-left my-center">
                    {" "}
                    <input
                      type="text"
                      name="item1"
                      //value={addresses.address4}
                      onChange={handleChange}
                      className="w-full p-1 "
                      placeholder="Item No"
                    />
                  </div>
                  <div className="my-border-left my-center col-span-6">
                    {" "}
                    <input
                      type="text"
                      name="Description"
                      //value={addresses.address4}
                      onChange={handleChange}
                      className="w-full p-1 "
                      placeholder="Description"
                    />
                  </div>
                  <div className="my-border-left my-center">
                    <input
                      type="text"
                      name="address4"
                      value={addresses.address4}
                      onChange={handleChange}
                      className="w-full p-1 "
                      placeholder="Pack"
                    />
                  </div>
                  <div className="my-border-left my-center">
                    <input
                      type="text"
                      name="HSN"
                      value={addresses.address4}
                      onChange={handleChange}
                      className="w-full p-1 "
                      placeholder="HSN"
                    />
                  </div>
                  <div className="my-border-left my-center">
                    <input
                      type="text"
                      name="Qty"
                      value={addresses.address4}
                      onChange={handleChange}
                      className="w-full p-1 "
                      placeholder="Qty"
                    />
                  </div>
                  <div className="my-border-left my-center">
                    <input
                      type="text"
                      name="Rate"
                      //value={addresses.address4}
                      onChange={handleChange}
                      className="w-full p-1 "
                      placeholder="Rate"
                    />
                  </div>
                  <div className="my-border-left my-center">
                    <input
                      type="text"
                      name="Amount"
                      //value={addresses.address4}
                      onChange={handleChange}
                      className="w-full p-1 "
                      placeholder="Amount"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* -------------------------------------------start of bank and tax details----------------------------------- */}
          <div className="grid grid-cols-[65%_35%] ">
            <div className="grid grid-cols-1">
              <div className="grid grid-rows-1">
                <div className="grid grid-cols-[20%_80%]  ">
                  <div>
                    <div className="thin-border">Acc No: </div>
                    <div className="thin-border">Ifsc Code: </div>
                    <div className="thin-border "> Bank Name: </div>
                    <div className="thin-border">Branch: </div>
                    <div className="thin-border">&nbsp;</div>
                  </div>
                  <div>
                    <div className=" h-6">
                      <input
                        type="text"
                        name="Acc No:"
                        //value={addresses.address4}
                        onChange={handleChange}
                        className="w-full p-1 thin-border "
                        placeholder="Acc No:"
                       
                      />
                    </div>
                    <div className="thin-border h-6">
                      {" "}
                      <input
                        type="text"
                        name="Ifsc Code:"
                        //value={addresses.address4}
                        onChange={handleChange}
                        className="w-full p-1 thin-border "
                        placeholder="Ifsc Code:"
                      />
                    </div>
                    <div className="thin-border h-6">
                      {" "}
                      <input
                        type="text"
                        name="bankName"
                        //value={addresses.address4}
                        onChange={handleChange}
                        className="w-full p-1 thin-border "
                        placeholder="Bank Name:"
                      />
                    </div>
                    
                    <div className="thin-border h-6">
                      {" "}
                      <input
                        type="text"
                        name="branch"
                        //value={addresses.address4}
                        onChange={handleChange}
                        className="w-full p-1  h-6 thin-border"
                        placeholder="Branch:"
                      />
                    </div>
                    <div className="">&nbsp;</div>
                  </div>
                </div>
              </div>
            </div>
            {/*-------------------------------------- S-the Gross amount Display ----------------------------- */}
            <div className=" grid grid-cols-3">
              <div className="grid grid-cols-[100%]">
                {/* Empty cell below */}
                <div className="thin-border font-semibold"></div>
              </div>
              <div className="thin-border my-center">
                <div className="grid grid-cols-[100%]">Gross Amount</div>
              </div>
              {/* Calculate and put the amount below */}
              <div className="thin-border">
                <div className="grid grid-cols-[100%]">
                  <div className="thin-border font-semibold"></div>
                  <div className="thin-border">__</div>
                </div>
              </div>

              {/*-------------------------------------- E-the Gross amount Display ----------------------------- */}
              <div className="thin-border  grid grid-cols-[100%] col-span-3 my-center font-semibold">
                Taxable Amount
              </div>
              {/*------------------------S--------------------------- C GST ---------------------------------------*/}
              <div className="thin-border  grid grid-cols-3 col-span-3  font-semibold">
                <div className="thin-border my-center">C GST</div>
                <div className="thin-border my-center">6%</div>
                <div className="thin-border my-center">___</div>
              </div>
              {/*------------------------E--------------------------- C GST ---------------------------------------*/}
               {/*------------------------S--------------------------- S GST ---------------------------------------*/}
              <div className="thin-border  grid grid-cols-3 col-span-3  font-semibold">
                <div className="thin-border my-center">S GST</div>
                <div className="thin-border my-center">6%</div>
                <div className="thin-border my-center">___</div>
              </div>
                 {/*------------------------E--------------------------- S GST ---------------------------------------*/}
                       {/*------------------------S--------------------------- I GST ---------------------------------------*/}
              <div className="thin-border  grid grid-cols-3 col-span-3  font-semibold">
                <div className="thin-border my-center">I GST</div>
                <div className="thin-border my-center"></div>
                <div className="thin-border my-center"></div>
              </div>
                 {/*------------------------E--------------------------- I GST ---------------------------------------*/}
            </div>

          </div>
          {/* -----------------------------------------end of bank and tax details-----------------------------------*/}
     
        {/* Empty Row */}
        <div class="thin-border grid grid-cols-1">&nbsp;</div>
        <div>
          <div class="thin-border grid grid-cols-1">Rupees</div>
        </div>
 {/* -----------------------------------------Start of Signature and Seal details-----------------------------------*/}
        <div class="thin-border grid grid-cols-2 h-24">
          <div class="">Customer's Seal With Signatory</div>
          <div class="text-center"> For Sri Gowmari Modern Bricks</div>
        </div>
        <div class=" grid grid-cols-2">
          <div class=""></div>
          <div class=" text-center">Signature</div>
        </div>
      </div>
      </div>
       {/* -----------------------------------------End of Signature and Seal details-----------------------------------*/}
    </>
  );

}


export default App
