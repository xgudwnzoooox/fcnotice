import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../reducers/titleSlice";
import { setDescription } from "../../reducers/descriptionSlice";
import { setImage } from "../../reducers/imageSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateUpdateContentForm.css";

export default function CreateUpdateContentForm(props) {
  const { fetch, imageDiv } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const title = useSelector((state) => state.title.value);
  const description = useSelector((state) => state.description.value);
  const image = useSelector((state) => state.image.value);
  const contentId = useSelector((state) => state.contentId.value);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("contentId", contentId); // for Update
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      withCredentials: true,
    };

    try {
      let response = "";
      if (fetch === "POST") {
        response = await axios.post(
          "http://localhost:4000/content",
          formData,
          config
          // { withCredentials: true }
          // config에 추가함
        );
      } else {
        response = await axios.put(
          "http://localhost:4000/content",
          formData,
          config
        );
      }
      dispatch(setTitle(""));
      dispatch(setDescription(""));
      dispatch(setImage(""));
      navigate(`/content/${response.data}`);
    } catch (error) {
      console.error("게시글 작성 또는 수정 중 오류가 발생했습니다:", error);
      // 오류 처리 로직 추가
    }
  };

  return (
    <form onSubmit={onSubmitHandler} style={{ margin: "130px 0 0 0" }}>
      <div className="form-group">
        <label htmlFor="title">게시글 제목</label>
        <input
          type="text"
          name="title"
          id="title"
          className="input-field title-input"
          placeholder="게시글 제목을 입력하세요"
          value={title}
          onChange={(e) => dispatch(setTitle(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">게시글 내용</label>
        <textarea
          name="description"
          id="description"
          className="input-field description-input"
          placeholder="게시글 내용을 입력하세요"
          value={description}
          onChange={(e) => dispatch(setDescription(e.target.value))}
        ></textarea>
      </div>
      {imageDiv}
      <div className="form-group">
        <input type="submit" value="작성 완료" className="submit-button" />
      </div>
    </form>
  );
}
