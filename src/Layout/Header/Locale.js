import React, { useState } from "react";
import "./Locale.css";
import localIcon from "../../assets/localeIcon.png";
import { connect } from "react-redux";
import ActionCreators from "../../redux/actions";
import { FormattedMessage } from "react-intl";

const Locale = ({ locale, localeChange }) => {
  const [langbox, setLangbox] = useState(false);
  const localeChangeEvent = () => {
    if (locale === "en") {
      localeChange("ko");
      localStorage.setItem("locale", "ko");
    } else {
      localeChange("en");
      localStorage.setItem("locale", "en");
    }
  };

  return (
    <button className="header-contents-locale-container pointer locale-button" onClick={localeChangeEvent}>
      <img
        className="header-contents-locale-icon"
        src={localIcon}
        alt="다국어 icon"
      />

      <div className="header-contents-locale-text">
        {locale === "en" ? <p>KO</p> : <p>EN</p>}
      </div>
    </button>
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
