import React from 'react';


const Header = () => {
 

  return (
    <div>
      <div className="my-center">
        <img
          src="https://sgmmodernbricks.com/img/Logo.png"
          alt="Logo"
          width="180"
          height="180"
        />
      </div>
      <div className="my-center">
        <img
          src="https://sgmmodernbricks.com/img/belowLogo.png"
          alt="Logo"
          width="880"
          height="80"
        />
      </div>

      <div className="flex border-4 border-black mb-3 bg-[#75C043] h-12 m-auto font-bold justify-center items-center text-center">
        Invoice
      </div>
      <div className="flex border-2 border-black mb-3 h-42 m-auto font-bold justify-center items-center text-center">
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

      <div className="grid grid-cols-7 b gap-0 p-0">
        <div className="col-span-5 h-8 text-left font-bold">Address:</div>
        <div className="col-span-2 h-8 text-left font-bold ">GSTIN:</div>
      </div>
    </div>
  );
};

export default Header;
