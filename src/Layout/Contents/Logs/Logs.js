import React, { useEffect, useState } from "react";
import "./Logs.css";
import ContentsTitle from "../ContentsTitle";
import { CustomAxiosGet } from "../../../Functions/CustomAxios";

const test_data = [{

}]

const Logs = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    CustomAxiosGet(`/v1/admins/${localStorage.getItem('adminId')}/logs`, (res) => {
      setTableData(res.data);
    })
  },[])

  return (
    <>
      <ContentsTitle />
      <div className="LogBox">
        <table>
          <tr>
            <th>Device</th>
            <th>Platform</th>
            <th>Model</th>
            <th>Duo Mobile</th>
            <th>Users</th>
          </tr>
          {
            tableData.map((item, ind) => <tr key={ind}>
              {Object.keys(item).map((_item,_ind) => <td key={_ind}>{_item}</td>)}
            </tr>)
          }
        </table>
      </div>
    </>
  );
};

export default Logs;
