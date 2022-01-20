import React, { useCallback, useRef, useState } from "react";
import "../Billing/Billing.css";
import "./Users.css";
import { Navigate, useNavigate } from "react-router";
import {
  deleteUserApi,
  updateByPassApi,
  updateEmailApi,
} from "../../../Constants/Api_Route";
import {
  CustomAxiosDelete,
  CustomAxiosPatch,
} from "../../../Functions/CustomAxios";
import CustomButton from "../../../CustomComponents/CustomButton";
import { connect } from "react-redux";
import ActionCreators from "../../../redux/actions";
import { emailTest, FailToTest } from "../../../Constants/InputRules";
import { FormattedMessage } from "react-intl";

const UserDetail = ({
  data,
  userProfile,
  updateBypass,
  showSuccessMessage,
  showErrorMessage,
  deleteCallback,
}) => {
  const { adminId } = userProfile;
  const { userId, byPass, appId, email, type } = data;
  const [inputByPass, setInputByPass] = useState(byPass);
  const [loading, setLoading] = useState(false);
  const [emailCheck, setEmailCheck] = useState(email);
  const [emailLoading, setEmailLoading] = useState(false);
  const inputEmailRef = useRef(email);

  const navigate = useNavigate();

  const onFinish = (e) => {
    e.preventDefault();
    if (inputByPass && !emailCheck)
      return showErrorMessage("EMAIL_REGISTER_NEEDED");
    setLoading(true);
    CustomAxiosPatch(
      updateByPassApi(adminId, appId, userId),
      {
        byPass: inputByPass,
      },
      (data) => {
        setLoading(false);
        updateBypass(userId, inputByPass, inputEmailRef.current.value);
        showSuccessMessage("SUCCESS_USER_UPDATED");
        navigate("/Users");
      },
      () => {
        setLoading(false);
      }
    );
  };

  const inputByPassCheck = useCallback(() => {
    setInputByPass(true);
  }, []);

  const inputByPassUnCheck = useCallback(() => {
    setInputByPass(false);
  }, []);

  const emailSetting = () => {
    if (!inputEmailRef.current.value.length) {
      return FailToTest(
        inputEmailRef.current,
        showErrorMessage("PLEASE_INPUT_EMAIL")
      );
    }
    if (!emailTest(inputEmailRef.current.value)) {
      return FailToTest(
        inputEmailRef.current,
        showErrorMessage("EMAIL_RULE_ERROR")
      );
    }
    setEmailLoading(true);
    CustomAxiosPatch(
      updateEmailApi(adminId, appId, userId),
      {
        email: inputEmailRef.current.value,
      },
      (data) => {
        setEmailLoading(false);
        showSuccessMessage("EMAIL_REGISTER_SUCCESS");
        setEmailCheck(true);
      },
      () => {
        setEmailLoading(false);
      }
    );
  };

  const changeInputEmail = () => {
    setEmailCheck(false);
  };

  return (
    <>
      {Object.keys(data).length < 1 ? (
        <Navigate to="/Users" />
      ) : (
        <div className="ApplicationsBox">
          <form className="form-box" onSubmit={onFinish}>
            <div
              style={{ marginBottom: "0" }}
              className="ant-row inputBox ant-form-item"
            >
              <div className="ant-col-4 ant-form-item-label-left">
                <label>
                  <FormattedMessage id="User" /> :
                </label>
              </div>
              <div className="ant-col ant-form-item-control">
                <p className="userdetailP">{userId}</p>
              </div>
            </div>

            <div className="ant-row inputBox ant-form-item">
              <div className="ant-col-4 ant-form-item-label-left">
                <label>
                  <FormattedMessage id="Bypass" /> :
                </label>
              </div>
              <div
                className="ant-col ant-form-item-control"
                style={{ justifyContent: "space-around" }}
              >
                <div>
                  <input
                    className="userDetailInput"
                    name="byPass"
                    type="radio"
                    disabled={!type}
                    value={true}
                    defaultChecked={byPass}
                    onChange={inputByPassCheck}
                  />
                  <label className="label">
                    {" "}
                    <FormattedMessage id="ACTIVE" />
                  </label>
                </div>
                <div className="label-bottom-text">
                  <FormattedMessage id="USERBYPASSDESCRIPTION" />
                  <br />
                  <p className="notice-text">
                    - 바이패스는 OMPASS 인증제어 정책이 OMPASS 인증 필수, 모두
                    거부로 설정되어 있는 경우에만 작동합니다.
                  </p>
                </div>
                <div
                  className={
                    "label-bottom-text user-email-input" +
                    (inputByPass ? " active" : " inactive")
                  }
                >
                  <FormattedMessage id="INPUTEMAIL" /> :&nbsp;&nbsp;
                  <input
                    style={{ width: "22rem" }}
                    ref={inputEmailRef}
                    name="email"
                    maxLength={48}
                    defaultValue={data.email}
                    onChange={changeInputEmail}
                  />
                  <CustomButton
                    className="user-detatil-button"
                    type="button"
                    onClick={emailSetting}
                    loading={emailLoading}
                  >
                    <FormattedMessage id="REGISTER" />
                  </CustomButton>
                </div>
                <div>
                  <input
                    className="userDetailInput"
                    name="byPass"
                    type="radio"
                    disabled={!type}
                    value={false}
                    defaultChecked={!byPass}
                    onChange={inputByPassUnCheck}
                  />
                  <label className="label">
                    {" "}
                    <FormattedMessage id="INACTIVE" />
                  </label>
                </div>
                <div className="label-bottom-text ">
                  <FormattedMessage id="USERBYPASSDESCRIPTION2" />
                </div>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <CustomButton
                className="ApplicationsSave button user-save-button"
                type="submit"
                loading={loading}
              >
                <FormattedMessage id="SAVE" />
              </CustomButton>
              <CustomButton
                className="ApplicationsSave button user-save-button"
                type="button"
                onClick={() => {
                  CustomAxiosDelete(
                    deleteUserApi(adminId, appId, userId),
                    () => {
                      if (deleteCallback) deleteCallback(userId);
                      navigate("/Users");
                    }
                  );
                }}
                loading={loading}
              >
                <FormattedMessage id="DELETE" />
              </CustomButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
    lang: state.locale,
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

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
