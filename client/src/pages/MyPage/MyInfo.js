import React, { useEffect, useState } from "react";
import MyPageBar from "../../components/Bar/MyPageBar";
import axios from "axios";
import "./MyInfo.css";

export default function MyInfo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/login/myinfo`, {
          withCredentials: true,
        });

        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류가 발생했습니다:", error);
        // 오류 처리 로직 추가
      }
    };

    fetchData();
  }, []);

  return (
    <div className="my-info-container">
      <MyPageBar />
      <div className="my-info-item">
        <span className="my-info-label">이름:</span>
        <span className="my-info-value">{name}</span>
      </div>
      <div className="my-info-item">
        <span className="my-info-label">이메일:</span>
        <span className="my-info-value">{email}</span>
      </div>
    </div>
  );
}
