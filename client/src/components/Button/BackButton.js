import React from "react";
import { useNavigate } from "react-router";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <div style={{ display: "inline" }}>
      <button
        style={{ display: "inline" }}
        onClick={() => {
          navigate(-1);
        }}
      >
        back
      </button>
    </div>
  );
}
