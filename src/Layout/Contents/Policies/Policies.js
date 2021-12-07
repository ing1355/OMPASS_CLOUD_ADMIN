/* eslint-disable no-undef */
import React, { useState, useEffect, useLayoutEffect } from "react";
import "./Policies.css";
import ContentsTitle from "../ContentsTitle";
import "../../../App.css";
import GlobalPolicy from "./Global_Policy";
import { message } from "antd";
import CustomTable from "../../../CustomComponents/CustomTable";
import {
  customPolicyColumns,
  globalPolicyColumns,
} from "../../../Constants/TableColumns";

const globalPolicyTableData = [
  {
    status: "Enabled",
    policy: "Authentication policy",
    description:
      "Require two-factor authentication or enrollment when applicable, unless there is a superseding policy configured.",
  },
  { status: "", policy: "User location", description: "No restrictions." },
  {
    status: "",
    policy: "Browsers",
    description: "Don't require users to have the app",
  },
  {
    status: "",
    policy: "Authentication methods",
    description: "No restrictions.",
  },
  { status: "", policy: "OMPASS Mobile app", description: "No restrictions." },
];

const customPolicyTableMockData = [
  {
    title: "test1",
    authenticationPolicy: true,
    userLocation: true,
    browsers: true,
    authenticationMethods: true,
    mobile: true,
  },
  {
    title: "test2",
    authenticationPolicy: true,
    userLocation: true,
    browsers: true,
    authenticationMethods: true,
    mobile: false,
  },
  {
    title: "test3",
    authenticationPolicy: true,
    userLocation: true,
    browsers: true,
    authenticationMethods: false,
    mobile: true,
  },
  {
    title: "test4",
    authenticationPolicy: true,
    userLocation: true,
    browsers: false,
    authenticationMethods: true,
    mobile: true,
  },
];

const Policies = () => {
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [isCustomPolicy, setIsCustomPolicy] = useState(false);

  const saveCallback = () => {
    setEditDrawerOpen(false);
    message.success("저장하였습니다.");
    console.log("save test");
  };

  return (
    <div
      className="contents-container"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <GlobalPolicy
        visible={editDrawerOpen}
        setVisible={setEditDrawerOpen}
        isCustomPolicy={isCustomPolicy}
        saveCallback={saveCallback}
      />

      <ContentsTitle title="Policy Info" />
      <div className="PoliciesBox">
        <div className="PoliciesTitleBox">
          <p>
            Duo's policy engine gives you the ability to control how your users
            authenticate, from where, using which types of devices. Policies can
            be defined system-wide, per application, or for specific groups.
          </p>
          <button
            className="button"
            onClick={() => {
              setIsCustomPolicy(false);
              setEditDrawerOpen(true);
            }}
          >
            Edit Global Policy
          </button>
        </div>

        <CustomTable
          columns={globalPolicyColumns}
          datas={globalPolicyTableData}
          className="global-policy-table-container"
          // columnsHide={true}
        />

        <div className="PoliciesBottomBox">
          <h5>Custom Policies</h5>
          <p>
            To enforce different policies on different applications, create a
            custom policy and assign it to those applications. Policy settings
            in a custom policy will override anything set in the global policy.
          </p>
          <CustomTable
            columns={customPolicyColumns}
            datas={customPolicyTableMockData}
            rowClick={() => {
              setIsCustomPolicy(true);
              setEditDrawerOpen(true);
            }}
          />
          <button
            className="button"
            onClick={() => {
              setIsCustomPolicy(true);
              setEditDrawerOpen(true);
            }}
          >
            New Policy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Policies;
