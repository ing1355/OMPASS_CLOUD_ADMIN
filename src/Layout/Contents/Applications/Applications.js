import React, { useEffect, useState } from "react";
import "./Applications.css";
import ContentsTitle from "../ContentsTitle";

import AppDetails from "./AppDetails";
import { Button, Space } from "antd";
import {
  UsergroupAddOutlined,
  UserSwitchOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { CustomAxiosGet } from "../../../Functions/CustomAxios";
import { getApplicationApi } from "../../../Constants/Api_Route";

const Applications = () => {
  const [applications, setApplications] = useState(true);

  useEffect(() => {
    CustomAxiosGet(getApplicationApi(localStorage.getItem('adminId')),(res) => {
      console.log(res.data);
    })
  },[])

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
                  <a href="#!">Documentation</a>
                </td>
                <td>
                  <button>Protect</button>
                </td>
              </tr>
              <tr>
                <td>1Password</td>
                <td>2FA</td>
                <td>
                  <a href="#!">Documentation</a>
                </td>
                <td>
                  <button>Protect</button>
                </td>
              </tr>
              <tr>
                <td>1Password</td>
                <td>2FA</td>
                <td>
                  <a href="#!">Documentation</a>
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
                }}
              >
                <UsergroupAddOutlined />
                추가
              </Button>

              <Button
                onClick={() => {
                  setApplications(false);
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
        ) : (
          <AppDetails setApplications={setApplications} />
        )}
      </div>
    </>
  );
};

export default Applications;
