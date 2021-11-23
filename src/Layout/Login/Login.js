import { Form } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { loginApi, resetPasswordApi } from "../../Constants/Api_Route";
import { CustomAxiosPost } from "../../Functions/CustomAxios";
import ActionCreators from "../../redux/actions";
import { popupCenter } from "./fidoPopUp";
import "./Login.css";

const Login = ({ setIsLogin, setUserProfile }) => {
  const [login, setLogin] = useState(true);

  const resetPassword = (e) => {
    e.preventDefault();
    const {email} = e.target.elements;
    CustomAxiosPost(resetPasswordApi,{
      email: email.value
    }, (data) => {
      console.log(data);
    })
    setLogin(true);
    alert("메일로 전송했습니다. 인증해주세요.");
  }

  const loginRequest = (values) => {
    const { userId, password } = values;
    CustomAxiosPost(
      loginApi,
      {
        email: userId,
        password: password,
      },
      (data) => {
        const {ompass, adminId, email, role, country} = data;
        setUserProfile({
          adminId,
          email,
          role,
          country
        });
        if(ompass) {
          popupCenter({ url : null, title: 'FIDO2 AUTHENTICATE', w: 800, h: 500 });
        } else {
          setIsLogin(true);
        }
      }
    );
  }

  return (
    <>
      <div className="LoginBox">
        <div className="loginbg">
          {login === true ? (
            <div className="loginInputBox">
              <ul style={{ height: "400px" }}>
                <h1>OMPASS Login</h1>
                <Form onFinish={loginRequest}>
                  <Form.Item name="userId" initialValue="">
                    <input placeholder="아이디" type="text"></input>
                  </Form.Item>
                  <Form.Item name="password" initialValue="">
                    <input type="password" placeholder="비밀번호"></input>
                  </Form.Item>
                  <button type="submit">로그인</button>
                </Form>
                <div className="forget">
                  <span
                    onClick={() => {
                      setLogin(false);
                    }}
                  >
                    비밀번호 초기화
                  </span>
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
                <form onSubmit={resetPassword}>
                  <input
                    name="email"
                    className="forgetEmail"
                    placeholder="이메일"
                    type="text"
                  ></input>
                  <button
                    type="submit"
                  >
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
            <p>ENG</p>
            <p>　|　</p>
            <p>KOR</p>
          </span>
        </div>
        <p className="copy">© OMPASS Inc. All Rights Reserved.</p>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    setIsLogin: (toggle) => {
      dispatch(ActionCreators.setIsLogin(toggle));
    },
    setUserProfile: (data) => {
      dispatch(ActionCreators.setProfile(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
