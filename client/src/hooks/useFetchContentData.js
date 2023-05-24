import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setClickDeleteButton } from "../reducers/clickDeleteButtonSlice";
import { setContent } from "../reducers/contentSlice";
import { setTotalPages } from "../reducers/totalPagesSlice";
import { setClickCancelDeleteButton } from "../reducers/clickCancelDeleteButtonSlice";

export default function useFetchContentData() {
  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.keyword.value);
  const limit = useSelector((state) => state.limit.value);
  const orderBy = useSelector((state) => state.orderBy.value);
  const orderField = useSelector((state) => state.orderField.value);
  const page = useSelector((state) => state.page.value);

  const fetchContentData = async (useUserId, deleted) => {
    try {
      const response = await axios.get(
        `http://localhost:4000?limit=${limit}&orderBy=${orderBy}&orderField=${orderField}&page=${page}&keyword=${keyword}&deleted=${deleted}`,
        { withCredentials: useUserId }
      );
      dispatch(setClickDeleteButton(false));
      dispatch(setClickCancelDeleteButton(false));
      dispatch(setContent(response.data.content));
      dispatch(setTotalPages(response.data.totalPages));
    } catch (error) {
      console.error("콘텐츠 데이터를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  return { fetchContentData };
}
