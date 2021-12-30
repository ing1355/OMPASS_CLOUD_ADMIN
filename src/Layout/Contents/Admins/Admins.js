import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import "./Admins.css";
// import "../../Login/Login.css";
import ContentsTitle from "../ContentsTitle";
import AdminAdd from "./AdminAdd";
import AdminDetail from "./AdminDetail";
import {
  CustomAxiosGet,
  CustomAxiosPatch,
} from "../../../Functions/CustomAxios";
import { getAdminsApi, update2faApi } from "../../../Constants/Api_Route";
import { Link, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import CustomTable from "../../../CustomComponents/CustomTable";
import ActionCreators from "../../../redux/actions";
import PasswordConfirm from "../../../CustomComponents/PasswordConfirm";
import { AdminsColumns } from "../../../Constants/TableColumns";
import Breadcrumb from "../../../CustomComponents/Breadcrumb";
import { FormattedMessage, useIntl } from "react-intl";

const Admins = ({ userProfile, history, showSuccessMessage, showErrorMessage }) => {
  const { adminId, role } = userProfile;
  const { formatMessage } = useIntl();
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [detailData, setDetailData] = useState({});
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ompassToggle, setOmpassToggle] = useState(false);

  useLayoutEffect(() => {
    CustomAxiosGet(
      getAdminsApi(adminId),
      (data) => {
        setTableData(
          data.map((d, index) => ({
            ...d,
            name: d.firstName + " " + d.lastName,
            index,
          }))
        );
        setOmpassToggle(data[0].ompass);
        setTableLoading(false);
      },
      () => {
        setTableLoading(false);
      }
    );
  }, []);

  const clickToDetail = useCallback((rowData) => {
    setDetailData(rowData);
    history.push("/Admins/Detail");
  }, []);

  const updateAdmin = useCallback(
    (rowData) => {
      setTableData(
        tableData.map((t) =>
          t.email === rowData.email
            ? { ...rowData, name: rowData.firstName + " " + rowData.lastName }
            : t
        )
      );
      showSuccessMessage('ADMIN_UPDATE_SUCCESS')
    },
    [tableData]
  );

  const deleteAdmin = useCallback(
    (index) => {
      setTableData(tableData.filter((t) => t.index !== index * 1));
      showSuccessMessage('ADMIN_DELETE_SUCCESS')
    },
    [tableData]
  );

  const openConfirmModal = useCallback(() => {
    setConfirmVisible(true);
  }, []);

  const OMPASSToggle = useCallback(() => {
    setConfirmLoading(true);
    CustomAxiosPatch(
      update2faApi(adminId),
      {
        flag: !ompassToggle,
      },
      (data) => {
        setOmpassToggle(!ompassToggle);
        setConfirmVisible(false);
        setConfirmLoading(false);
      },
      () => {
        setConfirmLoading(false);
      }
    );
  }, [ompassToggle]);

  return (
    <div className="contents-container">
      <Breadcrumb />
      <ContentsTitle title="Admins" />
      <Switch>
        <Route
          path="/Admins"
          exact
          render={() => (
            <div className="AdminBox">
              <div>
                <div className="adminAdd">
                  <Link to="/Admins/Add">
                    <button
                      className="button admin-button"
                      disabled={tableLoading}
                    >
                      <FormattedMessage id="ADMINREGISTER" />
                    </button>
                  </Link>
                  {role === "ADMIN" && (
                    <button
                      className="button two-Auth-button admin-button"
                      disabled={tableLoading}
                      onClick={openConfirmModal}
                    >
                      {ompassToggle
                        ? formatMessage({ id: "SECONDAUTHENTICATIONINACTIVE" })
                        : formatMessage({ id: "SECONDAUTHENTICATIONACTIVE" })}
                    </button>
                  )}
                </div>
                <CustomTable
                  columns={AdminsColumns}
                  datas={tableData}
                  loading={tableLoading}
                  rowClick={clickToDetail}
                />
              </div>
              <PasswordConfirm
                visible={confirmVisible}
                setVisible={setConfirmVisible}
                loading={confirmLoading}
                setLoading={setConfirmLoading}
                callback={OMPASSToggle}
              />
            </div>
          )}
        />
        <Route path="/Admins/Add" component={AdminAdd} />
        <Route
          path="/Admins/Detail"
          render={() => (
            <AdminDetail
              data={detailData}
              updateEvent={updateAdmin}
              deleteEvent={deleteAdmin}
            />
          )}
        />
      </Switch>
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

export default connect(mapStateToProps, mapDispatchToProps)(Admins);
