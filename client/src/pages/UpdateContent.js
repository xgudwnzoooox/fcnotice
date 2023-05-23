import { useParams } from "react-router";
import { useEffect, useRef } from "react";
import "./UpdateContent.css"; // CSS 파일 추가
import { useDispatch, useSelector } from "react-redux";
import { setContentId } from "../reducers/contentIdSlice";
import { setImage } from "../reducers/imageSlice";
import CreateUpdateContentForm from "../components/Form/CreateUpdateContentForm";
import useFetchContentDetailData from "../hooks/useFetchContentDetailData";

function UpdateContent() {
  const { id } = useParams();
  const dispatch = useDispatch();
  dispatch(setContentId(id));
  const { fetchContentDetailData } = useFetchContentDetailData();

  const fileInput = useRef(null);
  const image = useSelector((state) => state.image.value);

  useEffect(() => {
    fetchContentDetailData(true);
  }, []);

  const imageDiv = (
    <div className="form-group">
      <label htmlFor="image">이미지 업로드</label>
      <input
        type="file"
        name="image"
        onChange={(e) => dispatch(setImage(e.target.files[0]))}
        style={{ display: "none" }}
        id="fileInput"
        ref={fileInput}
      />
      <label htmlFor="fileInput" className="file-label">
        {`파일 첨부 `}
      </label>
      <div className="image-name">{`${image?.slice(0, 10)}.jpg`}</div>
    </div>
  );

  return <CreateUpdateContentForm fetch={"PUT"} imageDiv={imageDiv} />;
}

export default UpdateContent;
