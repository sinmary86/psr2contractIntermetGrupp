import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  position: '',  
  surname: ''
};

const buyerSlice = createSlice({
  name: 'buyer',
  initialState,
  reducers: {
    setBuyerData(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setBuyerData } = buyerSlice.actions;

export default buyerSlice.reducer;
