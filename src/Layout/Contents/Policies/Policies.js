/* eslint-disable no-undef */
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
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
import {
  CustomAxiosGetAll,
  CustomAxiosPost,
} from "../../../Functions/CustomAxios";
import {
  addCustomPolicyApi,
  getCustomPoliciesApi,
  getGlobalPolicyApi,
} from "../../../Constants/Api_Route";
import { connect } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";

const globalPolicyTableDataFeature = [
  // {
  //   status: "",
  //   policy: "접근 제한",
  //   key: "accessControl",
  //   description:
  //     "Require two-factor authentication or enrollment when applicable, unless there is a superseding policy configured.",
  // },
  // {
  //   status: "",
  //   policy: "사용자 위치 제한",
  //   description: "No restrictions.",
  //   key: "userLocations",
  // },
  // {
  //   status: "",
  //   key: "browsers",
  //   policy: "브라우저 제한",
  //   description: "Don't require users to have the app",
  // },
  // {
  //   status: "",
  //   key: "authenticationMethods",
  //   policy: "인증 방법 제한",
  //   description: "No restrictions.",
  // },
  // {
  //   status: "",
  //   key: "mobilePatch",
  //   policy: "OMPASS APP 업데이트",
  //   description: "No restrictions.",
  // },
];

const Policies = ({ userProfile }) => {
  const { adminId } = userProfile;
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [isCustomPolicy, setIsCustomPolicy] = useState(false);
  const [isEditPolicy, setIsEditPolicy] = useState(false);
  const [globalPoliciesData, setGlobalPoliciesData] = useState({});
  const [globalPoliciesTableData, setGlobalPoliciesTableData] = useState([]);
  const [customPoliciesData, setCustomPoliciesData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const { formatMessage } = useIntl();

  const policyDatas = {
    title: null,
    accessControl: null,
    userLocations: null,
    browsers: null,
    authenticationMethods: null,
    mobilePatch: null,
  };

  useLayoutEffect(() => {
    CustomAxiosGetAll(
      [getGlobalPolicyApi(adminId), getCustomPoliciesApi(adminId)],
      [
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
            globalPolicyTableDataFeature.map((td) => {
              return {
                ...td,
                status:
                  result.find((r) => Object.keys(r)[0] === td.key)[td.key]
                    .length > 0,
              };
            })
          );
        },
        (data) => {
          // console.log(data);
          setCustomPoliciesData(data);
        },
      ],
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const saveCallback = useCallback(
    (result) => {
      setCustomPoliciesData([...customPoliciesData, result]);
    },
    [customPoliciesData, isEditPolicy, isCustomPolicy]
  );

  const editCallback = useCallback(
    (result, policyId) => {
      if (isCustomPolicy) {
        setCustomPoliciesData(
          customPoliciesData.map((c) => (c.policyId === policyId ? result : c))
        );
      } else {
        setGlobalPoliciesData(result);
        setGlobalPoliciesTableData(
          globalPolicyTableDataFeature.map((td) => {
            return {
              ...td,
              status:
                data.find((r) => Object.keys(r)[0] === td.key)[td.key].length >
                0,
            };
          })
        );
      }
    },
    [customPoliciesData, isCustomPolicy]
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

      <ContentsTitle title="Policies"/>
      <div className="PoliciesBox">
        <p>OMPASS 정책은 Global 정책과 Custom 정책으로 구분됩니다.</p>
        <div className="PoliciesTitleBox">
          <h5 className="policies-h5">
            <FormattedMessage id="DEFAULTPOLICY" />
          </h5>
          <p>기본정책은 모든 어플리케이션에 적용되는 정책입니다.</p>
          <button
            className="button"
            onClick={() => {
              setSelectedRowData(globalPoliciesData);
              setIsEditPolicy(true);
              setIsCustomPolicy(false);
              setEditDrawerOpen(true);
            }}
          >
            <FormattedMessage id="DEFAULTPOLICY" />
            &nbsp;
            <FormattedMessage id="UPDATE" />
          </button>
        </div>

        <CustomTable
          columns={globalPolicyColumns}
          datas={[globalPoliciesData]}
          className="global-policy-table-container"
          // columnsHide={true}
          rowClick={(rowData) => {
            setSelectedRowData(rowData);
            setIsEditPolicy(true);
            setIsCustomPolicy(false);
            setEditDrawerOpen(true);
          }}
        />

        <div className="PoliciesBottomBox">
          <h5 className="policies-h5">
            <FormattedMessage id="CUSTOMPOLICY" />
          </h5>
          <p>
            사용자 정의 정책은 특정 어플리케이션에 적용할 수 있는 정책입니다.
            {/* (정책의
            우선순위는 글로벌 정책보다 커스텀 정책의 우선순위가 높습니다.) */}
          </p>
          <button
            className="button"
            onClick={() => {
              setIsEditPolicy(false);
              setIsCustomPolicy(true);
              setEditDrawerOpen(true);
            }}
          >
            <FormattedMessage id="CUSTOMPOLICY" />
            &nbsp;
            <FormattedMessage id="ADD" />
          </button>
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
