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
  faBan,
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
import { dashboardChartLineColors } from "../../../Constants/ConstantValues";
import { planStatusCodes } from "../../../Constants/PlanStatusCodes";

const Dashboard = ({ userProfile, locale }) => {
  const { adminId } = userProfile;
  const [userNum, setUserNum] = useState(0);
  const [registerNum, setRegisterNum] = useState(0);
  const [byPassNum, setByPassNum] = useState(0);
  const [unRegisterNum, setUnRegisterNum] = useState(0);
  const [plan, setPlan] = useState({});
  const [authLogs, setAuthLogs] = useState([]);
  const [chartData, setChartData] = useState([]);
  const { expirationDate, startDate, remainingDate, name, status } = plan;
  const statusColor = status === 'EXPIRED' ? "#d60002" : "#00d134"

  useLayoutEffect(() => {
    if (adminId) {
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
              data.map((d, ind) => ({
                name: d.name,
                color: dashboardChartLineColors[ind],
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
    }
  }, [adminId]);

  return (
    <div className="contents-container" style={{ width: 1400 }}>
      <LinkDocument link="/document/dashboard" />

      <div className="flag kr" />
      <div className="DashboardBox">
        <h4 className="DashboardTitle">
          <FontAwesomeIcon icon={faCaretRight} />
          &nbsp;
          <FormattedMessage id="Overview" />
        </h4>
        <div className="DashboardFirst">
          <ul className="plan-info-box">
            <li>
              <div>
                <h2>
                  {!plan || status === "FREE" ? (
                    <FormattedMessage id="FREE_TRIAL" />
                  ) : (
                    name
                  )}
                </h2>
                <h5 style={{ color: statusColor, fontWeight: "bold" }}>
                  <FontAwesomeIcon
                    style={{
                      color: statusColor,
                      fontSize: "1rem",
                      marginBottom: "0rem",
                    }}
                    icon={status === 'EXPIRED' ? faBan : faCheckSquare}
                  />
                  &nbsp;&nbsp;
                  {status
                    ? planStatusCodes[status]
                    : planStatusCodes["EXPIRED"]}
                </h5>
                {plan && (
                  <h6>
                    <FontAwesomeIcon
                      style={{ fontSize: "1.1rem", marginBottom: "0rem" }}
                      icon={faCalendarCheck}
                    />
                    &nbsp;&nbsp;
                    {status === "FREE" ? (
                      <FormattedMessage id="USED_FREE_PLAN" />
                    ) : locale === "ko" ? (
                      <>
                      {getDateFormatKr(startDate)}
                        ~
                          {getDateFormatKr(expirationDate)}
                      </>
                    ) : (
                      <>
                        {getDateFormatEn(startDate)}
                        &nbsp;~&nbsp;
                        {getDateFormatEn(expirationDate)}
                      </>
                    )}
                  </h6>
                )}
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

                      <td
                        style={{
                          width: "50%",
                          fontWeight: "bold",
                          fontSize: "1rem",
                          borderRight: "0.5px solid rgb(180, 180, 180)",
                          borderTop: "0.5px solid rgb(180, 180, 180)",
                        }}
                      >
                        {status === "FREE" ? (
                          "∞"
                        ) : (
                          <FormattedMessage
                            id="daysLeft"
                            values={{ day: remainingDate > 0 ? remainingDate : 0 }}
                          />
                        )}
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
                  <h6>
                    <FormattedMessage id="ALLUSERNUM" />
                  </h6>
                  <p>
                    <FontAwesomeIcon className="countBox-icon" icon={faUser} />
                    &nbsp;
                    <b>
                      {userNum}
                      <FormattedMessage id="PERNUM" />
                    </b>
                  </p>
                </div>
                <div>
                  <h6>
                    <FormattedMessage id="REGISTEREDUSERNUM" />
                  </h6>
                  <p>
                    <FontAwesomeIcon icon={faUserPlus} />
                    &nbsp;
                    <b>
                      {registerNum}
                      <FormattedMessage id="PERNUM" />
                    </b>
                  </p>
                </div>
                <div>
                  <h6>
                    <FormattedMessage id="UNREGISTEREDUSERNUM" />
                  </h6>
                  <p>
                    <FontAwesomeIcon icon={faUserTimes} />
                    &nbsp;
                    <b>
                      {unRegisterNum}
                      <FormattedMessage id="PERNUM" />
                    </b>
                  </p>
                </div>
                <div>
                  <h6>
                    <FormattedMessage id="BYPASSUSERNUM" />
                  </h6>
                  <p>
                    <FontAwesomeIcon icon={faHandSparkles} />
                    &nbsp;
                    <b>
                      {byPassNum}
                      <FormattedMessage id="PERNUM" />
                    </b>
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
              <CartesianGrid />
              <XAxis
                dataKey="category"
                type="category"
                allowDuplicatedCategory={false}
              />
              <YAxis
                dataKey="value"
                interval="preserveStartEnd"
                padding={{ bottom: 35 }}
              />
              <Tooltip />
              <Legend />
              {chartData.map(({ color, data, name }) => (
                <Line
                  stroke={color}
                  type="monotone"
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
