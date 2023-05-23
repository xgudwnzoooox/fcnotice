import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setContentDetail } from "../reducers/contentDetailSlice";
import { setPreviousNextContent } from "../reducers/previoustNextContentSlice";

export default function useFetchContentDetailData() {
  const dispatch = useDispatch();
  const contentId = useSelector((state) => state.contentId.value);

  const fetchContentDetailData = async (isCookie) => {
    const response = await axios.get(
      `http://localhost:4000/content/${contentId}`,
      {
        withCredentials: isCookie,
      }
    );

    dispatch(setContentDetail(response.data.current));

    if (response.data.prev.length !== 0) {
      response.data.prev[0].prenexText = "이전 게시물";
    }
    if (response.data.next.length !== 0) {
      response.data.next[0].prenexText = "다음 게시물";
    }
    dispatch(
      setPreviousNextContent(response.data.prev.concat(response.data.next))
    );
  };
  return { fetchContentDetailData };
}
