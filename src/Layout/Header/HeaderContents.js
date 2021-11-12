import React from "react";
import { connect } from "react-redux";
import ActionCreators from "../../redux/actions";
import "./HeaderContents.css";
import Locale from "./Locale";
import { useHistory } from "react-router";

const HeaderContents = ({ menuState, setIsLogin }) => {
  const history = useHistory();
  return (
    <div className="header-contents">
      <div className="header-contents-route-title">{menuState}</div>
      <div className="header-contents-button-box">
        <button
          className="loginButton"
          onClick={() => {
            setIsLogin(false);
          }}
        >
          로그아웃
        </button>
        <Locale />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    menuState: state.menuState,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    menuChange: (toggle) => {
      dispatch(ActionCreators.menuStateChange(toggle));
    },
    setIsLogin: (toggle) => {
      dispatch(ActionCreators.setIsLogin(toggle));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContents);
