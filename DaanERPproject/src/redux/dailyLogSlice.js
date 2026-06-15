import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  Add_DailyLog_CategoryAPI,
  Add_DailyLog_SubCategory,
  AddBudget_Category,
  AddBudgetSub_CategoryAPI,
  CreateBudgetAPI,
  Get_DailyLog,
  Get_DailyLog_CategoryAPI,
  Get_DailyLog_CatSub,
  GetBudget_CategoryAPI,
  GetBudgetAPI,
} from "../api/accountsServices";

export const addBudgetThunk = createAsyncThunk(
  "dailylog/additem",
  async (data, thunkAPI) => {
    try {
      const res = await CreateBudgetAPI(data);
      if (res?.data?.status === "success") return res.data;
      return thunkAPI.rejectWithValue(
        res?.data?.status || "something went wrong",
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addDailyLog_CategoryThunk = createAsyncThunk(
  "dailylog/addCategory",
  async (data, thunkAPI) => {
    try {
      const res = await Add_DailyLog_CategoryAPI(data);
      console.log("cat add error", res);
      if (res?.data?.id) return res.data.message;
      return thunkAPI.rejectWithValue(
        res?.data?.status || "something went wrong",
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addDailySub_CategoryThunk = createAsyncThunk(
  "dailylog/addSubCategory",
  async (data, thunkAPI) => {
    try {
      const res = await Add_DailyLog_SubCategory(data);
      if (res?.data?.id) return res.data.message;
      return thunkAPI.rejectWithValue(
        res?.data?.status || "something went wrong",
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getDailyLogData = createAsyncThunk(
  "dailylog/getdata",
  async (data, thunkAPI) => {
    try {
      const response = await Get_DailyLog(data);
      console.log("daily lof", response);
      if (response?.data?.status === "success") return response?.data?.data;
      return thunkAPI.rejectWithValue(
        response.data.status || "something went wrong",
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getDailyLogCate_Sub = createAsyncThunk(
  "dailylog/catsub",
  async (_, thunkAPI) => {
    try {
      const response = await Get_DailyLog_CatSub();
      if (response?.data) return response?.data;
      return thunkAPI.rejectWithValue(
        response.data.status || "something went wrong",
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getDailyLogCategory = createAsyncThunk(
  "dailylog/getcategory",
  async (thunkAPI) => {
    try {
      const response = await Get_DailyLog_CategoryAPI();

      if (response?.data?.status === "success") return response?.data?.data;
      return thunkAPI.rejectWithValue(
        response.data.status || "something went wrong",
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const dailyLogSlice = createSlice({
  name: "dailylog",
  initialState: {
    items: [],
    loading: false,
    addloading: false,
    adderror: null,
    geterror: null,
    category: [],
    catsub: [],
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
      .addCase(addDailyLog_CategoryThunk.pending, (state) => {
        state.addloading = true;
      })
      .addCase(addDailyLog_CategoryThunk.fulfilled, (state) => {
        // state.items = action.payload;
        state.addloading = false;
        toast.success("Successfully added");
      })
      .addCase(addDailyLog_CategoryThunk.rejected, (state, action) => {
        state.addloading = false;
        state.adderror = action.error;
        toast.error("Something went wrong!");
      });

    builder
      .addCase(addDailySub_CategoryThunk.pending, (state) => {
        state.addloading = true;
      })
      .addCase(addDailySub_CategoryThunk.fulfilled, (state) => {
        // state.items = action.payload;
        state.addloading = false;
        toast.success("Successfully added");
      })
      .addCase(addDailySub_CategoryThunk.rejected, (state, action) => {
        state.addloading = false;
        state.adderror = action.error;
        toast.error("Error occured");
      });

    builder
      .addCase(getDailyLogData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDailyLogData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getDailyLogData.rejected, (state, action) => {
        state.geterror = action.error;
        state.loading = false;
        toast.error(action.geterror);
      });

    builder
      .addCase(getDailyLogCate_Sub.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDailyLogCate_Sub.fulfilled, (state, action) => {
        state.catsub = action.payload;
        state.loading = false;
      })
      .addCase(getDailyLogCate_Sub.rejected, (state, action) => {
        state.geterror = action.error;
        state.loading = false;
        toast.error(action.geterror);
      });

    builder.addCase(getDailyLogCategory.fulfilled, (state, action) => {
      state.category = action.payload;
      //   state.catgoryLoading = false;
    });
  },
});

export default dailyLogSlice.reducer;
