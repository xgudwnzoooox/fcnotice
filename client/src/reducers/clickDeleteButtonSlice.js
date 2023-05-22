import { createSlice } from "@reduxjs/toolkit";
const clickDeleteButtonSlice = createSlice({
  name: "clickDeleteButtonSlice",
  initialState: { value: false },
  reducers: {
    setClickDeleteButton: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default clickDeleteButtonSlice;
export const { setClickDeleteButton } = clickDeleteButtonSlice.actions;
