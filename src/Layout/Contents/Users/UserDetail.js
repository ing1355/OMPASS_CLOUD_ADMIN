import React, { useCallback, useState } from "react";
import { message } from "antd";
import "../Billing/Billing.css";
import "./Users.css";
import { Redirect, useHistory } from "react-router";
import { updateByPassApi } from "../../../Constants/Api_Route";
import { CustomAxiosPatch } from "../../../Functions/CustomAxios";
import CustomButton from "../../../CustomComponents/CustomButton";
import { connect } from "react-redux";
import { BrowsersList, AuthMethodsList } from "../Policies/Global_Policy";
import { countryCodes_KR, countryCodes_US } from "../Policies/Country_Code";

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
      } else if (type === "location") {
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
                <div className="ant-row inputBox ant-form-item">
                  <div className="ant-col-6 ant-form-item-label-left">
                    <label>인증 접근 제한 :</label>
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
                      대체 정책이 구성되어 있지 않은 한 2차 인증이 필요합니다.
                      (없을 경우 2차 인증 등록)
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
                      2차 인증 및 등록을 패스하겠습니다.
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
                    <div className="label-bottom-text">
                      모든 사용자에 대한 인증 거부합니다.
                    </div>
                  </div>
                  <div>
                    <p
                      style={{
                        marginTop: "2rem",
                        color: "#066b93",
                        marginBottom: "0",
                      }}
                    >
                      * 이 옵션을 활성화하면 모든 사용자에게 적용됩니다.
                    </p>
                  </div>
                </div>
                <div className="ant-row inputBox ant-form-item">
                  <div className="ant-col-6 ant-form-item-label-left">
                    <label>사용자 위치 :</label>
                  </div>
                  <div
                    className="ant-col ant-form-item-control"
                    style={{ justifyContent: "space-around", width: "50%" }}
                  >
                    {tempUserLocations.map((d, ind) => (
                      <div key={ind}>
                        <select
                          className="user-location-select"
                          value={d.location}
                          onChange={(e) => {
                            changeInputUserLocation(
                              e.target.value,
                              ind,
                              "location"
                            );
                          }}
                        >
                          {Object.keys(
                            lang === "KR" ? countryCodes_KR : countryCodes_US
                          ).map((code, _ind) => (
                            <option key={_ind} value={code}>
                              {
                                (lang === "KR"
                                  ? countryCodes_KR
                                  : countryCodes_US)[code]
                              }
                            </option>
                          ))}
                        </select>
                        <select
                          className="user-location-select"
                          value={d.policy}
                          onChange={(e) => {
                            changeInputUserLocation(
                              e.target.value,
                              ind,
                              "status"
                            );
                          }}
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="INACTIVE">INACTIVE</option>
                          <option value="DENY">DENY</option>
                        </select>
                        <button
                          className="button"
                          style={{ marginLeft: "1rem", height: 50 }}
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
                        setTempUserLocations([
                          ...tempUserLocations,
                          {
                            location: Object.keys(
                              lang === "KR" ? countryCodes_KR : countryCodes_US
                            )[0],
                            status: "ACTIVE",
                          },
                        ]);
                      }}
                      style={{ height: 50, width: 100 }}
                    >
                      추가
                    </button>
                  </div>
                  <div style={{ display: "block" }}>
                    <p
                      style={{
                        marginTop: "2rem",
                        color: "#066b93",
                        marginBottom: "0",
                      }}
                    >
                      *내부 IP 및 알 수 없는 국가의 액세스 시도는 적용되지
                      않습니다.
                    </p>
                  </div>
                </div>

                <div className="ant-row inputBox ant-form-item">
                  <div className="ant-col-6 ant-form-item-label-left">
                    <label>브라우저 차단 :</label>
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
                    <label>인증 방법 :</label>
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
                          defaultChecked={policyData.authenticationMethods.includes(
                            am
                          )}
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
                    <label>OMPASS 모바일 앱 :</label>
                  </div>
                  <div
                    className="ant-col ant-form-item-control"
                    style={{ justifyContent: "space-around", width: "50%" }}
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
                        OMPASS 모바일용 최신 보안 패치가 필요합니다.
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
                        OMPASS 모바일용에 대한 최신 보안 패치가 필요하지
                        않습니다.
                      </label>
                    </div>
                  </div>
                  <div style={{ display: "block" }}>
                    <p
                      style={{
                        marginTop: "2rem",
                        color: "#066b93",
                        marginBottom: "0",
                      }}
                    >
                      *iOS 및 Android에만 적용됩니다.
                    </p>
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
