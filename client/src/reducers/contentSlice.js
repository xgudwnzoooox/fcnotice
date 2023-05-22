import { createSlice } from "@reduxjs/toolkit";
const contentSlice = createSlice({
  name: "contentSlice",
  initialState: { value: [] },
  reducers: {
    setContent: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default contentSlice;
export const { setContent } = contentSlice.actions;
