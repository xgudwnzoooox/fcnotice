import { configureStore } from "@reduxjs/toolkit";
import userNameSlice from "./reducers/userNameSlice";
import isLoginSlice from "./reducers/isLoginSlice";
import userIdSlice from "./reducers/userIdSlice";

const store = configureStore({
  reducer: {
    userName: userNameSlice.reducer,
    isLogin: isLoginSlice.reducer,
    userId: userIdSlice.reducer,
  },
});
export default store;
