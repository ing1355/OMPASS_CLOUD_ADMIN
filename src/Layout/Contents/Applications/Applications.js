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
import { Link, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import ApplicationDetail from "./ApplicationDetail";

const Applications = ({ userProfile }) => {
  const [applications, setApplications] = useState(true);
  const [applicationsAdd, setApplicationsAdd] = useState(false);
  const [applicationsUpdate, setApplicationsUpdate] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    CustomAxiosGet(
      getApplicationApi(userProfile.adminId),
      (data) => {
        setTableData(data);
        console.log(data);
      }
    );
  }, []);

  return (
    <>
      <ContentsTitle title="Applications Info" />
      <div className="ApplicationsBox">
        <Switch>
          <Route path="/Applications" exact render={routeInfo => <div>
            <table>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>상태</th>
                  <th>디테일</th>
                  {/* <th></th> */}
                </tr>
              </thead>
              <tbody>
                {
                  tableData.map((d, ind) => <tr key={ind}>
                    <td>{d.name}</td>
                    <td>{d.status}</td>
                    <td>
                      <Link to={`/Applications/Detail/${d.appId}`}>
                        <button>
                          Detail
                      </button>
                      </Link>
                    </td>
                  </tr>)
                }
              </tbody>
            </table>
            <Space className="cud">
              <Link to="/Applications/Add">
                <Button
                >
                  <UsergroupAddOutlined />
                추가
              </Button>
              </Link>

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
          </div>} />
          <Route path="/Applications/Add" exact component={AppDetails}/>
          <Route path="/Applications/Detail/:appId" component={ApplicationDetail}/>
        </Switch>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Applications);