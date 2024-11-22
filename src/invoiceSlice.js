// invoiceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalGrossAmount: 0,
  cgstAmount: 0,
  sgstAmount: 0,
  cgst: 0,
  sgst: 0,
  totalTax: 0,
  totalAmount: 0,
  date: '',
  invoiceNo: '',
  company: [
    {
      name: '',
      gst: '',
      flatDoorNo: '',
      street1: '',
      street2: '',
      townCity: '',
      state: '',
      pin: ''
    }
  ],
  numItems: 1,
  transport: '',
  payment: '',
  finalAmount: 0,
  totalTax: 0,
  Ctax: 0,
  Stax: 0,
  totalGrossAmount: 0,
  grossAmount: 0,
  CgstAmount: 0,
  SgstAmount: 0,
  Cgst: 0,
  Sgst: 0,
  savedAddresses: []
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setRate :(state, action) => {
      state.rate = action.payload;
    },
    setTotalGrossAmount: (state, action) => {
      state.totalGrossAmount = action.payload;
    },
    setAmount :(state, action) => {
      state.amount = action.payload;
    },
    setCgstAmount: (state, action) => {
      state.cgstAmount = action.payload;
    },
    setSgstAmount: (state, action) => {
      state.sgstAmount = action.payload;
    },
    setCgst: (state, action) => {
      state.cgst = action.payload;
    },
    setSgst: (state, action) => {
      state.sgst = action.payload;
    },
    setTotalTax: (state, action) => {
      state.totalTax = action.payload;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setInvoiceNo: (state, action) => {
      state.invoiceNo = action.payload;
    },
    setCompanyName: (state, action) => {
      state.company[0].name = action.payload;
    },
    setGst: (state, action) => {
      state.company[0].gst = action.payload;
    },
    setFlatDoorNo: (state, action) => {
      state.company[0].flatDoorNo = action.payload;
    },
    setStreet1: (state, action) => {
      state.company[0].street1 = action.payload;
    },
    setStreet2: (state, action) => {
      state.company[0].street2 = action.payload;
    },
    setTownCity: (state, action) => {
      state.company[0].townCity = action.payload;
    },
    setState: (state, action) => {
      state.company[0].state = action.payload;
    },
    setPin: (state, action) => {
      state.company[0].pin = action.payload;
    },
    setNumItems: (state, action) => {
      state.company[0].numItems = action.payload;
    },
    setTransport: (state, action) => {
      state.transport = action.payload;
    },
    setPayment: (state, action) => {
      state.payment = action.payload;
    },
    setFinalAmount: (state, action) => {
      state.finalAmount = action.payload;
    },
    setCtax: (state, action) => {
      state.Ctax = action.payload;
    },
    setStax: (state, action) => {
      state.Stax = action.payload;
    },
    setGrossAmount: (state, action) => {
      state.grossAmount = action.payload;
    },
    setCgstAmount: (state, action) => {
      state.CgstAmount = action.payload;
    },
    setSgstAmount: (state, action) => {
      state.SgstAmount = action.payload;
    },
    setCgst: (state, action) => {
      state.Cgst = action.payload;
    },
    setSgst: (state, action) => {
      state.Sgst = action.payload;
    },
    setSavedAddresses: (state, action) => {
      state.savedAddresses = action.payload;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    }
  }
});

export const {
  setTotalGrossAmount,
  setCgstAmount,
  setSgstAmount,
  setCgst,
  setSgst,
  setTotalTax,
  setTotalAmount,
  setDate,
  setInvoiceNo,
  setCompanyName,
  setGst,
  setFlatDoorNo,
  setStreet1,
  setStreet2,
  setTownCity,
  setState,
  setPin,
  setNumItems,
  setTransport,
  setPayment,
  setFinalAmount,
  setCtax,
  setStax,
  setGrossAmount,
  setSavedAddresses,
  openModal,
  closeModal,
  setRate,
  setAmount
} = invoiceSlice.actions;

export default invoiceSlice.reducer;