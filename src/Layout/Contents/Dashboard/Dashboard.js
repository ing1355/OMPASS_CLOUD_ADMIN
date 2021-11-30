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
} from "@fortawesome/free-solid-svg-icons";
import { CustomAxiosGetAll } from "../../../Functions/CustomAxios";
import {
  getDashboardTopApi,
  getDashboardBottomApi,
} from "../../../Constants/Api_Route";
import { connect } from "react-redux";
import CustomTable from "../../../CustomComponents/CustomTable";
import { ResponsiveBump } from "@nivo/bump";
import { testData } from "./ChartData";
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

  const getDashboardData = () => {
    CustomAxiosGetAll(
      [getDashboardTopApi(adminId), getDashboardBottomApi(adminId)],
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
    setChartData(testData);
    // let temp = [];
    // let prev2 = 80;
    // for (let i = 0; i < 10; i++) {
    //   temp.push([]);
    //   for (let j = 0; j < 10; j++) {
    //     prev2 += 5 - Math.random() * 10;
    //     temp[i].push({ x: j, y: prev2 });
    //   }
    // }
    // setChartData(temp);
  }, []);

  return (
    <div className="contents-container" style={{ width: 1400 }}>
      <div className="flag kr" />
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
              data={testData}
              margin={{ top: 20, right: 120, bottom: 70, left: 100 }}
              colors={{ scheme: "spectral" }}
              interpolation="linear"
              lineWidth={2}
              activeLineWidth={3}
              inactiveLineWidth={3}
              inactiveOpacity={0.5}
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
                const _offsetX = offsetX - 60;
                if (_offsetX <= dataUnitAmount) {
                  if (tooltipIndex !== 0) {
                    tooltipIndex = 0;
                    setTooltipDataIndex(0);
                  }
                  // setTooltipData(chartData.map(c => ({
                  //   name: c.id,
                  //   ...c.data[0]
                  // })));
                } else if (_offsetX >= dataUnitAmount * (dataLength - 1)) {
                  if (tooltipIndex !== data.data.length - 1) {
                    tooltipIndex = data.data.length - 1;
                    setTooltipDataIndex(data.data.length - 1);
                  }
                  // setTooltipData(chartData.map(c => ({
                  //   name: c.id,
                  //   ...c.data[data.data.length - 1]
                  // })))
                } else {
                  if (tooltipIndex !== parseInt(_offsetX / dataUnitAmount)) {
                    tooltipIndex = parseInt(_offsetX / dataUnitAmount);
                    setTooltipDataIndex(parseInt(_offsetX / dataUnitAmount));
                  }
                  // setTooltipData(chartData.map(c => ({
                  //   name: c.id,
                  //   ...c.data[parseInt(_offsetX/dataUnitAmount)]
                  // })))
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
