import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import "./Global_Policy.css";

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

export const BrowsersList = [
  "크롬",
  "크롬 모바일모드",
  "엣지",
  "파이어폭스",
  "사파리 모바일모드",
  "사파리",
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
}) => {
  const { adminId } = userProfile;
  const [isExistTitle, setIsExistTitle] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthCheck, setInputAuthCheck] = useState(null);
  const [inputUserLocations, setInputUserLocations] = useState([]);
  const [inputBrowserCheck, setInputBrowserCheck] = useState([]);
  const [inputAuthMethodCheck, setInputAuthMethodCheck] = useState([]);
  const [inputMobileCheck, setInputMobileCheck] = useState(null);
  const [deleteConfirmLoading, setDeleteConfirmLoading] = useState(false);
  const isKorea = useCallback(() => (lang === "ko" ? true : false), [lang]);
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
    setInputAuthMethodCheck([]);
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
      if (authenticationMethods) setInputAuthMethodCheck(authenticationMethods);
      if (mobilePatch) setInputMobileCheck(mobilePatch);
      setIsExistTitle(true);
    } else {
      InputInit();
    }
  }, [editData]);

  const _saveCallback = useCallback(() => {
    if (isCustomPolicy) {
      if (!inputTitle) return message.error("제목을 입력해주세요.");
      if (!isExistTitle) {
        return message.error("중복체크 먼저 진행해주세요.");
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
    if (inputAuthMethodCheck.length)
      result.authenticationMethods = inputAuthMethodCheck;
    else result.authenticationMethods = [];
    if (inputMobileCheck) result.mobilePatch = inputMobileCheck;
    else result.mobilePatch = null;
    if (isCustomPolicy && Object.keys(result).length === 1)
      return message.error("최소 1가지 정책은 설정해주세요.");
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
          message.success("정책 변경에 성공하였습니다.");
          if (editCallback) editCallback(data, editData.policyId);
          setVisible(false);
        },
        () => {
          message.error("정책 변경에 실패하였습니다.");
        }
      );
    } else {
      // Add New Policy
      CustomAxiosPost(
        addCustomPolicyApi(adminId),
        result,
        (data) => {
          message.success("정책 추가에 성공하였습니다.");
          if (saveCallback) saveCallback(data);
          setVisible(false);
        },
        () => {
          message.error("정책 추가에 실패하였습니다.");
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
    inputAuthMethodCheck,
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

  const changeInputAuthMethodCheck = useCallback(
    (value) => {
      if (inputAuthMethodCheck.includes(value)) {
        setInputAuthMethodCheck(
          inputAuthMethodCheck.filter((m) => m !== value)
        );
      } else {
        setInputAuthMethodCheck([...inputAuthMethodCheck, value]);
      }
    },
    [inputAuthMethodCheck]
  );

  const changeInputMobilecheck = useCallback((e) => {
    setInputMobileCheck(e.target.value);
  }, []);

  const checkExistTitle = useCallback(() => {
    if (!inputTitle) return message.error("제목을 입력해주세요.");
    CustomAxiosGet(
      isExistencePolicyApi(adminId, inputTitle),
      ({ duplicate }) => {
        if (!duplicate) {
          setIsExistTitle(true);
          message.success("사용 가능합니다.");
        } else {
          message.error("사용 불가능한 제목입니다.");
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
        message.success("삭제되었습니다.");
        if (deleteCallback) deleteCallback(editData.policyId);
      },
      () => {
        message.error("삭제에 실패하였습니다.");
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
      authenticationMethods,
      browsers,
      mobilePatch,
      userLocations,
    } = defaultPolicies;
    setInputAuthCheck(accessControl);
    setInputAuthMethodCheck(authenticationMethods);
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
            {isCustomPolicy ? "커스텀 정책" : "글로벌 정책"}
            {isEditPolicy ? " 수정" : " 추가"}
          </div>
          <Space>
            <button className="button" onClick={_saveCallback}>
              저장
            </button>
            {isEditPolicy && isCustomPolicy && (
              <button
                className="button close-button del-button"
                onClick={openDeleteConfirm}
              >
                삭제
              </button>
            )}
            <button className="button close-button" onClick={closePolicyDrawer}>
              닫기
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
        정말 삭제하시겠습니까?
      </CustomConfirm>
      <div className="Global_Policy-box">
        <CustomButton
          className="policy-default-button"
          type="button"
          onClick={defaultPolicySetting}
        >
          <UndoOutlined /> 기본값으로 변경
        </CustomButton>

        {/* -------------타이틀 ------------- */}
        {isCustomPolicy && (
          <section className="policies-box">
            <h2>제목</h2>
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
                  중복체크
                </button>
              </div>
            </div>
          </section>
        )}

        {/* -------------Authentication policy ------------- */}
        <section className="policies-box">
          <h2>인증 접근 제한</h2>
          <div className="policies-sub-box">
            <input
              name="status"
              value="ACTIVE"
              type="radio"
              checked={inputAuthCheck === "ACTIVE"}
              style={{ width: "15px" }}
              onChange={changeInputAuthCheck}
            />
            <label className="label-radio">2차 인증 필수</label>
            <p>
              대체 정책이 구성되어 있지 않은 한 2차 인증이 필요합니다. (없을
              경우 2차 인증 등록)
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
            <label className="label-radio">2차 인증 패스</label>
            <p>2차 인증 및 등록을 패스하겠습니다.</p>
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
            <label className="label-radio">모두 거부</label>
            <p>모든 사용자에 대한 인증 거부합니다.</p>
          </div>
          <div className="policies-sub-box">
            <p style={{ marginTop: "0", color: "#066b93" }}>
              이 옵션을 활성화하면 모든 사용자에게 적용됩니다.
            </p>
          </div>
        </section>

        {/* -------------User location ------------- */}
        <section className="policies-box">
          <h2>사용자 위치</h2>
          <div className="policies-sub-box">
            <h3>사용자 IP 주소를 위치에 맞게 조치를 적용할 수 있습니다.</h3>
            {inputUserLocations.map((d, ind) => (
              <div key={ind}>
                <select
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
                  className="button"
                  style={{ marginLeft: "1rem", height: 50 }}
                  onClick={() => {
                    setInputUserLocations(
                      inputUserLocations.filter((u, _ind) => ind !== _ind)
                    );
                  }}
                >
                  삭제
                </button>
              </div>
            ))}
            <p style={{ marginLeft: "0", color: "#066b93" }}>
              내부 IP 및 알 수 없는 국가의 액세스 시도는 적용되지 않습니다.
            </p>
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
              추가
            </button>
          </div>
        </section>

        {/* -------------Browsers ------------- */}
        <section className="policies-box">
          <h2>브라우저 차단</h2>
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
              <label className="label-radio">{bl}</label>
            </div>
          ))}
        </section>

        {/*----------------Authentication methods ------------- */}
        <section className="policies-box">
          <h2>인증 방법</h2>
          <div className="policies-sub-box" style={{ fontWeight: "bold" }}>
            사용자는 체크된 방법인 2FA로만 인증할 수 있습니다.
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
        </section>

        {/* -------------OMPASS Mobile app ------------- */}
        <section className="policies-box">
          <h2>OMPASS 모바일 앱</h2>

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
              OMPASS 모바일용 최신 보안 패치가 필요합니다.
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
              OMPASS 모바일용에 대한 최신 보안 패치가 필요하지 않습니다.
            </label>
          </div>

          <div>
            <p style={{ color: "#066b93" }}>iOS 및 Android에만 적용됩니다.</p>
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
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Global_Policy);
