import { createSlice } from "@reduxjs/toolkit";
const imageSlice = createSlice({
  name: "imageSlice",
  initialState: { value: "" },
  reducers: {
    setImage: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default imageSlice;
export const { setImage } = imageSlice.actions;
