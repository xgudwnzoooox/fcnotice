import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Content from "./pages/Content";

function App() {
  const [content, setContent] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:4000");
    setContent(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>let's start to notice board</h1>
      {/* <div>{content[0].title}</div> */}
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

export default App;
