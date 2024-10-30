import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invoiceData: {
    date: '',
    invoiceNo: '',
    address: '',
    companyname: '',
    add1: '',
    street1: '',
    street2: '',
    town: '',
    state: '',
    pin: '',
    numItems: 1,
    transport: '',
    payment: '',
    finalAmount: 0,
    totalTax: 0,
    Cgst: 0,
    Sgst: 0,
    Ctax: 0,
    Stax: 0,
    items: [{ name: '', qty: '', rate: 0, amount: 0, Cgst: 0, Sgst: 0, ctax: 0, stax: 0, totalTax: 0, grossAmount: 0 }],
  },
  numItems: 1,
  totalGrossAmount: 0,
  grossAmount:0,
  totalTax: 0,
  CgstAmount: 0,
  SgstAmount: 0,
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setInvoiceData: (state, action) => {
      state.invoiceData = action.payload;
    },
    setNumItems: (state, action) => {
      state.numItems = action.payload;
    },
    updateItem: (state, action) => {
      
      const { index, item } = action.payload;
      state.invoiceData.items[index] = item;
      console.log(item)
    },
    setTotalGrossAmount: (state, action) => {
      state.grossAmount = action.payload;
    },
    setTotalTax: (state, action) => {
      state.totalTax = action.payload;
    },
    setCgstAmount: (state, action) => {
      state.CgstAmount = action.payload;
    },
    setSgstAmount: (state, action) => {
      state.SgstAmount = action.payload;
    },
  },
});

export const { setInvoiceData, setNumItems, updateItem, setTotalGrossAmount, setTotalTax, setCgstAmount, setSgstAmount } = invoiceSlice.actions;

export default invoiceSlice.reducer;
