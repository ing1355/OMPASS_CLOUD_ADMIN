import { Form } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { loginApi, resetPasswordApi } from "../../Constants/Api_Route";
import { CustomAxiosPost } from "../../Functions/CustomAxios";
import ActionCreators from "../../redux/actions";
import { popupCenter } from "./fidoPopUp";
import "./Login.css";
import "antd/dist/antd.css";
import { message } from "antd";
import { FormattedMessage } from "react-intl";

const Login = ({ setIsLogin, setUserProfile, locale, localeChange }) => {
  const [login, setLogin] = useState(true);

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
    alert("메일로 전송했습니다. 인증해주세요.");
  };

  const loginRequest = (e) => {
    e.preventDefault();
    const { userId, password } = e.target.elements;
    CustomAxiosPost(
      loginApi,
      {
        email: userId.value,
        password: password.value,
      },
      (data, callback) => {
        const { ompass, adminId, email, role, country } = data;
        if (ompass) {
          popupCenter({
            url: data.ompassUrl,
            title: "FIDO2 AUTHENTICATE",
            w: 800,
            h: 500,
          });
        } else {
          setUserProfile({
            adminId,
            email,
            role,
            country,
          });
          setIsLogin(true);
          message.success({
            content: "로그인 되었습니다.",
          });
          if (callback) callback();
        }
      }
    );
  };

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
                    placeholder="아이디"
                    type="text"
                  />
                  <input
                    name="password"
                    type="password"
                    placeholder="비밀번호"
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
                    비밀번호 초기화
                  </span>
                </div>
                <div className="join">
                  {locale === "en" ? (
                    <a target="_blank" href="https://ompass.kr:4003/Login">
                      회원가입
                    </a>
                  ) : (
                    <a target="_blank" href="https://ompass.kr:4003/ko/Login">
                      회원가입
                    </a>
                  )}
                </div>
              </ul>
              <ul>
                <p>환영합니다.</p>
                <p>본 페이지는 관리자만을 위한</p>
                <p>로그인 페이지입니다.</p>
              </ul>
            </div>
          ) : (
            <div className="loginInputBox">
              <ul>
                <h1>비밀번호 초기화</h1>
                <h5 className="forgetText">
                  비밀번호를 초기화 할 이메일을 입력해 주세요.
                </h5>
                <form onSubmit={resetPassword} className="form login-input">
                  <input
                    name="email"
                    className="forgetEmail"
                    placeholder="이메일"
                    type="text"
                  ></input>
                  <button className="button" type="submit">
                    이메일 인증
                  </button>
                </form>
                <div className="forget">
                  <span
                    onClick={() => {
                      setLogin(true);
                    }}
                  >
                    돌아가기
                  </span>
                </div>
              </ul>
              <ul style={{ height: "400px" }}>
                <p>환영합니다.</p>
                <p>본 페이지는 관리자만을 위한</p>
                <p>로그인 페이지입니다.</p>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
