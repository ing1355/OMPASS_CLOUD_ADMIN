import { message } from "antd";
import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { signUpAdminApi } from "../../Constants/Api_Route";
import { CustomAxiosPost } from "../../Functions/CustomAxios";
import "./SignUp.css";

const SignUp = ({location, userProfile}) => {

  const token = location ? location.pathname.split("/")[5] : null;
  
  const onFinish = (e) => {
    e.preventDefault();
    const { password, passwordConfirm } = e.target.elements;
    if (password.value !== passwordConfirm.value)
      return message.error("비밀번호가 일치하지 않습니다.");
    CustomAxiosPost(
      signUpAdminApi(userProfile.adminId),
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
      <h1>OMPASS 비밀번호 변경</h1>
      <form onSubmit={onFinish}>
        <input placeholder="비밀번호를 입력해주세요" name="password" />
        <input placeholder="비밀번호를 한번 더 입력해주세요" name="passwordConfirm" />
        <button type="submit">비밀번호 변경</button>
      </form>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);