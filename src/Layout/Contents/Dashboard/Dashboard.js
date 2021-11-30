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
import { ResponsiveBump } from "@nivo/bump";
import { message } from "antd";

const columns = [
  { name: "사용자 아이디", key: "userId" },
  { name: "활동", key: "act" },
  { name: "어플리케이션", key: "appName" },
  { name: "상태", key: "status" },
  { name: "시간", key: "createdDate" },
];

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
          setChartData(
            data.map((d, ind) => ({
              id: d.name,
              data: d.chartData.map((_) => ({
                x: _.date,
                y: _.rank,
                value: _.count,
              })),
            }))
          );
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
                <table>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td
                        style={{
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
                          fontWeight: "bold",
                          fontSize: "1rem",
                          borderRight: "1px solid rgb(180, 180, 180)",
                        }}
                      >
                        {plan.remainingTime}일{" "}
                      </td>
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
                  <h6>바이패스 수</h6>
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
          <div className="chart">
            {/* <Line {...config(chartData)} 
            options={{
              plugins: {
                legend: {
                  position: 'right',
                }
              }
            }} 
            /> */}
            <ResponsiveBump
              data={chartData}
              margin={{ top: 20, right: 120, bottom: 70, left: 100 }}
              colors={{ scheme: "spectral" }}
              interpolation="linear"
              lineWidth={2}
              activeLineWidth={3}
              inactiveLineWidth={3}
              inactiveOpacity={0.1}
              pointSize={10}
              tooltip={({ serie }) => (
                <div className="custom-tooltip-container">
                  <div className="custom-tooltip-title">
                    날짜 : {chartData[0].data[tooltipDataIndex].x}
                  </div>
                  {chartData.map((t, ind) => (
                    <div key={ind} className="custom-tooltip-item">
                      {t.id} : <b>{t.data[tooltipDataIndex].value}</b>
                    </div>
                  ))}
                </div>
              )}
              onMouseMove={(data, b) => {
                const { offsetX, offsetY, clientX, clientY } = b.nativeEvent;
                const { width } = b.target.getBoundingClientRect();
                const dataLength = chartData[0].data.length;
                const dataUnitAmount = width / dataLength;
                const _offsetX = offsetX - 120;
                if (_offsetX <= dataUnitAmount) {
                  if (tooltipIndex !== 0) {
                    tooltipIndex = 0;
                    setTooltipDataIndex(0);
                  }
                } else if (_offsetX >= dataUnitAmount * (dataLength - 1)) {
                  if (tooltipIndex !== data.data.length - 1) {
                    tooltipIndex = data.data.length - 1;
                    setTooltipDataIndex(data.data.length - 1);
                  }
                } else {
                  if (tooltipIndex !== parseInt(_offsetX / dataUnitAmount)) {
                    tooltipIndex = parseInt(_offsetX / dataUnitAmount);
                    setTooltipDataIndex(parseInt(_offsetX / dataUnitAmount));
                  }
                }
                // console.log(b.target.getAttribute('d').replace(/[LM]/gi, " ").slice(1,).split(' ').map(d => d.split(',')).flat().map(d => (d*1).toFixed(0)))
              }}
              activePointSize={16}
              inactivePointSize={0}
              pointColor={{ theme: "background" }}
              pointBorderWidth={3}
              activePointBorderWidth={3}
              pointBorderColor={{ from: "serie.color" }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 0,
                tickPadding: 0,
                tickRotation: 0,
                legend: "날짜",
                legendPosition: "middle",
                legendOffset: 42,
              }}
              axisLeft={{
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 0,
                legend: "인증 횟수 Ranking",
                legendPosition: "middle",
                legendOffset: -60,
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
