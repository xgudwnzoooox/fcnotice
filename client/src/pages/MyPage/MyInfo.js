import React, { useEffect, useState } from "react";
import MyPageBar from "../../components/Bar/MyPageBar";
import axios from "axios";
import "./MyInfo.css";

export default function MyInfo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:4000/login/myinfo`, {
      withCredentials: true,
    });

    setName(response.data.name);
    setEmail(response.data.email);
  };

  useEffect(() => {
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
