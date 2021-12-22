import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import "./PolicyDrawer.css";

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
import { FormattedMessage } from "react-intl";
import ActionCreators from "../../../redux/actions";

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
  deleteCallback,
  isEditPolicy,
  editData,
  userProfile,
  lang,
  showSuccessMessage,
  showErrorMessage,
}) => {
  const { adminId } = userProfile;
  const [isExistTitle, setIsExistTitle] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthCheck, setInputAuthCheck] = useState(null);
  const [inputUserLocations, setInputUserLocations] = useState([]);
  const [inputBrowserCheck, setInputBrowserCheck] = useState([]);
  // const [inputAuthMethodCheck, setInputAuthMethodCheck] = useState([]);
  const [inputMobileCheck, setInputMobileCheck] = useState(null);
  const [deleteConfirmLoading, setDeleteConfirmLoading] = useState(false);
  const isKorea = useCallback(() => (lang === "KR" ? true : false), [lang]);
  const locationList = Object.keys(countryCodes_KR).sort((a, b) => {
    const target = isKorea() ? countryCodes_KR : countryCodes_US;
    return target[a] > target[b] ? 1 : -1;
  });

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
        mobilePatch,
      } = editData;
      if (title) setInputTitle(title);
      if (accessControl) setInputAuthCheck(accessControl);
      if (userLocations) setInputUserLocations(userLocations);
      if (browsers) setInputBrowserCheck(browsers);
      // if (authenticationMethods) setInputAuthMethodCheck(authenticationMethods);
      if (mobilePatch) setInputMobileCheck(mobilePatch);
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

  const openDeleteConfirm = useCallback(() => {
    setDeleteConfirmVisible(true);
  }, []);

  const closeDeleteConfirm = useCallback(() => {
    setDeleteConfirmVisible(false);
  }, []);

  const _deleteCallback = useCallback(() => {
    setDeleteConfirmLoading(true);
    CustomAxiosDelete(
      deleteCustomPoliciesApi(adminId, editData.policyId),
      () => {
        setDeleteConfirmLoading(false);
        setDeleteConfirmVisible(false);
        setVisible(false);
        showSuccessMessage("DELETE_SUCCESS");
        if (deleteCallback) deleteCallback(editData.policyId);
      },
      () => {
        showErrorMessage("DELETE_FAIL");
        setDeleteConfirmLoading(false);
      }
    );
  }, [editData]);

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
            {isEditPolicy && isCustomPolicy && (
              <button
                className="button close-button del-button"
                onClick={openDeleteConfirm}
              >
                <FormattedMessage id="DELETE" />
              </button>
            )}
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
      <CustomConfirm
        visible={deleteConfirmVisible}
        footer={true}
        okLoading={deleteConfirmLoading}
        cancelCallback={closeDeleteConfirm}
        confirmCallback={_deleteCallback}
      >
        <FormattedMessage id="DELETECONFIRM" />
      </CustomConfirm>
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
              <FormattedMessage id="TITLE" />
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
          <h2>
            <FormattedMessage id="USERLOCATIONPOLICYTITLE" />
          </h2>
          <div className="policies-sub-box">
            <h3>
              <FormattedMessage id="USERLOCATIONPOLICYDESCRIPTION1" />
            </h3>
            {inputUserLocations.map((d, ind) => (
              <div key={ind}>
                <select
                  style={{ paddingLeft: "0.3rem" }}
                  className="user-location-select"
                  value={d.location}
                  onChange={(e) => {
                    changeInputUserLocation(e.target.value, ind, "location");
                  }}
                >
                  {locationList.map((code, _ind) => (
                    <option key={_ind} value={code}>
                      {(isKorea() ? countryCodes_KR : countryCodes_US)[code]}
                    </option>
                  ))}
                </select>
                <select
                  style={{ paddingLeft: "0.3rem" }}
                  className="user-location-select"
                  value={d.status}
                  onChange={(e) => {
                    changeInputUserLocation(e.target.value, ind, "status");
                  }}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="DENY">DENY</option>
                </select>
                <button
                  className="button policy-location-button"
                  style={{
                    marginLeft: "1rem",
                    height: 50,
                    marginBottom: "2rem",
                  }}
                  onClick={() => {
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
                  { location: locationList[0], status: "ACTIVE" },
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
          <p style={{ marginTop: "10px", color: "#066b93" }}>
            <FormattedMessage id="ACCESSCONTROLDESCRIPTION" />
          </p>
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
