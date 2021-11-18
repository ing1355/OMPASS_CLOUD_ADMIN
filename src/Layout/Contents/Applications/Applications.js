import React, { useEffect, useState } from "react";
import "./Applications.css";
import ContentsTitle from "../ContentsTitle";

import AppDetails from "./AppDetailsAdd";
import AppDetailsUpdate from "./AppDetailsUpdate";

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
  const [applicationsAdd, setApplicationsAdd] = useState(false);
  const [applicationsUpdate, setApplicationsUpdate] = useState(false);

  useEffect(() => {
    CustomAxiosGet(
      `/v1/admins/${localStorage.getItem("adminId")}/applications`,
      (res) => {
        console.log(res.data);
      }
    );
    CustomAxiosGet(
      getApplicationApi(localStorage.getItem("adminId")),
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
                <th>이름</th>
                <th>상태</th>
                <th>디테일</th>
                {/* <th></th> */}
              </tr>
              <tr>
                <td>유림</td>
                <td>ㅇㅁㅇ</td>
                <td>디테일</td>
                {/* <td>
                  <button>Protect</button>
                </td> */}
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
