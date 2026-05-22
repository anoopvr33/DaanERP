import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddBookingAPI, GetCustomerDataAPI } from "../api";
import { toast } from "react-toastify";
import { GetDashboardAPI } from "../api/dashboardServices";

export const getDashboardData = createAsyncThunk(
  "dashboard/getdata",
  async (data, thunkAPI) => {
    try {
      const response = await GetDashboardAPI(data);
      console.log("my dash latest", response);
      if (response.status === 200) return response?.data;
      return thunkAPI.rejectWithValue(
        response.data.status || "something went wrong",
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const dasboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    items: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        toast.error(action.error);
      });
  },
});

export default dasboardSlice.reducer;
