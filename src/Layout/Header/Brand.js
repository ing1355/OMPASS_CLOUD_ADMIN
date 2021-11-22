import React from "react";
import "./Brand.css";
import logo from "../../assets/logo.png";
const Brand = () => {
  return (
    <div className="brand" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
      {/* <p> OMPASS</p> */}
      <img src={logo} />
    </div>
  );
};

export default Brand;
