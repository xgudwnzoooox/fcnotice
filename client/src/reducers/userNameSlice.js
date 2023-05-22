import { createSlice } from "@reduxjs/toolkit";
const userNameSlice = createSlice({
  name: "userNameSlice",
  initialState: { value: "" },
  reducers: {
    setUserName: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default userNameSlice;
export const { setUserName } = userNameSlice.actions;
