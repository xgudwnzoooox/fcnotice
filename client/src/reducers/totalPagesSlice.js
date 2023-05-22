import { createSlice } from "@reduxjs/toolkit";
const totalPagesSlice = createSlice({
  name: "totalPagesSlice",
  initialState: { value: 1 },
  reducers: {
    setTotalPages: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default totalPagesSlice;
export const { setTotalPages } = totalPagesSlice.actions;
