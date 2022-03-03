import React from "react";
import "./Brand.css";
import logo from "../../assets/logo.png";
import ompassphone from "../..";
import { useNavigate } from "react-router";
const Brand = () => {
  const navigate = useNavigate();
  return (
    <div
      className="brand"
      style={{ fontWeight: "bold", fontSize: "1.5rem", cursor: "pointer" }}
      onClick={() => {
        navigate("/");
      }}
    >
      <img src={logo} alt="" />
      {/* <p>OMPASS</p> */}
    </div>
  );
};

export default Brand;
