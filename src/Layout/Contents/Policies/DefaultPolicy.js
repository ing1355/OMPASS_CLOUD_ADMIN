/* eslint-disable no-undef */
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  useMemo
} from "react";
import "./Policies.css";
import "../../../App.css";
import PolicyDrawer from "./PolicyDrawer";
import CustomTable from "../../../CustomComponents/CustomTable";
import { PolicyColumns } from "../../../Constants/TableColumns";
import { CustomAxiosGet } from "../../../Functions/CustomAxios";
import { getGlobalPolicyApi } from "../../../Constants/Api_Route";
import { connect } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import LinkDocument from "../../../CustomComponents/LinkDocument";
import { countryCodes_KR, countryCodes_US } from "./Country_Code";

const DefaultPolicy = ({ userProfile, locale }) => {
  const { adminId } = userProfile;
  const { formatMessage } = useIntl()
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [isEditPolicy, setIsEditPolicy] = useState(false);
  const [globalPoliciesData, setGlobalPoliciesData] = useState({});
  const [globalPoliciesTableData, setGlobalPoliciesTableData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const globalPoliciesDataRef = useRef(null);

  const getDescription = useCallback((key) => {
    const value = globalPoliciesDataRef.current[key];
    switch (key) {
      case "accessControl":
        return <FormattedMessage id={value === "ACTIVE"
          ? "ACCESSCONTROLACTIVEDESCRIPTION"
          : value === "INACTIVE"
            ? "ACCESSCONTROLINACTIVEDESCRIPTION"
            : "ACCESSCONTROLDENYDESCRIPTION"} />;
      case "userLocations":
        const countryInfo = locale === 'ko' ? countryCodes_KR : countryCodes_US
        const isOtherCountries = value.length > 1 ? formatMessage({ id: 'ETCUSERLOCATION' }) : formatMessage({ id: 'ALLUSERLOCATION' })
        const isTrue = value.filter(v => v.status)
        const isFalse = value.filter(v => !v.status)
        return <><FormattedMessage id="USERLOCATIONPOLICYDESCRIPTION2" /><br />
          <FormattedMessage id="USERLOCATIONPOLICYDESCRIPTION3"
            values={{
              permit: isTrue.length > 0 ? isTrue.map(v => countryInfo[v.location] || isOtherCountries).join(', ') : (locale === 'ko' ? '없음' : 'None'),
              deny: isFalse.length > 0 ? isFalse.map(v => countryInfo[v.location] || isOtherCountries).join(', ') : (locale === 'ko' ? '없음' : 'None')
            }}
          /></>;
      case "browsers":
        return <FormattedMessage id="BROWSERSPOLICYDESCRIPTION" values={{ param: value.map(v => formatMessage({id: v})).join(', ') }} />;
      default:
        break;
    }
  }, [locale]);

  const PolicyTableDataFeature = useMemo(() => [
    {
      status: "",
      policy: "ACCESSCONTROLTITLE",
      key: "accessControl",
      description: getDescription,
    },
    {
      status: "",
      policy: "USERLOCATIONPOLICYTITLE",
      key: "userLocations",
      description: getDescription,
    },
    {
      status: "",
      key: "browsers",
      policy: "BROWSERSPOLICYTITLE",
      description: getDescription,
    },
    // {
    //   status: "",
    //   key: "mobilePatch",
    //   policy: "OMPASSMOBILEPOLICYTITLE",
    //   description: getDescription,
    // },
  ], [getDescription]);

  const convertDataToTableData = useCallback(
    (_) => {
      const data = _ || { ...globalPoliciesData };
      const result = Object.keys(data)
        .map((d) => {
          const result = {};
          result[d] = data[d];
          if (d === "policyId" || d === "title") return undefined;
          return result;
        })
        .filter((el) => el !== undefined);
      if (!result.length) return result;
      return PolicyTableDataFeature.map((td) => {
        const target = result.find((r) => Object.keys(r)[0] === td.key)[td.key];
        return {
          ...td,
          status:
            td.key !== "accessControl" && data.accessControl !== "ACTIVE"
              ? "disable"
              : td.key === "userLocations"
                ? data.userLocationEnable
                : target.length > 0
        };
      });
    },
    [globalPoliciesData, PolicyTableDataFeature]
  );

  useLayoutEffect(() => {
    if (adminId) {
      CustomAxiosGet(
        getGlobalPolicyApi(adminId),
        (data) => {
          setGlobalPoliciesData(data);
          setGlobalPoliciesTableData(convertDataToTableData(data));
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }, [adminId]);

  useLayoutEffect(() => {
    globalPoliciesDataRef.current = globalPoliciesData;
    setGlobalPoliciesTableData(convertDataToTableData(globalPoliciesData));
  }, [globalPoliciesData, locale]);

  const editCallback = useCallback((result, policyId) => {
    setGlobalPoliciesData(result);
  }, []);

  useEffect(() => {
    if (!editDrawerOpen) setSelectedRowData(null);
  }, [editDrawerOpen]);

  return (
    <div
      className="contents-container"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <LinkDocument link="/document/policy" />

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
          <h5 className="policies-h5">
            <FormattedMessage id="DEFAULTPOLICY" />
          </h5>
          <p>
            <FormattedMessage id="GLOBALPOLICYDESCRIPTION" />
          </p>
        </div>

        <CustomTable
          columns={PolicyColumns}
          datas={globalPoliciesTableData}
          className="global-policy-table-container"
        />
        <button
          className="button"
          style={{ float: "right" }}
          onClick={() => {
            setSelectedRowData({ ...globalPoliciesData });
            setIsEditPolicy(true);
            setEditDrawerOpen(true);
          }}
        >
          <FormattedMessage id="DEFAULTPOLICYUPDATE" />
        </button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
    locale: state.locale
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPolicy);
