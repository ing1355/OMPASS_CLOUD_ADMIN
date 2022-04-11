import React, { useState } from "react";
import { connect } from "react-redux";
import { loginApi } from "../../Constants/LoginApi";
import { resetPasswordApi } from "../../Constants/ResetPasswordApi";
import { CustomAxiosPost } from "../../Functions/CustomAxios";
import ActionCreators from "../../redux/actions";
import { FormattedMessage, useIntl } from "react-intl";
import "./Login.css";
import OMPASS from "ompass";

const convertLanguageCode = {
  'ko': 'KR',
  'en': 'EN'
}

const homepageUrl = (locale) => process.env.REACT_APP_SERVICE_TARGET === 'aws' ? `https://www.ompasscloud.com/${locale}/registration` : (process.env.NODE_ENV === 'production' ? `https://ompass.kr:4003/${locale}/login` : `https://ompass.kr:4003/${locale}/login`)

const Login = ({
  setIsLogin,
  setUserProfile,
  locale,
  localeChange,
  showSuccessMessage,
}) => {
  const [login, setLogin] = useState(true);
  const { formatMessage } = useIntl();

  const resetPassword = (e) => {
    e.preventDefault();
    const { email } = e.target.elements;
    CustomAxiosPost(
      resetPasswordApi,
      {
        email: email.value,
      },
      (data) => {
        // console.log(data);
      }
    );
    setLogin(true);
    alert(formatMessage({ id: "RESET_PASSWORD_SEND_MAIL" }));
  };

  const loginRequest = (e) => {
    e.preventDefault();
    const { userId, password } = e.target.elements;
    CustomAxiosPost(
      loginApi,
      {
        email: userId.value,
        password: password.value,
        lang: convertLanguageCode[locale],
      },
      (data, callback) => {
        const { planStatus, adminId, email, role, country, firstName, lastName, ompassUrl } = data;
        if (planStatus !== 'EXPIRED' && role !== 'OMS') {
          OMPASS(ompassUrl);
        } else {
          setUserProfile({
            adminId,
            email,
            role,
            country,
            firstName,
            lastName
          });
          setIsLogin(true);
          showSuccessMessage("LOGIN_SUCCESS");
          if (callback) callback();
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
                <h1>OMPASS Login</h1>
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
                    href={locale === 'ko' ? homepageUrl('ko') : homepageUrl('en')}
                  >
                    <FormattedMessage id="Registration" />
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
                  ></input>

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
            <p onClick={localeChangeEventEn}>ENG</p>
            <p>　|　</p>
            <p onClick={localeChangeEventKo}>KOR</p>
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
