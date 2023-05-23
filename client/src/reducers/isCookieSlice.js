import { createSlice } from "@reduxjs/toolkit";
const isCookieSlice = createSlice({
  name: "isCookieSlice",
  initialState: { value: false },
  reducers: {
    setIsCookie: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default isCookieSlice;
export const { setIsCookie } = isCookieSlice.actions;
