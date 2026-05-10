import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
  name: "search",
  initialState: {
    inputValue: "",
  },
  reducers: {
    searchInput: (state, action) => {
      state.inputValue = action.payload;
      //   console.log("action", state.inputValue);
    },
  },
});

export const { searchInput } = SearchSlice.actions;

export default SearchSlice.reducer;
