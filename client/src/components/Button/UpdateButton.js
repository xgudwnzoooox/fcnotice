import React from "react";
import { Link } from "react-router-dom";

export default function UpdateButton(props) {
  return (
    <div style={{ display: "inline" }}>
      <Link
        to={"/content/update_content/" + props.id}
        style={{
          textDecoration: "none",
          color: "black",
        }}
      >
        <div
          style={{
            display: "inline",
            margin: "20px 20px 0px 0px",
          }}
        >
          수정
        </div>
      </Link>
    </div>
  );
}
