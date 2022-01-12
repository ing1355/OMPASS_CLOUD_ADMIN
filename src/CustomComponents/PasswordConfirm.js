import React from "react";
import { CustomAxiosPost } from "../Functions/CustomAxios";
import CustomConfirm from "./CustomConfirm";
import "./PasswordConfirm.css";
import { verifyPasswordApi } from "../Constants/VerifyPassword";
import { connect } from "react-redux";
import CustomButton from "./CustomButton";
import ActionCreators from "../redux/actions";
import { FormattedMessage, useIntl } from "react-intl";

const PasswordConfirm = ({
  visible,
  setVisible,
  callback,
  loading,
  setLoading,
  userProfile,
  showSuccessMessage,
  showErrorMessage,
}) => {
  const { email } = userProfile;
  const onFinish = (e) => {
    e.preventDefault();
    const { password } = e.target.elements;
    if (!password.value.length)
      return showErrorMessage("PLEASE_INPUT_PASSWORD");
    setLoading(true);
    CustomAxiosPost(
      verifyPasswordApi,
      {
        email,
        password: password.value,
      },
      () => {
        if (callback) callback();
        setLoading(false);
        showSuccessMessage("success");
        setVisible(false);
      },
      () => {
        setLoading(false);
      }
    );
  };

  const onCancel = () => {
    setVisible(false);
  };

  const { formatMessage } = useIntl();

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
          <h3>
            <FormattedMessage id="ReenterPassword" />
          </h3>
          <input
            placeholder={formatMessage({ id: "PLEASE_INPUT_PASSWORD" })}
            type="password"
            name="password"
            style={{ textAlign: "center" }}
            maxLength={16}
            autoFocus
          />
          <div>
            <CustomButton
              className="yes-button"
              type="submit"
              loading={loading}
            >
              <FormattedMessage id="OK" />
            </CustomButton>
            <button className="no-button" type="button" onClick={onCancel}>
              <FormattedMessage id="Cancel" />
            </button>
          </div>
        </form>
      </div>
    </CustomConfirm>
  );
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
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
