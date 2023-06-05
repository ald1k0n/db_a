import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: {},
};

const reportSlice = createSlice({
  name: "reportSlice",
  initialState,
  reducers: {
    setHistory: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const { setHistory } = reportSlice.actions;
export default reportSlice.reducer;
