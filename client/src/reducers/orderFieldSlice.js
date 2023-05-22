import { createSlice } from "@reduxjs/toolkit";
const orderFieldSlice = createSlice({
  name: "orderFieldSlice",
  initialState: { value: "created" },
  reducers: {
    setOrderField: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default orderFieldSlice;
export const { setOrderField } = orderFieldSlice.actions;
