import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import "./Global_Policy.css";

import CustomButton from "../../../CustomComponents/CustomButton";
import { UndoOutlined } from "@ant-design/icons";
import { Drawer, message, Space } from "antd";
import { ipAddressTest } from "../../../Constants/InputRules";

const userLocationsMockData = [
  { ipAddress: '192.168.182.42', policy: 'active', },
  { ipAddress: '192.168.182.32', policy: 'inActive', },
  { ipAddress: '192.168.182.22', policy: 'deny', }
];

const BrowsersList = [
  'Chrome',
  'Chrome Mobile',
  'Edge',
  'Firefox',
  'Mobile Safari',
  'Safari',
  'All other browsers'
]

const AuthMethodsList = [
  'OMPASS Push',
  'OMPASS Mobile passcodes',
  'SMS passcodes',
  'Security keys (U2F)',
  'WebAuthn',
  'Hardware tokens'
]

const Global_Policy = ({ visible, setVisible, isCustomPolicy, saveCallback }) => {
  const [inputTitle, setInputTitle] = useState(null);
  const [inputAuthCheck, setInputAuthCheck] = useState(null);
  const [inputUserLocations, setInputUserLocations] = useState(userLocationsMockData);
  const [inputBrowserCheck, setInputBrowserCheck] = useState([]);
  const [inputAuthMethodCheck, setInputAuthMethodCheck] = useState([]);
  const [inputMobileCheck, setInputMobileCheck] = useState(null);

  const _saveCallback = useCallback(() => {
    if(isCustomPolicy) {
      if(!inputTitle) return message.error('제목을 입력해주세요.')
    }
    const result = {};
    if(inputTitle) result.title = inputTitle;
    if(inputAuthCheck) result.authentication = inputAuthCheck;
    if(inputUserLocations.length) result.userLocation = inputUserLocations;
    if(inputBrowserCheck.length) result.browsers = inputBrowserCheck;
    if(inputAuthMethodCheck.length) result.authenticationMethods = inputAuthMethodCheck;
    if(inputMobileCheck) result.mobilePatch = inputMobileCheck
    if (saveCallback) saveCallback();
  }, [saveCallback, inputTitle, inputAuthCheck, inputUserLocations, inputBrowserCheck, inputAuthMethodCheck, inputMobileCheck])

  const changeInputTitle = useCallback((e) => {
    setInputTitle(e.target.value);
  }, [])

  const changeInputAuthCheck = useCallback((e) => {
    setInputAuthCheck(e.target.value)
  }, [])

  const changeInputUserLocation = useCallback((value, index, type) => {
    if (type === 'policy') {
      setInputUserLocations(inputUserLocations.map((ul, _index) => index === _index ? ({ ...ul, 'policy': value }) : ul))
    } else {
      setInputUserLocations(inputUserLocations.map((ul, _index) => index === _index ? ({ ...ul, 'ipAddress': value }) : ul))
    }
  }, [inputUserLocations])

  const changeInputBrowserCheck = useCallback((value) => {
    if(inputBrowserCheck.includes(value)) {
      setInputBrowserCheck(inputBrowserCheck.filter(b => b !== value))
    } else {
      setInputBrowserCheck([...inputBrowserCheck, value])
    }
  }, [inputBrowserCheck])

  const changeInputAuthMethodCheck = useCallback((value) => {
    if(inputAuthMethodCheck.includes(value)) {
      setInputAuthMethodCheck(inputAuthMethodCheck.filter(m => m !== value))
    } else {
      setInputAuthMethodCheck([...inputAuthMethodCheck, value])
    }
  }, [inputAuthMethodCheck])

  const changeInputMobilecheck = useCallback((e) => {
    setInputMobileCheck(e.target.value)
  }, [])

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
          <div>Edit {isCustomPolicy ? 'Custom' : 'Global'} Policy</div>
          <Space>
            <button className="button" onClick={_saveCallback}>저장</button>
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
      <div className="Global_Policy-box">
        <CustomButton className="policy-default-button" type="button">
          <UndoOutlined /> 기본값으로 변경
        </CustomButton>

        {/* -------------타이틀 ------------- */}
        {isCustomPolicy && <section className="policies-box">
          <h2>Title</h2>
          {/* <p>FKDSNGMDSMVMVLOD~!~!#@!$#wfdsFDML</p> */}
          <div>
            <input className="userlocation-first" onChange={changeInputTitle} />
          </div>
        </section>}

        {/* -------------Authentication policy ------------- */}
        <section className="policies-box">
          <h2>Authentication policy</h2>
          <div className="policies-sub-box">
            <input
              name="status"
              value="active"
              type="radio"
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
              OMPASS will do a country lookup on the host IP address and can apply
              actions based on the country.
          </h3>
            {inputUserLocations.map((d, ind) => <div key={ind}>
              <input maxLength={15} className="userlocation-first" value={d.ipAddress} onChange={e => {
                changeInputUserLocation(e.target.value, ind, 'ipAddress')
              }} />
              <select name="order" value={d.policy} onChange={e => {
                changeInputUserLocation(e.target.value, ind, 'policy')
              }}>
                <option value="active">Active</option>
                <option value="inActive">Inactive</option>
                <option value="deny">Deny</option>
              </select>
            </div>)}
          </div>
        </section>

        {/* -------------Browsers ------------- */}
        <section className="policies-box">
          <h2>Browsers</h2>
          <div className="policies-sub-box" style={{ fontWeight: "bold" }}>
            Always block
        </div>

          {
            BrowsersList.map((bl,ind) => <div className="policies-sub-box" key={ind}>
              <input
                name="browser"
                value={inputBrowserCheck.includes(bl)}
                type="checkbox"
                style={{ width: "15px" }}
                onChange={() => {changeInputBrowserCheck(bl)}}
              />
              <label className="label-radio">{bl}</label>
            </div>)
          }
        </section>


        {/*----------------Authentication methods ------------- */}
        <section className="policies-box">
          <h2>Authentication methods</h2>
          <div className="policies-sub-box" style={{ fontWeight: "bold" }}>
            Users will only be allowed to authenticate with 2FA ising the checked
            methods.
        </div>

          {
            AuthMethodsList.map((am,ind) => <div className="policies-sub-box" key={ind}>
              <input
                name="method"
                value={am}
                type="checkbox"
                style={{ width: "15px" }}
                onChange={() => {changeInputAuthMethodCheck(am)}}
              />
              <label className="label-radio">{am}</label>
            </div>)
          }
        </section>

        {/* -------------OMPASS Mobile app ------------- */}
        <section className="policies-box">
          <h2>OMPASS Mobile app</h2>

          <div className="policies-sub-box">
            <input
              name="mobile"
              value="active"
              type="radio"
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
}

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