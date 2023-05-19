import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import BackButton from "../components/Button/BackButton";
import UpdateButton from "../components/Button/UpdateButton";
import useKoreanTime from "../hooks/useKoreanTime";
import PreviousNextContentList from "../components/ContentList/PreviousNextContentList";
import { useInterval } from "../hooks/useInterval";
import useFetchLogin from "../hooks/usefetchLogin";

function Content() {
  const { id } = useParams();
  const { changeToKstDate } = useKoreanTime();
  const [contentDetail, setContentDetail] = useState([]);
  const { isLogin } = useFetchLogin();

  // 질문7-1
  const [views, setViews] = useState(false);
  const updateContentViews = async () => {
    if (views) {
      await axios.post("http://localhost:4000/content/update_content_process", {
        id,
      });
      setViews(false);
    }
  };

  const fetchContentData = async () => {
    const response = await axios.get(`http://localhost:4000/content/${id}`);
    setContentDetail(response.data);
  };

  // refresh accessToken by refreshToken
  console.log("islogin:" + isLogin);
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

  // 질문 7-2 처음 코드. 새로 고침하면 조회수가 2씩 늘어남
  // const updateContentViews = async () => {
  //   await axios.post("http://localhost:4000/content/update_content_process", {
  //     id,
  //   });
  // };

  // const fetchContentData = async () => {
  //   const response = await axios.get(`http://localhost:4000/content/${id}`);
  //   setContentDetail(response.data);
  // };

  // useEffect(() => {
  //   fetchContentData();
  //   updateContentViews();
  //   console.log(id);
  // }, [id]);

  // 질문7-3. view를 일반 변수 let으로 선언
  // let views = false;
  // const updateContentViews = async () => {
  //   if (views) {
  //     await axios.post("http://localhost:4000/content/update_content_process", {
  //       id,
  //     });
  //     views = false;
  //   }
  // };

  // const fetchContentData = async () => {
  //   const response = await axios.get(`http://localhost:4000/content/${id}`);
  //   setContentDetail(response.data);
  // };

  // useEffect(() => {
  //   fetchContentData();
  // }, [id]);

  // useEffect(() => {
  //   updateContentViews();
  // }, [views]);

  // useEffect(() => {
  //   views = true;
  // }, [id]);

  return (
    <>
      <BackButton />
      {contentDetail.map((contentData) => {
        return (
          <>
            <div key={contentData.id}>
              <h1>{contentData.title}</h1>
              <p />
              <div
                style={{
                  width: "300px",
                  marginRight: "100px",
                  display: "inline",
                }}
              >
                작성자 : {contentData.name}
              </div>
              <div style={{ display: "inline", marginRight: "50px" }}>
                작성일 : {changeToKstDate(contentData.created)}
              </div>
              <div style={{ display: "inline", marginRight: "30px" }}>
                {`수정일 : ${
                  contentData.updatedDate
                    ? changeToKstDate(contentData.updatedDate)
                    : "-"
                }`}
              </div>
              <div
                style={{ display: "inline" }}
              >{`조회수 : ${contentData.views_Num}`}</div>
              <p />
              <div style={{ display: "flex" }}>
                <img
                  src={`http://localhost:4000${contentData.image}`}
                  alt="not see"
                  style={{
                    width: "500px",
                    display: "inline-block",
                    marginRight: "15px",
                  }}
                />
                <div style={{ width: "420px", display: "inline-block" }}>
                  {contentData.description}
                </div>
              </div>
              <p />
            </div>
          </>
        );
      })}
      <p />
      <PreviousNextContentList id={id} />
      <UpdateButton id={id} />
    </>
  );
}

export default Content;
