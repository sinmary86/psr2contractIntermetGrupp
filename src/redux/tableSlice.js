import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTableData(state, action) {
      return action.payload;
    },
    updateRow(state, action) {
      const { id, field, value } = action.payload;
      const row = state.find((row) => row.id === id);
      if (row) {
        row[field] = value;
      }
    },
    removeRow(state, action) {
      return state.filter((row) => row.id !== action.payload);
    },
    addRow(state, action) {
      const { id, newRow } = action.payload;
      const index = state.findIndex((row) => row.id === id);
      if (index !== -1) {
        state.splice(index + 1, 0, newRow);
      }
    },
  },
});

export const { setTableData, updateRow, removeRow, addRow } = tableSlice.actions;

export default tableSlice.reducer;
