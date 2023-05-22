import { createSlice } from "@reduxjs/toolkit";
const pageSlice = createSlice({
  name: "pageSlice",
  initialState: { value: 1 },
  reducers: {
    setPage: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default pageSlice;
export const { setPage } = pageSlice.actions;
