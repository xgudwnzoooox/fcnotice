import React from "react";
import { Link } from "react-router-dom";

export default function HomeButton() {
  return (
    <>
      <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
        <div
          style={{
            backgroundColor: "Black",
            color: "white",
            display: "inline",
            margin: "20px 20px 0px 0px",
          }}
        >
          HOME
        </div>
      </Link>
    </>
  );
}
