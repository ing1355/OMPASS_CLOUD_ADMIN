import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import "./Users.css";
import ContentsTitle from "../ContentsTitle";
import "../../../App.css";
import {
  getUsersApi,
  getApplicationApi,
  updateCSVApi,
} from "../../../Constants/Api_Route";
import {
  CustomAxiosGetAll,
  CustomAxiosPost,
} from "../../../Functions/CustomAxios";
import { connect } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";
import UserDetail from "./UserDetail";
import UserUnregistered from "./UserUnregistered";
import UserDisabled from "./UserDisabled";
import UserBypass from "./UserBypass";
import CustomButton from "../../../CustomComponents/CustomButton";
import { allUserColumns } from "../../../Constants/TableColumns";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import { ReadCsvData, SaveCsvData } from "../../../Functions/ControlCsvData";
import UserAll from "./UserAll";
import Breadcrumb from "../../../CustomComponents/Breadcrumb";
import { FormattedMessage, useIntl } from "react-intl";
import CustomConfirm from "../../../CustomComponents/CustomConfirm";
import ActionCreators from "../../../redux/actions";

const Users = ({ userProfile, showSuccessMessage, showErrorMessage, lang }) => {
  const { adminId } = userProfile;
  const [tableData, setTableData] = useState([]);
  const [_tableData, _setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [detailData, setDetailData] = useState({});
  const [selectView, setSelectView] = useState(0);
  const [applicationsData, setApplicationsData] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [uploadConfirmVisible, setUploadConfirmVisible] = useState(false);
  const [csvConfirmLoading, setCsvConfirmLoading] = useState(false);
  const [excelData, setExcelData] = useState(null);
  const history = useHistory();
  const { formatMessage } = useIntl();

  useLayoutEffect(() => {
    CustomAxiosGetAll(
      [getUsersApi(adminId), getApplicationApi(adminId)],
      [
        (userData) => {
          setTableData(userData);
          _setTableData(userData);
          setTableLoading(false);
        },
        (applicationData) => {
          setApplicationsData(applicationData);
          setSelectedApplication(applicationData[0].appId);
        },
      ],
      () => {
        setTableLoading(false);
      }
    );
  }, []);

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
    (userId, byPass) => {
      setTableData(
        tableData.map((t) => (t.userId === userId ? { ...t, byPass } : t))
      );
    },
    [tableData]
  );

  const clickToDetail = useCallback((rowData) => {
    setDetailData(rowData);
    history.push("/Users/Detail/" + rowData.userId);
  }, []);

  const selectedBorder = useMemo(
    () => (
      <div className="selectedBorder" style={{ left: selectView * 25 + "%" }} />
    ),
    [selectView]
  );

  const closeConfirmModal = useCallback(() => {
    setUploadConfirmVisible(false);
    document.getElementById("excel-upload").value = null;
  }, []);

  const changeSelectedApplication = useCallback((e) => {
    setSelectedApplication(e.target.value);
  }, []);

  const submitCSV = useCallback(() => {
    setCsvConfirmLoading(true);
    CustomAxiosPost(
      updateCSVApi(adminId, selectedApplication),
      excelData.map((d) => ({
        email: "",
        userId: d.userId,
      })),
      (data) => {
        document.getElementById("excel-upload").value = null;
        setCsvConfirmLoading(false);
        setUploadConfirmVisible(false);
        showSuccessMessage("SUCCESS_CSV_UPLOAD");
      },
      () => {
        setCsvConfirmLoading(false);
        showErrorMessage("FAIL_CSV_UPLOAD");
      }
    );
  }, [adminId, selectedApplication, excelData]);

  return (
    <div className="contents-container">
      <Breadcrumb />
      <ContentsTitle title="USER" />
      <div className="UsersdBox">
        <Switch>
          <Route
            path="/Users"
            exact
            render={() => (
              <>
                <div className="UsersBox3">
                  <ul className="UsersBox3_title">
                    {selectedBorder}
                    <li
                      onClick={() => {
                        setSelectView(0);
                      }}
                      className={
                        "user-concept-title" +
                        (selectView === 0 ? " selected" : "")
                      }
                    >
                      <h3>{tableData.length}</h3>
                      <p>
                        <FormattedMessage id="ALLUSERNUM" />
                      </p>
                    </li>
                    <li
                      onClick={() => {
                        setSelectView(1);
                      }}
                      className={
                        "user-concept-title" +
                        (selectView === 1 ? " selected" : "")
                      }
                    >
                      <h3>{tableData.filter((t) => t.register).length}</h3>
                      <p>
                        <FormattedMessage id="REGISTEREDUSERNUM" />
                      </p>
                    </li>
                    <li
                      onClick={() => {
                        setSelectView(2);
                      }}
                      className={
                        "user-concept-title" +
                        (selectView === 2 ? " selected" : "")
                      }
                    >
                      <h3>{tableData.filter((t) => !t.register).length}</h3>
                      <p>
                        <FormattedMessage id="UNREGISTEREDUSERNUM" />
                      </p>
                    </li>
                    <li
                      onClick={() => {
                        setSelectView(3);
                      }}
                      className={
                        "user-concept-title" +
                        (selectView === 3 ? " selected" : "")
                      }
                    >
                      <h3>{tableData.filter((t) => t.byPass).length}</h3>
                      <p>
                        <FormattedMessage id="BYPASSUSERNUM" />
                      </p>
                    </li>
                  </ul>
                  <ul className="UsersBox3_contents">
                    {selectView === 0 && (
                      <UserAll
                        tableData={_tableData}
                        tableLoading={tableLoading}
                        setDetailData={clickToDetail}
                      />
                    )}
                    {selectView === 1 && (
                      <UserUnregistered
                        tableData={_tableData}
                        tableLoading={tableLoading}
                        setDetailData={clickToDetail}
                      />
                    )}
                    {selectView === 2 && (
                      <UserDisabled
                        tableData={_tableData}
                        tableLoading={tableLoading}
                        setDetailData={clickToDetail}
                      />
                    )}
                    {selectView === 3 && (
                      <UserBypass
                        tableData={_tableData}
                        tableLoading={tableLoading}
                        setDetailData={clickToDetail}
                      />
                    )}
                  </ul>
                </div>
                <div className="excel-button-box">
                  <div>
                    <CustomButton className="excel-button" style={{minWidth: lang === 'ko' ? 170 : 200}}>
                      <label
                        htmlFor="excel-upload"
                        className="pointer center-position full-size"
                      >
                        <UploadOutlined />
                        &nbsp;&nbsp;
                        <FormattedMessage id="EXCELUPLOAD" />
                      </label>
                      <input
                        id="excel-upload"
                        type="file"
                        accept=".csv"
                        style={{ display: "none" }}
                        onInput={(e) => {
                          ReadCsvData(e.target.files[0], (jsonData) => {
                            const columns = allUserColumns.filter(
                              (c) => c.key !== "lastLoginDate"
                            );
                            const result = [];
                            jsonData.forEach((data) => {
                              const _result = {};
                              columns.forEach((c, ind) => {
                                _result[c.key] =
                                  c.key === "byPass"
                                    ? data[ind] === "O"
                                      ? true
                                      : false
                                    : data[ind];
                              });
                              result.push(_result);
                            });
                            setExcelData(result);
                            setUploadConfirmVisible(true);
                          });
                        }}
                      />
                    </CustomButton>
                  </div>
                  <div style={{ marginLeft: "1rem" }}>
                    <CustomButton
                      id="download"
                      className="excel-button"
                      style={{ float: "right", minWidth: lang === 'ko' ? 170 : 200 }}
                      onClick={() => {
                        SaveCsvData([
                          {
                            userId: formatMessage({id:'id'}),
                            email: formatMessage({id:'Email'}),
                            appName: formatMessage({id:'APPLICATIONNAME'}),
                            byPass: formatMessage({id:'ISBYPASS'}),
                          },
                          ..._tableData.map((t) => ({
                            userId: t.userId,
                            email: t.email,
                            appName: t.appName,
                            byPass: t.byPass ? "O" : "X",
                          })),
                        ]);
                      }}
                    >
                      <DownloadOutlined />
                      &nbsp;&nbsp;
                      <FormattedMessage id="EXCELDOWNLOAD" />
                    </CustomButton>
                  </div>
                </div>
              </>
            )}
          />
          <Route
            path="/Users/Detail/:id"
            render={(routeInfo) => (
              <UserDetail
                {...routeInfo}
                data={detailData}
                // customPolicies={customPolicies}
                updateBypass={updateEvent}
              />
            )}
          />
        </Switch>
        <CustomConfirm
          visible={uploadConfirmVisible}
          cancelCallback={closeConfirmModal}
          confirmCallback={submitCSV}
          okLoading={csvConfirmLoading}
        >
          <h6 className="execel-modal-text">
            <FormattedMessage id="EXCELIMPORTTEXT"/>
          </h6>
          <select
            className="excel-select"
            value={selectedApplication}
            onChange={changeSelectedApplication}
          >
            {applicationsData.map((d, ind) => (
              <option key={ind} value={d.appId}>
                {d.name}
              </option>
            ))}
          </select>
        </CustomConfirm>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
    lang: state.locale
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
