import { useEffect } from "react";
import useFetchLogin from "./usefetchLogin";
import axios from "axios";

export let intervalId;

export const useInterval = () => {
  const { isLogin, fetchLogin } = useFetchLogin();

  useEffect(() => {
    fetchLogin();
  }, []);

  useEffect(() => {
    const startInterval = () => {
      intervalId = setInterval(async () => {
        try {
          const response = await axios.post(
            `http://localhost:4000/login/refreshedAccessToken`,
            {},
            { withCredentials: true } // 로그인 정보 확인
          );
          console.log("Interval is running");
        } catch (error) {
          console.error("인터벌 실행 중 오류가 발생했습니다:", error);
          // 오류 처리 로직 추가
        }
      }, 1000000); // 5초마다 실행되도록 설정 (원하는 간격으로 변경 가능)
    };

    const stopInterval = () => {
      clearInterval(intervalId);
    };

    if (isLogin) {
      startInterval();
    } else {
      stopInterval();
    }

    return () => {
      stopInterval(); // 컴포넌트가 언마운트될 때 인터벌 정지
    };
  }, [isLogin]);
};
