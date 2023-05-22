import React from "react";
import { useNavigate } from "react-router-dom";
import useKoreanTimeSimple from "../../hooks/useKoreanTimeSimple";
import "./LandingContentList.css";
import { useSelector } from "react-redux";

export default function LandingContentList(props) {
  const { changeToKstDateSimple } = useKoreanTimeSimple();
  const navigate = useNavigate();

  const content = useSelector((state) => state.content.value);

  const onClickList = (link) => {
    navigate(link);
  };

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
          <tr
            key={contentData.id}
            onClick={() => onClickList(`/content/${contentData.id}`)}
            className="content-list-row"
          >
            <td>{contentData.title.slice(0, 20)}...</td>
            <td>{contentData.name}</td>
            <td>{changeToKstDateSimple(contentData.created)}</td>
            <td>
              {contentData.updatedDate
                ? changeToKstDateSimple(contentData.updatedDate)
                : "-"}
            </td>
            <td>{contentData.views_Num}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
