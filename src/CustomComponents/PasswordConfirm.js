import React from "react";
import CustomConfirm from "./CustomConfirm";
import "./PasswordConfirm.css";

const PasswordConfirm = ({
  visible,
  setVisible,
  callback,
  loading,
  setLoading,
}) => {
  const onFinish = (e) => {
    e.preventDefault();
    const { password } = e.target.elements;
    console.log(password.value);
    if (callback) callback();
    setVisible(false);
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
            <button className="yes-button" type="submit">
              확인
            </button>
            <button className="no-button" type="button" onClick={onCancel}>
              취소
            </button>
          </div>
        </form>
      </div>
    </CustomConfirm>
  );
};

export default PasswordConfirm;
