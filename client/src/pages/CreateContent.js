import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/Button/BackButton";

function CreateContent() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const author_id = Math.floor(Math.random() * 5) + 1;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    // 질문1-1.
    // formData.append("title", e.target.title.value);
    // 질문1-2.
    // const add = () => setCount((prev) => prev + 1);
    // const add = () => setCount(count+1);

    // const toggle = () => setCount((prev) => !prev );
    // const toggle = () => setHide(!hide);

    formData.append("description", description);
    formData.append("author_id", author_id);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/content/create_content_process",
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
        <p />
        <input
          type="text"
          name="title"
          placeholder="게시글 제목을 입력하세요"
          style={{ width: "500px", height: "35px" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p />
        <textarea
          name="description"
          placeholder="게시글 내용을 입력하세요"
          value={description}
          style={{ width: "500px", height: "250px" }}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <p />
        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <p />
        <input
          type="submit"
          value="작성 완료"
          style={{ marginBottom: "20px" }}
        ></input>
      </form>
    </>
  );
}

export default CreateContent;
