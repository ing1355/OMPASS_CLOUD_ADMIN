import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import "./Applications.css";
import ContentsTitle from "../ContentsTitle";
import Breadcrumb from "../../../CustomComponents/Breadcrumb";
import ApplicationAdd from "./AppDetailsAdd";

import { Button, message, Space } from "antd";
import {
  AppstoreAddOutlined,
  UserSwitchOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import {
  CustomAxiosDelete,
  CustomAxiosGet,
  CustomAxiosGetAll,
} from "../../../Functions/CustomAxios";
import {
  deleteApplicationApi,
  getApplicationApi,
  getCustomPoliciesApi,
} from "../../../Constants/Api_Route";
import { Link, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import ApplicationDetail from "./ApplicationDetail";
import CustomTable from "../../../CustomComponents/CustomTable";
import { ApplicationsColumns } from "../../../Constants/TableColumns";
import { FormattedMessage, useIntl } from "react-intl";
import CustomConfirm from "../../../CustomComponents/CustomConfirm";
import ActionCreators from "../../../redux/actions";

const Applications = ({
  userProfile,
  showSuccessMessage,
  showErrorMessage,
}) => {
  const { adminId } = userProfile;
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [customPolicies, setCustomPolicies] = useState([]);
  const { formatMessage } = useIntl();

  const tableDataAdd = useCallback(
    (data) => {
      const _p = customPolicies.find((cP) => data.policyId === cP.policyId);
      setTableData([
        {
          ...data,
          policy: _p ? _p.title : formatMessage({ id: "DEFAULTPOLICY" }),
        },
        ...tableData,
      ]);
    },
    [customPolicies, tableData]
  );

  const tableDatasDelete = useCallback(
    (ids) => {
      setTableData(tableData.filter((d) => !ids.find((id) => d.appId === id)));
    },
    [tableData]
  );

  const tableDataUpdate = useCallback(
    (appId, data) => {
      setTableData(
        tableData.map((t) =>
          t.appId === appId * 1
            ? {
                appId: t.appId,
                ...data,
                policy: data.policyId
                  ? customPolicies.find((c) => c.policyId === data.policyId)
                      .title
                  : formatMessage({ id: "DEFAULTPOLICY" }),
              }
            : t
        )
      );
    },
    [tableData, customPolicies]
  );

  useLayoutEffect(() => {
    CustomAxiosGet(
      getCustomPoliciesApi(adminId),
      (customPoliciesData) => {
        setCustomPolicies(customPoliciesData);
        CustomAxiosGet(
          getApplicationApi(adminId),
          (applicationData) => {
            setTableData(
              applicationData.map((d) => {
                const _p = customPoliciesData.find(
                  (cP) => d.policyId === cP.policyId
                );
                return {
                  ...d,
                  policy: _p
                    ? _p.title
                    : formatMessage({ id: "DEFAULTPOLICY" }),
                };
              })
            );
            setTableLoading(false);
          },
          () => {
            setTableLoading(false);
          }
        );
      },
      () => {
        setTableLoading(false);
      }
    );
  }, []);

  const confirmCallback = () => {
    if (
      selectedRows.find(
        (rowId) => tableData.find((tD) => tD.appId === rowId).cloud
      )
    ) {
      setConfirmVisible(false);
      return showErrorMessage("CANT_DELETE_ADMIN_APPLICATION");
    }
    setConfirmLoading(true);
    CustomAxiosDelete(
      deleteApplicationApi(adminId, selectedRows.join(",")),
      (data) => {
        showSuccessMessage("DELETE_SUCCESS");
        tableDatasDelete(selectedRows);
        setConfirmLoading(false);
        setConfirmVisible(false);
      },
      () => {
        showErrorMessage("DELETE_FAIL");
        setConfirmLoading(false);
      }
    );
  };

  const openConfirmModal = useCallback(() => {
    setConfirmVisible(true);
  }, []);

  const closeConfirmModal = useCallback(() => {
    setConfirmVisible(false);
  }, []);

  const changeSelectedRows = useCallback((rows) => {
    setSelectedRows(rows);
  }, []);

  return (
    <div className="contents-container">
      <Breadcrumb />
      <ContentsTitle title={formatMessage({ id: "Applications" })} />
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
                  searched
                  selectedId={"appId"}
                  rowSelectable={true}
                  selectedRows={selectedRows}
                  onChangeSelectedRows={changeSelectedRows}
                />
                <Space className="cud">
                  <Link to="/Applications/Add">
                    <Button disabled={selectedRows.length !== 0}>
                      <AppstoreAddOutlined />
                      &nbsp;
                      <FormattedMessage id="REGISTER" />
                    </Button>
                  </Link>
                  <Link to={`/Applications/Detail/${selectedRows[0]}`}>
                    <Button disabled={selectedRows.length !== 1}>
                      <UserSwitchOutlined />
                      &nbsp;
                      <FormattedMessage id="UPDATE" />
                    </Button>
                  </Link>
                  <Button
                    disabled={selectedRows.length < 1}
                    onClick={openConfirmModal}
                  >
                    <UserDeleteOutlined />
                    &nbsp;
                    <FormattedMessage id="DELETE" />
                  </Button>
                </Space>
                <CustomConfirm
                  visible={confirmVisible}
                  okLoading={confirmLoading}
                  confirmCallback={confirmCallback}
                  cancelCallback={closeConfirmModal}
                >
                  <FormattedMessage id="DELETECONFIRM" />
                </CustomConfirm>
              </div>
            )}
          />
          <Route
            path="/Applications/Add"
            exact
            render={() => (
              <ApplicationAdd
                tableDataAdd={tableDataAdd}
                policies={customPolicies}
              />
            )}
          />
          <Route
            path="/Applications/Detail/:appId"
            render={() => (
              <ApplicationDetail
                tableDataUpdate={tableDataUpdate}
                policies={customPolicies}
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
  return {
    showSuccessMessage: (id) => {
      dispatch(ActionCreators.showSuccessMessage(id));
    },
    showErrorMessage: (id) => {
      dispatch(ActionCreators.showErrorMessage(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Applications);
