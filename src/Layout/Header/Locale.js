import React from "react";
import "./Locale.css";
import localIcon from "../../assets/localeIcon.png";
import { connect } from "react-redux";
import ActionCreators from "../../redux/actions";

const Locale = ({ locale, localeChange }) => {
  const localeChangeEvent = () => {
    if (locale === "ko") {
      localeChange("en");
    } else {
      localeChange("ko");
    }
  };

  return (
    <div
      className="header-contents-locale-container pointer"
      onClick={localeChangeEvent}
    >
      <img className="header-contents-locale-icon" src={localIcon} />
      <div className="header-contents-locale-text">{locale}</div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    locale: state.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    localeChange: (toggle) => {
      dispatch(ActionCreators.localeChange(toggle));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Locale);
