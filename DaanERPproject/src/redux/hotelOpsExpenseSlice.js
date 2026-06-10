import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  Get_HotelOps,
  Get_HotelOps_Category,
  Get_HotelOps_SubCategory,
  GetBudget_CategoryAPI,
} from "../api/accountsServices";

export const gethotelOpsData = createAsyncThunk(
  "hotelOps/getdata",
  async (data, thunkAPI) => {
    try {
      const response = await Get_HotelOps(data);
      if (response?.data?.status === "success") return response?.data;
      return thunkAPI.rejectWithValue(
        response.data.status || "something went wrong",
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const gethotelOpsCategory = createAsyncThunk(
  "hotelOps/getcategory",
  async (thunkAPI) => {
    try {
      const response = await Get_HotelOps_Category();
      if (response?.data?.status === "success") return response?.data?.data;
      return thunkAPI.rejectWithValue(
        response.data.status || "something went wrong",
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const gethotelOpsSub_Category = createAsyncThunk(
  "hotelOps/getsub_category",
  async (id, thunkAPI) => {
    try {
      const response = await Get_HotelOps_SubCategory(id);
      if (response?.data?.status === "success") return response?.data?.data;
      return thunkAPI.rejectWithValue(
        response.data.status || "something went wrong",
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const hotelOpsSlice = createSlice({
  name: "hotelOps",
  initialState: {
    items: [],
    loading: false,
    error: null,
    category: [],
    categoryError: null,
    sub_category: [],
    subCategoryError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gethotelOpsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(gethotelOpsData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(gethotelOpsData.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
        toast.error(action.error);
      });

    builder
      .addCase(gethotelOpsCategory.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(gethotelOpsCategory.rejected, (state) => {
        state.categoryError = "Failed to fetch";
      });

    builder
      .addCase(gethotelOpsSub_Category.fulfilled, (state, action) => {
        state.sub_category = action.payload;
      })
      .addCase(gethotelOpsSub_Category.rejected, (state) => {
        state.subCategoryError = "Failed to fetch";
      });
  },
});

export default hotelOpsSlice.reducer;
