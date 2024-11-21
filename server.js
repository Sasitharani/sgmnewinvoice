import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { db } from './db.js'; // Import the database connection pool

dotenv.config(); // Load environment variables from .env file

const app = express(); // Initialize app
const PORT = process.env.PORT || 5000; // Use the port from environment variables or default to 5000

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// Log when the server starts
console.log('Server is starting...');



// Read invoice by name
app.get('/api/invoice', (req, res) => {
  console.log('GET /api/invoice endpoint hit');
  const { name } = req.query; // Get the username from query parameters
  let query = 'SELECT * FROM invoice';
  const queryParams = [];

  if (name && name.trim() !== '') { // Check if name is defined and not empty
    query += ' WHERE name = ?';
    queryParams.push(name);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.status(200).send(results);
  });
});



// Create a new invoice
app.post('/api/invoices', (req, res) => {
  console.log('POST /api/invoices endpoint hit');
  const { invoiceNo, date, address, items, totalAmount, totalTax } = req.body;
  const query = 'INSERT INTO invoice (invoiceNo, date, address, items, totalAmount, totalTax) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [invoiceNo, date, JSON.stringify(address), JSON.stringify(items), totalAmount, totalTax], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
      return;
    }
    res.status(201).send({ id: results.insertId, invoiceNo, date, address, items, totalAmount, totalTax });
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



// Update an invoice by ID
app.put('/api/invoice/:id', (req, res) => {
  console.log('PUT /api/invoice/:id endpoint hit');
  const { id } = req.params;
  const { invoiceNo, date, address, items, totalAmount, totalTax } = req.body;
  const query = 'UPDATE invoice SET invoiceNo = ?, date = ?, address = ?, items = ?, totalAmount = ?, totalTax = ? WHERE id = ?';
  db.query(query, [invoiceNo, date, JSON.stringify(address), JSON.stringify(items), totalAmount, totalTax, id], (err, results) => {
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
app.delete('/api/invoice/:id', (req, res) => {
  console.log('DELETE /api/invoice/:id endpoint hit');
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

// Serve static files from the React app
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
