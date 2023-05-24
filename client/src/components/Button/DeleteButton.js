import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setClickDeleteButton } from "../../reducers/clickDeleteButtonSlice";

export default function DeleteButton(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickHandler = async (e) => {
    try {
      const id = props.id;
      await axios.delete(`http://localhost:4000/content`, {
        // delete는 요청데이터를 설정 객체의 data 속성으로 보냄
        data: { id },
      });
      dispatch(setClickDeleteButton(true));
      navigate(`/mypage/content`);
    } catch (error) {
      console.error("컨텐츠 삭제 중 오류가 발생했습니다:", error);
      // 오류 처리 로직 추가
    }
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
