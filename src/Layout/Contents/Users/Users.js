import React, { useLayoutEffect, useState } from "react";
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

const Users = ({ userProfile }) => {
  const {adminId} = userProfile;
  const [allUserView, setAllUserView] = useState(true);
  const [unRegisteredUserView, setUnRegisteredUeserView] = useState(false);
  const [disabledUserView, setDisabledUserView] = useState(false);
  const [byPassUserView, setByPassUserView] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [detailData, setDetailData] = useState({});
  const history = useHistory();

  const viewsIndex = {
    allUserView: 0,
    unRegisteredUeserView: 1,
    disabledUserView: 2,
    byPassUserView: 3
  }

  const setView = (index) => {
    const _ = [setAllUserView, setUnRegisteredUeserView, setDisabledUserView, setByPassUserView];
    _.forEach((_setView,_index) => {
      if(_index === index) _setView(true);
      else _setView(false);
    })
  }
  
  useLayoutEffect(() => {
    CustomAxiosGet(getUsersApi(adminId), (data) => {
      setTableData(data);
    });
  }, []);

  const updateEvent = (userId, byPass) => {
    setTableData(tableData.map(t => t.userId === userId ? {...t, byPass} : t))
  }

  const clickToDetail = (rowData) => {
    setDetailData(rowData);
    history.push("/Users/Detail/" + rowData.userId);
  };

  return (
    <div className="contents-container">
      <ContentsTitle title="Users Info" />
      <div className="UsersdBox">
        <Switch>
          <Route
            path="/Users"
            exact
            render={() => (
              <>
                <div className="billing-change-help-container">
                  <div className="billing-change-help-icon">test</div>
                  <div className="billing-change-help-msg">
                    Need to activate a replacement phone? Learn more about
                    Reactivating Duo Mobile.
                  </div>
                </div>

                <div className="UsersBox3">
                  <ul className="UsersBox3_title">
                    <li className={allUserView ? 'selected' : ''}
                      onClick={() => {
                        setView(viewsIndex['allUserView'])
                      }}
                    >
                      <h3>{tableData.length}</h3>
                      <p>전체 사용자 수</p>
                    </li>
                    <li className={unRegisteredUserView ? 'selected' : ''}
                      onClick={() => {
                        setView(viewsIndex['unRegisteredUeserView'])
                      }}
                    >
                      <h3>0</h3>
                      <p>등록되지 않은 사용자</p>
                    </li>{" "}
                    <li className={disabledUserView ? 'selected' : ''}
                      onClick={() => {
                        setView(viewsIndex['disabledUserView'])
                      }}
                    >
                      <h3>0</h3>
                      <p>비활성화된 사용자</p>
                    </li>{" "}
                    <li className={byPassUserView ? 'selected' : ''}
                      onClick={() => {
                        setView(viewsIndex['byPassUserView'])
                      }}
                    >
                      <h3>{tableData.filter((t) => t.byPass).length}</h3>
                      <p>바이패스 사용자</p>
                    </li>
                  </ul>
                  <ul className="UsersBox3_contents">
                    {allUserView && (
                      <UsersTable
                        tableData={tableData}
                        setDetailData={clickToDetail}
                      />
                    )}
                    {unRegisteredUserView && (
                      <UserUnregistered
                        tableData={tableData}
                        setDetailData={clickToDetail}
                      />
                    )}
                    {disabledUserView && (
                      <UserDisabled
                        tableData={tableData}
                        setDetailData={clickToDetail}
                      />
                    )}
                    {byPassUserView && (
                      <UserBypass
                        tableData={tableData.filter(t => t.byPass)}
                        setDetailData={clickToDetail}
                      />
                    )}
                  </ul>
                </div>
              </>
            )}
          />
          <Route
            path="/Users/Detail/:id"
            render={(routeInfo) => (
              <UserDetail {...routeInfo} data={detailData} updateBypass={updateEvent} />
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
