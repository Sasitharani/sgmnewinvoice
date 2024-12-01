import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './db.js'; // Import the database connection pool
import bodyParser from 'body-parser';


dotenv.config(); // Load environment variables from .env file


const app = express(); // Initialize app
const PORT = process.env.PORT || 5000; // Use the port from environment variables or default to 5000

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the React app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')));

// Log when the server starts
console.log('Server is starting...');


// Update an invoice by SrNo
app.put('/api/invoices/:srNo', (req, res) => {
  const { srNo } = req.params;
  const {
    date, invoiceNo, companyName, gst, flatDoorNo, street1, street2, townCity, state, pin,
    transport, payment, itemName, amount, rate, qty, cgst, sgst, ctax, stax, totalTax, grossAmount, amountWords
  } = req.body;

  const query = `
    UPDATE invoice SET 
      Date = ?, InvoiceNo = ?, CompanyName = ?, Gst = ?, DoorNo = ?, Street1 = ?, Street2 = ?, Town = ?, State = ?, Pincode = ?, 
      Transport = ?, Payment = ?, ItemName = ?, Amount = ?, Rate = ?, Quantity = ?, Cgst = ?, Sgst = ?, Ctax = ?, Stax = ?, 
      TotalTax = ?, GrossAmount = ?, AmountWords = ? 
    WHERE SrNo = ?
  `;
  const values = [
    date, invoiceNo, companyName, gst, flatDoorNo, street1, street2, townCity, state, pin,
    transport, payment, itemName, amount, rate, qty, cgst, sgst, ctax, stax, totalTax, grossAmount, amountWords, srNo
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).send('Error updating data');
      return;
    }
    res.send({
      message: 'Invoice updated successfully',
      results: results // Include the results in the response
    });
  });
});

// Get all invoices
app.get('/api/invoices', (req, res) => {
  console.log('GET /api/invoices endpoint hit');
  const query = 'SELECT * FROM invoice';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.status(200).json(results);
  });
});

// Get a single invoice by ID
app.get('/api/invoices/:SrNo', (req, res) => {
  console.log('GET /api/invoices/:SrNo endpoint hit');
  const { SrNo } = req.params;
  const query = 'SELECT * FROM invoice WHERE SrNo = ?';
  db.query(query, [SrNo], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Invoice not found');
      return;
    }
    res.status(200).json(results[0]);
  });
});

// Update an invoice by SrNo
app.put('/api/invoices/:SrNo', (req, res) => {
  console.log('PUT /api/invoices/:SrNo endpoint hit');
  const { SrNo } = req.params;
  const { name, value } = req.body;

  const query = `
    UPDATE invoice SET ${name} = ? WHERE SrNo = ?
  `;
  const values = [value, SrNo];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).send({
        message: 'Error updating data',
        error: err,
        query: query,
        values: values
      });
      return;
    }
    res.send({
      message: 'Invoice updated successfully',
      results: results // Include the results in the response
    });
  });
});

// Delete an invoice by ID
app.delete('/api/invoices/:id', (req, res) => {
  console.log('DELETE /api/invoices/:id endpoint hit');
  const { id } = req.params;
  const query = 'DELETE FROM invoice WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).send('Error deleting data');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Invoice not found');
      return;
    }
    res.status(200).send('Invoice deleted successfully');
  });
});

// Insert a new invoice with additional fields working 
app.post('/api/insertInvoice', (req, res) => {
  const invoice = req.body;
  console.log(invoice)

  const query = `
  INSERT INTO invoice (SrNo, Date, InvoiceNo, CompanyName, Gst, DoorNo, Street1, Street2, Town, State, Pincode, Transport, Payment, itemName, Quantity, Rate, NetRate, cgst, sgst, ctax, stax, TotalTax, Amount, AmountWords)
  VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const values = [
   invoice.date,
  invoice.invoiceNo,
  invoice.company[0].name,
  invoice.company[0].gst,
  invoice.company[0].flatDoorNo,
  invoice.company[0].street1,
  invoice.company[0].street2,
  invoice.company[0].townCity,
  invoice.company[0].state,
  invoice.company[0].pin,
  invoice.transport,
  invoice.payment,
  invoice.itemName,
  invoice.qty,
  invoice.rate,
  invoice.amount,
  invoice.Cgst,
  invoice.Sgst,
  invoice.ctax,
  invoice.stax,
  invoice.totalTax,
  invoice.amount,
  invoice.amountWords// Assuming amountWords is part of the formState
];
    console.log('InvoiceNo:', invoice.invoiceNo);
    console.log('Date:', invoice.date);
    console.log('GST:', invoice.company[0].name);
    console.log('GST:', invoice.company[0].gst);
    console.log('DoorNo:', invoice.company[0].flatDoorNo);
    console.log('Street1:', invoice.company[0].street1);
    console.log('Street2:', invoice.company[0].street2);
    console.log('Town:', invoice.company[0].townCity);
    console.log('State:', invoice.company[0].state);
    console.log('Pincode:', invoice.company[0].pin);
    console.log('Transport:', invoice.transport);
    console.log('Payment:', invoice.payment);
    console.log('ItemName:', invoice.itemName);
    console.log('ItemName:', invoice.amount);
    console.log('Quantity:', invoice.qty);
    console.log('Rate:', invoice.rate);
    console.log('CGST:', invoice.Cgst);
    console.log('SGST:', invoice.Sgst);
    console.log('CTax:', invoice.ctax);
    console.log('STax:', invoice.stax);
    console.log('STax:', invoice.totalTax);
    console.log('Amount:', invoice.amount);
    console.log('Amount:', invoice.AmountWords);


    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Error inserting data');
        return;
      }
      res.status(200).send('Data inserted successfully');
    });
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} and in Azure`);
});
