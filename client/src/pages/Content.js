import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import BackButton from "../components/Button/BackButton";
import UpdateButton from "../components/Button/UpdateButton";
import useKoreanTime from "../hooks/useKoreanTime";
import PreviousNextContentList from "../components/ContentList/PreviousNextContentList";
import { useInterval } from "../hooks/useInterval";
import useFetchLogin from "../hooks/usefetchLogin";
import useCheckAccess from "../hooks/useCheckAccess";
import "./Content.css"; // CSS 파일을 import 해주세요.

function Content() {
  const { id } = useParams();
  const { changeToKstDate } = useKoreanTime();
  const [contentDetail, setContentDetail] = useState([]);
  const { isLogin } = useFetchLogin();
  const { checkAccess } = useCheckAccess();
  useEffect(() => {
    checkAccess();
  }, []);

  const [views, setViews] = useState(false);

  const updateContentViews = async () => {
    if (views) {
      await axios.put("http://localhost:4000/content", {
        id,
      });
      setViews(false);
    }
  };

  const fetchContentData = async () => {
    const response = await axios.get(`http://localhost:4000/content/${id}`);
    setContentDetail(response.data);
  };

  useInterval(isLogin, id);

  useEffect(() => {
    fetchContentData();
  }, [id]);

  useEffect(() => {
    updateContentViews();
  }, [views]);

  useEffect(() => {
    setViews(true);
  }, [id]);

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
      <PreviousNextContentList id={id} />
    </div>
  );
}

export default Content;
