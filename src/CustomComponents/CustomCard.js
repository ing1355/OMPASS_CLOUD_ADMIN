import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./CustomCard.css";

const CustomCard = ({ title, children }) => {
  return (
    <div className="custom-card-container">
      <div className="custom-card-icon-container">
        <FontAwesomeIcon icon={faUser} size="4x" />
      </div>
      <div className="custom-card-contents-container">
        <div className="custom-card-content-container">{children}</div>
        <div className="custom-card-title-container">{title}</div>
      </div>
    </div>
  );
};

export default CustomCard;
