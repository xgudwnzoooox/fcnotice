import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setViews } from "../reducers/viewsSlice";

export default function useUpdateContentViews() {
  const dispatch = useDispatch();
  const views = useSelector((state) => state.views.value);
  const contentId = useSelector((state) => state.contentId.value);

  const updateContentViews = async () => {
    try {
      if (views) {
        await axios.put(`http://localhost:4000/content/${contentId}/views`);
        dispatch(setViews(false));
      }
    } catch (error) {
      console.error("콘텐츠 조회수 업데이트 중 오류가 발생했습니다:", error);
      // 오류 처리 로직 추가
    }
  };

  return { updateContentViews };
}
