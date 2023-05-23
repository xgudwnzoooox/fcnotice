import "./MyContent";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useFetchContentData from "../../hooks/useFetchContentData";
import FilterButton from "../../components/Button/FilterButton";
import PaginationButton from "../../components/Button/PaginationButton";
import CreateButton from "../../components/Button/CreateButton";
import MyPageBar from "../../components/Bar/MyPageBar";
import MyTrashContentList from "../../components/Form/MyTrashContentList";

function MyTrash() {
  const { fetchContentData } = useFetchContentData();
  const isLogin = useSelector((state) => state.isLogin.value);
  const limit = useSelector((state) => state.limit.value);
  const orderBy = useSelector((state) => state.orderBy.value);
  const orderField = useSelector((state) => state.orderField.value);
  const page = useSelector((state) => state.page.value);
  const clickCancelDeleteButton = useSelector(
    (state) => state.clickCancelDeleteButton.value
  );

  useEffect(() => {
    fetchContentData(true, 1);
  }, [limit, orderBy, orderField, page, clickCancelDeleteButton, isLogin]);

  return (
    <div className="landing-container">
      <MyPageBar />
      <FilterButton />
      <MyTrashContentList />
      <PaginationButton />
      <CreateButton />
    </div>
  );
}

export default MyTrash;
