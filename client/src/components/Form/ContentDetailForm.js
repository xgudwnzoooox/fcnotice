import React from "react";
import useKoreanTime from "../../hooks/useKoreanTime";
import { useSelector } from "react-redux";
import "./ContentDetailForm.css";

export default function ContentDetailForm() {
  const { changeToKstDate } = useKoreanTime();
  const contentDetail = useSelector((state) => state.contentDetail.value);

  return (
    <>
      {contentDetail.map((contentData) => (
        <div key={contentData.id}>
          <h1 className="content-title">{contentData.title}</h1>
          <div className="content-info">
            <div className="content-info-item">작성자: {contentData.name}</div>
            <div className="content-info-item">
              작성일: {changeToKstDate(contentData.created)}
            </div>
            <div className="content-info-item">
              수정일:{" "}
              {contentData.updatedDate
                ? changeToKstDate(contentData.updatedDate)
                : "-"}
            </div>
            <div className="content-info-item">
              조회수: {contentData.views_Num}
            </div>
          </div>
          <div className="content-description">
            <img
              src={`http://localhost:4000${contentData.image}`}
              alt="not see"
              className="content-image"
            />
            <div className="content-text">{contentData.description}</div>
          </div>
        </div>
      ))}
    </>
  );
}
