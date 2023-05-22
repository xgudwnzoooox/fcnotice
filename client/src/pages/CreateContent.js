import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCheckAccess from "../hooks/useCheckAccess";
import "./CreateContent.css"; // CSS 파일을 import
import useFetchLogin from "../hooks/usefetchLogin";

function CreateContent() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { userId } = useFetchLogin();
  const { checkAccess } = useCheckAccess();
  useEffect(() => {
    checkAccess();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(userId);
    // const author_id = Math.floor(Math.random() * 5) + 1;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    // formData.append("author_id", author_id);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      withCredentials: true,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/content",
        formData,
        config
        // { withCredentials: true }
        // config에 추가함
      );
      navigate(`/content/${response.data}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">이미지 업로드</label>
          <input
            type="file"
            name="image"
            id="image"
            className="input-field file-input"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="작성 완료" className="submit-button" />
        </div>
      </form>
    </>
  );
}

export default CreateContent;
