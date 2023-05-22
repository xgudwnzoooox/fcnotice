import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import "./UpdateContent.css"; // CSS 파일 추가

function UpdateContent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fileInput = useRef(null);

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:4000/content/${id}`);
    setImage(response.data[0].image?.split("/").pop());
    setTitle(response.data[0].title);
    setDescription(response.data[0].description);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.put(
        "http://localhost:4000/content",
        formData,
        config
      );
      navigate(`/content/${response.data}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="update-form">
        <input type="hidden" name="id" value={id} />
        <div className="form-group">
          <label htmlFor="title">게시글 제목</label>
          <input
            type="text"
            name="title"
            placeholder="게시글 제목을 입력하세요"
            className="input-field title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">게시글 내용</label>
          <textarea
            name="description"
            placeholder="게시글 내용을 입력하세요"
            className="input-field description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">이미지 업로드</label>
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ display: "none" }}
            id="fileInput"
            ref={fileInput}
          />
          <label htmlFor="fileInput" className="file-label">
            {`파일 첨부 `}
          </label>
          <div className="image-name">{`${image?.slice(0, 10)}.jpg`}</div>
        </div>
        <input type="submit" value="작성 완료" className="submit-button" />
      </form>
    </>
  );
}

export default UpdateContent;
