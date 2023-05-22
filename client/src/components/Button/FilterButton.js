import React from "react";
import "./FilterButton.css";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../reducers/pageSlice";
import { setLimit } from "../../reducers/limitSlice";
import { setOrderField } from "../../reducers/orderFieldSlice";
import { setOrderBy } from "../../reducers/orderBySlice";

export default function FilterButton() {
  const dispatch = useDispatch();

  const limit = useSelector((state) => state.limit.value);
  const orderBy = useSelector((state) => state.orderBy.value);
  const orderField = useSelector((state) => state.orderField.value);

  const handleLimitChange = (event) => {
    dispatch(setPage(1));
    dispatch(setLimit(parseInt(event.target.value)));
  };

  const handleOrderChange = (event) => {
    const [newOrderBy, newOrderField] = event.target.value.split(" ");
    dispatch(setPage(1));
    dispatch(setOrderBy(newOrderBy));
    dispatch(setOrderField(newOrderField));
  };

  return (
    <div className="filter-container">
      <select
        value={limit}
        onChange={handleLimitChange}
        className="filter-select"
      >
        <option value={10}>10개 보기</option>
        <option value={20}>20개 보기</option>
      </select>
      <select
        value={`${orderBy} ${orderField}`}
        onChange={handleOrderChange}
        className="filter-select"
      >
        <option value="DESC created">작성일 내림차순</option>
        <option value="ASC created">작성일 오름차순</option>
        <option value="DESC updatedDate">수정일 내림차순</option>
        <option value="ASC updatedDate">수정일 오름차순</option>
        <option value="DESC views_Num">조회수 내림차순</option>
        <option value="ASC views_Num">조회수 오름차순</option>
      </select>
    </div>
  );
}
