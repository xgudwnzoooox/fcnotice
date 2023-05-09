import React from "react";
import { Link } from "react-router-dom";
import useKoreanTimeSimple from "../../hooks/useKoreanTimeSimple";
import UpdateButton from "../Button/UpdateButton";
import DeleteButton from "../Button/DeleteButton";

export default function LandingContentList(props) {
  const { content, updateContent, setClickDeleteButton } = props;
  const { changeToKstDateSimple } = useKoreanTimeSimple();

  return (
    <table>
      <thead>
        <tr style={{ textAlign: "left" }}>
          <th style={{ width: "250px" }}>제목</th>
          <th style={{ width: "120px" }}>작성자</th>
          <th style={{ width: "160px" }}>작성일</th>
          <th style={{ width: "150px" }}>수정일</th>
          <th style={{ width: "80px" }}>조회수</th>
          <th style={{ width: "50px" }}>수정</th>
          <th style={{ width: "50px" }}>삭제</th>
        </tr>
      </thead>
      <tbody>
        {content.map((contentData) => (
          <tr key={contentData.id}>
            <td>
              <Link
                to={`/content/${contentData.id}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                {contentData.title.slice(0, 20)}...
              </Link>
            </td>
            <td>
              <Link
                to={`/content/${contentData.id}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                {contentData.name}
              </Link>
            </td>
            <td>
              <Link
                to={`/content/${contentData.id}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                {changeToKstDateSimple(contentData.created)}
              </Link>
            </td>
            <td>
              {contentData.updatedDate ? (
                <Link
                  to={`/content/${contentData.id}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  {changeToKstDateSimple(contentData.updatedDate)}
                </Link>
              ) : (
                "-"
              )}
            </td>
            <td>
              <Link
                to={`/content/${contentData.id}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                {contentData.views_Num}
              </Link>
            </td>
            <td>
              <UpdateButton id={contentData.id} />
            </td>
            <td>
              <DeleteButton
                id={contentData.id}
                updateContent={updateContent}
                setClickDeleteButton={setClickDeleteButton}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
