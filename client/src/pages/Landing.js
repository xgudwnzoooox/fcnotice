import { useState, useEffect } from "react";
import axios from "axios";

function Landing() {
  const [content, setContent] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:4000");
    setContent(response.data);
    // hello
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>let's start to notice board</h1>
      {content.map((contentData) => {
        return (
          <div key={contentData.id} style={{ display: "flex" }}>
            <div style={{ width: "70px" }}>{contentData.id}</div>
            <div style={{ width: "300px" }}>title : {contentData.title}</div>
            <div style={{ width: "300px" }}>author : {contentData.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Landing;
