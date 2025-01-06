import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./tableSlice";
import chartReducer from "./chartSlice";

const store = configureStore({
  reducer: {
    table: tableReducer,
    chart: chartReducer,
  },
});

export default store;
