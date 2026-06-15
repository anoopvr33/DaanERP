import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./bookingSlice";
import customerReducer from "./customerSlice";
import SearchReducer from "./SearchSlice";
import budgetActual from "./budgetActualSlice";
import dashboardReducer from "./dashboardSlice";
import hotelOpsReducer from "./hotelOpsExpenseSlice";
import dailyLogReducer from "./dailyLogSlice";
import vendorReducer from "./vendorSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    customer: customerReducer,
    search: SearchReducer,
    budget: budgetActual,
    dashboard: dashboardReducer,
    hotelOps: hotelOpsReducer,
    dailylog: dailyLogReducer,
    vendor: vendorReducer,
  },
});
