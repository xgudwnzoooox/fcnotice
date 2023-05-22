import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserName } from "../reducers/userNameSlice";
import { setIsLogin } from "../reducers/isLoginSlice";
import { setUserId } from "../reducers/userIdSlice";

export default function useFetchLogin() {
  const dispatch = useDispatch();

  const fetchLogin = async () => {
    const response = await axios.get(`http://localhost:4000/login/userInfo`, {
      withCredentials: true,
    });

    // jwt empty 의 경우, 서버에서 반환하는 response.data는 'logout' 문자열로 지정
    if (response.data === "noToken") {
      dispatch(setUserName(""));
      dispatch(setIsLogin(false));
      dispatch(setUserId(0));
    } else {
      // redux
      dispatch(setUserName(response.data.name));
      dispatch(setIsLogin(true));
      dispatch(setUserId(response.data.id));
    }
  };

  return { fetchLogin };
}
