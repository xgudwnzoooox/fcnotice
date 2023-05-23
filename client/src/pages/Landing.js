import "./Landing.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useFetchContentData from "../hooks/useFetchContentData";
import SearchBox from "../components/Button/SearchBox";
import CreateButton from "../components/Button/CreateButton";
import FilterButton from "../components/Button/FilterButton";
import PaginationButton from "../components/Button/PaginationButton";
import LandingContentList from "../components/ContentList/LandingContentList";

function Landing() {
  const { fetchContentData } = useFetchContentData();
  const isLogin = useSelector((state) => state.isLogin.value);
  const limit = useSelector((state) => state.limit.value);
  const orderBy = useSelector((state) => state.orderBy.value);
  const orderField = useSelector((state) => state.orderField.value);
  const page = useSelector((state) => state.page.value);

  useEffect(() => {
    // 인자는 쿠키 정보 전달 여부를 뜻함. true > 쿠키전달(=유저 jwt 전달)
    fetchContentData(false);
  }, [limit, orderBy, orderField, page, isLogin]);

  return (
    <div className="landing-container">
      <SearchBox />
      <FilterButton />
      <LandingContentList />
      <PaginationButton />
      <CreateButton />
    </div>
  );
}

export default Landing;
