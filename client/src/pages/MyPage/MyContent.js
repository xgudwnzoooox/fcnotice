import "./MyContent.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useFetchContentData from "../../hooks/useFetchContentData";
import FilterButton from "../../components/Button/FilterButton";
import PaginationButton from "../../components/Button/PaginationButton";
import CreateButton from "../../components/Button/CreateButton";
import MyPageBar from "../../components/Bar/MyPageBar";
import MyContentList from "../../components/Form/MyContentList";

function MyContent() {
  const { fetchContentData } = useFetchContentData();
  const isLogin = useSelector((state) => state.isLogin.value);
  const limit = useSelector((state) => state.limit.value);
  const orderBy = useSelector((state) => state.orderBy.value);
  const orderField = useSelector((state) => state.orderField.value);
  const page = useSelector((state) => state.page.value);
  const clickDeleteButton = useSelector(
    (state) => state.clickDeleteButton.value
  );

  useEffect(() => {
    fetchContentData(true, 0);
  }, [limit, orderBy, orderField, page, clickDeleteButton, isLogin]);

  return (
    <div className="landing-container">
      <MyPageBar />
      <FilterButton />
      <MyContentList />
      <PaginationButton />
      <CreateButton />
    </div>
  );
}

export default MyContent;
