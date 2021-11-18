import React, { useEffect, useState } from "react";
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
import { CustomAxiosGet } from "../../../Functions/CustomAxios";
import {
  getDashboardTopApi,
  getDashboardBottomApi,
} from "../../../Constants/Api_Route";

const Dashboard = () => {
  const [userNum, setUserNum] = useState(0);
  const [adminNum, setAdminNum] = useState(0);
  const [byPassNum, setByPassNum] = useState(0);
  const [disableNum, setDisableNum] = useState(0);
  const [plan, setPlan] = useState({});
  const [authLogs, setAuthLogs] = useState([]);

  useEffect(() => {
    CustomAxiosGet(
      getDashboardTopApi(localStorage.getItem("adminId")),
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
      }
    );
    CustomAxiosGet(
      getDashboardBottomApi(localStorage.getItem("adminId")),
      (data) => {
        setAuthLogs(data.slice(-5));
      }
    );
  }, []);
  return (
    <>
      {/* <ContentsTitle /> */}
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
                  />{" "}
                  현재 사용 중
                </h5>{" "}
                <h6>2021년 11월 1일 ~</h6>
                <h2>{plan.name} Plan</h2>
                <table>
                  <tr>
                    <td>남은 일 수</td>
                    <td>{plan.remainingDays}일 </td>
                  </tr>
                  {/* <tr>
                    <td>예상 결제 일</td>
                    <td>12월 2일 </td>
                  </tr> */}
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
                    <FontAwesomeIcon style={{ width: "15%" }} icon={faUser} />{" "}
                    <b>{userNum}명</b>
                  </p>
                </div>
                <div>
                  <h6>관리자 수</h6>
                  <p>
                    <FontAwesomeIcon
                      style={{ width: "15%" }}
                      icon={faUserCog}
                    />{" "}
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
                    />{" "}
                    <b>{byPassNum}명</b>
                  </p>
                </div>{" "}
                <div>
                  <h6>비활성화 수</h6>
                  <p>
                    <FontAwesomeIcon
                      style={{ width: "15%" }}
                      icon={faUserAltSlash}
                    />{" "}
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
          <div className="chart"></div>
        </div>

        <div className="DashboardThird">
          <h4 className="DashboardTitle">
            <FontAwesomeIcon icon={faCaretRight} /> 최근 인증 로그
          </h4>
          <table>
            <tr>
              <th>사용자 아이디</th>
              <th>활동</th>
              <th>어플리케이션</th>
              <th>상태</th>
              <th>시간</th>
            </tr>
            {authLogs.map((log) => (
              <tr>
                <td>{log.userId}</td>
                <td>{log.act}</td>
                <td>{log.userId}</td>
                <td>{log.createdDate}</td>
                <td>{log.userId}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
