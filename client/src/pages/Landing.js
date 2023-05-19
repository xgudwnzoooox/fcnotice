import { useState, useEffect } from "react";
import axios from "axios";
import SearchBox from "../components/Button/SearchBox";
import LandingContentList from "../components/ContentList/LandingContentList";
import useFetchLogin from "../hooks/usefetchLogin";
import CreateButton from "../components/Button/CreateButton";
import "./Landing.css";

function Landing() {
  const { isLogin } = useFetchLogin();

  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(10);
  const [orderBy, setOrderBy] = useState("ASC");
  const [orderField, setOrderField] = useState("created");
  const [clickDeleteButton, setClickDeleteButton] = useState(false);

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:4000?limit=${limit}&orderBy=${orderBy}&orderField=${orderField}&page=${page}&keyword=${keyword}`
    );
    setClickDeleteButton(false);
    setContent(response.data.content);
    setTotalPages(response.data.totalPages);
  };

  useEffect(() => {
    fetchData();
  }, [limit, orderBy, orderField, page, clickDeleteButton, isLogin]);

  const updateContent = (id) => {
    setContent((prevContent) => prevContent.filter((item) => item.id !== id));
  };

  const handleLimitChange = (event) => {
    setPage(1);
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
    <div className="landing-container">
      <div className="search-container">
        <SearchBox
          handleKeywordChange={handleKeywordChange}
          onSubmitHandler={onSubmitHandler}
          keyword={keyword}
        />
      </div>
      <div className="filter-container">
        <select
          value={limit}
          onChange={handleLimitChange}
          className="filter-select"
        >
          <option value={10}>10개 보기</option>
          <option value={20}>20개 보기</option>
        </select>
        <select
          value={`${orderBy} ${orderField}`}
          onChange={handleOrderChange}
          className="filter-select"
        >
          <option value="DESC created">작성일 내림차순</option>
          <option value="ASC created">작성일 오름차순</option>
          <option value="DESC updatedDate">수정일 내림차순</option>
          <option value="ASC updatedDate">수정일 오름차순</option>
          <option value="DESC views_Num">조회수 내림차순</option>
          <option value="ASC views_Num">조회수 오름차순</option>
        </select>
      </div>
      <LandingContentList content={content} />
      <div className="pagination-container">
        {pageNumbers.map((number) => (
          <div
            key={number}
            onClick={(event) => handlePageChange(event, number)}
            className="page-number"
          >
            {number}
          </div>
        ))}
      </div>
      <CreateButton />
    </div>
  );
}

export default Landing;
