import React, { useEffect, useState } from "react";
import "./Applications.css";
import ContentsTitle from "../ContentsTitle";

import ApplicationAdd from "./AppDetailsAdd";

import { Button, Space } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { CustomAxiosGet } from "../../../Functions/CustomAxios";
import { getApplicationApi } from "../../../Constants/Api_Route";
import { Link, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import ApplicationDetail from "./ApplicationDetail";
import CustomTable from "../../../CustomComponents/CustomTable";

const makeDetail = (d) => (
  <Link to={`/Applications/Detail/${d.appId}`}>
    <button className="button">Detail</button>
  </Link>
);

const columns = [
  { name: "이름", key: "name" },
  { name: "상태", key: "status" },
  { name: "디테일", key: "detail", render: makeDetail },
];

const Applications = ({ userProfile }) => {
  const [tableData, setTableData] = useState([]);

  const tableDataAdd = (data) => {
    setTableData([data, ...tableData]);
  };

  const tableDataDelete = (id) => {
    setTableData(tableData.filter((d) => d.appId !== id * 1));
  };

  const tableDataUpdate = (appId, data) => {
    setTableData(
      tableData.map((t) =>
        t.appId === appId * 1 ? {appId: t.appId, ...data} : t
      )
    );
  };

  useEffect(() => {
    CustomAxiosGet(getApplicationApi(userProfile.adminId), (data) => {
      setTableData(data);
    });
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
                <CustomTable columns={columns} datas={tableData} />
                <Space className="cud">
                  <Link to="/Applications/Add">
                    <Button>
                      <UsergroupAddOutlined />
                      추가
                    </Button>
                  </Link>
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
