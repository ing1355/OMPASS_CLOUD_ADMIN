import React from "react";
import "./Logs.css";
import ContentsTitle from "../ContentsTitle";

const Logs = () => {
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
        </table>
      </div>
    </>
  );
};

export default Logs;
