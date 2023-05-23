import { createSlice } from "@reduxjs/toolkit";
const clickCancelDeleteButtonSlice = createSlice({
  name: "clickCancelDeleteButtonSlice",
  initialState: { value: false },
  reducers: {
    setClickCancelDeleteButton: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default clickCancelDeleteButtonSlice;
export const { setClickCancelDeleteButton } =
  clickCancelDeleteButtonSlice.actions;
