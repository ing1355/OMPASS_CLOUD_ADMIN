import React, { useEffect, useState } from "react";
import "./Locale.css";
import localIcon from "../../assets/localeIcon.png";
import { connect } from "react-redux";
import ActionCreators from "../../redux/actions";
import { FormattedMessage } from "react-intl";

const Locale = ({ locale, localeChange }) => {
  const [langbox, setLangbox] = useState(false);
  const localeChangeEventKo = () => {
    if (locale === "en") {
      localeChange("ko");
    }
  };
  const localeChangeEventEn = () => {
    if (locale === "ko") {
      localeChange("en");
    }
  };

  return (
    <button
      className="header-contents-locale-container pointer locale-button"
      onClick={() => {
        setLangbox(!langbox);
      }}
      onBlur={() => {
        setLangbox(false);
      }}
    >
      <img
        className="header-contents-locale-icon"
        src={localIcon}
        alt="다국어 icon"
      />
      <div className="header-contents-locale-text">
        <FormattedMessage id="localeChangeText" />
      </div>
      {langbox === true ? (
        <div className="lang-div">
          <p onClick={localeChangeEventEn}> GLOBAL / ENGLISH</p>
          <p onClick={localeChangeEventKo}> KOREA / 한국어</p>
        </div>
      ) : null}
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
