import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./bookingSlice";
import customerReducer from "./customerSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    customer: customerReducer,
  },
});
