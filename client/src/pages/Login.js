import axios from "axios";
import "./Login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../reducers/isLoginSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:4000/login/firstAccessToken`,
        { email, password },
        { withCredentials: true }
      );

      dispatch(setIsLogin(true));

      setEmail("");
      setPassword("");
      navigate(`/`);
    } catch (error) {
      console.error("로그인 중 오류가 발생했습니다:", error);
      // 오류 처리 로직 추가
    }
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
