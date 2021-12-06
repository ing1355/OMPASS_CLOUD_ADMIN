import React, { useEffect, useState } from "react";
import "./Applications.css";
import ContentsTitle from "../ContentsTitle";

import ApplicationAdd from "./AppDetailsAdd";

import { Button, message, Space } from "antd";
import {
  AppstoreAddOutlined,
  UserSwitchOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { CustomAxiosDelete, CustomAxiosGet } from "../../../Functions/CustomAxios";
import { deleteApplicationApi, getApplicationApi } from "../../../Constants/Api_Route";
import { Link, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import ApplicationDetail from "./ApplicationDetail";
import CustomTable from "../../../CustomComponents/CustomTable";
import { ApplicationsColumns } from "../../../Constants/TableColumns";
import { useIntl } from "react-intl";
import CustomConfirm from "../../../CustomComponents/CustomConfirm";

const Applications = ({ userProfile }) => {
  const { adminId } = userProfile;
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false)
  const { formatMessage } = useIntl();

  const tableDataAdd = (data) => {
    setTableData([data, ...tableData]);
  };

  const tableDatasDelete = (ids) => {
    setTableData(tableData.filter((d) => !ids.find(id => d.appId === id)));
    setSelectedRows([]);
  };

  const tableDataUpdate = (appId, data) => {
    setTableData(
      tableData.map((t) =>
        t.appId === appId * 1 ? { appId: t.appId, ...data } : t
      )
    );
    setSelectedRows([]);
  };

  useEffect(() => {
    CustomAxiosGet(
      getApplicationApi(userProfile.adminId),
      (data) => {
        setTableData(data.map(d => ({ ...d, detail: formatMessage({ id: 'detailColumn' }) })));
        setTableLoading(false);
      },
      () => {
        setTableLoading(false);
      }
    );
  }, []);

  const confirmCallback = () => {
    setConfirmLoading(true);
    CustomAxiosDelete(deleteApplicationApi(adminId, selectedRows.join(',')), (data) => {
      message.success("삭제되었습니다.");
      tableDatasDelete(selectedRows);
      setConfirmLoading(false);
      setConfirmVisible(false);
    }, () => {
      message.error('삭제 실패하였습니다.')
      setConfirmLoading(false);
    });
  }

  const closeConfirmModal = () => {
    setConfirmVisible(false);
  }

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
                <CustomTable
                  loading={tableLoading}
                  columns={ApplicationsColumns}
                  datas={tableData}
                  multipleSelectable={true}
                  selectedId={'appId'}
                  rowSelectable={true}
                  onChangeSelectedRows={rows => {
                    setSelectedRows(rows);
                  }} />
                <Space className="cud">
                  <Link to="/Applications/Add">
                    <Button>
                      <AppstoreAddOutlined />
                      등록
                    </Button>
                  </Link>
                  <Button disabled={selectedRows.length !== 1}>
                    <UserSwitchOutlined />
                    수정
                  </Button>
                  <Button disabled={selectedRows.length < 1} onClick={() => {
                    setConfirmVisible(true);
                  }}>
                    <UserDeleteOutlined />
                    삭제
                  </Button>
                </Space>
                <CustomConfirm visible={confirmVisible} okLoading={confirmLoading} confirmCallback={confirmCallback} cancelCallback={closeConfirmModal}>
                  정말로 삭제하시겠습니까?
                </CustomConfirm>
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
