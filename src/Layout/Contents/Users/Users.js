import React, { useLayoutEffect, useState } from "react";
import "./Users.css";
import UsersTable from "./UsersTable";
import ContentsTitle from "../ContentsTitle";
import "../../../App.css";
import { getUsersApi } from "../../../Constants/Api_Route";
import { CustomAxiosGet } from "../../../Functions/CustomAxios";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import UserDetail from "./UserDetail";

const Users = ({ userProfile }) => {
  const [test1, setTest1] = useState(true);
  const [test2, setTest2] = useState(false);
  const [test3, setTest3] = useState(false);
  const [test4, setTest4] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [detailData, setDetailData] = useState(null);

  useLayoutEffect(() => {
    CustomAxiosGet(getUsersApi(userProfile.adminId), (data) => {
      setTableData(data);
      console.log(data);
    });
  }, []);

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
                    <li
                      style={
                        test1 === true
                          ? {
                            borderBottom: "5px solid rgb(92, 106, 119)",
                          }
                          : null
                      }
                      onClick={() => {
                        setTest1(true);
                        setTest2(false);
                        setTest3(false);
                        setTest4(false);
                      }}
                    >
                      <h3>{tableData.length}</h3>
                      <p>전체 사용자 수</p>
                    </li>
                    <li
                      style={
                        test2 === true
                          ? {
                            borderBottom: "5px solid rgb(92, 106, 119)",
                          }
                          : null
                      }
                      onClick={() => {
                        setTest1(false);
                        setTest2(true);
                        setTest3(false);
                        setTest4(false);
                      }}
                    >
                      <h3>0</h3>
                      <p>등록되지 않은 사용자</p>
                    </li>{" "}
                    <li
                      style={
                        test3 === true
                          ? {
                            borderBottom: "5px solid rgb(92, 106, 119)",
                          }
                          : null
                      }
                      onClick={() => {
                        setTest1(false);
                        setTest2(false);
                        setTest3(true);
                        setTest4(false);
                      }}
                    >
                      <h3>0</h3>
                      <p>비활성화된 사용자</p>
                    </li>{" "}
                    <li
                      style={
                        test4 === true
                          ? {
                            borderBottom: "5px solid rgb(92, 106, 119)",
                          }
                          : null
                      }
                      onClick={() => {
                        setTest1(false);
                        setTest2(false);
                        setTest3(false);
                        setTest4(true);
                      }}
                    >
                      <h3>{tableData.filter((t) => t.bypass).length}</h3>
                      <p>바이패스 사용자</p>
                    </li>
                  </ul>
                  <ul className="UsersBox3_contents">
                    {test1 && <UsersTable tableData={tableData} setDetailData={setDetailData} />}
                    {test2 && <li>test2test2</li>}
                    {test3 && <li>test3test3test3</li>}
                    {test4 && <li>test4test4test4test4</li>}
                  </ul>
                </div>
              </>
            )}
          />
          <Route path="/Users/Detail/:id" render={routeInfo => <UserDetail {...routeInfo} data={detailData} />} />
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
