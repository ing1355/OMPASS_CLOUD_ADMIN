import React, { useCallback, useState } from "react";
import { message } from "antd";
import "../Billing/Billing.css";
import "./Users.css";
import { Redirect, useHistory } from "react-router";
import { updateByPassApi } from "../../../Constants/Api_Route";
import { CustomAxiosPatch } from "../../../Functions/CustomAxios";
import CustomButton from "../../../CustomComponents/CustomButton";
import { connect } from "react-redux";
import { BrowsersList, AuthMethodsList } from '../Policies/Global_Policy'
import { countryCodes_KR, countryCodes_US } from "../Policies/Country_Code";

const UserDetail = ({ data, userProfile, updateBypass, lang }) => {
  const { adminId } = userProfile;
  const { userId, byPass, appId } = data;
  const [inputByPass, setInputByPass] = useState(byPass);
  const [loading, setLoading] = useState(false);
  const [isOwnPolicy, setIsOwnPolicy] = useState(false);
  const [policyData, setPolicyData] = useState({
    accessControl: 'INACTIVE',
    userLocations: [],
    browsers: [],
    authenticationMethods: [],
    mobilePatch: 'INACTIVE'
  });
  const [tempUserLocations, setTempUserLocations] = useState([]);
  const history = useHistory();

  const changeInputUserLocation = useCallback(
    (value, index, type) => {
      if (type === "status") {
        setTempUserLocations(
          tempUserLocations.map((ul, _index) =>
            index === _index ? { ...ul, status: value } : ul
          )
        );
      } else if (type === 'location') {
        setTempUserLocations(
          tempUserLocations.map((ul, _index) =>
            index === _index ? { ...ul, location: value } : ul
          )
        );
      }
    },
    [tempUserLocations]
  );

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

  return (
    <>
      {Object.keys(data).length < 1 ? (
        <Redirect to="/Users" />
      ) : (
        <div className="ApplicationsBox">
          <form className="form-box" onSubmit={onFinish}>
            <div className="ant-row inputBox ant-form-item">
              <div className="ant-col-4 ant-form-item-label-left">
                <label>사용자 아이디 :</label>
              </div>
              <div className="ant-col ant-form-item-control">
                <p className="userdetailP">{userId}</p>
              </div>
            </div>

            <div className="ant-row inputBox ant-form-item">
              <div className="ant-col-4 ant-form-item-label-left">
                <label>바이패스 :</label>
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
                    onChange={(e) => {
                      setInputByPass(true);
                    }}
                  />
                  <label className="label"> 활성화</label>
                </div>
                <div className="label-bottom-text">
                  OMPASS 인증 없이 로그인 가능합니다.
                </div>
                <div>
                  <input
                    className="userDetailInput"
                    name="byPass"
                    type="radio"
                    value={false}
                    defaultChecked={!byPass}
                    onChange={(e) => {
                      setInputByPass(false);
                    }}
                  />
                  <label className="label"> 비활성화</label>
                </div>
                <div className="label-bottom-text">
                  바이패스 비활성화 (디폴트)
                </div>
              </div>
            </div>

            <div className="ApplicationsTitle">
              <h2>정책</h2>
              <p>
                정책은 사용자가 이 애플리케이션에 액세스할 때 인증하는 시기와
                방법을 정의합니다.
                <br />
                글로벌 정책은 항상 적용되지만 사용자 지정 정책으로 해당 규칙을
                재정의할 수 있습니다.
              </p>
              <button type="button" onClick={() => {
                setIsOwnPolicy(!isOwnPolicy)
              }}>{isOwnPolicy ? '비활성화' : '활성화'}</button>
              <div className={"user-policies-container" + (isOwnPolicy ? '' : ' disabled')}>
                <div className="ant-row inputBox ant-form-item">
                  <div className="ant-col-6 ant-form-item-label-left">
                    <label>Authentication policy :</label>
                  </div>
                  <div
                    className="ant-col ant-form-item-control"
                    style={{ justifyContent: "space-around" }}
                  >
                    <div>
                      <input
                        className="userDetailInput"
                        name="status"
                        value="ACTIVE"
                        type="radio"
                        defaultChecked={policyData.accessControl === "ACTIVE"}
                      />
                      <label className="label"> 2차 인증 필수</label>
                    </div>
                    <div className="label-bottom-text">
                      Requir two-factor authentication or enrollment when applicable,<br />
                      unless there is a superseding policy configured.
                </div>
                    <div>
                      <input
                        name="status"
                        value="INACTIVE"
                        type="radio"
                        defaultChecked={policyData.accessControl === "INACTIVE"}
                        style={{ width: "15px" }}
                      />
                      <label className="label-radio">2차 인증 패스</label>
                    </div>
                    <div className="label-bottom-text">
                      Skip two-factor athentication and enrollment, unless there is a
                      superseding pollcy configured.
                      </div>
                    <div>
                      <input
                        name="accessControl"
                        value="DENY"
                        type="radio"
                        defaultChecked={policyData.accessControl === "DENY"}
                        style={{ width: "15px" }}
                      />
                      <label className="label-radio">모두 거부</label>
                    </div>
                    <div className="label-bottom-text">Deny authentication to all users</div>
                  </div>
                </div>
                <div className="ant-row inputBox ant-form-item">
                  <div className="ant-col-6 ant-form-item-label-left">
                    <label>User location :</label>
                  </div>
                  <div
                    className="ant-col ant-form-item-control"
                    style={{ justifyContent: "space-around" }}
                  >
                    {tempUserLocations.map((d, ind) => (
                      <div key={ind}>
                        <select
                          className="user-location-select"
                          value={d.location}
                          onChange={(e) => {
                            changeInputUserLocation(e.target.value, ind, "location");
                          }}
                        >
                          {
                            Object.keys((lang === 'KR' ? countryCodes_KR : countryCodes_US))
                              .map((code, _ind) => <option key={_ind} value={code}>{(lang === 'KR' ? countryCodes_KR : countryCodes_US)[code]}</option>)
                          }
                        </select>
                        <select
                          className="user-location-select"
                          value={d.policy}
                          onChange={(e) => {
                            changeInputUserLocation(e.target.value, ind, "status");
                          }}
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="INACTIVE">INACTIVE</option>
                          <option value="DENY">DENY</option>
                        </select>
                        <button
                          className="button"
                          style={{ marginLeft: '1rem', height: 50 }}
                          onClick={() => {
                            setTempUserLocations(
                              tempUserLocations.filter(
                                (u, _ind) => ind !== _ind
                              )
                            );
                          }}
                        >
                          삭제
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="button"
                      onClick={() => {
                        setTempUserLocations([...tempUserLocations, { location: Object.keys(lang === 'KR' ? countryCodes_KR : countryCodes_US)[0], status: 'ACTIVE' }])
                      }}
                      style={{ height: 50, width: 100 }}
                    >
                      추가
                    </button>
                  </div>
                </div>
                <div className="ant-row inputBox ant-form-item">
                  <div className="ant-col-6 ant-form-item-label-left">
                    <label>Browsers :</label>
                  </div>
                  <div
                    className="ant-col ant-form-item-control"
                    style={{ justifyContent: "space-around" }}
                  >
                    {BrowsersList.map((bl, ind) => (
                      <div key={ind}>
                        <input
                          name="browser"
                          value={bl}
                          defaultChecked={policyData.browsers.includes(bl)}
                          type="checkbox"
                          style={{ width: "15px" }}
                        />
                        <label className="label-radio">{bl}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ant-row inputBox ant-form-item">
                  <div className="ant-col-6 ant-form-item-label-left">
                    <label>Authentication methods :</label>
                  </div>
                  <div
                    className="ant-col ant-form-item-control"
                    style={{ justifyContent: "space-around" }}
                  >
                    {AuthMethodsList.map((am, ind) => (
                      <div key={ind}>
                        <input
                          name="method"
                          value={am}
                          defaultChecked={policyData.authenticationMethods.includes(am)}
                          type="checkbox"
                          style={{ width: "15px" }}
                        />
                        <label className="label-radio">{am}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ant-row inputBox ant-form-item">
                  <div className="ant-col-6 ant-form-item-label-left">
                    <label>OMPASS Mobile app :</label>
                  </div>
                  <div
                    className="ant-col ant-form-item-control"
                    style={{ justifyContent: "space-around" }}
                  >
                    <div>
                      <input
                        name="mobile"
                        value="ACTIVE"
                        type="radio"
                        defaultChecked={policyData.mobilePatch === "ACTIVE"}
                        style={{ width: "15px" }}
                      />
                      <label className="label-radio">
                        Require up-to-date securitu patches for OMPASS Mobile.
                      </label>
                    </div>
                    <div>
                      <input
                        name="mobile"
                        value="INACTIVE"
                        type="radio"
                        defaultChecked={policyData.mobilePatch === "INACTIVE"}
                        style={{ width: "15px" }}
                      />
                      <label className="label-radio">
                        Don't require up-to-date security patches for OMPASS Mobile.
                      </label>
                      <p>Only applies to iOS AND Android.</p>
                    </div>
                  </div>
                </div>
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
