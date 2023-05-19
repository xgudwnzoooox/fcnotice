import axios from "axios";
import { useState } from "react";

export default function useFetchLogin() {
  const [isLogin, setIsLogin] = useState(false); // 로그인 유무
  const [user, setUser] = useState({}); // 유저정보

  const fetchLogin = async () => {
    const response = await axios.get(
      `http://localhost:4000/login/success`,
      { withCredentials: true } // 로그인 정보 확인
    );

    // jwt empty 의 경우, 서버에서 반환하는 response.data는 'logout' 문자열로 지정
    if (response.data === "noToken") {
      setIsLogin(false);
      setUser("");
    } else {
      setIsLogin(true);
      setUser(response.data[0].name);
    }
  };

  return { isLogin, user, setIsLogin, setUser, fetchLogin };
}
