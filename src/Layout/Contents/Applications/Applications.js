import React, { useCallback, useLayoutEffect, useState } from "react";
import "./Applications.css";
import ContentsTitle from "../ContentsTitle";
import Breadcrumb from "../../../CustomComponents/Breadcrumb";
import ApplicationAdd from "./AppDetailsAdd";
import LinkDocument from "../../../CustomComponents/LinkDocument";

import { Button, Space } from "antd";
import {
  AppstoreAddOutlined,
  UserSwitchOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import {
  CustomAxiosDelete,
  CustomAxiosGet,
} from "../../../Functions/CustomAxios";
import {
  deleteApplicationApi,
  getApplicationApi,
  getCustomPoliciesApi,
  getGlobalPolicyApi,
} from "../../../Constants/Api_Route";
import { Link, Routes, Route } from "react-router-dom";
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
  locale,
}) => {
  const { adminId } = userProfile;
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [customPolicies, setCustomPolicies] = useState([]);
  const [globalPolicy, setGlobalPolicy] = useState(null);
  const { formatMessage } = useIntl();

  const tableDataAdd = useCallback(
    (data) => {
      setTableData([
        {
          ...data,
          policy:
            data.policyId === globalPolicy.policyId
              ? formatMessage({ id: "DEFAULTPOLICY" })
              : customPolicies.find((c) => c.policyId === data.policyId).title,
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
                policy:
                  data.policyId === globalPolicy.policyId
                    ? "!DEFAULTPOLICY!"
                    : customPolicies.find((c) => c.policyId === data.policyId)
                        .title,
              }
            : t
        )
      );
    },
    [tableData, customPolicies]
  );

  useLayoutEffect(() => {
    CustomAxiosGet(
      getGlobalPolicyApi(adminId),
      (globalPolicyData) => {
        setGlobalPolicy(globalPolicyData);
        CustomAxiosGet(
          getCustomPoliciesApi(adminId),
          (customPoliciesData) => {
            setCustomPolicies(customPoliciesData);
            CustomAxiosGet(
              getApplicationApi(adminId),
              (applicationData) => {
                setTableData(
                  applicationData.map((d) => {
                    return {
                      ...d,
                      policy:
                        d.policyId === globalPolicyData.policyId
                          ? "!DEFAULTPOLICY!"
                          : customPoliciesData.find(
                              (c) => d.policyId === c.policyId
                            ).title,
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
      <LinkDocument link="/document/application" />
      <ContentsTitle title="Applications" />
      <div className="ApplicationsBox">
        <Routes>
          <Route
            path="/"
            element={<div>
                <CustomTable
                  loading={tableLoading}
                  columns={ApplicationsColumns}
                  datas={tableData}
                  multipleSelectable={true}
                  searched
                  pagination
                  numPerPage={10}
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
              </div>}
          />
          <Route
            path="/Add"
            element={<ApplicationAdd
                tableDataAdd={tableDataAdd}
                globalPolicy={globalPolicy}
                customPolicies={customPolicies}/>}
          />
          <Route
            path="/Detail/:appId"
            element={<ApplicationDetail
                tableDataUpdate={tableDataUpdate}
                globalPolicy={globalPolicy}
                customPolicies={customPolicies}/>}
          />
        </Routes>
        <br /> <br />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
    lang: state.locale,
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
