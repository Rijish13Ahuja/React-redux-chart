import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./tableSlice";
import chartReducer from "./chartSlice";
import authReducer from "../features/authSlice"; // Import the auth reducer

const store = configureStore({
  reducer: {
    table: tableReducer,
    chart: chartReducer,
    auth: authReducer, 
  },
});

export default store;
