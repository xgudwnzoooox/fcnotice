import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginButton(props) {
  const navigate = useNavigate();
  const { setIsLogin } = props;

  const onClickHandler = async (e) => {
    navigate(`/login`, { state: { setIsLogin: setIsLogin } });
  };
  return (
    <div
      onClick={onClickHandler}
      style={{ display: "inline-block", cursor: "pointer" }}
    >
      로그인
    </div>
  );
}
