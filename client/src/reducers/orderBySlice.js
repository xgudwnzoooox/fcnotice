import { createSlice } from "@reduxjs/toolkit";
const orderBySlice = createSlice({
  name: "orderBySlice",
  initialState: { value: "ASC" },
  reducers: {
    setOrderBy: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default orderBySlice;
export const { setOrderBy } = orderBySlice.actions;
