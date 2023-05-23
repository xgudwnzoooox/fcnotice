import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import useKoreanTime from "../hooks/useKoreanTime";
import PreviousNextContentList from "../components/ContentList/PreviousNextContentList";
import "./Content.css";
import { useDispatch, useSelector } from "react-redux";
import { setViews } from "../reducers/viewsSlice";
import { setContentDetail } from "../reducers/contentDetailSlice";
import { setPreviousNextContent } from "../reducers/previoustNextContentSlice";
import useUpdateContentViews from "../hooks/useUpdateContentViews";
import { setContentId } from "../reducers/contentIdSlice";
import useFetchContentDetailData from "../hooks/useFetchContentDetailData";

function Content() {
  const { id } = useParams();
  const dispatch = useDispatch();
  dispatch(setContentId(id));
  const { changeToKstDate } = useKoreanTime();
  const contentId = useSelector((state) => state.contentId.value);
  const isCookie = useSelector((state) => state.isCookie.value);
  const views = useSelector((state) => state.views.value);
  const contentDetail = useSelector((state) => state.contentDetail.value);

  const { updateContentViews } = useUpdateContentViews();
  const { fetchContentDetailData } = useFetchContentDetailData();

  useEffect(() => {
    fetchContentDetailData(isCookie);
  }, [contentId]);

  useEffect(() => {
    updateContentViews();
  }, [views]);

  useEffect(() => {
    dispatch(setViews(true));
  }, [contentId]);

  return (
    <div className="content-container">
      {contentDetail.map((contentData) => (
        <div key={contentData.id}>
          <h1 className="content-title">{contentData.title}</h1>
          <div className="content-info">
            <div className="content-info-item">작성자: {contentData.name}</div>
            <div className="content-info-item">
              작성일: {changeToKstDate(contentData.created)}
            </div>
            <div className="content-info-item">
              수정일:{" "}
              {contentData.updatedDate
                ? changeToKstDate(contentData.updatedDate)
                : "-"}
            </div>
            <div className="content-info-item">
              조회수: {contentData.views_Num}
            </div>
          </div>
          <div className="content-description">
            <img
              src={`http://localhost:4000${contentData.image}`}
              alt="not see"
              className="content-image"
            />
            <div className="content-text">{contentData.description}</div>
          </div>
        </div>
      ))}
      <PreviousNextContentList />
    </div>
  );
}

export default Content;
