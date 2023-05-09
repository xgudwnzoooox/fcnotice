import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ContentList from "./ContentList";

export default function PreviousNextContentList(props) {
  const [previousNextContent, setPreviousNextContent] = useState([]);
  const { id } = props;

  const fetchData = async () => {
    const responsePrevious = await axios.get(
      `http://localhost:4000/content/prev/${id}`
    );
    if (responsePrevious.data.length !== 0) {
      responsePrevious.data[0].prenexText = "이전 게시물";
    }

    const responseNext = await axios.get(
      `http://localhost:4000/content/next/${id}`
    );

    if (responseNext.data.length !== 0) {
      responseNext.data[0].prenexText = "다음 게시물";
    }

    setPreviousNextContent(responsePrevious.data.concat(responseNext.data));
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div style={{ margin: "50px 100px 30px 0px" }}>
      {previousNextContent.map((contentData, index) => {
        return (
          <div style={{ marginBottom: "10px" }}>
            <ContentList contentData={contentData} />
          </div>
        );
      })}
    </div>
  );
}
