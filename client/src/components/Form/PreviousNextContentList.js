import React from "react";
import { Link } from "react-router-dom";
import "./PreviousNextContentList.css";
import { useSelector } from "react-redux";
import useKoreanTimeSimple from "../../hooks/useKoreanTimeSimple";

export default function PreviousNextContentList() {
  const previousNextContent = useSelector(
    (state) => state.previousNextContent.value
  );
  const { changeToKstDateSimple } = useKoreanTimeSimple();

  return (
    <div className="previous-next-container">
      {previousNextContent.map((contentData, index) => {
        return (
          <div key={index} className="previous-next-item">
            <Link
              to={"/content/" + contentData.id}
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
              }}
            >
              <div key={contentData.id} style={{ display: "flex" }}>
                <div style={{ marginRight: "20px" }}>
                  {`[${contentData.prenexText}]`}
                </div>
                <div style={{ width: "250px" }}>
                  제목 : {contentData.title.slice(0, 20)}...
                </div>
                <div style={{ width: "120px" }}>
                  작성자 : {contentData.name}
                </div>
                <div style={{ width: "180px" }}>
                  작성일 : {changeToKstDateSimple(contentData.created)}
                </div>
                <div style={{ width: "180px" }}>
                  수정일 :{" "}
                  {contentData.updatedDate
                    ? changeToKstDateSimple(contentData.updatedDate)
                    : "-"}
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
