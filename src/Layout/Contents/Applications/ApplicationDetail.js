import { message } from "antd";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import {
  checkApplicationExistenceApi,
  deleteApplicationApi,
  getApplicationDetailApi,
  getApplicationDetailLogsApi,
  getNewSecretKeyApi,
  updateApplicationApi,
} from "../../../Constants/Api_Route";
import CustomTable from "../../../Constants/CustomTable";
import {
  CustomAxiosGet,
  CustomAxiosPatch,
  CustomAxiosPut,
  CustomAxiosDelete,
} from "../../../Functions/CustomAxios";

import { Button, Space } from "antd";
import { UserSwitchOutlined, UserDeleteOutlined } from "@ant-design/icons";

const columns = [
  { name: "User ID", key: "userId" },
  { name: "Action", key: "act" },
  { name: "Application Name", key: "appName" },
  { name: "Status", key: "status" },
  { name: "Time", key: "createdDate" },
];

const ApplicationDetail = ({ userProfile, tableDataDelete, tableDataUpdate }) => {
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
    CustomAxiosPatch(getNewSecretKeyApi(adminId, appId), null, (data) => {
      setSecretKey(data.secretKey);
    });
  };

  const applicationDelete = () => {
    CustomAxiosDelete(deleteApplicationApi(adminId, appId), (data) => {
      message.success('삭제되었습니다.')
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

  const onFinish = e => {
    e.preventDefault();
    const { name, domain, redirectUri, status } = e.target.elements;
    CustomAxiosPut(
      updateApplicationApi(adminId, appId),
      {
        name: name.value,
        domain: domain.value,
        redirectUri: redirectUri.value,
        status: status.value,
        policyId: 0,
      },
      (data) => {
        message.success('변경되었습니다.')
        tableDataUpdate(appId, name.value, status.value);
        history.push('/Applications')
      }
    );
  }

  return (
    <>
      <form
        className="ApplicationForm"
        onSubmit={onFinish}
      >
        <div className="ApplicationBox">
          <label>Application Name</label>
          <input name="name" value={inputName} onChange={changeInputName} />
          <button
            className="selectButon"
            type="button"
            disabled={isExistCheck}
            onClick={existCheck}
          >
            중복 체크
          </button>
        </div>
        {/* <div className="ApplicationBox">
          <label>Client Key</label>
          <input name="integrationKey" value={integrationKey} disabled />
        </div> */}
        <div className="ApplicationBox">
          <label>Secret Key</label>
          <input name="secretKey" value={secretKey} disabled />
          <button type="button" onClick={resetSecretKey}>
            Reset Secret Key
          </button>
        </div>
        <div className="ApplicationBox">
          <label>Domain</label>
          <input
            name="domain"
            value={inputDomain}
            onChange={changeInputDomain}
          />
        </div>
        <div className="ApplicationBox">
          <label>Redirect URI</label>
          <input
            name="redirectUri"
            // disabled
            value={inputRedirectURI}
            onChange={changeInputRedirectURI}
          />
        </div>
        <div className="ApplicationBox">
          <label>Status</label>
          <input
            // disabled
            name="status"
            value={inputStatus}
            onChange={changeInputStatus}
          />
        </div>
        <Space className="cud">
          <Button htmlType="submit">
            <UserSwitchOutlined />
            수정
          </Button>
          <Button htmlType="button" onClick={applicationDelete}>
            <UserDeleteOutlined />
            삭제
          </Button>
        </Space>
      </form>
      {/* <CustomTable columns={columns} datas={logsData} /> */}
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
