import { useDispatch, useSelector } from "react-redux";
import useFetchContentData from "../../hooks/useFetchContentData";
import { setPage } from "../../reducers/pageSlice";
import { setKeyword } from "../../reducers/keywordSlice";
import "./SearchBox.css";

function SearchBox(props) {
  const { fetchContentData } = useFetchContentData();
  const dispatch = useDispatch();

  const keyword = useSelector((state) => state.keyword.value);

  const handleKeywordChange = (event) => {
    dispatch(setKeyword(event.target.value));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    fetchContentData();
    dispatch(setPage(1));
    dispatch(setKeyword(""));
  };

  return (
    <div className="search-container">
      <form onSubmit={onSubmitHandler}>
        <p />
        <input
          type="text"
          name="search"
          placeholder="제목 또는 내용 또는 작성자 검색"
          autoFocus
          onChange={handleKeywordChange}
          value={keyword}
          style={{ width: "400px", height: "20px", margin: "40px 5px 0 0" }}
        />
        <input
          type="submit"
          value="검색"
          style={{ width: "60px", height: "27px", margin: "0px 20px 0 0" }}
        />
        <p />
      </form>
    </div>
  );
}

export default SearchBox;
