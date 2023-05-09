import React from "react";
import { Link } from "react-router-dom";
import useKoreanTimeSimple from "../../hooks/useKoreanTimeSimple";

export default function ContentList(props) {
  const { changeToKstDateSimple } = useKoreanTimeSimple();
  const { contentData } = props;

  return (
    <>
      <div style={{ display: "inline-block" }}>
        <Link
          to={"/content/" + contentData.id}
          style={{
            textDecoration: "none",
            color: "black",
            display: "flex",
          }}
        >
          <div key={contentData.id} style={{ display: "flex" }}>
            <div style={{ marginRight: "20px" }}>
              {`[${contentData.prenexText}]`}
            </div>
            <div style={{ width: "250px" }}>
              제목 : {contentData.title.slice(0, 20)}...
            </div>
            <div style={{ width: "120px" }}>작성자 : {contentData.name}</div>
            <div style={{ width: "180px" }}>
              작성일 : {changeToKstDateSimple(contentData.created)}
            </div>
            <div style={{ width: "180px" }}>
              수정일 :{" "}
              {contentData.updatedDate
                ? changeToKstDateSimple(contentData.updatedDate)
                : "-"}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
