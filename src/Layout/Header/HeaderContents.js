import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { connect } from "react-redux";
import ActionCreators from "../../redux/actions";
import "./HeaderContents.css";
import Locale from "./Locale";
import { FormattedMessage } from "react-intl";
import { useLocation } from "react-router";
import route_info from "../../Constants/Route_items";

import { AliwangwangOutlined } from "@ant-design/icons";

const HeaderContents = ({
  menuState,
  setIsLogin,
  menuChange,
  userProfile,
  showSuccessMessage,
}) => {
  const location = useLocation();
  const { role, firstName, lastName } = userProfile;
  const [profileOpen, setProfileOpen] = useState(false);

  useLayoutEffect(() => {
    const target = route_info(role).find(
      (item) => item.route === "/" + window.location.pathname.split("/")[1]
    );
    if (target) menuChange(target.name);
  }, [location, menuChange, role]);

  const menuOpen = useCallback(() => {
    setProfileOpen(!profileOpen);
  }, [profileOpen]);

  const eventCallback = useCallback((e) => {
    setProfileOpen(false);
  }, []);

  useEffect(() => {
    if (profileOpen) {
      document.addEventListener("click", eventCallback);
    } else {
      document.removeEventListener("click", eventCallback);
    }
    return () => {
      document.removeEventListener("click", eventCallback);
    };
  }, [profileOpen]);

  const logout = () => {
    setIsLogin(false);
    showSuccessMessage("LOGOUTSUCCESS");
  };

  return (
    <div className="header-contents">
      <div className="header-contents-route-title">
        {menuState && <FormattedMessage id={menuState} />}
      </div>

      <div className="header-contents-button-box">
        <div className="profile-container" onClick={menuOpen}>
          <b>
            <AliwangwangOutlined
              style={{ fontSize: "1.1rem", marginRight: "4px" }}
            />
            {firstName + " " + lastName}
          </b>
          <div
            className={
              "profile-sub-container" + (profileOpen ? " visible" : "")
            }
          >
            <div onClick={logout}>
              <FormattedMessage id="logout" />
            </div>
          </div>
        </div>
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
    showSuccessMessage: (msg) => {
      dispatch(ActionCreators.showSuccessMessage(msg));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContents);
