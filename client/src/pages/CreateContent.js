import React from "react";
import CreateUpdateContentForm from "../components/Form/CreateUpdateContentForm";
import { useDispatch } from "react-redux";
import { setImage } from "../reducers/imageSlice";

export default function CreateContent() {
  const dispatch = useDispatch();

  const imageDiv = (
    <div className="form-group">
      <label htmlFor="image">이미지 업로드</label>
      <input
        type="file"
        name="image"
        id="image"
        className="input-field file-input"
        onChange={(e) => dispatch(setImage(e.target.files[0]))}
      />
    </div>
  );

  return <CreateUpdateContentForm fetch={"POST"} imageDiv={imageDiv} />;
}
