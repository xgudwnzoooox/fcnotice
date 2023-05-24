import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useCheckAccess() {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.isLogin.value);
  useEffect(() => {
    if (isLogin) {
      console.log("success");
    } else {
      navigate("/login", { replace: true });
      alert("로그인 후 사용해주세요");
    }
  }, [isLogin]);

  // const checkAccess = async () => {
  //   // const response = await axios.get(
  //   //   `http://localhost:4000/login/userInfo`,
  //   //   { withCredentials: true } // 로그인 정보 확인
  //   // );
  //   // if (response.data.name) {
  //   //   console.log("success");
  //   // } else {
  //   //   navigate("/login");
  //   //   alert("로그인 후 사용해주세요");
  //   // }
  // };
  // return { checkAccess };
}
