import { useNavigate } from "react-router";

function SearchBox(props) {
  const { handleKeywordChange, onSubmitHandler, keyword } = props;

  return (
    <form onSubmit={onSubmitHandler}>
      <p />
      <input
        type="text"
        name="search"
        placeholder="제목 또는 내용 또는 작성자 검색"
        autoFocus
        onChange={handleKeywordChange}
        value={keyword}
        style={{ width: "400px", marginRight: "5px" }}
      />
      <input type="submit" value="검색" />
      <p />
    </form>
  );
}

export default SearchBox;
