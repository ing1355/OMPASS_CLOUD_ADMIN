/* eslint-disable no-undef */
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
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

const CustomPolicy = ({
  userProfile,
  showSuccessMessage,
  showErrorMessage,
  locale,
}) => {
  const { adminId } = userProfile;
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteConfirmLoading, setDeleteConfirmLoading] = useState(false);
  const [deleteTargetIndex, setDeleteTargetIndex] = useState(null);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [isEditPolicy, setIsEditPolicy] = useState(false);
  const [customPoliciesData, setCustomPoliciesData] = useState([]);
  const [customPoliciesTableData, setCustomPoliciesTableData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const customPoliciesDataRef = useRef(null);
  const { formatMessage } = useIntl();

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

  const getDescription = (key, index) => {
    const value = customPoliciesDataRef.current[index][key];
    switch (key) {
      case "accessControl":
        return formatMessage({
          id:
            value === "ACTIVE"
              ? "ACCESSCONTROLACTIVEDESCRIPTION"
              : value === "INACTIVE"
              ? "ACCESSCONTROLINACTIVEDESCRIPTION"
              : "ACCESSCONTROLDENYDESCRIPTION",
        });
      case "userLocations":
        return formatMessage({ id: "USERLOCATIONPOLICYDESCRIPTION2" });
      case "browsers":
        return formatMessage(
          { id: "BROWSERSPOLICYDESCRIPTION" },
          { param: value.toString() }
        );
      case "mobilePatch":
        return formatMessage({
          id: value ? "OMPASSMOBILEPOLICYACTIVE" : "OMPASSMOBILEPOLICYINACTIVE",
        });
      default:
        break;
    }
  };

  const PolicyTableDataFeature = [
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
    //   key: "authenticationMethods",
    //   policy: "인증 방법 제한",
    //   description: "GLOBALPOLICYDESCRIPTION_4",
    // },
    {
      status: "",
      key: "mobilePatch",
      policy: "OMPASSMOBILEPOLICYTITLE",
      description: getDescription,
    },
  ];

  useLayoutEffect(() => {
    CustomAxiosGet(
      getCustomPoliciesApi(adminId),
      (data) => {
        setCustomPoliciesData(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

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
                : td.key === "mobilePatch"
                ? target
                : td.key === "userLocations"
                ? customPoliciesData[ind].userLocationEnable
                : target && target.length > 0,
          };
        });
      })
    );
  }, [customPoliciesData]);

  const saveCallback = useCallback(
    (result) => {
      setCustomPoliciesData([result, ...customPoliciesData]);
    },
    [customPoliciesData, isEditPolicy]
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
    [customPoliciesData, customPoliciesTableData]
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
            현재 정책은 특정 어플리케이션에서 사용 중입니다.
            <br />
            삭제할 시 해당 어플리케이션은 기본 정책으로 자동 변경됩니다.
          </h5>
        )}
      </CustomConfirm>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
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
