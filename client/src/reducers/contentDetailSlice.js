import { createSlice } from "@reduxjs/toolkit";
const contentDetailSlice = createSlice({
  name: "contentDetailSlice",
  initialState: { value: [] },
  reducers: {
    setContentDetail: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default contentDetailSlice;
export const { setContentDetail } = contentDetailSlice.actions;
