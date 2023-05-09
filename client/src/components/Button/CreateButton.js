import React from "react";
import { Link } from "react-router-dom";

export default function CreateButton() {
  return (
    <>
      <Link
        to={"/content/create_content"}
        style={{
          textDecoration: "none",
          color: "black",
        }}
      >
        <div
          style={{
            backgroundColor: "Black",
            color: "white",
            display: "inline",
            margin: "20px 20px 0px 0px",
          }}
        >
          CREATE
        </div>
      </Link>
    </>
  );
}
