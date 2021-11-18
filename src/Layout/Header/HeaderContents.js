import React, { useEffect } from "react";
import { connect } from "react-redux";
import ActionCreators from "../../redux/actions";
import "./HeaderContents.css";
import Locale from "./Locale";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";

const HeaderContents = ({ menuState, setIsLogin, isLogin }) => {
  const history = useHistory();

  useEffect(() => {
    if(!isLogin) {
      localStorage.clear();
      history.push('/');
    }
  },[isLogin])

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
          <FormattedMessage id="logout" />
        </button>
        <Locale />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    menuState: state.menuState,
    isLogin: state.isLogin
  };
}

function mapDispatchToProps(dispatch) {
  return {
    menuChange: (toggle) => {
      dispatch(ActionCreators.menuStateChange(toggle));
    },
    setIsLogin: (toggle) => {
      dispatch(ActionCreators.setIsLogin(toggle));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContents);
