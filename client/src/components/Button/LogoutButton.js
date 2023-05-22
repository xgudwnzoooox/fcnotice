/* LogoutButton.js */
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { intervalId } from "../../hooks/useInterval";
import "./LogoutButton.css";
import { useDispatch } from "react-redux";
import { setUserName } from "../../reducers/userNameSlice";
import { setIsLogin } from "../../reducers/isLoginSlice";
import { setUserId } from "../../reducers/userIdSlice";

export default function LogoutButton(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { setIsLogin, setUser } = props;

  const onClickLogoutHandler = async (e) => {
    clearInterval(intervalId); // 인터벌 정지

    await axios.post(
      `http://localhost:4000/login/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    // setIsLogin(false);
    // setUser("");
    dispatch(setUserName(""));
    dispatch(setIsLogin(false));
    dispatch(setUserId(0));
    navigate(`/`);
  };

  return (
    <div onClick={onClickLogoutHandler} className="logout-button">
      로그아웃
    </div>
  );
}
