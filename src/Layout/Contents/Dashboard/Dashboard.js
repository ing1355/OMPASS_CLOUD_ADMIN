import React, { useLayoutEffect, useState } from "react";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHandSparkles,
  faCaretRight,
  faCheckSquare,
  faCalendarCheck,
  faUserPlus,
  faUserTimes,
} from "@fortawesome/free-solid-svg-icons";
import { CustomAxiosGetAll } from "../../../Functions/CustomAxios";
import {
  getDashboardTopApi,
  getDashboardBottomApi,
  getDashboardMiddleApi,
} from "../../../Constants/Api_Route";
import { connect } from "react-redux";
import CustomTable from "../../../CustomComponents/CustomTable";
import { DashboardLogColumns } from "../../../Constants/TableColumns";
import { FormattedMessage } from "react-intl";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import {
  getDateFormatEn,
  getDateFormatKr,
} from "../../../Functions/GetFullDate";
import LinkDocument from "../../../CustomComponents/LinkDocument";

export const planStatusCodes = {
  STOPPED: <FormattedMessage id="NONEUSED" />,
  RUN: <FormattedMessage id="Valid" />,
  CANCEL: (
    <>
      <FormattedMessage id="Valid" /> <FormattedMessage id="ValidCancel" />
    </>
  ),
};

const colors = [
  "#8b94fe",
  "#d15a69",
  "#d37f13",
  "#4baeb6",
  "#150c76",
  "#ef9076",
  "#11a374",
  "#a71f57",
  "#81d123",
  "#7c694c",
  "#c90f17",
  "#036436",
  "#e997d6",
  "#5f7cbd",
  "#c85127",
  "#304052",
  "#5e9ffb",
  "#896179",
  "#ea991e",
  "#6e786e",
  "#063b7f",
  "#40835f",
  "#fc8f78"
]

const randomColor = () => '#' + Math.round(Math.random() * 0xffffff).toString(16)

const Dashboard = ({ userProfile, locale }) => {
  const { adminId } = userProfile;
  const [userNum, setUserNum] = useState(0);
  const [registerNum, setRegisterNum] = useState(0);
  const [byPassNum, setByPassNum] = useState(0);
  const [unRegisterNum, setUnRegisterNum] = useState(0);
  const [plan, setPlan] = useState({});
  const [authLogs, setAuthLogs] = useState([]);
  const [chartData, setChartData] = useState([]);

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
            byPassUsersNumber,
            registerUsersNumber,
            unRegisterUsersNumber,
            totalUsersNumber,
            plan,
          } = data;
          setRegisterNum(registerUsersNumber);
          setUserNum(totalUsersNumber);
          setByPassNum(byPassUsersNumber);
          setUnRegisterNum(unRegisterUsersNumber);
          setPlan(plan);
        },
        (data) => {
          setChartData(
            data.map((d,ind) => ({
              name: d.name,
              color: colors[ind],
              data: d.chartData.map((_d) => ({
                category: _d.date,
                value: _d.count,
              })),
            }))
          );
        },
        (data) => {
          setAuthLogs(data.slice(-5));
        },
      ]
    );
  };

  useLayoutEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="contents-container" style={{ width: 1400 }}>
      <LinkDocument link="/document/dashboard" />

      <div className="flag kr" />
      <div className="DashboardBox">
        <h4 className="DashboardTitle">
          <FontAwesomeIcon icon={faCaretRight} />{" "}
          <FormattedMessage id="Overview" />
        </h4>
        <div className="DashboardFirst">
          <ul className="plan-info-box">
            <li>
              <div>
                <h2>{plan.name}</h2>
                <h5>
                  <FontAwesomeIcon
                    style={{
                      color: "rgb(0, 209, 52)",
                      fontSize: "1.1rem",
                      marginBottom: "0.12rem",
                    }}
                    icon={faCheckSquare}
                  />
                  &nbsp;&nbsp;
                  {plan.status
                    ? planStatusCodes[plan.status]
                    : planStatusCodes["STOPPED"]}
                </h5>
                <h6>
                  <FontAwesomeIcon
                    style={{ fontSize: "1.1rem", marginBottom: "0.15rem" }}
                    icon={faCalendarCheck}
                  />
                  &nbsp;&nbsp;
                  {locale === "ko" ? (
                    <>
                      {plan.createDate
                        ? getDateFormatKr(plan.createDate)
                        : null}
                      ~
                      {plan.expireDate
                        ? getDateFormatKr(plan.expireDate)
                        : null}
                    </>
                  ) : (
                    <>
                      {plan.createDate
                        ? getDateFormatEn(plan.createDate)
                        : null}
                      &nbsp;~&nbsp;
                      {plan.expireDate
                        ? getDateFormatEn(plan.expireDate)
                        : null}
                    </>
                  )}
                  {/* {plan.createDate
                    ? getDateFormat(plan.createDate)
                    : null} ~{" "}
                  {plan.expireDate ? getDateFormat(plan.expireDate) : null} */}
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
                        <FormattedMessage id="ValidDate" />
                      </td>

                      {locale === "ko" ? (
                        <td
                          style={{
                            width: "50%",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            borderRight: "0.5px solid rgb(180, 180, 180)",
                            borderTop: "0.5px solid rgb(180, 180, 180)",
                          }}
                        >
                          {plan.remainingDate}&nbsp;
                          <FormattedMessage id="daysleft" />
                        </td>
                      ) : (
                        <td
                          style={{
                            width: "50%",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            borderRight: "0.5px solid rgb(180, 180, 180)",
                            borderTop: "0.5px solid rgb(180, 180, 180)",
                          }}
                        >
                          {plan.remainingDate}
                        </td>
                      )}
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
                  <h6>
                    <FormattedMessage id="ALLUSERNUM" />
                  </h6>
                  <p>
                    <FontAwesomeIcon className="countBox-icon" icon={faUser} />
                    &nbsp;
                    {locale === "ko" ? <b>{userNum}명</b> : <b>{userNum}</b>}
                  </p>
                </div>
                <div>
                  <h6>
                    <FormattedMessage id="REGISTEREDUSERNUM" />
                  </h6>
                  <p>
                    <FontAwesomeIcon icon={faUserPlus} />
                    &nbsp;
                    {locale === "ko" ? (
                      <b>{registerNum}명</b>
                    ) : (
                      <b>{registerNum}</b>
                    )}
                  </p>
                </div>
                <div>
                  <h6>
                    <FormattedMessage id="UNREGISTEREDUSERNUM" />
                  </h6>
                  <p>
                    <FontAwesomeIcon icon={faUserTimes} />
                    &nbsp;
                    {locale === "ko" ? (
                      <b>{unRegisterNum}명</b>
                    ) : (
                      <b>{unRegisterNum}</b>
                    )}
                  </p>
                </div>
                <div>
                  <h6>
                    <FormattedMessage id="BYPASSUSERNUM" />
                  </h6>
                  <p>
                    <FontAwesomeIcon icon={faHandSparkles} />
                    &nbsp;
                    {locale === "ko" ? (
                      <b>{byPassNum}명</b>
                    ) : (
                      <b>{byPassNum}</b>
                    )}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="DashboardSecond">
          <h4 className="DashboardTitle">
            <FontAwesomeIcon icon={faCaretRight} />
            &nbsp;
            <FormattedMessage id="Authentications" />
          </h4>
          <div className="chart" id="chart">
            <LineChart width={1200} height={550}>
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis
                dataKey="category"
                type="category"
                allowDuplicatedCategory={false}
              />
              <YAxis dataKey="value" />
              <Tooltip />
              <Legend />
              {chartData.map(({color, data, name}) => (
                <Line
                  stroke={color}
                  dataKey="value"
                  data={data}
                  name={name}
                  key={name}
                />
              ))}
            </LineChart>
          </div>
        </div>
        <div className="DashboardThird">
          <h4 className="DashboardTitle">
            <FontAwesomeIcon icon={faCaretRight} />
            &nbsp;
            <FormattedMessage id="AuthenticationLog" />
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
    locale: state.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
