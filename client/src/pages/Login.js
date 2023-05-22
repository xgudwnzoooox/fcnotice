import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchLogin from "../hooks/usefetchLogin";
import "./Login.css"; // CSS 파일 import

export default function Login() {
  const navigate = useNavigate();
  const { setIsLogin } = useFetchLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await axios.post(
      `http://localhost:4000/login/firstAccessToken`,
      { email, password },
      { withCredentials: true }
    );

    setIsLogin(true);

    setEmail("");
    setPassword("");
    navigate(`/`);
  };

  return (
    <form className="login-form" onSubmit={onSubmitHandler}>
      <div className="form-group">
        <label className="label">Email</label>
        <input
          className="input"
          type="email"
          placeholder="이메일"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="label">Password</label>
        <input
          className="input"
          type="password"
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <input className="submit-btn" type="submit" value="로그인" />
    </form>
  );
}
