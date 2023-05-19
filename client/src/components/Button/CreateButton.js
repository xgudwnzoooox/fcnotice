import React from "react";
import { Link } from "react-router-dom";
import "./CreateButton.css";

export default function CreateButton() {
  return (
    <Link to="/content/create_content" className="create-button-link">
      <div className="create-button">CREATE</div>
    </Link>
  );
}
