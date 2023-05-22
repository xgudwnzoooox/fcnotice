/* TopRightBar.js */
import React, { useEffect } from "react";
import useFetchLogin from "../../hooks/usefetchLogin";
import { useInterval } from "../../hooks/useInterval";
import LogoutButton from "../Button/LogoutButton";
import LoginButton from "../Button/LoginButton";
import { useNavigate } from "react-router-dom";
import "./TopRightBar.css";
import { useSelector } from "react-redux";

export default function TopRightBar() {
  const { fetchLogin } = useFetchLogin();
  const navigate = useNavigate();

  const userName = useSelector((state) => state.userName.value);
  const isLogin = useSelector((state) => state.isLogin.value);

  useEffect(() => {
    fetchLogin();
  }, [isLogin, userName]);

  useInterval(isLogin);

  const onClickHandler = () => {
    navigate("/mypage/content");
  };

  return (
    <div className="top-right-bar">
      {isLogin ? (
        <>
          <div
            onClick={() => onClickHandler()}
            className="user-name"
          >{`${userName} 님`}</div>
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}
