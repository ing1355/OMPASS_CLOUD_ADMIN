import React from "react";
import "./Brand.css";
import logo from "../../assets/logo.png";
import { useHistory } from "react-router";
const Brand = () => {
  const history = useHistory();
  return (
    <div className="brand" style={{ fontWeight: "bold", fontSize: "1.5rem", cursor:'pointer' }} onClick={() => {
      history.push('/')
    }}>
      <img src={logo} />
    </div>
  );
};

export default Brand;
