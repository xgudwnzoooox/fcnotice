import { createSlice } from "@reduxjs/toolkit";
const isLoginSlice = createSlice({
  name: "isLoginSlice",
  initialState: { value: false },
  reducers: {
    setIsLogin: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default isLoginSlice;
export const { setIsLogin } = isLoginSlice.actions;
