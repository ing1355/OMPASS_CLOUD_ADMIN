import { Form } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { CustomAxiosPost } from "../../Functions/CustomAxios";
import ActionCreators from "../../redux/actions";
import "./Login.css";

const Login = ({ setIsLogin }) => {
  const [login, setLogin] = useState(true);

  return (
    <>
      <div className="LoginBox">
        <div className="loginbg">
          {login === true ? (
            <div className="loginInputBox">
              <ul style={{ height: "400px" }}>
                <h1>OMPASS Login</h1>
                <Form
                  onFinish={(values) => {
                    const { userId, password } = values;
                    CustomAxiosPost(
                      "/v1/login",
                      {
                        email: userId,
                        password: password,
                      },
                      (data) => {
                        Object.keys(data).forEach((dKey) => {
                          localStorage.setItem(dKey, data[dKey]);
                        });
                        setIsLogin(true);
                      }
                    );
                  }}
                >
                  <Form.Item name="userId">
                    <input placeholder="아이디" type="text"></input>
                  </Form.Item>
                  <Form.Item name="password">
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
                      비밀번호 찾기
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
                <h1>비밀번호 찾기</h1>
                <h5 className="forgetText">
                  패스워드를 찾고자 하는 이메일을 입력해 주세요.
                </h5>
                <input
                  id="idInput"
                  className="forgetEmail"
                  placeholder="이메일"
                  type="text"
                ></input>
                <button
                  onClick={() => {
                    setLogin(true);
                    alert("메일로 전송했습니다. 인증해주세요.");
                  }}
                >
                  이메일 인증
                </button>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
