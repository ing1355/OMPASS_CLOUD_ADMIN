/* eslint-disable no-undef */
import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
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

const globalPolicyMockData = {
  authenticationPolicy: 'active',
  userLocation: [{ ipAddress: '192.168.182.42', policy: 'active', },
  { ipAddress: '192.168.182.32', policy: 'inActive', },
  { ipAddress: '192.168.182.22', policy: 'deny', }],
  browsers: ['Chrome',
  'Chrome Mobile',],
  authenticationMethods: ['OMPASS Push',
  'OMPASS Mobile passcodes',],
  mobile: 'active',
}

const globalPolicyTableData = [
  {
    status: "",
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
    authenticationPolicy: 'active',
    userLocation: [{ ipAddress: '192.168.182.42', policy: 'active', },
    { ipAddress: '192.168.182.32', policy: 'inActive', },
    { ipAddress: '192.168.182.22', policy: 'deny', }],
    browsers: ['Chrome',
    'Chrome Mobile',],
    authenticationMethods: ['OMPASS Push',
    'OMPASS Mobile passcodes',],
    mobile: 'active',
  },
  {
    title: "test2",
    authenticationPolicy: 'inActive',
    userLocation: [{ ipAddress: '192.168.182.42', policy: 'active', },
    { ipAddress: '192.168.182.32', policy: 'inActive', },
    { ipAddress: '192.168.182.22', policy: 'deny', }],
    browsers: ['Chrome',
    'Chrome Mobile',],
    authenticationMethods: ['OMPASS Push',
    'OMPASS Mobile passcodes',],
    mobile: 'inActive',
  },
  {
    title: "test3",
    authenticationPolicy: 'deny',
    userLocation: [{ ipAddress: '192.168.182.42', policy: 'active', },
    { ipAddress: '192.168.182.32', policy: 'inActive', },
    { ipAddress: '192.168.182.22', policy: 'deny', }],
    browsers: ['Chrome',
    'Chrome Mobile',],
    authenticationMethods: ['OMPASS Push',
    'OMPASS Mobile passcodes',],
    mobile: 'active',
  }
];

const Policies = () => {
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [isCustomPolicy, setIsCustomPolicy] = useState(false);
  const [isEditPolicy, setIsEditPolicy] = useState(false);
  const [globalPoliciesData, setGlobalPoliciesData] = useState(globalPolicyTableData)
  const [customPoliciesData, setCustomPoliciesData] = useState(customPolicyTableMockData)
  const [selectedRowData, setSelectedRowData] = useState(null);

  const saveCallback = useCallback((result) => {
    console.log(isEditPolicy, isCustomPolicy)
    setEditDrawerOpen(false);
    message.success("저장하였습니다.");
    if(isEditPolicy) {
      if(isCustomPolicy) setCustomPoliciesData([...customPoliciesData, ({...result})])
      else setGlobalPoliciesData(result)
    } else { // Add New Policy
      setCustomPoliciesData([...customPoliciesData, result])
    }
    console.log("save test", result);
  },[customPoliciesData, isEditPolicy, isCustomPolicy]);

  const editCallback = useCallback((result, title) => {
    if(isCustomPolicy) {
      setCustomPoliciesData(customPoliciesData.map(c => c.title === title ? result : c))
    } else {
      setGlobalPoliciesData(result);
    }
  },[customPoliciesData, globalPoliciesData, isCustomPolicy])

  const deleteCallback = useCallback((title) => {
    message.success('삭제되었습니다.')
    setEditDrawerOpen(false);
    setCustomPoliciesData(customPoliciesData.filter(c => c.title !== title));
  },[customPoliciesData])

  useEffect(() => {
    if(!editDrawerOpen) setSelectedRowData(null);
  },[editDrawerOpen])

  return (
    <div
      className="contents-container"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <GlobalPolicy
        visible={editDrawerOpen}
        setVisible={setEditDrawerOpen}
        isCustomPolicy={isCustomPolicy}
        isEditPolicy={isEditPolicy}
        editData={selectedRowData}
        saveCallback={saveCallback}
        editCallback={editCallback}
        deleteCallback={deleteCallback}
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
              setSelectedRowData(globalPoliciesData)
              setIsEditPolicy(true);
              setIsCustomPolicy(false);
              setEditDrawerOpen(true);
            }}
          >
            Edit Global Policy
          </button>
        </div>

        <CustomTable
          columns={globalPolicyColumns}
          datas={globalPoliciesData}
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
            datas={customPoliciesData}
            rowClick={(rowData) => {
              setSelectedRowData(rowData);
              setIsEditPolicy(true);
              setIsCustomPolicy(true);
              setEditDrawerOpen(true);
            }}
          />
          <button
            className="button"
            onClick={() => {
              setIsEditPolicy(false);
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
