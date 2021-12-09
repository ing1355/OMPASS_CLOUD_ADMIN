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
      } else if (type === 'isEdit') {
        setTempUserLocations(
          tempUserLocations.map((ul, _index) =>
            index === _index ? { ...ul, isEdit: value } : ul
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
          {/* <div className="billing-change-help-container">
            <div className="billing-change-help-icon" />
            <div className="billing-change-help-msg">
              평가판이 종료되면 최대 10명의 사용자에게 항상 무료로 제공되는
              OMPASS Free로 전환됩니다. 아래 양식을 사용하여 다른 버전으로
              변경하십시오.
            </div>
          </div> */}
          <form className="form-box" onSubmit={onFinish}>
            <div className="ant-row inputBox ant-form-item">
              <div className="ant-col-4 ant-form-item-label-left">
                <label>사용자 아이디 :</label>
              </div>
              <div className="ant-col ant-form-item-control">
                <p className="userdetailP">{userId}</p>
              </div>
            </div>

            {/* <div className="ant-row inputBox ant-form-item">
              <div className="ant-col-4 ant-form-item-label-left">
                <label>+ Add a username alias</label>
              </div>
              <div className="ant-col ant-form-item-control">
                <p className="userdetailP">Users can have up to 8 aliases.</p>
                <p className="userdetailP">
                  Optionally, you may choose to reserve using an alias number
                  for a specific alias
                </p>
                <p className="userdetailP">
                  (e.g., Username alias 1 should only be used for Employee ID)
                </p>
              </div>
            </div> */}

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
              <button onClick={() => {

              }}>{isOwnPolicy ? '비활성화' : '활성화'}</button>
              <div className="user-policies-container">
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
                          disabled={!d.isEdit}
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
                          disabled={!d.isEdit}
                          onChange={(e) => {
                            changeInputUserLocation(e.target.value, ind, "status");
                          }}
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="INACTIVE">INACTIVE</option>
                          <option value="DENY">DENY</option>
                        </select>
                        {!d.isEdit && <button
                          className="button"
                          style={{ marginLeft: '1rem', height: 50 }}
                          onClick={() => {
                            changeInputUserLocation(true, ind, 'isEdit');
                          }}
                        >
                          수정
                        </button>}
                        <button
                          className="button"
                          style={{ marginLeft: '1rem', height: 50 }}
                          onClick={() => {
                            if (d.isEdit) {
                              if (!tempUserLocations[ind].location) {
                                return message.error('위치를 입력해주세요.')
                              }
                              setTempUserLocations(tempUserLocations.map((u, _ind) => ind === _ind ? { ...u, isEdit: false } : u))
                            } else {
                              setTempUserLocations(
                                tempUserLocations.filter(
                                  (u, _ind) => ind !== _ind
                                )
                              );
                            }
                          }}
                        >
                          {d.isEdit ? '저장' : '삭제'}
                        </button>
                        {d.isEdit && <button
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
                          취소
                        </button>}
                      </div>
                    ))}
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
                      <div className="policies-sub-box" key={ind}>
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
                      <div className="policies-sub-box" key={ind}>
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
              {/* <h2>Authentication policy</h2>
              <div className="policies-sub-box">
                <input
                  name="status"
                  value="ACTIVE"
                  type="radio"
                  checked={policyData && policyData.inputAuthCheck === "ACTIVE"}
                  style={{ width: "15px" }}
                  onChange={changeInputAuthCheck}
                />
                <label className="label-radio">2차 인증 필수</label>
                <p>
                  Requir two-factor authentication or enrollment when applicable,
                  unless there is a superseding policy configured.
            </p>
              </div>
              <div className="policies-sub-box">
                <input
                  name="status"
                  value="INACTIVE"
                  type="radio"
                  checked={policyData && policyData.inputAuthCheck === "INACTIVE"}
                  style={{ width: "15px" }}
                  onChange={changeInputAuthCheck}
                />
                <label className="label-radio">2차 인증 패스</label>
                <p>
                  Skip two-factor athentication and enrollment, unless there is a
                  superseding pollcy configured.
            </p>
              </div>
              <div className="policies-sub-box">
                <input
                  name="status"
                  value="DENY"
                  type="radio"
                  checked={policyData && policyData.inputAuthCheck === "DENY"}
                  style={{ width: "15px" }}
                  onChange={changeInputAuthCheck}
                />
                <label className="label-radio">모두 거부</label>
                <p>Deny authentication to all users..</p>
              </div> */}
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
