import React from "react";
import { CustomAxiosPost } from "../Functions/CustomAxios";
import CustomConfirm from "./CustomConfirm";
import "./PasswordConfirm.css";
import {verifyPasswordApi} from '../Constants/Api_Route'
import { connect } from "react-redux";
import { message } from "antd";
import CustomButton from "./CustomButton";
import ActionCreators from "../redux/actions";

const PasswordConfirm = ({
  visible,
  setVisible,
  callback,
  loading,
  setLoading,
  userProfile,
  showSuccessMessage,
  showErrorMessage
}) => {
  const {email} = userProfile;
  const onFinish = (e) => {
    e.preventDefault();
    const { password } = e.target.elements;
    if(!password.value.length) return showErrorMessage('PLEASE_INPUT_PASSWORD')
    setLoading(true);
    CustomAxiosPost(verifyPasswordApi, {
      email,
      password: password.value
    }, () => {
      setLoading(false);
      showSuccessMessage('success')
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
            style={{textAlign:'center'}}
            maxLength={16}
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
    showSuccessMessage: (id) => {
      dispatch(ActionCreators.showSuccessMessage(id));
    },
    showErrorMessage: (id) => {
      dispatch(ActionCreators.showErrorMessage(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordConfirm);