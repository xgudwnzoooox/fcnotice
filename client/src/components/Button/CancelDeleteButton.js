import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setClickCancelDeleteButton } from "../../reducers/clickCancelDeleteButtonSlice";

export default function CancelDeleteButton(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickHandler = async (e) => {
    try {
      const id = props.id;
      await axios.post(`http://localhost:4000/content/restoration`, {
        id,
      });
      dispatch(setClickCancelDeleteButton(true));
      navigate(`/mypage/trash`);
    } catch (error) {
      console.error("컨텐츠 복원 중 오류가 발생했습니다:", error);
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
        복원
      </div>
    </>
  );
}
