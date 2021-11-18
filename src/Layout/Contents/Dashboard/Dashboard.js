import React from "react";
import "./Dashboard.css";
import ContentsTitle from "../ContentsTitle";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserCog,
  faUserAltSlash,
  faHandSparkles,
  faCaretRight,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
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
                <h2>Free Plan</h2>
                <table>
                  <tr>
                    <td>남은 일 수</td>
                    <td>20일 </td>
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
                    <b>20명</b>
                  </p>
                </div>
                <div>
                  <h6>관리자 수</h6>
                  <p>
                    <FontAwesomeIcon
                      style={{ width: "15%" }}
                      icon={faUserCog}
                    />{" "}
                    <b>2명</b>
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
                    <b>4명</b>
                  </p>
                </div>{" "}
                <div>
                  <h6>비활성화 수</h6>
                  <p>
                    <FontAwesomeIcon
                      style={{ width: "15%" }}
                      icon={faUserAltSlash}
                    />{" "}
                    <b>4명</b>
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
              <th>사용자 아이디</th> <th>인증 형태</th> <th>소속</th>
              <th>시간</th>
              <th>횟수</th>
            </tr>
            <tr>
              <td>dbflagovl@omsecurity.kr</td>
              <td>인증</td>
              <td>원모어시큐리티</td>
              <td>2021-11-16 16:55:10</td>
              <td>5번</td>
            </tr>
            <tr>
              <td>dbflagovl@omsecurity.kr</td>
              <td>인증</td>
              <td>원모어시큐리티</td>
              <td>2021-11-16 16:55:10</td>
              <td>5번</td>
            </tr>{" "}
            <tr>
              <td>dbflagovl@omsecurity.kr</td>
              <td>인증</td>
              <td>원모어시큐리티</td>
              <td>2021-11-16 16:55:10</td>
              <td>5번</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
