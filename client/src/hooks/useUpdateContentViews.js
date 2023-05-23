import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setViews } from "../reducers/viewsSlice";

export default function useUpdateContentViews() {
  const dispatch = useDispatch();
  const views = useSelector((state) => state.views.value);
  const contentId = useSelector((state) => state.contentId.value);

  const updateContentViews = async () => {
    if (views) {
      console.log(views, contentId);
      await axios.put("http://localhost:4000/content", {
        contentId,
      });
      dispatch(setViews(false));
    }
  };
  return { updateContentViews };
}
