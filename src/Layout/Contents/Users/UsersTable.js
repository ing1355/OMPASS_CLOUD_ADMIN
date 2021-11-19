import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import UserDetail from "./UserDetail";
const UsersTable = ({ userProfile, tableData }) => {
  const history = useHistory();
  return (
    <>
      <ul className="UsersBox3_contents">
        <li>
          <table>
            <thead>
              <tr>
                <th>이름</th>
                <th>이메일</th>
                <th>어플리케이션</th>
                <th>상태</th>
                <th>마지막로그인</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((d, ind) => (
                <tr
                  key={ind}
                  onClick={() => {
                    history.push("/Users/Detail/" + d.userId);
                  }}
                >
                  <td>{d.userId}</td>
                  <td>{d.appName}</td>
                  <td>{d.bypass.toString()}</td>
                  <td>{d.type}</td>
                  <td>{d.updateDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </li>
      </ul>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
