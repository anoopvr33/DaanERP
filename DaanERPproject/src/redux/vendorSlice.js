import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Add_Vendor_API, Get_Vendor_API } from "../api/accountsServices";

export const get_vendor_thunk = createAsyncThunk(
  "vendor/getdata",
  async (data, thunkAPI) => {
    try {
      Get_Vendor_API;
      const response = await Get_Vendor_API(data);
      if (response?.data?.status === "success") return response?.data?.data;
      return thunkAPI.rejectWithValue(
        response.data.status || "something went wrong",
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const add_vendor_thunk = createAsyncThunk(
  "vendor/addvendor",
  async (data, thunkAPI) => {
    try {
      const response = await Add_Vendor_API(data);
      if (response?.data?.status === "success") return response?.data;
      return thunkAPI.rejectWithValue(
        response.data.status || "something went wrong",
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    items: [],
    loading: false,
    addload: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_vendor_thunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(get_vendor_thunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(get_vendor_thunk.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        toast.error(action.error);
      });

    builder
      .addCase(add_vendor_thunk.pending, (state) => {
        state.addload = true;
      })
      .addCase(add_vendor_thunk.fulfilled, (state, action) => {
        state.addload = false;
        toast.success("Successfully Added");
      })
      .addCase(add_vendor_thunk.rejected, (state) => {
        state.addload = false;
        state.categoryError = "Failed to fetch";
      });
  },
});

export default vendorSlice.reducer;
