/* eslint-disable no-undef */
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import "./Policies.css";
import "../../../App.css";
import PolicyDrawer from "./PolicyDrawer";
import CustomTable from "../../../CustomComponents/CustomTable";
import {
  PolicyColumns
} from "../../../Constants/TableColumns";
import {
  CustomAxiosGet
} from "../../../Functions/CustomAxios";
import {
  addCustomPolicyApi,
  getCustomPoliciesApi
} from "../../../Constants/Api_Route";
import { connect } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";

const PolicyTableDataFeature = [
  {
    status: "",
    policy: "ACCESSCONTROLTITLE",
    key: "accessControl",
    description: "GLOBALPOLICYDESCRIPTION_1",
  },
  {
    status: "",
    policy: "USERLOCATIONPOLICYTITLE",
    description: "GLOBALPOLICYDESCRIPTION_2",
    key: "userLocations",
  },
  {
    status: "",
    key: "browsers",
    policy: "BROWSERSPOLICYTITLE",
    description: "GLOBALPOLICYDESCRIPTION_3",
  },
  // {
  //   status: "",
  //   key: "authenticationMethods",
  //   policy: "인증 방법 제한",
  //   description: "GLOBALPOLICYDESCRIPTION_4",
  // },
  {
    status: "",
    key: "mobilePatch",
    policy: "OMPASSMOBILEPOLICYTITLE",
    description: "GLOBALPOLICYDESCRIPTION_5",
  },
];

const CustomPolicy = ({ userProfile }) => {
  const { adminId } = userProfile;
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [isEditPolicy, setIsEditPolicy] = useState(false);
  const [customPoliciesData, setCustomPoliciesData] = useState([]);
  const [customPoliciesTableData, setCustomPoliciesTableData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const { formatMessage } = useIntl();

  useLayoutEffect(() => {
    CustomAxiosGet(getCustomPoliciesApi(adminId),
      (data) => {
        const result = data.map(d => Object.keys(d).map(_d => {
          const result = {};
          result[_d] = d[_d];
          if (_d === "policyId" || _d === "title") return;
          return result;
        }).filter(_d => _d));
        setCustomPoliciesData(data);
        setCustomPoliciesTableData(result.map((d, ind) => {
          return PolicyTableDataFeature.map(td => {
            const target = d.find((r) => Object.keys(r)[0] === td.key)[td.key]
            return {
              ...td,
              status: target !== null && target.length > 0,
            }
          })
        }))
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  useLayoutEffect(() => {
    const result = customPoliciesData.map(d => Object.keys(d).map(_d => {
      const result = {};
      result[_d] = d[_d];
      if (_d === "policyId" || _d === "title") return;
      return result;
    }).filter(_d => _d));
    setCustomPoliciesTableData(result.map((d, ind) => {
      return PolicyTableDataFeature.map(td => {
        const target = d.find((r) => Object.keys(r)[0] === td.key)[td.key]
        return {
          ...td,
          status: target !== null && target.length > 0,
        }
      })
    }))
  },[customPoliciesData])

  const saveCallback = useCallback(
    (result) => {
      setCustomPoliciesData([...customPoliciesData, result]);
    },
    [customPoliciesData, isEditPolicy]
  );

  const editCallback = useCallback(
    (result, policyId) => {
      setCustomPoliciesData(
        customPoliciesData.map((c, ind) => {
          if(c.policyId === policyId) {
            return result;
          }
          return c
        })
      );
    },
    [customPoliciesData, customPoliciesTableData]
  );

  const deleteCallback = useCallback(
    (policyId) => {
      setCustomPoliciesData(
        customPoliciesData.filter((c) => c.policyId !== policyId)
      );
    },
    [customPoliciesData]
  );

  useEffect(() => {
    if (!editDrawerOpen) setSelectedRowData(null);
  }, [editDrawerOpen]);

  return (
    <div
      className="contents-container"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <PolicyDrawer
        visible={editDrawerOpen}
        setVisible={setEditDrawerOpen}
        isCustomPolicy={true}
        isEditPolicy={isEditPolicy}
        editData={selectedRowData}
        saveCallback={saveCallback}
        editCallback={editCallback}
        deleteCallback={deleteCallback}
      />

      <div className="PoliciesBox">
        <div className="PoliciesTitleBox">
          <h5 className="policies-h5"><FormattedMessage id="CUSTOMPOLICY" /></h5>
          <p><FormattedMessage id="CUSTOMPOLICYDESCRIPTION" /></p>
          <button
            className="button"
            style={{ marginBottom: '2rem' }}
            onClick={() => {
              setIsEditPolicy(false);
              setEditDrawerOpen(true);
            }}
          >
            <FormattedMessage id="CUSTOMPOLICY" />&nbsp;<FormattedMessage id="ADD" />
          </button>
        </div>
        {
          customPoliciesTableData.map((cD, ind) => <div key={ind} className="PoliciesBottomBox">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><h3>{customPoliciesData[ind].title}</h3><button className="button" onClick={() => {
              setSelectedRowData(customPoliciesData[ind]);
              setIsEditPolicy(true);
              setEditDrawerOpen(true);
            }}>사용자 정의 정책 수정</button></div>
            <CustomTable
              columns={PolicyColumns}
              datas={cD}
            />
          </div>)
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomPolicy);
