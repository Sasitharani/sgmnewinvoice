const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(`mongodb+srv://sasitharan:sasi@learn.vfrd0.mongodb.net/${process.env.DBNAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(cors());
app.use(express.json());
app.use('/api', invoiceRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
