import { useEffect } from "react";
import { useParams } from "react-router";
import PreviousNextContentList from "../components/Form/PreviousNextContentList";
import "./Content.css";
import { useDispatch, useSelector } from "react-redux";
import { setViews } from "../reducers/viewsSlice";
import useUpdateContentViews from "../hooks/useUpdateContentViews";
import { setContentId } from "../reducers/contentIdSlice";
import useFetchContentDetailData from "../hooks/useFetchContentDetailData";
import ContentDetailForm from "../components/Form/ContentDetailForm";
import useCheckAccess from "../hooks/useCheckAccess";

function Content() {
  const { id } = useParams();
  const dispatch = useDispatch();
  dispatch(setContentId(id));

  // 질문1
  // alert가 두 번 일어남
  // 로그인이 된 유저인지 확인하는 프로세스
  // 어떻게 해야 한 번만 alert가 생길지 궁금합니다.
  useCheckAccess();

  const contentId = useSelector((state) => state.contentId.value);
  const isCookie = useSelector((state) => state.isCookie.value);
  const views = useSelector((state) => state.views.value);

  const { updateContentViews } = useUpdateContentViews();
  const { fetchContentDetailData } = useFetchContentDetailData();

  useEffect(() => {
    fetchContentDetailData(isCookie);
    dispatch(setViews(true));
  }, [contentId]);

  useEffect(() => {
    updateContentViews();
  }, [views]);

  return (
    <div className="content-container">
      <ContentDetailForm />
      <PreviousNextContentList />
    </div>
  );
}

export default Content;
