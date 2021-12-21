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
  PolicyColumns,
} from "../../../Constants/TableColumns";
import {
  CustomAxiosGet
} from "../../../Functions/CustomAxios";
import {
  getGlobalPolicyApi,
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

const DefaultPolicy = ({ userProfile }) => {
  const { adminId } = userProfile;
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [isEditPolicy, setIsEditPolicy] = useState(false);
  const [globalPoliciesData, setGlobalPoliciesData] = useState({});
  const [globalPoliciesTableData, setGlobalPoliciesTableData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const { formatMessage } = useIntl();

  useLayoutEffect(() => {
    CustomAxiosGet(getGlobalPolicyApi(adminId),
      (data) => {
        const result = Object.keys(data)
          .map((d) => {
            const result = {};
            result[d] = data[d];
            if (d === "policyId" || d === "title") return;
            return result;
          })
          .filter((el) => el !== undefined);
        setGlobalPoliciesData(data);
        setGlobalPoliciesTableData(
          PolicyTableDataFeature.map((td) => {
            return {
              ...td,
              status:
                result.find((r) => Object.keys(r)[0] === td.key)[td.key]
                  .length > 0,
            };
          })
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const editCallback = useCallback(
    (result, policyId) => {
      setGlobalPoliciesTableData(
        PolicyTableDataFeature.map((td) => {
          return {
            ...td,
            status: result[td.key].length > 0,
          };
        })
      );
    },
    [globalPoliciesTableData]
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
        isCustomPolicy={false}
        isEditPolicy={isEditPolicy}
        editData={selectedRowData}
        editCallback={editCallback}
      />

      <div className="PoliciesBox">
        <div className="PoliciesTitleBox">
          <h5 className="policies-h5"><FormattedMessage id="DEFAULTPOLICY" /></h5>
          <p><FormattedMessage id="GLOBALPOLICYDESCRIPTION" /></p>
        </div>

        <CustomTable
          columns={PolicyColumns}
          datas={globalPoliciesTableData}
          className="global-policy-table-container"
        />
        <button
          className="button"
          style={{ float: 'right' }}
          onClick={() => {
            setSelectedRowData(globalPoliciesData);
            setIsEditPolicy(true);
            setEditDrawerOpen(true);
          }}
        >
          <FormattedMessage id="DEFAULTPOLICY" />&nbsp;<FormattedMessage id="UPDATE" />
        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPolicy);
