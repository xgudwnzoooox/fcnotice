import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { intervalId } from "../../hooks/useInterval";

export default function LogoutButton(props) {
  const navigate = useNavigate();
  const { setIsLogin, setUser } = props;

  const onClickLogoutHandler = async (e) => {
    clearInterval(intervalId); // 인터벌 정지

    await axios.post(
      `http://localhost:4000/login/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    // document.cookie = "accessToken=";
    setIsLogin(false);
    setUser("");
    navigate(`/`);
  };

  return (
    <div
      onClick={onClickLogoutHandler}
      style={{ display: "inline-block", cursor: "pointer" }}
    >
      로그아웃
    </div>
  );
}
