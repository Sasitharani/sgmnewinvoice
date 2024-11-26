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


// Get all invoices
app.get('/api/invoices', (req, res) => {
  console.log('GET /api/invoices endpoint hit');
  const query = 'SELECT InvoiceNo,Transport,Payment, itemName, Quantity, Rate, cgst, sgst, ctax, stax,TotalTax, Amount FROM invoice';
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
app.get('/api/invoices/:id', (req, res) => {
  console.log('GET /api/invoices/:id endpoint hit');
  const { id } = req.params;
  const query = 'SELECT * FROM invoice WHERE id = ?';
  db.query(query, [id], (err, results) => {
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

// Update an invoice by ID
app.put('/api/invoices/:id', (req, res) => {
  console.log('PUT /api/invoices/:id endpoint hit');
  const { id } = req.params;
  const {
    invoiceNo,
    companyName,
    date,
    gst,
    doorNo,
    street1,
    street2,
    town,
    city,
    state,
    pincode,
    quantity,
    rate,
    amount,
    amountWords,
    address,
    items,
    totalAmount,
    totalTax
  } = req.body;

  const query = `
    UPDATE invoice SET
      InvoiceNo = ?,
      CompanyName = ?,
      Date = ?,
      Gst = ?,
      DoorNo = ?,
      Street1 = ?,
      Street2 = ?,
      Town = ?,
      City = ?,
      State = ?,
      Pincode = ?,
      Quantity = ?,
      Rate = ?,
      Amount = ?,
      AmountWords = ?,
      Address = ?,
      Items = ?,
      TotalAmount = ?,
      TotalTax = ?
    WHERE id = ?
  `;

  db.query(query, [
    invoiceNo,
    companyName,
    date,
    gst,
    doorNo,
    street1,
    street2,
    town,
    city,
    state,
    pincode,
    quantity,
    rate,
    amount,
    amountWords,
    JSON.stringify(address),
    JSON.stringify(items),
    totalAmount,
    totalTax,
    id
  ], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).send('Error updating data');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Invoice not found');
      return;
    }
    res.status(200).send('Invoice updated successfully');
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
    INSERT INTO invoice (InvoiceNo, Date, CompanyName, Gst, DoorNo, Street1, Street2, Town, City, State, Pincode, Transport, Payment, itemName, Quantity, Rate,NetRate cgst, sgst, ctax, stax,TotalTax, Amount, AmountWords)
    VALUES (
      ${invoice.invoiceNo},
      ${invoice.date},
      ${invoice.companyName},
      ${invoice.gst},
      ${invoice.doorNo},
      ${invoice.street1},
      ${invoice.street2},
      ${invoice.town},
      ${invoice.city},
      ${invoice.state},
      ${invoice.pincode},
      ${invoice.transport},
      ${invoice.payment},
      ${invoice.itemName},
      ${invoice.qty},
      ${invoice.rate},
      ${invoice.totalAmount},
      ${invoice.cgst},
      ${invoice.sgst},
      ${invoice.ctax},
      ${invoice.stax},
      ${invoice.totalTax},
      ${invoice.amount},
       ${invoice.AmountWords},
    )
  `;
  
    console.log('InvoiceNo:', invoice.invoiceNo);
    console.log('Date:', invoice.date);
    console.log('GST:', invoice.company[0].gst);
    console.log('DoorNo:', invoice.company[0].flatDoorNo);
    console.log('Street1:', invoice.company[0].street1);
    console.log('Street2:', invoice.company[0].street2);
    console.log('Town:', invoice.company[0].townCity);
    console.log('City:', invoice.company[0].townCity);
    console.log('State:', invoice.company[0].state);
    console.log('Pincode:', invoice.company[0].pin);
    console.log('Transport:', invoice.transport);
    console.log('Payment:', invoice.payment);
    console.log('ItemName:', invoice.itemName);
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
    } else {
      res.status(200).send('Data inserted successfully');
    }
  });
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
