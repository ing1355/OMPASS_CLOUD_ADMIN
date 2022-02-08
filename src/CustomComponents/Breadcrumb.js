import React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./Breadcrumb.css";

const Breadcrumb = () => {
  const location = useLocation();
  const { pathname } = location;
  const temp =
    pathname.split("/").length <= 3
      ? pathname.split("/").slice(1)
      : pathname.split("/").slice(1, -1);
  
  return (
    <p className="breadcrumb">
      {temp.map((name, ind, arr) => (
        <React.Fragment key={ind}>
          {ind === arr.length - 1 ? (
            <span key={ind}>{name}</span>
          ) : (
            <Link key={ind} to={"/" + arr.slice(0, ind + 1).join("/")}>
              <span>{name}</span>
              {ind === arr.length - 1 ? null : " / "}
            </Link>
          )}
        </React.Fragment>
      ))}
    </p>
  );
};

function mapStateToProps(state) {
  return {
    menuState: state.menuState,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);
