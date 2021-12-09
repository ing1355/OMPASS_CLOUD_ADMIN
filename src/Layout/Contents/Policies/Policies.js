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
import {CustomAxiosGetAll, CustomAxiosPost} from '../../../Functions/CustomAxios'
import { addCustomPolicyApi, getCustomPoliciesApi, getGlobalPolicyApi } from "../../../Constants/Api_Route";
import { connect } from "react-redux";

const globalPolicyTableDataFeature = [
  {
    status: "",
    policy: "Access Control",
    key: 'accessControl',
    description:
      "Require two-factor authentication or enrollment when applicable, unless there is a superseding policy configured.",
  },
  { status: "", policy: "User location", description: "No restrictions.", key: 'userLocations' },
  {
    status: "",
    key: 'browsers',
    policy: 'Browsers',
    description: "Don't require users to have the app",
  },
  {
    status: "",
    key: 'authenticationMethods',
    policy: "Authentication methods",
    description: "No restrictions.",
  },
  { status: "", key:'mobilePatch', policy: "OMPASS Mobile app", description: "No restrictions." },
];

const Policies = ({userProfile}) => {
  const {adminId} = userProfile
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [isCustomPolicy, setIsCustomPolicy] = useState(false);
  const [isEditPolicy, setIsEditPolicy] = useState(false);
  const [globalPoliciesData, setGlobalPoliciesData] = useState(null);
  const [globalPoliciesTableData, setGlobalPoliciesTableData] = useState([])
  const [customPoliciesData, setCustomPoliciesData] = useState([])
  const [selectedRowData, setSelectedRowData] = useState(null);

  const policyDatas = {
    title: null,
    accessControl: null,
    userLocations: null,
    browsers: null,
    authenticationMethods: null,
    mobilePatch: null
  }

  useLayoutEffect(() => {
    CustomAxiosGetAll([getGlobalPolicyApi(adminId), getCustomPoliciesApi(adminId)], [(data) => {
      const result = Object.keys(data).map(d => {
        const result = {};
        result[d] = data[d]
        if(d === 'policyId' || d === 'title') return;
        return result
      }).filter(el => el !== undefined)
      setGlobalPoliciesData(data);
      setGlobalPoliciesTableData(globalPolicyTableDataFeature.map(td => {
        return {
          ...td,
          status: result.find(r => Object.keys(r)[0] === td.key)[td.key].length > 0
        }
      }))
    }, (data) => {
      // console.log(data);
      setCustomPoliciesData(data);
    }],(err) => {
      console.log(err);
    })
  },[])

  useLayoutEffect(() => {
    // if(globalPoliciesData) setGlobalPoliciesTableData(globalPolicyTableDataFeature.map(td => {
    //   return {
    //     ...td,
    //     status: result.find(r => Object.keys(r)[0] === td.key)[td.key].length > 0
    //   }
    // }))
  },[globalPoliciesData, globalPoliciesTableData])

  const saveCallback = useCallback((result) => {
    setCustomPoliciesData([...customPoliciesData, result])
  },[customPoliciesData, isEditPolicy, isCustomPolicy]);

  const editCallback = useCallback((result, policyId) => {
    if(isCustomPolicy) {
      setCustomPoliciesData(customPoliciesData.map(c => c.policyId === policyId ? result : c))
    } else {
      const data = Object.keys(result).map(d => {
        const _ = {};
        _[d] = result[d]
        if(d === 'policyId' || d === 'title') return;
        return _
      }).filter(el => el !== undefined)
      setGlobalPoliciesData(data);
      setGlobalPoliciesTableData(globalPolicyTableDataFeature.map(td => {
        return {
          ...td,
          status: data.find(r => Object.keys(r)[0] === td.key)[td.key].length > 0
        }
      }))
    }
  },[customPoliciesData, isCustomPolicy])

  const deleteCallback = useCallback((policyId) => {
    setCustomPoliciesData(customPoliciesData.filter(c => c.policyId !== policyId));
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
          datas={globalPoliciesTableData}
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

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Policies);