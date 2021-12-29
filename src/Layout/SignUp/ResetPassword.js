import { message } from "antd";
import React, { useLayoutEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { connect } from "react-redux";
import { resetPasswordVerifyApi } from "../../Constants/Api_Route";
import { CustomAxiosPatch } from "../../Functions/CustomAxios";
import ActionCreators from "../../redux/actions";
import "./SubAdminSignUp.css";

const ResetPassword = ({ location, history, showSuccessMessage, showErrorMessage, localeChange }) => {
  const token = location ? location.pathname.split("/")[5] : null;
  const {formatMessage} = useIntl();

  useLayoutEffect(() => {
    const lang = location ? location.pathname.split("/")[7] : null;
    localeChange(lang === 'KR' ? 'ko' : 'en');
  },[])

  const onFinish = (e) => {
    e.preventDefault();
    const { password, passwordConfirm } = e.target.elements;

    if (password.value !== passwordConfirm.value)
      return showErrorMessage('RESET_PASSWORD_FAIL_MESSAGE')
    CustomAxiosPatch(
      resetPasswordVerifyApi,
      {
        password: password.value,
      },
      () => {
        alert(formatMessage({id:'RESET_PASSWORD_SUCCESS_MESSAGE'}));
        history.push("/");
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
        <h1>OMPASS <FormattedMessage id="PasswordAssistance"/></h1>
        <input
          placeholder={formatMessage({id:'PLEASE_INPUT_PASSWORD'})}
          name="password"
          maxLength={16}
          type="password"
        />
        <input
          placeholder={formatMessage({id:'PLEASE_INPUT_PASSWORD_ONE_MORE'})}
          name="passwordConfirm"
          maxLength={16}
          type="password"
        />
        <button type="submit"><FormattedMessage id="PasswordAssistance"/></button>
      </form>
    </div>
  );
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    showSuccessMessage: (id) => {
      dispatch(ActionCreators.showSuccessMessage(id));
    },
    showErrorMessage: (id) => {
      dispatch(ActionCreators.showErrorMessage(id));
    },
    localeChange: (lang) => {
      dispatch(ActionCreators.localeChange(lang));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
