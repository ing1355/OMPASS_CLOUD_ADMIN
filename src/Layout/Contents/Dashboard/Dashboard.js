import React from "react";
import "./Dashboard.css";
import ContentsTitle from "../ContentsTitle";
const Dashboard = () => {
  return (
    <>
      <ContentsTitle />
      <div className="DashboardBox">
        <div className="billing-change-help-container">
          <div className="billing-change-help-icon">test</div>
          <div className="billing-change-help-msg">
            Protect your first application or read the Getting Started Guide for
            help.
          </div>
        </div>

        <div className="DashboardBox3">
          <h4>Users</h4>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="DashboardBox4">
          <h4>0 Authentications</h4>
          <p>In the last 48 hours, shown at every 30 minutes.</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
