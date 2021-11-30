import React from "react";
import { CustomAxiosPost } from "../Functions/CustomAxios";
import CustomConfirm from "./CustomConfirm";
import "./PasswordConfirm.css";
import {verifyPasswordApi} from '../Constants/Api_Route'
import { connect } from "react-redux";
import { message } from "antd";
import CustomButton from "./CustomButton";

const PasswordConfirm = ({
  visible,
  setVisible,
  callback,
  loading,
  setLoading,
  userProfile
}) => {
  const {email} = userProfile;
  const onFinish = (e) => {
    e.preventDefault();
    const { password } = e.target.elements;
    if(!password.value.length) return message.error('비밀번호를 입력해주세요.')
    setLoading(true);
    CustomAxiosPost(verifyPasswordApi, {
      email,
      password: password.value
    }, () => {
      setLoading(false);
      message.success('성공하였습니다.')
      if (callback) callback();
      setVisible(false);
    }, () => {
      setLoading(false);
    })
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <CustomConfirm
      closable={false}
      visible={visible}
      cancelCallback={() => {
        setVisible(false);
        setLoading(false);
      }}
      okLoading={loading}
      footer={null}
    >
      <div className="password-form-box">
        <form className="password-form" onSubmit={onFinish}>
          <h3>비밀번호 확인</h3>
          <input
            placeholder="비밀번호를 입력해주세요."
            type="password"
            name="password"
            autoFocus
          />
          <div>
            <CustomButton className="yes-button" type="submit" loading={loading}>
              확인
            </CustomButton>
            <button className="no-button" type="button" onClick={onCancel}>
              취소
            </button>
          </div>
        </form>
      </div>
    </CustomConfirm>
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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordConfirm);