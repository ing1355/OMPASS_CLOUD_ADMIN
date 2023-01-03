import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { loginApi } from "../../Constants/LoginApi";
import { resetPasswordApi } from "../../Constants/ResetPasswordApi";
import { CustomAxiosPost } from "../../Functions/CustomAxios";
import ActionCreators from "../../redux/actions";
import { FormattedMessage, useIntl } from "react-intl";
import "./Login.css";
import OMPASS from "ompass";
import { homepageUrl } from "../../Constants/ConstantValues";
import { emailTest, FailToTest } from "../../Constants/InputRules";

const convertLanguageCode = {
  ko: "KR",
  en: "EN",
};

const Login = ({
  setIsLogin,
  setUserProfile,
  locale,
  localeChange,
  showSuccessMessage,
  showErrorMessage
}) => {
  const [login, setLogin] = useState(true);
  const { formatMessage } = useIntl();
  const { standalone } = useSelector((state) => ({
    standalone: state.standalone,
  }));

  const resetPassword = (e) => {
    e.preventDefault();
    const { email } = e.target.elements;
    if (!email.value.length) {
      return FailToTest(email, showErrorMessage('PLEASE_INPUT_EMAIL'));
    }
    if (!emailTest(email.value)) {
      return FailToTest(email, showErrorMessage("EMAIL_RULE_ERROR"));
    }
    CustomAxiosPost(
      resetPasswordApi,
      {
        email: email.value,
      },
      (data) => {
        // console.log(data);
        alert(formatMessage({ id: "RESET_PASSWORD_SEND_MAIL" }));
        setLogin(true);
      }
    );
  };

  const loginRequest = (e) => {
    e.preventDefault();
    const { userId, password } = e.target.elements;
    console.log('not here??')
    CustomAxiosPost(
      loginApi,
      {
        email: userId.value,
        password: password.value,
        lang: convertLanguageCode[locale],
      },
      (data, callback) => {
        const {
          ompassUrl,
        } = data;
        const role = (data.access_token && data.access_token.role) || (data.verify_ompass_token && data.verify_ompass_token.role)
        if (role !== "OMS") {
          // OMPASS(ompassUrl);
          const win = window.open(ompassUrl, '', "width=500;height=500;")
          win.document.domain = window.location.hostname
          console.log(document.domain)
        } else {
          console.log(callback, data)
          if (callback) callback();
          setUserProfile(data);
          setIsLogin(true);
          showSuccessMessage("LOGIN_SUCCESS");
        }
      }
    );
  };

  const localeChangeEventKo = () => {
    localeChange("ko");
    localStorage.setItem("locale", "ko");
  };
  const localeChangeEventEn = () => {
    localeChange("en");
    localStorage.setItem("locale", "en");
  };

  return (
    <>
      <div className="LoginBox">
        <div className="loginbg">
          {login === true ? (
            <div className="loginInputBox">
              <ul style={{ height: "400px" }}>
                <h1>{process.env.REACT_APP_USE_TARGET === 'hipass' ? 'HI-PASS' : 'OMPASS'} Login</h1>
                <form onSubmit={loginRequest} className="form login-input">
                  <input
                    className="email-input"
                    name="userId"
                    maxLength={48}
                    placeholder={formatMessage({ id: "ID" })}
                    type="text"
                  />
                  <input
                    name="password"
                    maxLength={16}
                    type="password"
                    placeholder={formatMessage({ id: "Password" })}
                  ></input>

                  <button className="button" type="submit">
                    <FormattedMessage id="login" />
                  </button>
                </form>
                <div className="forget">
                  <span
                    onClick={() => {
                      setLogin(false);
                    }}
                  >
                    <FormattedMessage id="PasswordAssistance" />
                  </span>
                </div>
                <div className="join">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      standalone.standalone
                        ? "/docs"
                        : homepageUrl(locale, "registration")
                    }
                  >
                    <FormattedMessage
                      id={standalone.standalone ? "GODOCUMENT" : "Registration"}
                    />
                  </a>
                </div>
              </ul>
              <ul>
                <p className="login-welcome-text">
                  <FormattedMessage id="loginText1" />
                </p>
                <p className="login-welcome-text">
                  <FormattedMessage id="loginText2" />
                </p>
              </ul>
            </div>
          ) : (
            <div className="loginInputBox">
              <ul>
                <h1>
                  <FormattedMessage id="PasswordAssistance" />
                </h1>
                <h5 className="forgetText">
                  <FormattedMessage id="PasswordAssistanceText" />
                </h5>
                <form onSubmit={resetPassword} className="form login-input">
                  <input
                    name="email"
                    maxLength={48}
                    className="forgetEmail"
                    placeholder={formatMessage({ id: "Email" })}
                    type="text"
                  />
                  <button className="button" type="submit">
                    <FormattedMessage id="ResetPassword" />
                  </button>
                </form>
                <div className="forget">
                  <span
                    onClick={() => {
                      setLogin(true);
                    }}
                  >
                    <FormattedMessage id="GoBack" />
                  </span>
                </div>
              </ul>
              <ul style={{ height: "400px" }}>
                <p className="login-welcome-text">
                  <FormattedMessage id="loginText1" />
                </p>
                <p className="login-welcome-text">
                  <FormattedMessage id="loginText2" />
                </p>
              </ul>
            </div>
          )}
        </div>
        <div className="span">
          <span>
            <p className="lang-toggle en" onClick={localeChangeEventEn}>EN</p>
            <p className="seperate">|</p>
            <p className="lang-toggle kr" onClick={localeChangeEventKo}>KR</p>
          </span>
        </div>
        <p className="copy">© OneMoreSecurity Inc. All Rights Reserved.</p>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return { locale: state.locale };
}

function mapDispatchToProps(dispatch) {
  return {
    setIsLogin: (toggle) => {
      dispatch(ActionCreators.setIsLogin(toggle));
    },
    setUserProfile: (data) => {
      dispatch(ActionCreators.setProfile(data));
    },
    localeChange: (toggle) => {
      dispatch(ActionCreators.localeChange(toggle));
    },
    showSuccessMessage: (id) => {
      dispatch(ActionCreators.showSuccessMessage(id));
    },
    showErrorMessage: (id) => {
      dispatch(ActionCreators.showErrorMessage(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
