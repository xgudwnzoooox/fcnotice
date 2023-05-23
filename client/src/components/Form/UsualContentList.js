import React from "react";
import useKoreanTimeSimple from "../../hooks/useKoreanTimeSimple";
import { useNavigate } from "react-router-dom";

export default function UsualContentList(props) {
  const { contentData } = props;
  const { changeToKstDateSimple } = useKoreanTimeSimple();
  const navigate = useNavigate();

  const onClickList = (link) => {
    navigate(link);
  };

  return (
    <>
      {[
        contentData.title.slice(0, 20),
        contentData.name,
        changeToKstDateSimple(contentData.created),
        contentData.updatedDate
          ? changeToKstDateSimple(contentData.updatedDate)
          : "-",
        contentData.views_Num,
      ].map((item, index) => (
        <td onClick={() => onClickList(`/content/${contentData.id}`)}>
          {index === 0 ? `${item}...` : item}
        </td>
      ))}
    </>
  );
}
