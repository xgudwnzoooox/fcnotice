import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ContentList from "./ContentList";
import "./PreviousNextContentList.css"; // CSS 파일을 import 해주세요.

export default function PreviousNextContentList(props) {
  const [previousNextContent, setPreviousNextContent] = useState([]);
  const { id } = props;

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:4000/content/prevNextContent/${id}`,
      { withCredentials: true }
    );

    if (response.data.prev.length !== 0) {
      response.data.prev[0].prenexText = "이전 게시물";
    }

    if (response.data.next.length !== 0) {
      response.data.next[0].prenexText = "다음 게시물";
    }

    setPreviousNextContent(response.data.prev.concat(response.data.next));
  };

  useEffect(() => {
    fetchData();
  }, [id]);

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
