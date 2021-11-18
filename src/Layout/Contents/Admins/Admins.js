import React, { useEffect, useState } from "react";
import "./Admins.css";
// import "../../Login/Login.css";
import ContentsTitle from "../ContentsTitle";
import AdminAdd from "./AdminAdd";
import AdminUpdate from "./AdminUpdate";
import { CustomAxiosGet } from "../../../Functions/CustomAxios";
import { getAdminsApi } from "../../../Constants/Api_Route";
const Admins = () => {
  const [admin, setAdmin] = useState(true);
  const [adminAdd, setAdminAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    CustomAxiosGet(getAdminsApi(localStorage.getItem("adminId")), (data) => {
      setTableData(data);
      console.log(data);
    });
  }, []);

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
                <th>이메일</th>
                <th>이름</th>
                <th>권한</th>
                <th>폰</th>
                <th>국가</th>
              </tr>
              {tableData.map((d) => (
                <tr>
                  <td>{d.email}</td>
                  <td>{d.lastName + d.firstName}</td>
                  <td></td>
                  <td>{d.phone}</td>
                  <td></td>
                </tr>
              ))}
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
