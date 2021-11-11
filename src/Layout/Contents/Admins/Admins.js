import React, { useState } from "react";
import "./Admins.css";
import ContentsTitle from "../ContentsTitle";
import AdminAdd from "./AdminAdd";
import AdminUpdate from "./AdminUpdate";
const Admins = () => {
  const [admin, setAdmin] = useState(true);
  const [adminAdd, setAdminAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  return (
    <>
      <ContentsTitle />
      <div className="AdminBox">
        {admin === true ? (
          <div>
            <div className="adminAdd">
              <p>Admin Login Settings</p>
              <button
                onClick={() => {
                  setAdmin(false);
                  setAdminAdd(true);
                }}
              >
                관리자 추가
              </button>
            </div>
            <table>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Last Login (UTC)</th>
              </tr>
              <tr>
                <td className="nameUpdate">
                  <a
                    onClick={() => {
                      setUpdate(true);
                      setAdmin(false);
                    }}
                  >
                    choi yurim
                  </a>
                </td>
                <td>dbflagovl12@naver.com</td>
                <td>Active</td>
                <td>Nov 8, 2021 4:36 AM</td>
              </tr>
            </table>
          </div>
        ) : null}
        {adminAdd === true ? (
          <AdminAdd setAdmin={setAdmin} setAdminAdd={setAdminAdd} />
        ) : null}

        {update === true ? (
          <AdminUpdate setUpdate={setUpdate} setAdmin={setAdmin} />
        ) : null}
      </div>
    </>
  );
};

export default Admins;
