import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useCheckAccess() {
  const navigate = useNavigate();

  const checkAccess = async () => {
    const response = await axios.get(
      `http://localhost:4000/login/success`,
      { withCredentials: true } // 로그인 정보 확인
    );

    if (response.data[0].name) {
      console.log("successs");
    } else {
      navigate("/login");
      alert("로그인 후 사용해주세요");
    }
  };
  return { checkAccess };
}
