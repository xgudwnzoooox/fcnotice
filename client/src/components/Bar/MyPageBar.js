// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function MyPageBar() {
//   const navigate = useNavigate();

//   const onClickMyContentHandler = () => {
//     navigate("/mypage/content");
//   };

//   const onClickMyInfoHandler = () => {
//     navigate("/mypage/myinfo");
//   };

//   const onClickMyContentTrashHandler = () => {
//     navigate("/mypage/trash");
//   };
//   return (
//     <div
//       style={{
//         margin: "30px 0 30px 10px",
//         cursor: "pointer",
//       }}
//     >
//       <div
//         onClick={() => onClickMyContentHandler()}
//         style={{ margin: "0 10px 0px 0", display: "inline-block" }}
//       >
//         내 게시글 |
//       </div>
//       <div
//         onClick={() => onClickMyInfoHandler()}
//         style={{ margin: "0 10px 0px 0", display: "inline-block" }}
//       >
//         내 정보 |
//       </div>
//       <div
//         onClick={() => onClickMyContentTrashHandler()}
//         style={{ margin: "0 10px 0px 0", display: "inline-block" }}
//       >
//         휴지통
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyPageBar.css";

export default function MyPageBar() {
  const navigate = useNavigate();

  const onClickMyContentHandler = () => {
    navigate("/mypage/content");
  };

  const onClickMyInfoHandler = () => {
    navigate("/mypage/myinfo");
  };

  const onClickMyContentTrashHandler = () => {
    navigate("/mypage/trash");
  };
  return (
    <div className="my-page-bar">
      <div onClick={onClickMyContentHandler} className="my-page-item">
        내 게시글
      </div>
      <div onClick={onClickMyInfoHandler} className="my-page-item">
        내 정보
      </div>
      <div onClick={onClickMyContentTrashHandler} className="my-page-item">
        휴지통
      </div>
    </div>
  );
}
