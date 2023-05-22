import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

// redux
import { setUserName } from "../reducers/userNameSlice";
import { setIsLogin } from "../reducers/isLoginSlice";
import { setUserId } from "../reducers/userIdSlice";

export default function useFetchLogin() {
  //개발용
  // const [isLogin, setIsLogin] = useState(true); // 로그인 유무
  // const [user, setUser] = useState({}); // 유저정보
  // const [userId, setUserId] = useState(0); // 유저정보

  // redux
  const dispatch = useDispatch();

  const fetchLogin = async () => {
    const response = await axios.get(`http://localhost:4000/login/userInfo`, {
      withCredentials: true,
    });

    //redux

    // jwt empty 의 경우, 서버에서 반환하는 response.data는 'logout' 문자열로 지정
    if (response.data === "noToken") {
      dispatch(setUserName(""));
      dispatch(setIsLogin(false));
      dispatch(setUserId(0));

      // setIsLogin(false);
      // redux
      // setUser("");
    } else {
      // redux
      dispatch(setUserName(response.data.name));
      dispatch(setIsLogin(true));
      dispatch(setUserId(response.data.id));

      // setIsLogin(true);
      // setUser(response.data.name);
      // setUserId(response.data.id);
    }
  };

  // return { isLogin, user, userId, setUserId, setIsLogin, setUser, fetchLogin };
  return { fetchLogin };
}
