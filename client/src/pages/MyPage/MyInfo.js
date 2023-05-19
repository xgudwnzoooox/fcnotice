import React, { useEffect, useState } from "react";
import MyPageBar from "../../components/Bar/MyPageBar";
import axios from "axios";

export default function MyInfo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:4000/login/myinfo`, {
      withCredentials: true,
    });
    console.log(response.data);

    setName(response.data.name);
    setEmail(response.data.email);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <MyPageBar />
      <div>{`이름 : ${name}`}</div>
      <div>{`이메일 : ${email}`}</div>
    </div>
  );
}
