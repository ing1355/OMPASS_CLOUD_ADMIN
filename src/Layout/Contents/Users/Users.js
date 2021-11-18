import React, { useState } from "react";
import "./Users.css";
import UsersTable from "./UsersTable";
import ContentsTitle from "../ContentsTitle";
import "../../../App.css";

const Users = () => {
  const [test1, setTest1] = useState(true);
  const [test2, setTest2] = useState(false);
  const [test3, setTest3] = useState(false);
  const [test4, setTest4] = useState(false);

  return (
    <>
      <ContentsTitle />
      <div className="UsersdBox">
        <div className="billing-change-help-container">
          <div className="billing-change-help-icon">test</div>
          <div className="billing-change-help-msg">
            Need to activate a replacement phone? Learn more about Reactivating
            Duo Mobile.
          </div>
        </div>

        <div className="UsersBox3">
          <ul className="UsersBox3_title">
            <li
              style={
                test1 === true
                  ? {
                      borderBottom: "5px solid rgb(92, 106, 119)",
                    }
                  : null
              }
              onClick={() => {
                setTest1(true);
                setTest2(false);
                setTest3(false);
                setTest4(false);
              }}
            >
              <h3>0</h3>
              <p>전체 사용자 수</p>
            </li>
            <li
              style={
                test2 === true
                  ? {
                      borderBottom: "5px solid rgb(92, 106, 119)",
                    }
                  : null
              }
              onClick={() => {
                setTest1(false);
                setTest2(true);
                setTest3(false);
                setTest4(false);
              }}
            >
              <h3>0</h3>
              <p>등록되지 않은 사용자</p>
            </li>{" "}
            <li
              style={
                test3 === true
                  ? {
                      borderBottom: "5px solid rgb(92, 106, 119)",
                    }
                  : null
              }
              onClick={() => {
                setTest1(false);
                setTest2(false);
                setTest3(true);
                setTest4(false);
              }}
            >
              <h3>0</h3>
              <p>비활성화된 사용자</p>
            </li>{" "}
            <li
              style={
                test4 === true
                  ? {
                      borderBottom: "5px solid rgb(92, 106, 119)",
                    }
                  : null
              }
              onClick={() => {
                setTest1(false);
                setTest2(false);
                setTest3(false);
                setTest4(true);
              }}
            >
              <h3>0</h3>
              <p>바이패스 사용자</p>
            </li>
          </ul>
          <ul className="UsersBox3_contents">
            {test1 === true ? <UsersTable /> : null}
            {test2 === true ? <li>test2test2</li> : null}
            {test3 === true ? <li>test3test3test3</li> : null}
            {test4 === true ? <li>test4test4test4test4</li> : null}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Users;
