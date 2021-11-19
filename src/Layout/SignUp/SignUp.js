import { message } from "antd";
import React, { useLayoutEffect } from "react";
import { signUpAdminApi } from "../../Constants/Api_Route";
import { CustomAxiosPost } from "../../Functions/CustomAxios";
import "./SignUp.css";
const SignUp = (props) => {
  const token = props.location ? props.location.pathname.split("/")[5] : null;

  useLayoutEffect(() => {
    console.log(token);
  }, []);

  const onFinish = (e) => {
    e.preventDefault();
    const { password, passwordConfirm } = e.target.elements;

    if (password.value !== passwordConfirm.value)
      return message.error("비밀번호가 일치하지 않습니다.");
    CustomAxiosPost(
      signUpAdminApi(localStorage.getItem("adminId")),
      {
        password: password.value,
      },
      () => {
        alert(
          "이제 변경한 비밀번호를 이용하여 해당 Admin 계정으로 로그인하실 수 있습니다."
        );
        window.close();
      },
      null,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  };
  return (
    <div className="signupBox">
      <form onSubmit={onFinish}>
        {" "}
        <h1>OMPASS 비밀번호 변경</h1>
        <input placeholder="비밀번호를 입력해주세요" name="password" />
        <input
          placeholder="비밀번호를 한번 더 입력해주세요"
          name="passwordConfirm"
        />
        <button type="submit">비밀번호 변경</button>
      </form>
    </div>
  );
};

export default SignUp;
