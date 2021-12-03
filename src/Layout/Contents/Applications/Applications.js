import React, { useEffect, useState } from "react";
import "./Applications.css";
import ContentsTitle from "../ContentsTitle";

import ApplicationAdd from "./AppDetailsAdd";

import { Button, Space } from "antd";
import {
  AppstoreAddOutlined,
  UserSwitchOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { CustomAxiosGet } from "../../../Functions/CustomAxios";
import { getApplicationApi } from "../../../Constants/Api_Route";
import { Link, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import ApplicationDetail from "./ApplicationDetail";
import CustomTable from "../../../CustomComponents/CustomTable";
import { ApplicationsColumns } from "../../../Constants/TableColumns";

const Applications = ({ userProfile }) => {
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);

  const tableDataAdd = (data) => {
    setTableData([data, ...tableData]);
  };

  const tableDataDelete = (id) => {
    setTableData(tableData.filter((d) => d.appId !== id * 1));
  };

  const tableDataUpdate = (appId, data) => {
    setTableData(
      tableData.map((t) =>
        t.appId === appId * 1 ? { appId: t.appId, ...data } : t
      )
    );
  };

  useEffect(() => {
    CustomAxiosGet(
      getApplicationApi(userProfile.adminId),
      (data) => {
        setTableData(data);
        setTableLoading(false);
      },
      () => {
        setTableLoading(false);
      }
    );
  }, []);

  return (
    <div className="contents-container">
      <ContentsTitle title="Applications Info" />
      <div className="ApplicationsBox">
        <Switch>
          <Route
            path="/Applications"
            exact
            render={(routeInfo) => (
              <div>
                <CustomTable columns={ApplicationsColumns} datas={tableData} />
                <Space className="cud">
                  <Link to="/Applications/Add">
                    <Button>
                      <AppstoreAddOutlined />
                      추가
                    </Button>
                  </Link>
                  <Button>
                    <UserSwitchOutlined />
                    수정
                  </Button>
                  <Button>
                    <UserDeleteOutlined />
                    삭제
                  </Button>
                </Space>
              </div>
            )}
          />
          <Route
            path="/Applications/Add"
            exact
            render={() => <ApplicationAdd tableDataAdd={tableDataAdd} />}
          />
          <Route
            path="/Applications/Detail/:appId"
            render={() => (
              <ApplicationDetail
                tableDataUpdate={tableDataUpdate}
                tableDataDelete={tableDataDelete}
              />
            )}
          />
        </Switch>
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Applications);
