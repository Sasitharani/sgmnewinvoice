import React, { useState } from 'react';
import axios from 'axios';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Month = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMonthClick = async (monthIndex) => {
    const formattedMonth = monthIndex < 10 ? `0${monthIndex}` : monthIndex;
    const date = `2024-${formattedMonth}`;

    setLoading(true);
    try {
      const response = await axios.get(`/api/invoice?date=${date}`);
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>2024</h1>
      <div className="grid grid-cols-3 gap-4">
        {months.map((month, index) => (
          <button
            key={month}
            onClick={() => handleMonthClick(index + 1)}
            className="p-2 border border-black"
          >
            {month}
          </button>
        ))}
      </div>
      {loading && <div>Loading...</div>}
      {!loading && invoices.length > 0 && (
        <div>
          <h2>Invoices</h2>
          <table className="table-auto border-collapse border border-black">
            <thead>
              <tr>
                <th className="border border-black p-2">Date</th>
                <th className="border border-black p-2">Invoice No</th>
                <th className="border border-black p-2">Amount</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="border border-black p-2">{invoice.date}</td>
                  <td className="border border-black p-2">{invoice.invoiceNo}</td>
                  <td className="border border-black p-2">{invoice.amount}</td>
                  {/* Add more columns as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Month;