import { createSlice } from "@reduxjs/toolkit";
const keywordSlice = createSlice({
  name: "keywordSlice",
  initialState: { value: "" },
  reducers: {
    setKeyword: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default keywordSlice;
export const { setKeyword } = keywordSlice.actions;
