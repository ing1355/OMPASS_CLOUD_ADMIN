/* eslint-disable no-undef */
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import "./Policies.css";
import "../../../App.css";
import PolicyDrawer from "./PolicyDrawer";
import CustomTable from "../../../CustomComponents/CustomTable";
import { PolicyColumns } from "../../../Constants/TableColumns";
import {
  CustomAxiosDelete,
  CustomAxiosGet,
} from "../../../Functions/CustomAxios";
import {
  deleteCustomPoliciesApi,
  getCustomPoliciesApi,
} from "../../../Constants/Api_Route";
import { connect } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";
import CustomConfirm from "../../../CustomComponents/CustomConfirm";
import ActionCreators from "../../../redux/actions";
import LinkDocument from "../../../CustomComponents/LinkDocument";
import { countryCodes_KR, countryCodes_US } from "./Country_Code";

const CustomPolicy = ({
  userProfile,
  showSuccessMessage,
  showErrorMessage,
  locale
}) => {
  const { adminId } = userProfile;
  const { formatMessage } = useIntl()
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteConfirmLoading, setDeleteConfirmLoading] = useState(false);
  const [deleteTargetIndex, setDeleteTargetIndex] = useState(null);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [isEditPolicy, setIsEditPolicy] = useState(false);
  const [customPoliciesData, setCustomPoliciesData] = useState([]);
  const [customPoliciesTableData, setCustomPoliciesTableData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const customPoliciesDataRef = useRef(null);

  const closeDeleteConfirm = useCallback(() => {
    setDeleteConfirmVisible(false);
  }, []);

  const openDeleteConfirm = useCallback(() => {
    setDeleteConfirmVisible(true);
  }, []);

  const _deleteCallback = useCallback(() => {
    setDeleteConfirmLoading(true);
    CustomAxiosDelete(
      deleteCustomPoliciesApi(
        adminId,
        customPoliciesData[deleteTargetIndex].policyId
      ),
      () => {
        setDeleteConfirmLoading(false);
        setDeleteConfirmVisible(false);
        showSuccessMessage("DELETE_SUCCESS");
        setCustomPoliciesData(
          customPoliciesData.filter((c, ind) => ind !== deleteTargetIndex)
        );
      },
      () => {
        showErrorMessage("DELETE_FAIL");
        setDeleteConfirmLoading(false);
      }
    );
  }, [adminId, customPoliciesData, deleteTargetIndex]);

  const getDescription = useCallback((key, index) => {
    const value = customPoliciesDataRef.current ? customPoliciesDataRef.current[index][key] : '';
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
        return <FormattedMessage id="BROWSERSPOLICYDESCRIPTION" values={{ param: value.map(v => formatMessage({ id: v })).join(', ') }} />;
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
  ], [getDescription]);

  useLayoutEffect(() => {
    if (adminId) {
      CustomAxiosGet(
        getCustomPoliciesApi(adminId),
        (data) => {
          setCustomPoliciesData(data);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }, [adminId]);

  useLayoutEffect(() => {
    customPoliciesDataRef.current = customPoliciesData;
    const result = customPoliciesData.map((d) =>
      Object.keys(d)
        .map((_d) => {
          const result = {};
          result[_d] = d[_d];
          if (_d === "policyId" || _d === "title") return undefined;
          return result;
        })
        .filter((_d) => _d)
    );
    setCustomPoliciesTableData(
      result.map((d, ind) => {
        return PolicyTableDataFeature.map((td) => {
          const target = d.find((r) => Object.keys(r)[0] === td.key)[td.key];
          return {
            ...td,
            index: ind,
            status:
              td.key !== "accessControl" &&
                customPoliciesData[ind].accessControl !== "ACTIVE"
                ? "disable"
                : td.key === "userLocations"
                  ? customPoliciesData[ind].userLocationEnable
                  : target && target.length > 0,
          };
        });
      })
    );
  }, [customPoliciesData, PolicyTableDataFeature]);

  const saveCallback = useCallback(
    (result) => {
      setCustomPoliciesData([result, ...customPoliciesData]);
    },
    [customPoliciesData]
  );

  const editCallback = useCallback(
    (result, policyId) => {
      setCustomPoliciesData(
        customPoliciesData.map((c, ind) => {
          if (c.policyId === policyId) {
            return result;
          }
          return c;
        })
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
      <LinkDocument link="/document/user-policy" />

      <PolicyDrawer
        visible={editDrawerOpen}
        setVisible={setEditDrawerOpen}
        isCustomPolicy={true}
        isEditPolicy={isEditPolicy}
        editData={selectedRowData}
        saveCallback={saveCallback}
        editCallback={editCallback}
      />

      <div className="PoliciesBox">
        <div className="PoliciesTitleBox">
          <h5 className="policies-h5">
            <FormattedMessage id="CUSTOMPOLICY" />
          </h5>
          <p>
            <FormattedMessage id="CUSTOMPOLICYDESCRIPTION" />
          </p>
          <button
            className="button"
            style={{ marginBottom: "2rem" }}
            onClick={() => {
              setIsEditPolicy(false);
              setEditDrawerOpen(true);
            }}
          >
            <FormattedMessage id="CUSTOMPOLICYADD" />
          </button>
        </div>
        {customPoliciesData.map((cD, ind) => (
          <div key={ind} className="PoliciesBottomBox">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>{cD.title}</h3>
              <span>
                <button
                  className="button"
                  style={{ marginRight: "8px" }}
                  onClick={() => {
                    setSelectedRowData(cD);
                    setIsEditPolicy(true);
                    setEditDrawerOpen(true);
                  }}
                >
                  <FormattedMessage id="UPDATE" />
                </button>
                <button
                  className="button close-button del-button"
                  onClick={() => {
                    setDeleteTargetIndex(ind);
                    openDeleteConfirm();
                  }}
                >
                  <FormattedMessage id="DELETE" />
                </button>
              </span>
            </div>
            <CustomTable
              columns={PolicyColumns}
              datas={customPoliciesTableData[ind] || []}
            />
          </div>
        ))}
      </div>
      <CustomConfirm
        visible={deleteConfirmVisible}
        footer={true}
        style={{ flexDirection: "column" }}
        okLoading={deleteConfirmLoading}
        cancelCallback={closeDeleteConfirm}
        confirmCallback={_deleteCallback}
      >
        <h3>
          <FormattedMessage id="DELETECONFIRM" />
        </h3>
        {deleteConfirmVisible && customPoliciesData[deleteTargetIndex].active && (
          <h5 style={{ color: "red" }}>
            <FormattedMessage id="USED_APPLICATION_DESCRIPITON_1"/>
            <br />
            <FormattedMessage id="USED_APPLICATION_DESCRIPITON_2"/>
          </h5>
        )}
      </CustomConfirm>
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
  return {
    showSuccessMessage: (id) => {
      dispatch(ActionCreators.showSuccessMessage(id));
    },
    showErrorMessage: (id) => {
      dispatch(ActionCreators.showErrorMessage(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPolicy);
