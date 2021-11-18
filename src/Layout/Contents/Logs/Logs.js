import React, { useEffect, useState } from "react";
import "./Logs.css";
import ContentsTitle from "../ContentsTitle";
import { CustomAxiosGet } from "../../../Functions/CustomAxios";
import { getLogsApi } from "../../../Constants/Api_Route";

const Logs = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    CustomAxiosGet(
      getLogsApi(localStorage.getItem('adminId')),
      (data) => {
        setTableData(data);
      }
    );
  }, []);

  return (
    <>
      <ContentsTitle />
      <div className="LogBox">
        <table>
          <tr>
            <th>Action</th>
            <th>Application Name</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
          {tableData.map((item, ind) => <tr key={ind}>
            <td>{item.act}</td>
            <td>{item.appName}</td>
            <td>{item.status}</td>
            <td>{item.createdDate}</td>
          </tr>)}
        </table>
      </div>
    </>
  );
};

export default Logs;
