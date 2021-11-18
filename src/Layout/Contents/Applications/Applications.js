import React, { useEffect, useState } from "react";
import "./Applications.css";
import ContentsTitle from "../ContentsTitle";

import AppDetails from "./AppDetailsAdd";
import AppDetailsUpdate from "./AppDetailsUpdate";

import "antd/dist/antd.css";
import { Button, Space } from "antd";
import {
  UsergroupAddOutlined,
  UserSwitchOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { CustomAxiosGet } from "../../../Functions/CustomAxios";

const Applications = () => {
  const [applications, setApplications] = useState(true);
  const [applicationsAdd, setApplicationsAdd] = useState(false);
  const [applicationsUpdate, setApplicationsUpdate] = useState(false);

  useEffect(() => {
    CustomAxiosGet(
      `/v1/admins/${localStorage.getItem("adminId")}/applications`,
      (res) => {
        console.log(res.data);
      }
    );
  }, []);

  return (
    <>
      <ContentsTitle />
      <div className="ApplicationsBox">
        {applications === true ? (
          <div>
            <table>
              <tr>
                <th>Application</th>
                <th>Protection Type</th>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <td>1Password</td>
                <td>2FA</td>
                <td>
                  <a href="#">Documentation</a>
                </td>
                <td>
                  <button>Protect</button>
                </td>
              </tr>
              <tr>
                <td>1Password</td>
                <td>2FA</td>
                <td>
                  <a href="#">Documentation</a>
                </td>
                <td>
                  <button>Protect</button>
                </td>
              </tr>
              <tr>
                <td>1Password</td>
                <td>2FA</td>
                <td>
                  <a href="#">Documentation</a>
                </td>
                <td>
                  <button>Protect</button>
                </td>
              </tr>
            </table>
            <Space className="cud">
              <Button
                onClick={() => {
                  setApplications(false);
                  setApplicationsAdd(true);
                  setApplicationsUpdate(false);
                }}
              >
                <UsergroupAddOutlined />
                추가
              </Button>

              <Button
                onClick={() => {
                  setApplicationsUpdate(true);
                  setApplications(false);
                  setApplicationsAdd(false);
                }}
              >
                <UserSwitchOutlined />
                수정
              </Button>

              <Button>
                <UsergroupDeleteOutlined />
                삭제
              </Button>
            </Space>
          </div>
        ) : null}

        {applicationsUpdate === true ? (
          <AppDetailsUpdate
            setApplicationsUpdate={setApplicationsUpdate}
            setApplications={setApplications}
          />
        ) : null}
        {applicationsAdd === true ? (
          <AppDetails
            setApplicationsAdd={setApplicationsAdd}
            setApplications={setApplications}
          />
        ) : null}
      </div>
    </>
  );
};

export default Applications;
