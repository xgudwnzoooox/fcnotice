import { useState, useEffect } from "react";
import axios from "axios";
import SearchBox from "../components/Button/SearchBox";
import ContentList from "../components/ContentList/LandingContentList";
import { useParams } from "react-router-dom";

function Search() {
  const [content, setContent] = useState([]);
  const { keyword } = useParams();

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:4000/search?keyword=${keyword}`
      // `http://localhost:4000/search/${keyword}`
    );
    setContent(response.data);
  };

  useEffect(() => {
    fetchData();
    // 검색기능일 때는 useEffect dependency 값을 설정해주어야, 여러번 검색했을 때 바로 결과값이 refresh 적용된다
    // 그렇다고 content를 dependency로 해버리면, 계속 무한적으로 fetch 된다
  }, [keyword]);

  return (
    <div>
      <h1>Notice Board</h1>
      <SearchBox />
      <ContentList content={content} />
    </div>
  );
}

export default Search;
