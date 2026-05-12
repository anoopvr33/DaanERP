import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./bookingSlice";
import customerReducer from "./customerSlice";
import SearchReducer from "./SearchSlice";
import budgetActual from "./budgetActualSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    customer: customerReducer,
    search: SearchReducer,
    budget: budgetActual,
  },
});
