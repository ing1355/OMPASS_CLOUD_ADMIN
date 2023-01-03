import React from "react";
import "./Brand.css";
// import logo from "../../assets/logo2.png";
import logo from "../../assets/logo.png";
import hipassLogo from "../../assets/hipass.png";
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
      <img src={process.env.REACT_APP_USE_TARGET === 'hipass' ? hipassLogo : logo} alt="" />
    </div>
  );
};

export default Brand;
