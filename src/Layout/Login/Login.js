import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

// import "../../App.css";
// import "antd/dist/antd.css";
// import { message } from "antd";
// import "antd/dist/antd.css";

import "./Login.css";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [join, setJoin] = useState(false);
  const [idForget, setIdForget] = useState(false);
  const [passWordForget, setPassWordForget] = useState(false);

  const history = useHistory();
  return (
    <>
      <div className="LoginBox">
        <div className="loginbg">
          {login === true ? (
            <div className="loginInputBox">
              <ul>
                <h1>OMPASS Login</h1>
                <input id="idInput" placeholder="아이디" type="text"></input>
                <input
                  id="passWord"
                  type="password"
                  name="pass"
                  placeholder="비밀번호"
                  // onKeyPress={(e) => {
                  //   if (e.key === "Enter") loginTest();
                  // }}
                ></input>
                <button
                  onClick={() => {
                    history.push("/");
                    // message.success("로그인 되었습니다.");
                  }}
                >
                  로그인
                </button>
                <div className="forget">
                  <a>
                    <span
                      onClick={() => {
                        setPassWordForget(true);
                        setLogin(false);
                      }}
                    >
                      비밀번호 찾기
                    </span>
                  </a>
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
                <input id="idInput" placeholder="이메일" type="text"></input>
                <button
                  onClick={() => {
                    setPassWordForget(false);
                    setLogin(true);
                    alert("메일로 전송했습니다. 인증해주세요.");
                  }}
                >
                  이메일 인증
                </button>
              </ul>
              <ul>
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
export default Login;
