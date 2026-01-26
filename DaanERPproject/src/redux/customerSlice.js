import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddBookingAPI, GetCustomerDataAPI } from "../api";
import { toast } from "react-toastify";

export const addCustomerThunk = createAsyncThunk(
  "customer/additem",
  async (data, thunkAPI) => {
    try {
      const res = await AddBookingAPI(data);
      console.log("my response", res);
      if (res.status == 201) return res.data;
      return thunkAPI.rejectWithValue(
        res?.data?.status || "something went wrong",
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getCustomerData = createAsyncThunk(
  "customer/getdata",
  async (_, thunkAPI) => {
    try {
      const response = await GetCustomerDataAPI();
      console.log("my latest", response);
      if (response.status == 201) return response?.data;
      return thunkAPI.rejectWithValue(
        response.data.status || "something went wrong",
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCustomerThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCustomerThunk.fulfilled, (state) => {
        // state.items = action.payload;
        state.loading = false;
        toast.success("Successfully added");
      })
      .addCase(addCustomerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        toast.error("Error occured");
      });
    builder
      .addCase(getCustomerData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomerData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getCustomerData.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        toast.error(action.error);
      });
  },
});

export default customerSlice.reducer;
