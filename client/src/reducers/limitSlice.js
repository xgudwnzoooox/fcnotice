import { createSlice } from "@reduxjs/toolkit";
const limitSlice = createSlice({
  name: "limitSlice",
  initialState: { value: 10 },
  reducers: {
    setLimit: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default limitSlice;
export const { setLimit } = limitSlice.actions;
