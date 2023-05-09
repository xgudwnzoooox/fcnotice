import { useState, useEffect } from "react";
import axios from "axios";
import SearchBox from "../components/Button/SearchBox";
import LandingContentList from "../components/ContentList/LandingContentList";

function Landing() {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지 상태 추가
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수 상태 추가
  const [keyword, setKeyword] = useState("");

  const [limit, setLimit] = useState(10);
  const [orderBy, setOrderBy] = useState("ASC");
  const [orderField, setOrderField] = useState("created");

  const [clickDeleteButton, setClickDeleteButton] = useState(false);

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:4000?limit=${limit}&orderBy=${orderBy}&orderField=${orderField}&page=${page}&keyword=${keyword}` // 페이지 추가
    );
    setClickDeleteButton(false); // delete 버튼 클릭 시, 바로 랜더링 일어나도록
    setContent(response.data.content);
    setTotalPages(response.data.totalPages); // 총 페이지 수 설정
  };

  useEffect(() => {
    fetchData();
  }, [limit, orderBy, orderField, page, keyword, clickDeleteButton]);

  const updateContent = (id) => {
    setContent((prevContent) => prevContent.filter((item) => item.id !== id));
  };

  const handleLimitChange = (event) => {
    setPage(1); // 페이지를 첫 페이지로 변경
    setLimit(parseInt(event.target.value));
  };

  const handleOrderChange = (event) => {
    setPage(1);
    const value = event.target.value;
    const [newOrderBy, newOrderField] = value.split(" ");
    setOrderBy(newOrderBy);
    setOrderField(newOrderField);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const onSubmitHandler = async (e) => {
    setPage(1);
    e.preventDefault();
    fetchData();
    setKeyword("");
  };

  return (
    <div>
      <h1>Notice Board</h1>
      <div style={{ margin: "0 50px 35px 0", display: "inline-block" }}>
        <SearchBox
          handleKeywordChange={handleKeywordChange}
          onSubmitHandler={onSubmitHandler}
          keyword={keyword}
        />
      </div>
      <div style={{ margin: "0 0 35px 0", display: "inline-block" }}>
        <select
          value={limit}
          onChange={handleLimitChange}
          style={{ margin: "0 20px 0 0" }}
        >
          <option value={10}>10개 보기</option>
          <option value={20}>20개 보기</option>
        </select>
        <select value={`${orderBy} ${orderField}`} onChange={handleOrderChange}>
          <option value="DESC created">작성일 내림차순</option>
          <option value="ASC created">작성일 오름차순</option>
          <option value="DESC updatedDate">수정일 내림차순</option>
          <option value="ASC updatedDate">수정일 오름차순</option>
          <option value="DESC views_Num">조회수 내림차순</option>
          <option value="ASC views_Num">조회수 오름차순</option>
        </select>
      </div>
      <LandingContentList
        content={content}
        updateContent={updateContent}
        setClickDeleteButton={setClickDeleteButton}
      />
      <div style={{ display: "inline-block", margin: "30px 0 0 450px" }}>
        {pageNumbers.map((number) => (
          <div
            key={number}
            onClick={(event) => handlePageChange(event, number)}
            style={{
              display: "inline-block",
              margin: "0 30px 0 0",
              cursor: "pointer",
            }}
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Landing;
