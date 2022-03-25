import React, { useCallback, useLayoutEffect, useState, lazy } from "react";
import "./Users.css";
import ContentsTitle from "../ContentsTitle";
import {
  getUsersApi,
  getApplicationApi
} from "../../../Constants/Api_Route";
import {
  CustomAxiosGetAll
} from "../../../Functions/CustomAxios";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Breadcrumb from "../../../CustomComponents/Breadcrumb";
import ActionCreators from "../../../redux/actions";
import LinkDocument from "../../../CustomComponents/LinkDocument";
import UsersContents from "./UserContents";

const UserDetail = lazy(() => import('./UserDetail/UserDetail'))

const Users = ({
  userProfile
}) => {
  const { adminId } = userProfile;
  const [tableData, setTableData] = useState([]);
  const [_tableData, _setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [detailData, setDetailData] = useState({});
  const [selectView, setSelectView] = useState(0);
  const [applicationsData, setApplicationsData] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(-1);
  const [maxUserCount, setMaxUserCount] = useState(1);

  useLayoutEffect(() => {
    if(adminId) {
      CustomAxiosGetAll(
        [getUsersApi(adminId), getApplicationApi(adminId)],
        [
          ({allowedUsersCount, users}) => {
            setMaxUserCount(allowedUsersCount)
            setTableData(users);
            _setTableData(users);
            setTableLoading(false);
          },
          (applicationData) => {
            setApplicationsData(applicationData);
          },
        ],
        () => {
          setTableLoading(false);
        }
      );
    }
  }, [adminId]);

  useLayoutEffect(() => {
    setTableLoading(false);
  }, [_tableData]);

  useLayoutEffect(() => {
    setTableLoading(true);
    switch (selectView) {
      case 0:
        _setTableData(tableData);
        break;
      case 1:
        _setTableData(tableData.filter((t) => t.register));
        break;
      case 2:
        _setTableData(tableData.filter((t) => !t.register));
        break;
      case 3:
        _setTableData(tableData.filter((t) => t.byPass));
        break;
      default:
        break;
    }
  }, [selectView, tableData]);

  const updateEvent = useCallback(
    (userId, byPass, email) => {
      setTableData(
        tableData.map((t) => (t.userId === userId ? { ...t, byPass, email } : t))
      );
    },
    [tableData]
  );

  const deleteCallback = (userId, appId) => {
    setTableData(tableData.filter((t) => !(userId === t.userId && t.appId === appId)));
  };

  return (
    <div className="contents-container">
      <Breadcrumb />
      <LinkDocument link="/document/users " />
      <ContentsTitle title="USER" />
      <div className="UsersdBox">
        <Routes>
          <Route
            path="/"
            element={<UsersContents
              setDetailData={setDetailData}
              tableData={tableData}
              _tableData={_tableData}
              tableLoading={tableLoading}
              selectView={selectView}
              setSelectView={setSelectView}
              selectedApplication={selectedApplication}
              setSelectedApplication={setSelectedApplication}
              setTableData={setTableData}
              maxCount={maxUserCount}
              applicationsData={applicationsData}
            />}
          />
          <Route
            path="/Detail/:id"
            element={<UserDetail
              data={detailData}
              deleteCallback={deleteCallback}
              updateBypass={updateEvent}
            />
            }
          />
        </Routes>
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);
