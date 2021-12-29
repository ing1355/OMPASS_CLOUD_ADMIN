import React, { useCallback, useRef, useState } from "react";
import { message } from "antd";
import "../Billing/Billing.css";
import "./Users.css";
import { Redirect, useHistory } from "react-router";
import { updateByPassApi, updateEmailApi } from "../../../Constants/Api_Route";
import { CustomAxiosPatch, CustomAxiosPost } from "../../../Functions/CustomAxios";
import CustomButton from "../../../CustomComponents/CustomButton";
import { connect } from "react-redux";
import ActionCreators from "../../../redux/actions";
import { emailTest, FailToTest } from "../../../Constants/InputRules";

const UserDetail = ({
  data,
  userProfile,
  updateBypass,
  showSuccessMessage,
  showErrorMessage,
}) => {
  const { adminId } = userProfile;
  const { userId, byPass, appId } = data;
  const [inputByPass, setInputByPass] = useState(byPass);
  const [loading, setLoading] = useState(false);
  const [isOwnPolicy, setIsOwnPolicy] = useState(false);
  const [emailCheck, setEmailCheck] = useState(data.email);
  const [emailLoading, setEmailLoading] = useState(false);
  const inputEmailRef = useRef(null);
  const history = useHistory();

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
        updateBypass(userId, inputByPass);
        message.success("성공!");
        history.push("/Users");
      },
      () => {
        setLoading(false);
        message.error("실패!");
      }
    );
  };

  const inputByPassCheck = useCallback(() => {
    setInputByPass(true);
  }, []);

  const inputByPassUnCheck = useCallback(() => {
    setInputByPass(false);
  }, []);

  const changeIsOwnPolicy = useCallback(() => {
    setIsOwnPolicy(!isOwnPolicy);
  }, [isOwnPolicy]);

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
    CustomAxiosPatch(updateEmailApi(adminId, appId, userId), {
      email: inputEmailRef.current.value
    }, (data) => {
      setEmailLoading(false);
      showSuccessMessage("EMAIL_REGISTER_SUCCESS");
      setEmailCheck(true);
    }, () => {
      setEmailLoading(false);
    })
  };

  const changeInputEmail = () => {
    setEmailCheck(false);
  };

  return (
    <>
      {Object.keys(data).length < 1 ? (
        <Redirect to="/Users" />
      ) : (
        <div className="ApplicationsBox">
          <form className="form-box" onSubmit={onFinish}>
            <div
              style={{ marginBottom: "0" }}
              className="ant-row inputBox ant-form-item"
            >
              <div className="ant-col-4 ant-form-item-label-left">
                <label>사용자 아이디 :</label>
              </div>
              <div className="ant-col ant-form-item-control">
                <p className="userdetailP">{userId}</p>
              </div>
            </div>

            <div className="ant-row inputBox ant-form-item">
              <div className="ant-col-4 ant-form-item-label-left">
                <label>OMPASS 인증 바이패스 :</label>
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
                    value={true}
                    defaultChecked={byPass}
                    onChange={inputByPassCheck}
                  />
                  <label className="label"> 활성화</label>
                </div>
                <div className="label-bottom-text">
                  OMPASS 인증 없이 로그인 가능합니다.
                </div>
                <div
                  className={
                    "label-bottom-text user-email-input" +
                    (inputByPass ? " active" : " inactive")
                  }
                >
                  이메일 입력 :{" "}
                  <input
                    style={{ width: "15rem" }}
                    ref={inputEmailRef}
                    name="email"
                    defaultValue={data.email}
                    onChange={changeInputEmail}
                  />
                  <CustomButton
                    className="user-detatil-button"
                    type="button"
                    onClick={emailSetting}
                    loading={emailLoading}
                  >
                    저장
                  </CustomButton>
                </div>
                <div>
                  <input
                    className="userDetailInput"
                    name="byPass"
                    type="radio"
                    value={false}
                    defaultChecked={!byPass}
                    onChange={inputByPassUnCheck}
                  />
                  <label className="label"> 비활성화</label>
                </div>
                <div className="label-bottom-text">
                  바이패스 비활성화 (디폴트)
                </div>
              </div>
            </div>

            {/* <div className="ApplicationsTitle">
              <h2 style={{ marginTop: "3.5rem" }}>정책</h2>
              <p>
                정책은 사용자가 이 애플리케이션에 액세스할 때 인증하는 시기와
                방법을 정의합니다.
                <br />
                기본 정책은 항상 적용되지만 활성화 버튼을 누른 뒤 사용자 지정 정책으로 해당 규칙을
                재정의할 수 있습니다.
                <br />
                비활성화 상태에서는 항상 기본 정책이 적용됩니다.
              </p>
              <button
                className={"policy-active-button" + (isOwnPolicy ? ' active' : ' inactive')}
                type="button"
                onClick={changeIsOwnPolicy}
              >
                {isOwnPolicy ? "비활성화" : "활성화"}
              </button>
              <select className="user-policy-list" disabled={!isOwnPolicy} defaultValue={data.policyId}>
                <option value="null">{formatMessage({id:'DEFAULTPOLICY'})}</option>
                {customPolicies.map(c => <option key={c.policyId} value={c.policyId}>{c.title}</option>)}
              </select>
            </div> */}
            <CustomButton
              className="ApplicationsSave button user-save-button"
              type="submit"
              loading={loading}
            >
              저장
            </CustomButton>
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
