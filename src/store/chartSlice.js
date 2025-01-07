import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [], 
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    addDataPoint: (state, action) => {
      state.data.push(action.payload);
      if (state.data.length > 10) {
        state.data.shift(); 
      }
    },
  },
});

export const { addDataPoint } = chartSlice.actions;

export default chartSlice.reducer;
