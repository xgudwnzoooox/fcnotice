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

function Content() {
  const { id } = useParams();
  const dispatch = useDispatch();
  dispatch(setContentId(id));

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
