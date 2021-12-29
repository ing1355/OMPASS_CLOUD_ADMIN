import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import "./PolicyDrawer.css";

import CustomSwitch from "../../../CustomComponents/CustomSwitch";
import CustomButton from "../../../CustomComponents/CustomButton";
import { UndoOutlined } from "@ant-design/icons";
import { Drawer, message, Space } from "antd";
import CustomConfirm from "../../../CustomComponents/CustomConfirm";
import {
  CustomAxiosDelete,
  CustomAxiosGet,
  CustomAxiosPost,
  CustomAxiosPut,
} from "../../../Functions/CustomAxios";
import {
  addCustomPolicyApi,
  deleteCustomPoliciesApi,
  getDefaultPolicyApi,
  isExistencePolicyApi,
  updateCustomPoliciesApi,
  updateGlobalPolicyApi,
} from "../../../Constants/Api_Route";
import { connect } from "react-redux";
import { countryCodes_US, countryCodes_KR } from "./Country_Code";
import { FormattedMessage, useIntl } from "react-intl";
import ActionCreators from "../../../redux/actions";
import { nameTest } from "../../../Constants/InputRules";

export const BrowsersList = [
  "Chrome",
  "Chrome Mobile",
  "Microsoft Edge",
  "Firefox",
  "Safari",
  "Safari Mobile",
  // "All other browsers",
];

export const AuthMethodsList = [
  "OMPASS Push",
  // "OMPASS Mobile passcodes",
  // "SMS passcodes",
  // "Security keys (U2F)",
  "WebAuthn",
  // "Hardware tokens",
];

var defaultPolicies;

const Global_Policy = ({
  visible,
  setVisible,
  isCustomPolicy,
  saveCallback,
  editCallback,
  isEditPolicy,
  editData,
  userProfile,
  lang,
  showSuccessMessage,
  showErrorMessage,
}) => {
  const { adminId } = userProfile;
  const [isExistTitle, setIsExistTitle] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthCheck, setInputAuthCheck] = useState(null);
  const [inputUserLocations, setInputUserLocations] = useState([]);
  const [inputBrowserCheck, setInputBrowserCheck] = useState([]);
  // const [inputAuthMethodCheck, setInputAuthMethodCheck] = useState([]);
  const [inputMobileCheck, setInputMobileCheck] = useState(null);
  const [userLocationsEnable, setUserLocationsEnable] = useState(false);
  const isKorea = useCallback(() => (lang === "ko" ? true : false), [lang]);
  const locationList = Object.keys(
    isKorea() ? countryCodes_KR : countryCodes_US
  );
  const { formatMessage } = useIntl();

  useLayoutEffect(() => {
    CustomAxiosGet(getDefaultPolicyApi(adminId), (data) => {
      defaultPolicies = data;
    });
  }, []);

  const InputInit = useCallback(() => {
    setInputTitle("");
    setIsExistTitle(false);
    setInputAuthCheck(null);
    setInputUserLocations([]);
    setInputBrowserCheck([]);
    // setInputAuthMethodCheck([]);
    setInputMobileCheck(null);
  }, []);

  useEffect(() => {
    if (!visible) {
      InputInit();
    }
  }, [visible]);
  
  useLayoutEffect(() => {
    if (editData) {
      const {
        title,
        accessControl,
        userLocations,
        browsers,
        authenticationMethods,
        userLocationEnable,
        mobilePatch,
      } = editData;
      if (title) setInputTitle(title);
      if (accessControl) setInputAuthCheck(accessControl);
      if (userLocations && userLocations.length)
        setInputUserLocations(userLocations);
      else setInputUserLocations([{ location: "ETC", status: "PERMIT" }]);
      if (browsers) setInputBrowserCheck(browsers);
      // if (authenticationMethods) setInputAuthMethodCheck(authenticationMethods);
      if (mobilePatch) setInputMobileCheck(mobilePatch);
      if(userLocationEnable) setUserLocationsEnable(userLocationEnable)
      setIsExistTitle(true);
    } else {
      InputInit();
    }
  }, [editData]);

  const _saveCallback = useCallback(() => {
    if (isCustomPolicy) {
      if (!inputTitle) return showErrorMessage("PLEASE_INPUT_POLICY_NAME");
      if (!isExistTitle) {
        return showErrorMessage("PLEASE_CHECK_EXIST");
      }
    }
    const result = {};
    if (inputTitle) result.title = inputTitle;
    if (inputAuthCheck) result.accessControl = inputAuthCheck;
    else result.accessControl = null;
    if (inputUserLocations.length) result.userLocations = inputUserLocations;
    else result.userLocations = [];
    if (inputBrowserCheck.length) result.browsers = inputBrowserCheck;
    else result.browsers = [];
    // if (inputAuthMethodCheck.length)
    //   result.authenticationMethods = inputAuthMethodCheck;
    // else result.authenticationMethods = [];
    if (inputMobileCheck) result.mobilePatch = inputMobileCheck;
    else result.mobilePatch = null;
    result.userLocationsEnable = userLocationsEnable;
    if (isCustomPolicy && Object.keys(result).length === 1)
      return showErrorMessage("PLEASE_INPUT_POLICY");
    if (isEditPolicy) {
      let apiRoute = isCustomPolicy
        ? updateCustomPoliciesApi(adminId, editData.policyId)
        : updateGlobalPolicyApi(adminId);
      CustomAxiosPut(
        apiRoute,
        {
          ...result,
        },
        (data) => {
          showSuccessMessage("POLICY_UPDATE_SUCCESS");
          if (editCallback) editCallback(data, editData.policyId);
          setVisible(false);
        },
        () => {
          showErrorMessage("POLICY_UPDATE_FAIL");
        }
      );
    } else {
      // Add New Policy
      CustomAxiosPost(
        addCustomPolicyApi(adminId),
        result,
        (data) => {
          showSuccessMessage("POLICY_ADD_SUCCESS");
          if (saveCallback) saveCallback(data);
          setVisible(false);
        },
        () => {
          showErrorMessage("POLICY_ADD_FAIL");
        }
      );
    }
  }, [
    editCallback,
    saveCallback,
    inputTitle,
    inputAuthCheck,
    inputUserLocations,
    inputBrowserCheck,
    // inputAuthMethodCheck,
    inputMobileCheck,
    editData,
    userLocationsEnable,
    isExistTitle,
  ]);

  const changeInputTitle = useCallback((e) => {
    setIsExistTitle(false);
    setInputTitle(e.target.value);
  }, []);

  const changeInputAuthCheck = useCallback((e) => {
    setInputAuthCheck(e.target.value);
  }, []);

  const changeInputUserLocation = useCallback(
    (value, index, type) => {
      if (type === "status") {
        setInputUserLocations(
          inputUserLocations.map((ul, _index) =>
            index === _index ? { ...ul, status: value } : ul
          )
        );
      } else if (type === "location") {
        setInputUserLocations(
          inputUserLocations.map((ul, _index) =>
            index === _index ? { ...ul, location: value } : ul
          )
        );
      } else if (type === "isEdit") {
        setInputUserLocations(
          inputUserLocations.map((ul, _index) =>
            index === _index ? { ...ul, isEdit: value } : ul
          )
        );
      }
    },
    [inputUserLocations]
  );

  const changeInputBrowserCheck = useCallback(
    (value) => {
      if (inputBrowserCheck.includes(value)) {
        setInputBrowserCheck(inputBrowserCheck.filter((b) => b !== value));
      } else {
        setInputBrowserCheck([...inputBrowserCheck, value]);
      }
    },
    [inputBrowserCheck]
  );

  // const changeInputAuthMethodCheck = useCallback(
  //   (value) => {
  //     if (inputAuthMethodCheck.includes(value)) {
  //       setInputAuthMethodCheck(
  //         inputAuthMethodCheck.filter((m) => m !== value)
  //       );
  //     } else {
  //       setInputAuthMethodCheck([...inputAuthMethodCheck, value]);
  //     }
  //   },
  //   [inputAuthMethodCheck]
  // );

  const changeInputMobilecheck = useCallback((e) => {
    setInputMobileCheck(e.target.value);
  }, []);

  const checkExistTitle = useCallback(() => {
    if (!inputTitle) return showErrorMessage("PLEASE_INPUT_POLICY_NAME");
    if (!nameTest(inputTitle)) return showErrorMessage('POLICY_NAME_RULE_ERROR')
    CustomAxiosGet(
      isExistencePolicyApi(adminId, inputTitle),
      ({ duplicate }) => {
        if (!duplicate) {
          setIsExistTitle(true);
          showSuccessMessage("IS_NOT_EXIST_POLICY_NAME");
        } else {
          showErrorMessage("IS_EXIST_POLICY_NAME");
        }
      }
    );
  }, [inputTitle]);

  const closePolicyDrawer = useCallback(() => {
    setVisible(false);
  }, []);

  const defaultPolicySetting = () => {
    const {
      accessControl,
      // authenticationMethods,
      browsers,
      mobilePatch,
      userLocations,
    } = defaultPolicies;
    setInputAuthCheck(accessControl);
    // setInputAuthMethodCheck(authenticationMethods);
    setInputBrowserCheck(browsers);
    setInputMobileCheck(mobilePatch);
    setInputUserLocations(userLocations);
  };

  return (
    <Drawer
      title={
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {isCustomPolicy ? (
              <FormattedMessage id="CUSTOMPOLICY" />
            ) : (
              <FormattedMessage id="DEFAULTPOLICY" />
            )}
            &nbsp;
            {isEditPolicy ? (
              <FormattedMessage id="UPDATE" />
            ) : (
              <FormattedMessage id="ADD" />
            )}
          </div>
          <Space>
            <button className="button" onClick={_saveCallback}>
              <FormattedMessage id="SAVE" />
            </button>
            <button className="button close-button" onClick={closePolicyDrawer}>
              <FormattedMessage id="CLOSE" />
            </button>
          </Space>
        </div>
      }
      visible={visible}
      closable={false}
      placement="right"
      onClose={closePolicyDrawer}
      style={{ position: "absolute" }}
      bodyStyle={{ paddingBottom: 80 }}
      destroyOnClose
      width={900}
    >
      <div className="Global_Policy-box">
        <CustomButton
          className="policy-default-button"
          type="button"
          onClick={defaultPolicySetting}
        >
          <UndoOutlined /> <FormattedMessage id="SETTINGTODEFAULT" />
        </CustomButton>

        {/* -------------타이틀 ------------- */}
        {isCustomPolicy && (
          <section className="policies-box">
            <h2>
              <FormattedMessage id="POLICYTITLE" />
            </h2>
            <div className="policies-sub-box">
              <div>
                <input
                  className="title-input"
                  maxLength={20}
                  value={inputTitle}
                  onChange={changeInputTitle}
                />
                <button
                  className="select button"
                  disabled={isExistTitle}
                  type="button"
                  style={{ height: "50px" }}
                  onClick={checkExistTitle}
                >
                  <FormattedMessage id="DUPLICATECHECK" />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* -------------Authentication policy ------------- */}
        <section className="policies-box">
          <h2>
            <FormattedMessage id="ACCESSCONTROLTITLE" />
          </h2>
          <div className="policies-sub-box">
            <input
              name="status"
              value="ACTIVE"
              type="radio"
              checked={inputAuthCheck === "ACTIVE"}
              style={{ width: "15px" }}
              onChange={changeInputAuthCheck}
            />
            <label className="label-radio">
              <FormattedMessage id="ACCESSCONTROLACTIVE" />
            </label>
            <p>
              <FormattedMessage id="ACCESSCONTROLACTIVEDESCRIPTION" />
            </p>
          </div>
          <div className="policies-sub-box">
            <input
              name="status"
              value="INACTIVE"
              type="radio"
              checked={inputAuthCheck === "INACTIVE"}
              style={{ width: "15px" }}
              onChange={changeInputAuthCheck}
            />
            <label className="label-radio">
              <FormattedMessage id="ACCESSCONTROLINACTIVE" />
            </label>
            <p>
              <FormattedMessage id="ACCESSCONTROLINACTIVEDESCRIPTION" />
            </p>
          </div>
          <div className="policies-sub-box">
            <input
              name="status"
              value="DENY"
              type="radio"
              checked={inputAuthCheck === "DENY"}
              style={{ width: "15px" }}
              onChange={changeInputAuthCheck}
            />
            <label className="label-radio">
              <FormattedMessage id="ACCESSCONTROLDENY" />
            </label>
            <p>
              <FormattedMessage id="ACCESSCONTROLDENYDESCRIPTION" />
            </p>
          </div>

          <p style={{ marginTop: "0", color: "#066b93" }}>
            <FormattedMessage id="ACCESSCONTROLDESCRIPTION" />
          </p>
        </section>
        {/* -------------User location ------------- */}
        <section className="policies-box">
          <div style={{display:'flex', alignItems:'center'}}>
            <h2 style={{display:'inline', marginBottom: 0, marginRight:'12px'}}>
              <FormattedMessage id="USERLOCATIONPOLICYTITLE" />
            </h2>
            <CustomSwitch checked={userLocationsEnable} onChange={(value) => {
              setUserLocationsEnable(value);
            }}/>
          </div>
          <div className={"policies-sub-box user-locations-container" + (userLocationsEnable ? '' : ' disabled')} style={{height: userLocationsEnable ? inputUserLocations.length * 82.24 + 123.14 : 0}}>
            <h3>
              <FormattedMessage id="USERLOCATIONPOLICYDESCRIPTION1" />
            </h3>
            {inputUserLocations.map((d, ind) => (
              <div key={ind} className="user-location-input-container">
                <select
                  style={{ paddingLeft: "0.3rem" }}
                  className="user-location-select"
                  value={d.location}
                  disabled={d.location === 'ETC'}
                  onChange={(e) => {
                    changeInputUserLocation(e.target.value, ind, "location");
                  }}
                >
                  {d.location === "ETC" ? (
                    <option value="ETC">
                      {formatMessage({ id: "ETCUSERLOCATION" })}
                    </option>
                  ) : (
                    locationList.map((code) => (
                      <option
                        disabled={inputUserLocations.find(
                          (l) => l.location === code
                        )}
                        key={code}
                        value={code}
                      >
                        {(isKorea() ? countryCodes_KR : countryCodes_US)[code]}
                      </option>
                    ))
                  )}
                </select>
                <select
                  style={{ paddingLeft: "0.3rem" }}
                  className="user-location-select"
                  value={d.status}
                  onChange={(e) => {
                    changeInputUserLocation(e.target.value, ind, "status");
                  }}
                >
                  <option value="PERMIT">Permit</option>
                  <option value="DENY">Deny</option>
                </select>
                <button
                  className="button policy-location-button"
                  style={{
                    marginLeft: "1rem",
                    height: 50,
                    marginBottom: "2rem",
                  }}
                  onClick={() => {
                    if (d.location === "ETC")
                      return showErrorMessage("USER_LOCATION_DELETE_FAIL");
                    setInputUserLocations(
                      inputUserLocations.filter((u, _ind) => ind !== _ind)
                    );
                  }}
                >
                  <FormattedMessage id="DELETE" />
                </button>
              </div>
            ))}
            {/* <p style={{ marginLeft: "0", color: "#066b93" }}>
              <FormattedMessage id="USERLOCATIONPOLICYDESCRIPTION1" />
            </p> */}
            <button
              type="button"
              className="button"
              onClick={() => {
                setInputUserLocations([
                  ...inputUserLocations,
                  {
                    location: locationList.find(
                      (l) => !inputUserLocations.find((_l) => _l.location === l)
                    ),
                    status: "PERMIT",
                  },
                ]);
              }}
              style={{ height: 50, display: "block" }}
            >
              <FormattedMessage id="ADD" />
            </button>
          </div>
        </section>

        {/* -------------Browsers ------------- */}
        <section className="policies-box">
          <h2>
            <FormattedMessage id="BROWSERSPOLICYTITLE" />
          </h2>
          {/* <div className="policies-sub-box" style={{ fontWeight: "bold" }}>
            Always block
          </div> */}

          {BrowsersList.map((bl, ind) => (
            <div className="policies-sub-box" key={ind}>
              <input
                name="browser"
                value={bl}
                checked={inputBrowserCheck.includes(bl)}
                type="checkbox"
                style={{ width: "15px" }}
                onChange={() => {
                  changeInputBrowserCheck(bl);
                }}
              />
              <label className="label-radio">
                <FormattedMessage id={bl} />
              </label>
            </div>
          ))}
        </section>

        {/*----------------Authentication methods ------------- */}
        {/* <section className="policies-box">
          <h2><FormattedMessage id="AUTHENTICATIONMETHODPOLICYTITLE"/></h2>
          <div className="policies-sub-box" style={{ fontWeight: "bold" }}>
            <FormattedMessage id="AUTHENTICATIONMETHODPOLICYDESCRIPTION"/>
          </div>

          {AuthMethodsList.map((am, ind) => (
            <div className="policies-sub-box" key={ind}>
              <input
                name="method"
                value={am}
                checked={inputAuthMethodCheck.includes(am)}
                type="checkbox"
                style={{ width: "15px" }}
                onChange={() => {
                  changeInputAuthMethodCheck(am);
                }}
              />
              <label className="label-radio">{am}</label>
            </div>
          ))}
        </section> */}

        {/* -------------OMPASS Mobile app ------------- */}
        <section className="policies-box">
          <h2>
            <FormattedMessage id="OMPASSMOBILEPOLICYTITLE" />
          </h2>

          <div className="policies-sub-box">
            <input
              name="mobile"
              value="ACTIVE"
              type="radio"
              checked={inputMobileCheck === "ACTIVE"}
              style={{ width: "15px" }}
              onChange={changeInputMobilecheck}
            />
            <label className="label-radio">
              <FormattedMessage id="OMPASSMOBILEPOLICYACTIVE" />
            </label>
          </div>
          <div className="policies-sub-box">
            <input
              name="mobile"
              value="INACTIVE"
              type="radio"
              checked={inputMobileCheck === "INACTIVE"}
              style={{ width: "15px" }}
              onChange={changeInputMobilecheck}
            />
            <label className="label-radio">
              <FormattedMessage id="OMPASSMOBILEPOLICYINACTIVE" />
            </label>
          </div>

        </section>
      </div>
    </Drawer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Global_Policy);
