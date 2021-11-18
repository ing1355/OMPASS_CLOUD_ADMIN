import React, { useEffect, useState } from "react";
import { getUsersApi } from "../../../Constants/Api_Route";
import { CustomAxiosGet } from "../../../Functions/CustomAxios";

const UsersTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    CustomAxiosGet(getUsersApi(localStorage.getItem("adminId")), (data) => {
      setTableData(data);
    });
  }, []);

  return (
    <>
      <ul className="UsersBox3_contents">
        <li>
          <table>
            <tr>
              <th>이메일</th>
              <th>이름</th>
              <th>어플리케이션</th>
              <th>상태</th>
              <th>마지막로그인</th>
            </tr>
            {tableData.map((d) => (
              <tr>
                <td>{d.appName}</td>
                <td>{d.userId}</td>
                <td>{d.bypass.toString()}</td>
                <td>{d.type}</td>
                <td></td>
              </tr>
            ))}
          </table>
        </li>
      </ul>
    </>
  );
};
export default UsersTable;
