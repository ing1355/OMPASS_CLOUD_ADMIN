import React, { useLayoutEffect, useState } from "react";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserCog,
  faUserAltSlash,
  faHandSparkles,
  faCaretRight,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";
import { CustomAxiosGetAll } from "../../../Functions/CustomAxios";
import {
  getDashboardTopApi,
  getDashboardBottomApi,
} from "../../../Constants/Api_Route";
import { connect } from "react-redux";
import CustomTable from "../../../CustomComponents/CustomTable";
import { ResponsiveBump } from "@nivo/bump";
import { testData, testData2 } from "./testDataSet";

const columns = [
  { name: "사용자 아이디", key: "userId" },
  { name: "활동", key: "act" },
  { name: "어플리케이션", key: "appName" },
  { name: "상태", key: "status" },
  { name: "시간", key: "createdDate" },
];

const Dashboard = ({ userProfile }) => {
  const {adminId} = userProfile;
  const [userNum, setUserNum] = useState(0);
  const [adminNum, setAdminNum] = useState(0);
  const [byPassNum, setByPassNum] = useState(0);
  const [disableNum, setDisableNum] = useState(0);
  const [plan, setPlan] = useState({});
  const [authLogs, setAuthLogs] = useState([]);

  const getDashboardData = () => {
    CustomAxiosGetAll([getDashboardTopApi(adminId),getDashboardBottomApi(adminId)], [(data) => {
      const {
        adminsNumber,
        byPassUsersNumber,
        inActiveUsersNumber,
        usersNumber,
        plan,
      } = data;
      setAdminNum(adminsNumber);
      setUserNum(usersNumber);
      setByPassNum(byPassUsersNumber);
      setDisableNum(inActiveUsersNumber);
      setPlan(plan);
    }, (data) => {
      console.log(data);
      setAuthLogs(data.slice(-5));
    }]);
  }

  useLayoutEffect(() => {
    getDashboardData();
  }, []);
  
  return (
    <div className="contents-container" style={{width: 1400}}>
      <div className="DashboardBox">
        <h4 className="DashboardTitle">
          <FontAwesomeIcon icon={faCaretRight} /> 사용자 정보
        </h4>
        <div className="DashboardFirst">
          <ul>
            <li>
              <div>
                <h5>
                  <FontAwesomeIcon
                    style={{ color: "rgb(0, 209, 52)", fontSize: "0.9rem" }}
                    icon={faCheckSquare}
                  />
                  &nbsp;현재 사용 중
                </h5>
                <h6>
                  2021년 11월 1일 ~{" "}
                  {plan.expireDate
                    ? plan.expireDate
                        .split(" ")[0]
                        .split("-")
                        .reduce((pre, cur) => {
                          return pre.includes("월")
                            ? pre + " " + cur + "일"
                            : pre.includes("년")
                            ? pre + " " + cur + "월"
                            : pre + "년 " + cur + "월";
                        })
                    : null}
                </h6>
                <h2>{plan.name} Plan</h2>
                <table>
                  <tbody>
                    <tr>
                      <td>남은 일 수</td>
                      <td>{plan.remainingTime}일 </td>
                    </tr>
                    {/* <tr>
                    <td>예상 결제 일</td>
                    <td>12월 2일 </td>
                  </tr> */}
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div className="countBox">
                <div>
                  <h6>사용자 수</h6>
                  <p>
                    <FontAwesomeIcon style={{ width: "15%" }} icon={faUser} />
                    &nbsp;
                    <b>{userNum}명</b>
                  </p>
                </div>
                <div>
                  <h6>관리자 수</h6>
                  <p>
                    <FontAwesomeIcon
                      style={{ width: "15%" }}
                      icon={faUserCog}
                    />
                    &nbsp;
                    <b>{adminNum}명</b>
                  </p>
                </div>
              </div>
              <div className="countBox">
                <div>
                  <h6>바이패스 수</h6>
                  <p>
                    <FontAwesomeIcon
                      style={{ width: "15%" }}
                      icon={faHandSparkles}
                    />
                    &nbsp;
                    <b>{byPassNum}&nbsp;명</b>
                  </p>
                </div>
                <div>
                  <h6>비활성화 수</h6>
                  <p>
                    <FontAwesomeIcon
                      style={{ width: "15%" }}
                      icon={faUserAltSlash}
                    />
                    &nbsp;
                    <b>{disableNum}명</b>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="DashboardSecond">
          <h4 className="DashboardTitle">
            <FontAwesomeIcon icon={faCaretRight} /> 인증 횟수 차트
          </h4>
          <div className="chart">
            <ResponsiveBump
              data={testData}
              margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
              colors={{ scheme: "spectral" }}
              lineWidth={2}
              activeLineWidth={3}
              inactiveLineWidth={3}
              inactiveOpacity={0.15}
              pointSize={10}
              activePointSize={16}
              inactivePointSize={0}
              pointColor={{ theme: "background" }}
              pointBorderWidth={3}
              activePointBorderWidth={3}
              pointBorderColor={{ from: "serie.color" }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "날짜",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "인증 횟수 Ranking",
                legendPosition: "middle",
                legendOffset: -40,
              }}
            />
          </div>
        </div>

        <div className="DashboardThird">
          <h4 className="DashboardTitle">
            <FontAwesomeIcon icon={faCaretRight} /> 최근 인증 로그
          </h4>
          <CustomTable columns={columns} datas={authLogs} />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
