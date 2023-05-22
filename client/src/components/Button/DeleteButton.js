import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function DeleteButton(props) {
  const { updateContent, setClickDeleteButton } = props;
  const navigate = useNavigate();

  const onClickHandler = async (e) => {
    // e.preventDefault();
    const id = props.id;
    await axios.delete(`http://localhost:4000/content`, {
      // delete는 요청데이터를 설정 객체의 data 속성으로 보냄
      data: { id },
    });
    setClickDeleteButton(true);
    navigate(`/mypage/content`);
  };
  return (
    <>
      <div
        onClick={onClickHandler}
        style={{
          display: "inline",
          margin: "0px 20px 0px 0px",
          cursor: "pointer",
        }}
      >
        삭제
      </div>
    </>
  );
}
