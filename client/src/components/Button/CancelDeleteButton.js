import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setClickCancelDeleteButton } from "../../reducers/clickCancelDeleteButtonSlice";

export default function CancelDeleteButton(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickHandler = async (e) => {
    const id = props.id;
    await axios.post(`http://localhost:4000/content/restoration`, {
      id,
    });
    dispatch(setClickCancelDeleteButton(true));
    navigate(`/mypage/trash`);
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
