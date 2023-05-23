import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MyContentList.css";
import UsualContentList from "./UsualContentList";
import { setIsCookie } from "../../reducers/isCookieSlice";
import CancelDeleteButton from "../Button/CancelDeleteButton";

export default function MyContentList(props) {
  const content = useSelector((state) => state.content.value);
  const dispatch = useDispatch();
  dispatch(setIsCookie(true));

  return (
    <table className="content-list-table">
      <thead>
        <tr>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>수정일</th>
          <th>조회수</th>
          <th>복원</th>
        </tr>
      </thead>
      <tbody>
        {content.map((contentData) => (
          <tr key={contentData.id} className="content-list-row">
            <UsualContentList contentData={contentData} />
            <td>
              <CancelDeleteButton id={contentData.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
