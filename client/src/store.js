import { configureStore } from "@reduxjs/toolkit";
import userNameSlice from "./reducers/userNameSlice";
import isLoginSlice from "./reducers/isLoginSlice";
import userIdSlice from "./reducers/userIdSlice";
import contentSlice from "./reducers/contentSlice";
import pageSlice from "./reducers/pageSlice";
import totalPagesSlice from "./reducers/totalPagesSlice";
import keywordSlice from "./reducers/keywordSlice";
import limitSlice from "./reducers/limitSlice";
import orderBySlice from "./reducers/orderBySlice";
import orderFieldSlice from "./reducers/orderFieldSlice";
import clickDeleteButtonSlice from "./reducers/clickDeleteButtonSlice";
import isCookieSlice from "./reducers/isCookieSlice";
import contentDetailSlice from "./reducers/contentDetailSlice";
import viewsSlice from "./reducers/viewsSlice";
import previousNextContentSlice from "./reducers/previoustNextContentSlice";
import contentIdSlice from "./reducers/contentIdSlice";

const store = configureStore({
  reducer: {
    userName: userNameSlice.reducer,
    isLogin: isLoginSlice.reducer,
    userId: userIdSlice.reducer,
    content: contentSlice.reducer,
    page: pageSlice.reducer,
    totalPages: totalPagesSlice.reducer,
    keyword: keywordSlice.reducer,
    limit: limitSlice.reducer,
    orderBy: orderBySlice.reducer,
    orderField: orderFieldSlice.reducer,
    clickDeleteButton: clickDeleteButtonSlice.reducer,
    isCookie: isCookieSlice.reducer,
    contentDetail: contentDetailSlice.reducer,
    views: viewsSlice.reducer,
    previousNextContent: previousNextContentSlice.reducer,
    contentId: contentIdSlice.reducer,
  },
});
export default store;
