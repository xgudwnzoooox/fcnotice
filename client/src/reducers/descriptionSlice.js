import { createSlice } from "@reduxjs/toolkit";
const descriptionSlice = createSlice({
  name: "descriptionSlice",
  initialState: { value: "" },
  reducers: {
    setDescription: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default descriptionSlice;
export const { setDescription } = descriptionSlice.actions;
