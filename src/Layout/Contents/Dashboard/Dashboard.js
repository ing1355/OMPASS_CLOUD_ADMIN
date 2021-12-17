import React, { useEffect, useLayoutEffect, useState } from "react";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserCog,
  faUserAltSlash,
  faHandSparkles,
  faCaretRight,
  faCheckSquare,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { CustomAxiosGetAll } from "../../../Functions/CustomAxios";
import {
  getDashboardTopApi,
  getDashboardBottomApi,
  getDashboardMiddleApi,
} from "../../../Constants/Api_Route";
import { connect } from "react-redux";
import CustomTable from "../../../CustomComponents/CustomTable";
import { message } from "antd";
import { DashboardLogColumns } from "../../../Constants/TableColumns";
import { ResponsiveLine } from '@nivo/line'
import CustomApexChart from "./ApexChart";

var tooltipIndex = 0;

const Dashboard = ({ userProfile }) => {
  const { adminId } = userProfile;
  const [userNum, setUserNum] = useState(0);
  const [adminNum, setAdminNum] = useState(0);
  const [byPassNum, setByPassNum] = useState(0);
  const [disableNum, setDisableNum] = useState(0);
  const [plan, setPlan] = useState({});
  const [authLogs, setAuthLogs] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [tooltipDataIndex, setTooltipDataIndex] = useState(0);

  const planStatusCodes = {
    STOPPED: "사용하지 않음",
    RUN: "현재 사용중",
  };

  const getDashboardData = () => {
    CustomAxiosGetAll(
      [
        getDashboardTopApi(adminId),
        getDashboardMiddleApi(adminId),
        getDashboardBottomApi(adminId),
      ],
      [
        (data) => {
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
        },
        (data) => {
          setChartData(data.map(d => ({
            name: d.name,
            data: d.chartData.map(_d => ({
              x: new Date(_d.date),
              y: _d.count
            }))
          })))
          // setChartData(data.map((d, ind) => {
          //   const _ = {};
          //   _.name = d.name;
          //   _.animation = {
          //     duration: 500 * ind
          //   }
          //   _.data = d.chartData.map(cD => ({ date: cD.date, y: cD.rank, tip: cD.count }))
          //   _.yAxis = 0;
          //   return _;
          // }));
        },
        (data) => {
          setAuthLogs(data.slice(-5));
        },
      ],
      () => {
        message.error("대시보드 정보를 가져오는데 실패하였습니다.");
      }
    );
  };

  useLayoutEffect(() => {
    getDashboardData();
  }, []);

  const getDateFormat = (date) =>
    date
      .split(" ")[0]
      .split("-")
      .reduce((pre, cur) => {
        return pre.includes("월")
          ? pre + " " + cur + "일"
          : pre.includes("년")
            ? pre + " " + cur + "월"
            : pre + "년 " + cur + "월";
      });

  return (
    <div className="contents-container" style={{ width: 1400 }}>
      <div className="flag kr" />
      <div className="DashboardBox">
        <h4 className="DashboardTitle">
          <FontAwesomeIcon icon={faCaretRight} /> 사용자 정보
        </h4>
        <div className="DashboardFirst">
          <ul className="plan-info-box">
            <li>
              <div>
                <h2>{plan.name} Plan</h2>
                <h5>
                  <FontAwesomeIcon
                    style={{ color: "rgb(0, 209, 52)", fontSize: "1.1rem" }}
                    icon={faCheckSquare}
                  />
                  &nbsp;&nbsp;
                  {plan.status
                    ? planStatusCodes[plan.status]
                    : planStatusCodes["STOPPED"]}
                </h5>
                <h6>
                  <FontAwesomeIcon
                    style={{ fontSize: "1.1rem" }}
                    icon={faCalendarCheck}
                  />
                  &nbsp;&nbsp;
                  {plan.createDate
                    ? getDateFormat(plan.createDate)
                    : null} ~{" "}
                  {plan.expireDate ? getDateFormat(plan.expireDate) : null}
                </h6>
              </div>
              <div>
                <table className="dashboard-table">
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          width: "50%",
                          background: "#256e8b",
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: "1rem",
                        }}
                      >
                        남은 일 수
                      </td>
                      <td
                        style={{
                          width: "50%",
                          fontWeight: "bold",
                          fontSize: "1rem",
                          borderRight: "1px solid rgb(180, 180, 180)",
                          borderTop: "1px solid rgb(180, 180, 180)",
                        }}
                      >
                        {plan.remainingDate} 일
                      </td>
                    </tr>
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
                    <FontAwesomeIcon className="countBox-icon" icon={faUser} />
                    &nbsp;
                    <b>{userNum}명</b>
                  </p>
                </div>
                <div>
                  <h6>관리자 수</h6>
                  <p>
                    <FontAwesomeIcon icon={faUserCog} />
                    &nbsp;
                    <b>{adminNum}명</b>
                  </p>
                </div>
                <div>
                  <h6>2차인증 바이패스 수</h6>
                  <p>
                    <FontAwesomeIcon icon={faHandSparkles} />
                    &nbsp;
                    <b>{byPassNum}&nbsp;명</b>
                  </p>
                </div>
                <div>
                  <h6>비활성화 수</h6>
                  <p>
                    <FontAwesomeIcon icon={faUserAltSlash} />
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
          <div className="chart" id='chart'>
            <CustomApexChart data={chartData}/>
          </div>
        </div>

        <div className="DashboardThird">
          <h4 className="DashboardTitle">
            <FontAwesomeIcon icon={faCaretRight} /> 최근 인증 로그
          </h4>
          <CustomTable columns={DashboardLogColumns} datas={authLogs} />
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
