import React, { useEffect, useLayoutEffect, useState } from "react";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserCog,
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
import { message } from "antd";
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

const Dashboard = ({ userProfile, locale }) => {
  const { adminId } = userProfile;
  const [userNum, setUserNum] = useState(0);
  const [registerNum, setRegisterNum] = useState(0);
  const [byPassNum, setByPassNum] = useState(0);
  const [unRegisterNum, setUnRegisterNum] = useState(0);
  const [plan, setPlan] = useState({});
  const [authLogs, setAuthLogs] = useState([]);
  const [chartData, setChartData] = useState([]);

  const planStatusCodes = {
    STOPPED: "사용하지 않음",
    RUN: <FormattedMessage id="Valid" />,
    CANCEL: <FormattedMessage id="Valid" />,
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
            data.map((d) => ({
              name: d.name,
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

  const getDateFormatEn = (date) => {
    const options = {
      day: "numeric",
      year: "numeric",
      month: "long",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <div className="contents-container" style={{ width: 1400 }}>
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
                <h2>{plan.name} Plan</h2>
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
                      {plan.createDate ? getDateFormat(plan.createDate) : null}~
                      {plan.expireDate ? getDateFormat(plan.expireDate) : null}
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
                            borderRight: "1px solid rgb(180, 180, 180)",
                            borderTop: "1px solid rgb(180, 180, 180)",
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
                            borderRight: "1px solid rgb(180, 180, 180)",
                            borderTop: "1px solid rgb(180, 180, 180)",
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
              {chartData.map((s) => (
                <Line
                  color="#000000"
                  dataKey="value"
                  data={s.data}
                  name={s.name}
                  key={s.name}
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
