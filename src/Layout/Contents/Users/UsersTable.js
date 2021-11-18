import React, { useEffect, useState } from "react";
import { getUsersApi } from "../../../Constants/Api_Route";
import { CustomAxiosGet } from "../../../Functions/CustomAxios";

const UsersTable = () => {
  const [tableData, setTableData] = useState([]);
  
  useEffect(() => {
    CustomAxiosGet(getUsersApi(localStorage.getItem('adminId')),(data) => {
      setTableData(data);
    })
  },[])

  return (
    <>
      <ul className="UsersBox3_contents">
        <li>
          <table>
            <tr>
              <th>Application Name</th>
              <th>Username</th>
              <th>ByPass</th>
              <th>type</th>
            </tr>
            {
              tableData.map(d => <tr>
                <td>{d.appName}</td>
                <td>{d.userId}</td>
                <td>{d.bypass.toString()}</td>
                <td>{d.type}</td>
              </tr>)
            }
          </table>
        </li>
      </ul>
    </>
  );
};
export default UsersTable;
