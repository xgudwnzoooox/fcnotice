import { createSlice } from "@reduxjs/toolkit";
const previousNextContentSlice = createSlice({
  name: "previousNextContentSlice",
  initialState: { value: [] },
  reducers: {
    setPreviousNextContent: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default previousNextContentSlice;
export const { setPreviousNextContent } = previousNextContentSlice.actions;
