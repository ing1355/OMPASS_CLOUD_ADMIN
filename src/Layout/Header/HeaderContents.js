import React, { useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import ActionCreators from "../../redux/actions";
import "./HeaderContents.css";
import Locale from "./Locale";
import { FormattedMessage } from "react-intl";
import { useLocation } from "react-router";
import "antd/dist/antd.css";
import { message } from "antd";
import route_info from "../../Constants/Route_items";

const HeaderContents = ({ menuState, setIsLogin, menuChange, userProfile }) => {
  const location = useLocation();
  const { role } = userProfile;

  useLayoutEffect(() => {
    const target = route_info(role).find(
      (item) => item.route === "/" + window.location.pathname.split("/")[1]
    );
    if (target) menuChange(target.name);
  }, [location]);

  return (
    <div className="header-contents">
      <div className="header-contents-route-title">{menuState}</div>
      <div className="header-contents-button-box">
        <button
          className="loginButton button"
          onClick={() => {
            setIsLogin(false);
            message.success({
              content: "로그아웃 되었습니다.",
            });
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
    userProfile: state.userProfile,
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
