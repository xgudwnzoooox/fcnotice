/* LoginButton.js */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginButton.css";

export default function LoginButton(props) {
  const navigate = useNavigate();
  // const { setIsLogin } = props;

  const onClickHandler = async (e) => {
    navigate(`/login`);
  };
  return (
    <div onClick={onClickHandler} className="login-button">
      로그인
    </div>
  );
}
