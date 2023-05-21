import { createSlice } from "@reduxjs/toolkit";
const counterSlice = createSlice({
  name: "counterSlice",
  initialState: { value: "" },
  reducers: {
    up: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default counterSlice;
export const { up } = counterSlice.actions;
