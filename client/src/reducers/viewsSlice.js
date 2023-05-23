import { createSlice } from "@reduxjs/toolkit";
const viewsSlice = createSlice({
  name: "viewsSlice",
  initialState: { value: false },
  reducers: {
    setViews: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default viewsSlice;
export const { setViews } = viewsSlice.actions;
