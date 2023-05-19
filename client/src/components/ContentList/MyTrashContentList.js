import React from "react";
import { useNavigate } from "react-router-dom";
import useKoreanTimeSimple from "../../hooks/useKoreanTimeSimple";
import UpdateButton from "../Button/UpdateButton";
import DeleteButton from "../Button/DeleteButton";
import CancelDeleteButton from "../Button/CancelDeleteButton";

export default function MyTrashContentList(props) {
  const { content, setClickCancelDeleteButton } = props;
  const { changeToKstDateSimple } = useKoreanTimeSimple();
  // const { checkAccess } = useCheckAccess();
  const navigate = useNavigate();

  const onClickList = (link) => {
    // 로그인 사용자만 게시글 상세보기 가능
    // checkAccess();
    navigate(link);
  };

  return (
    <table>
      <thead>
        <tr style={{ textAlign: "left" }}>
          <th style={{ width: "250px" }}>제목</th>
          <th style={{ width: "120px" }}>작성자</th>
          <th style={{ width: "160px" }}>작성일</th>
          <th style={{ width: "150px" }}>수정일</th>
          <th style={{ width: "80px" }}>조회수</th>
          <th style={{ width: "150px" }}>삭제일</th>
          <th style={{ width: "50px" }}>복원</th>
        </tr>
      </thead>
      <tbody>
        {content.map((contentData) => (
          <tr key={contentData.id} style={{ cursor: "pointer" }}>
            <td onClick={() => onClickList(`/content/${contentData.id}`)}>
              {contentData.title.slice(0, 20)}...
            </td>
            <td onClick={() => onClickList(`/content/${contentData.id}`)}>
              {contentData.name}
            </td>
            <td onClick={() => onClickList(`/content/${contentData.id}`)}>
              {changeToKstDateSimple(contentData.created)}
            </td>
            <td onClick={() => onClickList(`/content/${contentData.id}`)}>
              {contentData.updatedDate
                ? changeToKstDateSimple(contentData.updatedDate)
                : "-"}
            </td>
            <td onClick={() => onClickList(`/content/${contentData.id}`)}>
              {contentData.views_Num}
            </td>
            <td onClick={() => onClickList(`/content/${contentData.id}`)}>
              {changeToKstDateSimple(contentData.deletedDate)}
            </td>
            <td>
              <CancelDeleteButton
                id={contentData.id}
                setClickCancelDeleteButton={setClickCancelDeleteButton}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
