import React, { useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import ActionCreators from "../../redux/actions";
import "./HeaderContents.css";
import Locale from "./Locale";
import { FormattedMessage, useIntl } from "react-intl";
import { useLocation } from "react-router";
import "antd/dist/antd.css";
import { message } from "antd";
import route_info from "../../Constants/Route_items";

import { AliwangwangOutlined } from "@ant-design/icons";

const HeaderContents = ({
  menuState,
  setIsLogin,
  menuChange,
  userProfile,
  locale
}) => {
  const location = useLocation();
  const { role, email } = userProfile;

  useLayoutEffect(() => {
    const target = route_info(role).find(
      (item) => item.route === "/" + window.location.pathname.split("/")[1]
    );
    if (target) menuChange(target.name);
  }, [location]);

  return (
    <div className="header-contents">
      <div className="header-contents-route-title">{menuState && <FormattedMessage id={menuState}/>}</div>

      <div className="header-contents-button-box">
        {locale === 'ko' ? <p>
          <b>
            <AliwangwangOutlined
              style={{ fontSize: "1.1rem", marginRight: "4px" }}
            />
            {email}
          </b>님 환영합니다.
          </p> : <p>Welcome&nbsp;
            <b>
            <AliwangwangOutlined
              style={{ fontSize: "1.1rem", marginRight: "4px" }}
            />
            {email}
          </b>
        </p>}
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
    locale: state.locale,
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
