import { createSlice } from "@reduxjs/toolkit";
const titleSlice = createSlice({
  name: "titleSlice",
  initialState: { value: "" },
  reducers: {
    setTitle: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default titleSlice;
export const { setTitle } = titleSlice.actions;
