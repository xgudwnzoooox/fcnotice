import { createSlice } from "@reduxjs/toolkit";
const userIdSlice = createSlice({
  name: "userIdSlice",
  initialState: { value: 0 },
  reducers: {
    setUserId: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default userIdSlice;
export const { setUserId } = userIdSlice.actions;
