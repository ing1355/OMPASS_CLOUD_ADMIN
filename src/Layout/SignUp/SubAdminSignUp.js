import React from "react";
import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { signUpSubAdminApi } from "../../Constants/Api_Route";
import { FailToTest, passwordTest } from "../../Constants/InputRules";
import { CustomAxiosPost } from "../../Functions/CustomAxios";
import ActionCreators from "../../redux/actions";
import "./SubAdminSignUp.css";

const SubAdminSignUp = ({ location, history, showErrorMessage }) => {
  const adminId = location ? location.pathname.split("/")[3] : null;
  const token = location ? location.pathname.split("/")[7] : null;
  const country = location ? location.pathname.split("/")[5] : null;
  const isKorea = country === 'KR'
  const {formatMessage} = useIntl();

  const onFinish = (e) => {
    e.preventDefault();
    const { password, passwordConfirm } = e.target.elements;

    if (!passwordTest(password.value)) return FailToTest(password, showErrorMessage('INCORRECT_PASSWORD'))
    if (password.value !== passwordConfirm.value) {
      return showErrorMessage("NOT_EQUAL_PASSWORD");
    }

    CustomAxiosPost(
      signUpSubAdminApi(adminId),
      {
        password: password.value,
      },
      () => {
        alert(formatMessage({id:'RESET_PASSWORD_SUCCESS_MESSAGE'}));
        history.push('/');
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
        <h1>{isKorea ? 'OMPASS 비밀번호 변경' : 'OMPASS Password change'}</h1>
        <input placeholder={isKorea ? "비밀번호를 입력해주세요." : 'Please enter your password.'} name="password" type="password" />
        <input
          placeholder={isKorea ? "비밀번호를 한번 더 입력해주세요." : 'Please enter your password again.'}
          name="passwordConfirm"
          type="password"
        />
        <button type="submit">{isKorea ? '비밀번호 변경' : 'password change'}</button>
      </form>
    </div>
  );
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showErrorMessage: (id) => {
      dispatch(ActionCreators.showErrorMessage(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubAdminSignUp);
