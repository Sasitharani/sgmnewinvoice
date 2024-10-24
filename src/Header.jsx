import React from 'react'

export default function Header() {
  return (
    <div>
      <div className="my-center">
        <img
          src="https://www.datwebdigital.com/DWD/wp-content/uploads/2012/06/logo-design.jpg"
          alt="Logo"
          width="80"
          height="80"
        />
      </div>
      <div className="my-center">
        <img
          src="https://www.datwebdigital.com/DWD/wp-content/uploads/2012/06/logo-design.jpg"
          alt="Logo"
          width="80"
          height="80"
        />
      </div>
      <div className="grid grid-cols-7 b my-center my-border mb-3">Inv</div>
      <div className="grid grid-cols-7 b gap-0 p-0">
        <div className="col-span-5 h-8 text-left font-bold">Address:</div>
        <div className="col-span-2 h-8 text-left font-bold ">GSTIN:</div>
      </div>
    </div>
  );
}
