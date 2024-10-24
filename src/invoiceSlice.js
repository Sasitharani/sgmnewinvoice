import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  grossAmount: 0,
  cgstAmount: 0,
  sgstAmount: 0,
  totalTax: 0,
  totalAmount: 0,
  items: Array(8).fill({
    item1: '',
    description: '',
    pack: '',
    hsn: '',
    qty: '',
    rate: '',
    amount: 0,
  }),
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
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
    setItems: (state, action) => {
        state.items = action.payload;
      },
      updateItem: (state, action) => {
        const { index, item } = action.payload;
        state.items[index] = item;
      },
  },
});

export const { setGrossAmount, setCgstAmount, setSgstAmount, setTotalTax, setTotalAmount,setItems, updateItem } = invoiceSlice.actions;
export default invoiceSlice.reducer;
