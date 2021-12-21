import React, { useCallback, useState } from "react";
import { message } from "antd";
import "../Billing/Billing.css";
import "./Users.css";
import { Redirect, useHistory } from "react-router";
import { updateByPassApi } from "../../../Constants/Api_Route";
import { CustomAxiosPatch } from "../../../Functions/CustomAxios";
import CustomButton from "../../../CustomComponents/CustomButton";
import { connect } from "react-redux";

const UserDetail = ({ data, userProfile, updateBypass, lang }) => {
  const { adminId } = userProfile;
  const { userId, byPass, appId } = data;
  const [inputByPass, setInputByPass] = useState(byPass);
  const [loading, setLoading] = useState(false);
  const [isOwnPolicy, setIsOwnPolicy] = useState(false);
  const [policyData, setPolicyData] = useState({
    accessControl: "INACTIVE",
    userLocations: [],
    browsers: [],
    authenticationMethods: [],
    mobilePatch: "INACTIVE",
  });
  const history = useHistory();

  const onFinish = (e) => {
    e.preventDefault();
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
  },[])

  const inputByPassUnCheck = useCallback(() => {
    setInputByPass(false);
  },[])

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
                <label>2차인증 바이패스 :</label>
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
                {inputByPass && <div className="label-bottom-text">
                  이메일 입력 : <input/><button>저장</button>
                </div>}
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

            <div className="ApplicationsTitle">
              <h2 style={{ marginTop: "3.5rem" }}>정책</h2>
              <p>
                정책은 사용자가 이 애플리케이션에 액세스할 때 인증하는 시기와
                방법을 정의합니다.
                <br />
                글로벌 정책은 항상 적용되지만 사용자 지정 정책으로 해당 규칙을
                재정의할 수 있습니다.
              </p>
              <button
                style={{ marginBottom: "3.5rem" }}
                className="policy-active-button"
                type="button"
                onClick={() => {
                  setIsOwnPolicy(!isOwnPolicy);
                }}
              >
                {isOwnPolicy ? "비활성화 ▲" : "활성화 ▼"}
              </button>
              <div
                className={
                  "user-policies-container" + (isOwnPolicy ? "" : " disabled")
                }
              >
                test
              </div>
            </div>
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
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
