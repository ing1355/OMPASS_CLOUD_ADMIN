import { message } from "antd";
import React, { useLayoutEffect, useState } from "react";
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

import "./Applications.css";

import { Button, Space, Popconfirm } from "antd";
import { UserSwitchOutlined, UserDeleteOutlined } from "@ant-design/icons";
import CustomButton from "../../../CustomComponents/CustomButton";

const columns = [
  { name: "User ID", key: "userId" },
  { name: "Action", key: "act" },
  { name: "Application Name", key: "appName" },
  { name: "Status", key: "status" },
  { name: "Time", key: "createdDate" },
];

const ApplicationDetail = ({
  userProfile,
  tableDataDelete,
  tableDataUpdate,
}) => {
  const history = useHistory();
  const { appId } = useParams();
  const { adminId } = userProfile;
  const [logsData, setLogsData] = useState([]);
  const [secretKey, setSecretKey] = useState("");
  const [integrationKey, setIntegrationKey] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputDomain, setInputDomain] = useState("");
  const [inputRedirectURI, setInputRedirectURI] = useState("");
  const [inputStatus, setInputStatus] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [isExistCheck, setIsExistCheck] = useState(true);

  useLayoutEffect(() => {
    CustomAxiosGet(getApplicationDetailApi(adminId, appId), (data) => {
      const { name, secretKey, domain, redirectUri, status, integrationKey } =
        data;
      setInputName(name);
      setInputDomain(domain);
      setInputRedirectURI(redirectUri);
      setInputStatus(status);
      setIntegrationKey(integrationKey);
      setSecretKey(secretKey);
    });
    // CustomAxiosGet(getApplicationDetailLogsApi(adminId, appId), (data) => {
    //   setLogsData(data);
    // });
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

  const applicationDelete = () => {
    CustomAxiosDelete(deleteApplicationApi(adminId, appId), (data) => {
      message.success("삭제되었습니다.");
      tableDataDelete(appId);
      history.push("/Applications");
    });
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
        message.success("변경되었습니다.");
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

  return (
    <>
      <div className="ApplicationsBox">
        <form className="ApplicationForm" onSubmit={onFinish}>
          <div className="Application-label-input-box">
            <label>Application Name</label>
            <input name="name" value={inputName} onChange={changeInputName} />
            <CustomButton
              className="selectButton"
              type="button"
              disabled={isExistCheck}
              onClick={existCheck}
            >
              중복 체크
            </CustomButton>
          </div>
          <div className="Application-label-input-box">
            <label>Secret Key</label>
            <input name="secretKey" value={secretKey} disabled />
            <CustomButton
              loading={resetLoading}
              type="button"
              className="button"
              onClick={resetSecretKey}
            >
              Reset Secret Key
            </CustomButton>
          </div>
          <div className="Application-label-input-box">
            <label>Domain</label>
            <input
              name="domain"
              value={inputDomain}
              onChange={changeInputDomain}
            />
          </div>
          <div className="Application-label-input-box">
            <label>Redirect URI</label>
            <input
              name="redirectUri"
              value={inputRedirectURI}
              onChange={changeInputRedirectURI}
            />
          </div>
          <div className="Application-label-input-box">
            <label>Status</label>
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
          <Space className="cud">
            <Button htmlType="submit">
              <UserSwitchOutlined />
              수정
            </Button>

            <Popconfirm
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
            </Popconfirm>
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
