import React, { useEffect } from "react";
import useFetchLogin from "../../hooks/usefetchLogin";
import { useInterval } from "../../hooks/useInterval";
import LogoutButton from "../Button/LogoutButton";
import LoginButton from "../Button/LoginButton";
import { useNavigate } from "react-router-dom";

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
    <>
      {isLogin ? (
        <>
          <div
            onClick={() => onClickHandler()}
            style={{
              margin: "0px 20px 0px 0",
              display: "inline-block",
              cursor: "pointer",
            }}
          >{`${user} 님`}</div>
          <LogoutButton setIsLogin={setIsLogin} setUser={setUser} />
        </>
      ) : (
        <LoginButton />
      )}
    </>
  );
}
