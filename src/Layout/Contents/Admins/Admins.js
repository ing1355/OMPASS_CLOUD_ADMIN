import React, { useCallback, useLayoutEffect, useState, lazy } from "react";
import "./Admins.css";
import ContentsTitle from "../ContentsTitle";
import {
  CustomAxiosGet,
  CustomAxiosPatch,
} from "../../../Functions/CustomAxios";
import { getAdminsApi, update2faApi } from "../../../Constants/Api_Route";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import CustomTable from "../../../CustomComponents/CustomTable";
import ActionCreators from "../../../redux/actions";
import PasswordConfirm from "../../../CustomComponents/PasswordConfirm";
import { AdminsColumns } from "../../../Constants/TableColumns";
import Breadcrumb from "../../../CustomComponents/Breadcrumb";
import { FormattedMessage } from "react-intl";
import LinkDocument from "../../../CustomComponents/LinkDocument";

const AdminAdd = lazy(() => import('./AdminAdd'))
const AdminDetail = lazy(() => import('./AdminDetail'))

const Admins = ({ userProfile, showSuccessMessage }) => {
  const { adminId } = userProfile;
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [detailData, setDetailData] = useState({});
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if(adminId) {
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
          setTableLoading(false);
        },
        () => {
          setTableLoading(false);
        }
      );
    }
  }, [adminId]);

  const clickToDetail = useCallback((rowData) => {
    setDetailData(rowData);
    navigate("/Admins/Detail");
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
      showSuccessMessage("ADMIN_UPDATE_SUCCESS");
    },
    [tableData, showSuccessMessage]
  );

  const deleteAdmin = useCallback(
    (index) => {
      setTableData(tableData.filter((t) => t.index !== index * 1));
      showSuccessMessage("ADMIN_DELETE_SUCCESS");
    },
    [tableData, showSuccessMessage]
  );

  return (
    <div className="contents-container">
      <Breadcrumb />
      <LinkDocument link="/document/admin" />
      <ContentsTitle title="Admins" />
      <Routes>
        <Route
          path="/"
          element={<div className="AdminBox">
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
                </div>
                <CustomTable
                  columns={AdminsColumns}
                  datas={tableData}
                  pagination
                  numPerPage={10}
                  loading={tableLoading}
                  rowClick={clickToDetail}
                />
              </div>
            </div>
          }
        />
        <Route path="/Add" element={<AdminAdd/>} />
        <Route
          path="/Detail"
          element={<AdminDetail
            data={detailData}
            updateEvent={updateAdmin}
            deleteEvent={deleteAdmin} />}
        />
      </Routes>
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
