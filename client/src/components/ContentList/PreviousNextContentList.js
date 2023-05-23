import React from "react";
import ContentList from "./ContentList";
import "./PreviousNextContentList.css"; // CSS 파일을 import 해주세요.
import { useSelector } from "react-redux";

export default function PreviousNextContentList() {
  const previousNextContent = useSelector(
    (state) => state.previousNextContent.value
  );

  return (
    <div className="previous-next-container">
      {previousNextContent.map((contentData, index) => {
        return (
          <div key={index} className="previous-next-item">
            <ContentList contentData={contentData} />
          </div>
        );
      })}
    </div>
  );
}
