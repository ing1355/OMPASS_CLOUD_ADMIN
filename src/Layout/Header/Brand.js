import React from "react";
import "./Brand.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { menuStateChange } from "../../redux/reducers/menuStateReducer";
const Brand = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div
      className="brand"
      style={{ fontWeight: "bold", fontSize: "1.5rem", cursor: "pointer" }}
      onClick={() => {
        navigate("/");
        dispatch(menuStateChange("Dashboard"));
      }}
    >
      <img src={logo} alt="" />
    </div>
  );
};

export default Brand;
