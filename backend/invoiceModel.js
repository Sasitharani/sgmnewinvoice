const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  address1: String,
  address2: String,
  address3: String,
  address4: String,
  address6: String,
  item1: String,
  description: String,
  pack: String,
  hsn: String,
  qty: String,
  rate: String,
  amount: String,
  accNo: String,
  ifscCode: String,
  bankName: String,
  branch: String,
  paymentMode: String,
  transportMode: String,
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
