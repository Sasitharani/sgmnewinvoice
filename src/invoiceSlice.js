import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  date: '',
  invoiceNo: '',
  address: '',
  numItems: 1,
  transport:'',
  payment:'',
  items: Array(1).fill({ name: '', qty: '', rate: '' ,amount:'',cgst:'',sgst:'',ctax:'',stax:'',totalTax:0,grossAmount:0}),
  grossAmount: 0,
  cgstAmount: 0,
  sgstAmount: 0,
  totalTax: 0,
  totalAmount: 0,
  add1:'',
  street1:'',
  street2:'',
  town:'',
  state:'',
  pin:'',
  companyname:'',
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setInvoiceData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setNumItems: (state, action) => {
      state.numItems = action.payload;
      state.items = Array(action.payload).fill({ name: '', qty: '', rate: '',amount:'' });
    },
    updateItem: (state, action) => {
      const { index, item } = action.payload;
      state.items[index] = item;
    },
    setGrossAmount: (state, action) => {
      state.grossAmount = action.payload;
    },
    setCgstAmount: (state, action) => {
      state.cgstAmount = action.payload;
    },
    setSgstAmount: (state, action) => {
      state.sgstAmount = action.payload;
    },
    setTotalTax: (state, action) => {
      state.totalTax = action.payload;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    // setTotalGrossAmount: (state, action) => {
    //   state.grossAmount = action.payload;
    // },
  },
});

export const {
  setInvoiceData,
  setNumItems,
  updateItem,
  amount,
  setGrossAmount,
  setCgstAmount,
  setSgstAmount,
  setTotalTax,
  setTotalAmount,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
