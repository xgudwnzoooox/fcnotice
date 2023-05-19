import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import BackButton from "../components/Button/BackButton";

function UpdateContent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fileInput = useRef(null); // ref 생성

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:4000/content/${id}`);
    setImage(response.data[0].image.split("/").pop());
    setTitle(response.data[0].title);
    setDescription(response.data[0].description);
    // 질문5
    // console.log(image, title, description);
    // 질문6
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
      const response = await axios.post(
        "http://localhost:4000/content/update_content_process",
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
      <BackButton />
      <form onSubmit={onSubmitHandler}>
        <input type="hidden" name="id" value={id} />
        <p />
        <input
          type="text"
          name="title"
          placeholder="title"
          style={{ width: "500px", height: "35px" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p />
        <textarea
          name="description"
          placeholder="description"
          value={description}
          style={{ width: "500px", height: "250px" }}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <p />
        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ display: "none" }}
          id="fileInput"
          ref={fileInput}
        />
        <label
          htmlFor="fileInput"
          style={{
            display: "inline-block",
            backgroundColor: "gray",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "2px",
            cursor: "pointer",
            margin: "0 10px 0 0",
          }}
        >
          {`파일 첨부 `}
        </label>
        <div style={{ display: "inline-block" }}>{`${image?.slice(
          0,
          10
        )}.jpg`}</div>
        <p />
        <input
          type="submit"
          value="작성 완료"
          style={{ marginBottom: "20px" }}
        />
      </form>
    </>
  );
}

export default UpdateContent;
