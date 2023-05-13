import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchLogin from "../hooks/usefetchLogin";

export default function Login() {
  const navigate = useNavigate();
  const { isLogin, user, setIsLogin, setUser, fetchLogin } = useFetchLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `http://localhost:4000/login`,
      { email, password },
      { withCredentials: true } // 로그인 정보 확인
    );

    // loginSuccess();
    setIsLogin(true);

    setEmail("");
    setPassword("");
    navigate(`/`);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        <label>email </label>
        <input
          type="email"
          placeholder="이메일"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div>
        <label>password </label>
        <input
          type="password"
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <input
        type="submit"
        value="로그인"
        style={{ margin: "0 0 20px 0 " }}
      ></input>
    </form>
  );
}
