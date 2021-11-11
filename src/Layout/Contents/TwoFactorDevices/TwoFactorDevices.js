import React from "react";
import "./TwoFactorDevices.css";
import ContentsTitle from "../ContentsTitle";

const TwoFactorDevices = () => {
  return (
    <>
      <ContentsTitle />
      <div className="DevicesBox">
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

export default TwoFactorDevices;
