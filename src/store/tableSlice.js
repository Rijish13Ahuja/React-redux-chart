import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [], // Table data
  status: "idle", // CRUD operation statuses: idle, pending, success, error
  error: null, // Error messages, if any
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    addRow: (state, action) => {
      state.data.push(action.payload);
    },
    updateRow: (state, action) => {
      const { index, updatedRow } = action.payload;
      state.data[index] = updatedRow;
    },
    deleteRow: (state, action) => {
      state.data.splice(action.payload, 1);
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setData, addRow, updateRow, deleteRow, setStatus, setError } =
  tableSlice.actions;

export default tableSlice.reducer;
