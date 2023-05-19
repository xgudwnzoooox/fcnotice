import React from "react";
import { Link } from "react-router-dom";

export default function HomeButton() {
  return (
    <>
      <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
        <h1
          style={{
            backgroundColor: "lightBlue",
            color: "white",
            display: "inline-block",
            margin: "30px 390px 0px 0px",
          }}
        >
          Notice Board
        </h1>
      </Link>
    </>
  );
}
