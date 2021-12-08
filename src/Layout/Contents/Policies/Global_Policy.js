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
import { ipAddressTest } from "../../../Constants/InputRules";
import CustomConfirm from "../../../CustomComponents/CustomConfirm";

const userLocationsMockData = [
  { ipAddress: "192.168.182.42", policy: "active" },
  { ipAddress: "192.168.182.32", policy: "inActive" },
  { ipAddress: "192.168.182.22", policy: "deny" },
];

const BrowsersList = [
  "Chrome",
  "Chrome Mobile",
  "Edge",
  "Firefox",
  "Mobile Safari",
  "Safari",
  "All other browsers",
];

const AuthMethodsList = [
  "OMPASS Push",
  "OMPASS Mobile passcodes",
  "SMS passcodes",
  "Security keys (U2F)",
  "WebAuthn",
  "Hardware tokens",
];

const Global_Policy = ({
  visible,
  setVisible,
  isCustomPolicy,
  saveCallback,
  editCallback,
  deleteCallback,
  isEditPolicy,
  editData,
}) => {
  const [isExistTitle, setIsExistTitle] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthCheck, setInputAuthCheck] = useState(null);
  const [inputUserLocations, setInputUserLocations] = useState(
    userLocationsMockData
  );
  const [inputBrowserCheck, setInputBrowserCheck] = useState([]);
  const [inputAuthMethodCheck, setInputAuthMethodCheck] = useState([]);
  const [inputMobileCheck, setInputMobileCheck] = useState(null);

  useLayoutEffect(() => {
    if (editData) {
      const {
        title,
        authenticationPolicy,
        userLocation,
        browsers,
        authenticationMethods,
        mobile,
      } = editData;
      if (title) setInputTitle(title);
      if (authenticationPolicy) setInputAuthCheck(authenticationPolicy);
      if (userLocation) setInputUserLocations(userLocation);
      if (browsers) setInputBrowserCheck(browsers);
      if (authenticationMethods) setInputAuthMethodCheck(authenticationMethods);
      if (mobile) setInputMobileCheck(mobile);
    } else {
      setInputTitle("");
      setInputAuthCheck(null);
      setInputUserLocations([]);
      setInputBrowserCheck([]);
      setInputAuthMethodCheck([]);
      setInputMobileCheck(null);
    }
  }, [editData]);

  const _saveCallback = useCallback(() => {
    if (isCustomPolicy) {
      if (!inputTitle) return message.error("제목을 입력해주세요.");
    }
    const result = {};
    if (inputTitle) result.title = inputTitle;
    if (inputAuthCheck) result.authentication = inputAuthCheck;
    if (inputUserLocations.length) result.userLocation = inputUserLocations;
    if (inputBrowserCheck.length) result.browsers = inputBrowserCheck;
    if (inputAuthMethodCheck.length)
      result.authenticationMethods = inputAuthMethodCheck;
    if (inputMobileCheck) result.mobilePatch = inputMobileCheck;
    if (isEditPolicy && editCallback) editCallback(result);
    if (!isEditPolicy && saveCallback) saveCallback(result);
  }, [
    editCallback,
    saveCallback,
    inputTitle,
    inputAuthCheck,
    inputUserLocations,
    inputBrowserCheck,
    inputAuthMethodCheck,
    inputMobileCheck,
  ]);

  const changeInputTitle = useCallback((e) => {
    setInputTitle(e.target.value);
  }, []);

  const changeInputAuthCheck = useCallback((e) => {
    setInputAuthCheck(e.target.value);
  }, []);

  const changeInputUserLocation = useCallback(
    (value, index, type) => {
      if (type === "policy") {
        setInputUserLocations(
          inputUserLocations.map((ul, _index) =>
            index === _index ? { ...ul, policy: value } : ul
          )
        );
      } else {
        setInputUserLocations(
          inputUserLocations.map((ul, _index) =>
            index === _index ? { ...ul, ipAddress: value } : ul
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
    setIsExistTitle(true);
    message.success("사용 가능합니다.");
  }, [inputTitle]);

  const openDeleteConfirm = useCallback(() => {
    setDeleteConfirmVisible(true);
  }, []);

  const closeDeleteConfirm = useCallback(() => {
    setDeleteConfirmVisible(false);
  }, []);

  const _deleteCallback = useCallback(() => {
    setDeleteConfirmVisible(false);
    if (deleteCallback) deleteCallback(editData.title);
  }, [editData]);

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
          <div>Edit {isCustomPolicy ? "Custom" : "Global"} Policy</div>
          <Space>
            <button className="button" onClick={_saveCallback}>
              저장
            </button>
            <button className="button" onClick={openDeleteConfirm}>
              삭제
            </button>
            <button
              className="button"
              onClick={() => {
                setVisible(false);
              }}
            >
              닫기
            </button>
          </Space>
        </div>
      }
      visible={visible}
      closable={false}
      placement="right"
      style={{ position: "absolute" }}
      bodyStyle={{ paddingBottom: 80 }}
      destroyOnClose
      width={900}
    >
      <CustomConfirm
        visible={deleteConfirmVisible}
        footer={true}
        cancelCallback={closeDeleteConfirm}
        confirmCallback={_deleteCallback}
      >
        정말 삭제하시겠습니까?
      </CustomConfirm>
      <div className="Global_Policy-box">
        <CustomButton className="policy-default-button" type="button">
          <UndoOutlined /> 기본값으로 변경
        </CustomButton>

        {/* -------------타이틀 ------------- */}
        {isCustomPolicy && (
          <section className="policies-box">
            <h2>Title</h2>
            <div className="policies-sub-box">
              <div>
                <input
                  className="title-input"
                  maxLength={20}
                  value={inputTitle}
                  onChange={changeInputTitle}
                  disabled={isEditPolicy}
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
          <h2>Authentication policy</h2>
          <div className="policies-sub-box">
            <input
              name="status"
              value="active"
              type="radio"
              checked={inputAuthCheck === "active"}
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
              value="inActive"
              type="radio"
              checked={inputAuthCheck === "inActive"}
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
              value="deny"
              type="radio"
              checked={inputAuthCheck === "deny"}
              style={{ width: "15px" }}
              onChange={changeInputAuthCheck}
            />
            <label className="label-radio">모두 거부</label>
            <p>Deny authentication to all users..</p>
          </div>
        </section>

        {/* -------------User location ------------- */}
        <section className="policies-box">
          <h2>User location</h2>
          <div className="policies-sub-box">
            <h3>
              OMPASS will do a country lookup on the host IP address and can
              apply actions based on the country.
            </h3>
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const { ipAddress, status } = e.target.elements;
                  if (!ipAddress.value.length)
                    return message.error("Ip를 입력해주세요.");
                  if (
                    inputUserLocations.find(
                      (u) => u.ipAddress === ipAddress.value
                    )
                  )
                    return message.error("중복 Ip가 존재합니다.");
                  setInputUserLocations([
                    ...inputUserLocations,
                    { ipAddress: ipAddress.value, policy: status.value },
                  ]);
                  ipAddress.value = "";
                  status.value = "active";
                }}
              >
                <input
                  maxLength={15}
                  name="ipAddress"
                  className="user-location-input"
                />
                <select name="status" className="user-location-select">
                  <option value="active">Active</option>
                  <option value="inActive">Inactive</option>
                  <option value="deny">Deny</option>
                </select>
                <button
                  type="submit"
                  className="button"
                  style={{ marginLeft: "1rem" }}
                >
                  저장
                </button>
              </form>
            </div>
            {inputUserLocations.map((d, ind) => (
              <div key={ind}>
                <input
                  maxLength={15}
                  className="user-location-input"
                  value={d.ipAddress}
                  onChange={(e) => {
                    changeInputUserLocation(e.target.value, ind, "ipAddress");
                  }}
                />
                <select
                  name="order"
                  className="user-location-select"
                  value={d.policy}
                  onChange={(e) => {
                    changeInputUserLocation(e.target.value, ind, "policy");
                  }}
                >
                  <option value="active">Active</option>
                  <option value="inActive">Inactive</option>
                  <option value="deny">Deny</option>
                </select>
                <button
                  className="button"
                  onClick={() => {
                    setInputUserLocations(
                      inputUserLocations.filter(
                        (u) => u.ipAddress !== d.ipAddress
                      )
                    );
                  }}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* -------------Browsers ------------- */}
        <section className="policies-box">
          <h2>Browsers</h2>
          <div className="policies-sub-box" style={{ fontWeight: "bold" }}>
            Always block
          </div>

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
          <h2>Authentication methods</h2>
          <div className="policies-sub-box" style={{ fontWeight: "bold" }}>
            Users will only be allowed to authenticate with 2FA ising the
            checked methods.
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
          <h2>OMPASS Mobile app</h2>

          <div className="policies-sub-box">
            <input
              name="mobile"
              value="active"
              type="radio"
              checked={inputMobileCheck === "active"}
              style={{ width: "15px" }}
              onChange={changeInputMobilecheck}
            />
            <label className="label-radio">
              Require up-to-date securitu patches for OMPASS Mobile.
            </label>
          </div>
          <div className="policies-sub-box">
            <input
              name="mobile"
              value="inActive"
              type="radio"
              checked={inputMobileCheck === "inActive"}
              style={{ width: "15px" }}
              onChange={changeInputMobilecheck}
            />
            <label className="label-radio">
              Don't require up-to-date security patches for OMPASS Mobile.
            </label>
            <p>Only applies to iOS AND Android.</p>
          </div>
        </section>
      </div>
    </Drawer>
  );
};

export default Global_Policy;

/*----------------Authorized networks ------------- */
/* <section className="policies-box authorized-networks">
  <h2>Authorized networks</h2>
  <div className="policies-sub-box">
    <h3>
      Specify networks using a comma-separated list of OP addresses, IP
      ranges, or CIDRs. These must be oublic IP addresses, and not local
      or pivate IP addresses.
  </h3>
    <h4>Your IP address is 61.81.118.201</h4>
    <h3>Allow access without 2FA from these networks:</h3>
    <div>
      <input className="userlocation-first" />
    </div>
    <div className="policies-sub-box no-left-box">
      <input
        name="status"
        value="Inactive"
        type="radio"
        style={{ width: "15px" }}
      />
      <label className="label-radio">
        Require enrollment from these networks.
    </label>
      <p>
        If checked, unenrolled users will be subhect to the new user
        policy, even if the login is from one of the IP addresses
        specified above.
    </p>
    </div>

    <h3>Require 2FA from these networks:</h3>
    <div>
      <input className="userlocation-first" />
    </div>
    <div className="policies-sub-box no-left-box">
      <input
        name="status"
        value="Inactive"
        type="radio"
        style={{ width: "15px" }}
      />
      <label className="label-radio">
        Deny access from all other networks.
    </label>
    </div>
  </div>
</section> */
