import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [], // Chart data points
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    addDataPoint: (state, action) => {
      state.data.push(action.payload);
      if (state.data.length > 10) {
        state.data.shift(); // Keep only the last 10 points
      }
    },
  },
});

export const { addDataPoint } = chartSlice.actions;

export default chartSlice.reducer;
