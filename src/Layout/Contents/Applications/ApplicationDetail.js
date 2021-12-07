import { message } from "antd";
import React, { useLayoutEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import {
  checkApplicationExistenceApi,
  deleteApplicationApi,
  getApplicationDetailApi,
  getNewSecretKeyApi,
  updateApplicationApi,
} from "../../../Constants/Api_Route";
import {
  CustomAxiosGet,
  CustomAxiosPatch,
  CustomAxiosPut,
  CustomAxiosDelete,
} from "../../../Functions/CustomAxios";

import { CopyOutlined } from "@ant-design/icons";

import "./Applications.css";

import { Button, Space, Popconfirm } from "antd";
import { UserSwitchOutlined, UserDeleteOutlined } from "@ant-design/icons";
import CustomButton from "../../../CustomComponents/CustomButton";
import {
  doaminTest,
  FailToTest,
  nameTest,
} from "../../../Constants/InputRules";

const columns = [
  { name: "User ID", key: "userId" },
  { name: "Action", key: "act" },
  { name: "Application Name", key: "appName" },
  { name: "Status", key: "status" },
  { name: "Time", key: "createdDate" },
];

const ApplicationDetail = ({ userProfile, tableDataUpdate }) => {
  const history = useHistory();
  const { appId } = useParams();
  const { adminId } = userProfile;
  const [secretKey, setSecretKey] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputDomain, setInputDomain] = useState("");
  const [inputRedirectURI, setInputRedirectURI] = useState("");
  const [inputStatus, setInputStatus] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [isExistCheck, setIsExistCheck] = useState(true);
  const secretKeyRef = useRef(null);

  useLayoutEffect(() => {
    CustomAxiosGet(getApplicationDetailApi(adminId, appId), (data) => {
      const { name, secretKey, domain, redirectUri, status, integrationKey } =
        data;
      setInputName(name);
      setInputDomain(domain);
      setInputRedirectURI(redirectUri);
      setInputStatus(status);
      setSecretKey(secretKey);
    });
  }, []);

  const resetSecretKey = () => {
    setResetLoading(true);
    CustomAxiosPatch(
      getNewSecretKeyApi(adminId, appId),
      null,
      (data) => {
        setSecretKey(data.secretKey);
        setResetLoading(false);
      },
      () => {
        setResetLoading(false);
      }
    );
  };

  const changeInputName = (e) => {
    setInputName(e.target.value);
    if (isExistCheck) setIsExistCheck(false);
  };

  const changeInputDomain = (e) => {
    setInputDomain(e.target.value);
  };

  const changeInputRedirectURI = (e) => {
    setInputRedirectURI(e.target.value);
  };

  const changeInputStatus = (e) => {
    setInputStatus(e.target.value);
  };

  const existCheck = () => {
    if (!inputName) return message.error("이름을 입력해주세요.");
    CustomAxiosGet(checkApplicationExistenceApi(adminId, inputName), (data) => {
      const { duplicate } = data;
      if (duplicate) {
        message.error("이미 존재하는 이름입니다.");
      } else {
        message.success("사용 가능한 이름입니다.");
        setIsExistCheck(true);
      }
    });
  };

  const onFinish = (e) => {
    e.preventDefault();
    const { name, domain, redirectUri, status } = e.target.elements;
    if (!name.value.length) {
      return FailToTest(name, "어플리케이션명을 입력해주세요.");
    }
    if (!nameTest(name.value)) {
      return FailToTest(name, "어플리케이션명의 형식이 잘못되었습니다.");
    }
    if (!domain.value.length) {
      return FailToTest(domain, "도메인을 입력해주세요.");
    }
    if (!doaminTest(domain.value)) {
      return FailToTest(domain, "도메인 형식이 잘못되었습니다.");
    }
    if (!redirectUri.value.length) {
      return FailToTest(redirectUri, "리다이렉트 URI를 입력해주세요.");
    }
    if (!doaminTest(redirectUri.value)) {
      return FailToTest(redirectUri, "리다이렉트 URI 형식이 잘못되었습니다.");
    }
    CustomAxiosPut(
      updateApplicationApi(adminId, appId),
      {
        name: name.value,
        domain: domain.value,
        redirectUri: redirectUri.value,
        status: inputStatus,
        policyId: 0,
      },
      (data) => {
        message.success("수정되었습니다.");
        tableDataUpdate(appId, {
          name: name.value,
          domain: domain.value,
          redirectUri: redirectUri.value,
          status: inputStatus,
        });
        history.push("/Applications");
      }
    );
  };

  const copySecretKey = (e) => {
    e.preventDefault();
    secretKeyRef.current.select();
    document.execCommand("copy");
    message.success("클립보드에 복사하였습니다.");
    secretKeyRef.current.setSelectionRange(0, 0);
  };

  return (
    <>
      <div className="ApplicationsBox">
        <form className="ApplicationForm" onSubmit={onFinish}>
          <div className="Application-label-input-box">
            <label>어플리케이션</label>
            <input
              name="name"
              value={inputName}
              onChange={changeInputName}
              maxLength={20}
            />
            <CustomButton
              className="selectButton button"
              type="button"
              disabled={isExistCheck}
              onClick={existCheck}
            >
              중복 체크
            </CustomButton>
          </div>
          <div className="Application-label-input-box">
            <label>비밀 키</label>
            <div className="secretKey-container">
              <input
                name="secretKey"
                value={secretKey}
                readOnly
                ref={secretKeyRef}
              />
              <div className="copyButton-container">
                <button className="copyButton" onClick={copySecretKey}>
                  <CopyOutlined /> Copy
                </button>
              </div>
            </div>
            <CustomButton
              loading={resetLoading}
              type="button"
              className="button"
              onClick={resetSecretKey}
            >
              비밀 키 재설정
            </CustomButton>
          </div>
          <div className="Application-label-input-box">
            <label>도메인</label>
            <input
              name="domain"
              value={inputDomain}
              onChange={changeInputDomain}
            />
          </div>
          <div className="Application-label-input-box">
            <label>리다이렉트 URL</label>
            <input
              name="redirectUri"
              value={inputRedirectURI}
              onChange={changeInputRedirectURI}
            />
          </div>
          <div className="Application-label-input-box">
            <label>상태</label>
            <input
              name="status"
              value="Active"
              onChange={changeInputStatus}
              type="radio"
              style={{ width: "15px" }}
              checked={inputStatus === "Active"}
            />
            <label className="label-radio">Active</label>
            <input
              name="status"
              value="Inactive"
              onChange={changeInputStatus}
              type="radio"
              style={{ width: "15px" }}
              checked={inputStatus === "Inactive"}
            />
            <label className="label-radio">Inactive</label>
          </div>
          <div className="Application-label-input-box">
            <label>정책 설정</label>
            <select name="order">
              <option selected disabled></option>
              <option value="1">없음</option>
              <option value="2">ddddddddd</option>
            </select>
          </div>
          <Space className="cud">
            <Button htmlType="submit">
              <UserSwitchOutlined />
              수정
            </Button>

            {/* <Popconfirm
              placement="top"
              title={"삭제하시겠습니까"}
              okText="Yes"
              cancelText="No"
              onConfirm={applicationDelete}
            >
              <Button htmlType="button">
                <UserDeleteOutlined />
                삭제
              </Button>
            </Popconfirm> */}
          </Space>
        </form>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationDetail);
