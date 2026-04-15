import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddBookingAPI, GetBookingDataAPI } from "../api";
import { toast } from "react-toastify";

export const addBookingThunk = createAsyncThunk(
  "booking/additem",
  async (data, thunkAPI) => {
    try {
      const res = await AddBookingAPI(data);
      console.log("my response", res || "erro");
      if (res.status == 201) return res.data;
      return thunkAPI.rejectWithValue(
        res?.data?.status || "something went wrong",
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getBookingData = createAsyncThunk(
  "booking/getdata",
  async (data, thunkAPI) => {
    try {
      const response = await GetBookingDataAPI(data);
      // console.log("my latest", response);
      if (response.status == 201) return response?.data;
      return thunkAPI.rejectWithValue(
        response.data.status || "something went wrong",
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const bookSlice = createSlice({
  name: "booking",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBookingThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBookingThunk.fulfilled, (state) => {
        // state.items = action.payload;
        state.loading = false;
        toast.success("Successfully added");
      })
      .addCase(addBookingThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        toast.error("Error occured");
      });
    builder
      .addCase(getBookingData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getBookingData.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        toast.error(action.error);
      });
  },
});

export default bookSlice.reducer;
