import React from "react";
import "./LandingContentList.css";
import { useDispatch, useSelector } from "react-redux";
import UsualContentList from "./UsualContentList";
import { setIsCookie } from "../../reducers/isCookieSlice";

export default function LandingContentList(props) {
  const content = useSelector((state) => state.content.value);
  const dispatch = useDispatch();
  dispatch(setIsCookie(false));

  return (
    <table className="content-list-table">
      <thead>
        <tr>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>수정일</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        {content.map((contentData) => (
          <tr key={contentData.id} className="content-list-row">
            <UsualContentList contentData={contentData} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
