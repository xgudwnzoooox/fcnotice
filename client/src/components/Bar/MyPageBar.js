import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyPageBar.css";

export default function MyPageBar() {
  const navigate = useNavigate();

  const onClickMyContentHandler = () => {
    navigate("/mypage/content");
  };

  const onClickMyInfoHandler = () => {
    navigate("/mypage/myinfo");
  };

  const onClickMyContentTrashHandler = () => {
    navigate("/mypage/trash");
  };
  return (
    <div className="my-page-bar">
      <div onClick={onClickMyContentHandler} className="my-page-item">
        내 게시글
      </div>
      <div onClick={onClickMyInfoHandler} className="my-page-item">
        내 정보
      </div>
      <div onClick={onClickMyContentTrashHandler} className="my-page-item">
        휴지통
      </div>
    </div>
  );
}
