// HomeButton.js
import React from "react";
import { Link } from "react-router-dom";
import "./HomeButton.css";

export default function HomeButton() {
  return (
    <Link to={"/"} className="home-button">
      Arsenal
    </Link>
  );
}
