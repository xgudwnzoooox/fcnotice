import { createSlice } from "@reduxjs/toolkit";
const contentIdSlice = createSlice({
  name: "contentIdSlice",
  initialState: { value: 0 },
  reducers: {
    setContentId: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default contentIdSlice;
export const { setContentId } = contentIdSlice.actions;
