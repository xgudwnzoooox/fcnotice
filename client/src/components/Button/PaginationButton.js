import { useDispatch, useSelector } from "react-redux";
import "./PaginationButton.css";

import React from "react";
import { setTotalPages } from "../../reducers/totalPagesSlice";

export default function PaginationButton() {
  const dispatch = useDispatch();
  const totalPages = useSelector((state) => state.totalPages.value);

  const handlePageChange = (event, value) => {
    dispatch(setTotalPages(value));
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      {pageNumbers.map((number) => (
        <div
          key={number}
          onClick={(event) => handlePageChange(event, number)}
          className="page-number"
        >
          {number}
        </div>
      ))}
    </div>
  );
}
