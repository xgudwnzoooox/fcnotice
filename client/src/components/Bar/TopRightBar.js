/* TopRightBar.js */
import React, { useEffect } from "react";
import useFetchLogin from "../../hooks/usefetchLogin";
import { useInterval } from "../../hooks/useInterval";
import LogoutButton from "../Button/LogoutButton";
import LoginButton from "../Button/LoginButton";
import { useNavigate } from "react-router-dom";
import "./TopRightBar.css";

export default function TopRightBar() {
  const { isLogin, user, setIsLogin, setUser, fetchLogin } = useFetchLogin();
  const navigate = useNavigate();

  useEffect(() => {
    fetchLogin();
  }, [isLogin, user]);

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
          >{`${user} 님`}</div>
          <LogoutButton setIsLogin={setIsLogin} setUser={setUser} />
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}