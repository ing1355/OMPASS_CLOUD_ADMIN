import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import "./Users.css";
import UsersTable from "./UsersTable";
import ContentsTitle from "../ContentsTitle";
import "../../../App.css";
import { getUsersApi } from "../../../Constants/Api_Route";
import { CustomAxiosGet } from "../../../Functions/CustomAxios";
import { connect } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";
import UserDetail from "./UserDetail";
import UserUnregistered from "./UserUnregistered";
import UserDisabled from "./UserDisabled";
import UserBypass from "./UserBypass";
import CustomButton from "../../../CustomComponents/CustomButton";
import ExcelDownload from "./ExcelDownload";
import { allUserColumns } from "../../../Constants/TableColumns";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import { ReadCsvData, SaveCsvData } from "../../../Functions/ControlCsvData";
import UserAll from "./UserAll";
import Breadcrumb from "../../../CustomComponents/Breadcrumb";

const Users = ({ userProfile }) => {
  const { adminId } = userProfile;
  const [tableData, setTableData] = useState([]);
  const [_tableData, _setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [detailData, setDetailData] = useState({});
  const history = useHistory();
  const [selectView, setSelectView] = useState(0);

  useLayoutEffect(() => {
    CustomAxiosGet(
      getUsersApi(adminId),
      (data) => {
        setTableData(data);
        _setTableData(data);
        setTableLoading(false);
      },
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
        _setTableData(tableData.slice(0, 1));
        break;
      case 2:
        _setTableData(tableData.slice(0, 2));
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

  return (
    <div className="contents-container">
      <Breadcrumb />
      <ContentsTitle title="사용자" />
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
                    >
                      <h3>{tableData.length}</h3>
                      <p>전체 사용자 수</p>
                    </li>
                    <li
                      onClick={() => {
                        setSelectView(1);
                      }}
                    >
                      <h3>0</h3>
                      <p>등록된 사용자</p>
                    </li>
                    <li
                      onClick={() => {
                        setSelectView(2);
                      }}
                    >
                      <h3>0</h3>
                      <p>등록되지 않은 사용자</p>
                    </li>
                    <li
                      onClick={() => {
                        setSelectView(3);
                      }}
                    >
                      <h3>{tableData.filter((t) => t.byPass).length}</h3>
                      <p>2차인증 바이패스 사용자</p>
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
                    <CustomButton>
                      <label
                        htmlFor="excel-upload"
                        className="pointer center-position full-size"
                      >
                        <UploadOutlined /> 엑셀 업로드
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
                            jsonData.map((data) => {
                              const _result = {};
                              columns.map((c, ind) => {
                                _result[c.key] =
                                  c.key === "byPass"
                                    ? data[ind] === "O"
                                      ? true
                                      : false
                                    : data[ind];
                              });
                              result.push(_result);
                            });
                            console.log(result);
                          });
                        }}
                      />
                    </CustomButton>
                  </div>
                  <div style={{ marginLeft: "1rem" }}>
                    <CustomButton
                      id="download"
                      style={{ float: "right" }}
                      onClick={() => {
                        SaveCsvData([
                          {
                            userId: "아이디",
                            appName: "어플리케이션명",
                            type: "타입",
                            byPass: "바이패스 유무",
                          },
                          ..._tableData.map((t) => ({
                            userId: t.userId,
                            appName: t.appName,
                            type: t.type,
                            byPass: t.byPass ? "O" : "X",
                          })),
                        ]);
                      }}
                    >
                      <DownloadOutlined /> 엑셀 다운로드
                    </CustomButton>
                    {/* <ExcelDownload
                      data={tableData}
                      className="button"
                      columns={allUserColumns}
                    /> */}
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
                updateBypass={updateEvent}
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);
