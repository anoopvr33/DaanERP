import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddBookingAPI, GetBookingDataAPI } from "../api";
import { toast } from "react-toastify";
import {
  AddBudget_Category,
  AddBudgetSub_CategoryAPI,
  CreateBudgetAPI,
  GetBudgetAPI,
} from "../api/accountsServices";

export const addBudgetThunk = createAsyncThunk(
  "budget/additem",
  async (data, thunkAPI) => {
    try {
      const res = await CreateBudgetAPI(data);
      console.log("my bud add response", res || "erro");
      if (res?.data?.status === "success") return res.data;
      return thunkAPI.rejectWithValue(
        res?.data?.status || "something went wrong",
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addBudgetCategoryThunk = createAsyncThunk(
  "budget/addCategory",
  async (data, thunkAPI) => {
    try {
      const res = await AddBudget_Category(data);
      console.log("my bud add response", res || "erro");
      if (res?.data?.status === "success") return res.data;
      return thunkAPI.rejectWithValue(
        res?.data?.status || "something went wrong",
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addBudgetSub_CategoryThunk = createAsyncThunk(
  "budget/addSubCategory",
  async (data, thunkAPI) => {
    try {
      const res = await AddBudgetSub_CategoryAPI(data);
      console.log("my bud add response", res || "erro");
      if (res?.data?.status === "success") return res.data;
      return thunkAPI.rejectWithValue(
        res?.data?.status || "something went wrong",
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getBudgetData = createAsyncThunk(
  "budget/getdata",
  async (data, thunkAPI) => {
    try {
      const response = await GetBudgetAPI(data);
      if (response?.data?.status === "success") return response?.data;
      return thunkAPI.rejectWithValue(
        response.data.status || "something went wrong",
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const budgetSlice = createSlice({
  name: "budgetActual",
  initialState: {
    items: [],
    loading: false,
    adderror: null,
    geterror: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBudgetThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBudgetThunk.fulfilled, (state) => {
        // state.items = action.payload;
        state.loading = false;
        toast.success("Successfully added");
      })
      .addCase(addBudgetThunk.rejected, (state, action) => {
        state.loading = false;
        state.adderror = action.error;
        toast.error("Error occured");
      });

    builder
      .addCase(addBudgetCategoryThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBudgetCategoryThunk.fulfilled, (state) => {
        // state.items = action.payload;
        state.loading = false;
        toast.success("Successfully added");
      })
      .addCase(addBudgetCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.adderror = action.error;
        toast.error("Error occured");
      });

    builder
      .addCase(addBudgetSub_CategoryThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBudgetSub_CategoryThunk.fulfilled, (state) => {
        // state.items = action.payload;
        state.loading = false;
        toast.success("Successfully added");
      })
      .addCase(addBudgetSub_CategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.adderror = action.error;
        toast.error("Error occured");
      });

    builder
      .addCase(getBudgetData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBudgetData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getBudgetData.rejected, (state, action) => {
        state.geterror = action.error;
        state.loading = false;
        toast.error(action.geterror);
      });
  },
});

export default budgetSlice.reducer;
