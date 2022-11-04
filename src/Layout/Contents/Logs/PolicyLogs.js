import React, { useCallback, useLayoutEffect, useState } from "react";
import "./Logs.css";
import ContentsTitle from "../ContentsTitle";
import {
  CustomAxiosGet,
  // CustomAxiosGetAll,
} from "../../../Functions/CustomAxios";
import {
  // getCustomPoliciesApi,
  // getGlobalPolicyApi,
  getPolicyLogsApi,
} from "../../../Constants/Api_Route";
import { connect } from "react-redux";
import CustomTable from "../../../CustomComponents/CustomTable";
import {
  PolicyLogsChangeColumns,
  PolicyLogsColumns,
} from "../../../Constants/TableColumns";
import LinkDocument from "../../../CustomComponents/LinkDocument";
import CustomConfirm from "../../../CustomComponents/CustomConfirm";
import { FormattedMessage, useIntl } from "react-intl";
import { countryCodes_KR, countryCodes_US } from "../Policies/Country_Code";
import { UserOutlined } from "@ant-design/icons";

const PolicyLogs = ({ userProfile, locale }) => {
  const { adminId } = userProfile;
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [selectedData, setSelectedData] = useState(null);
  // const [defaultPolicyData, setDefaultPolicyData] = useState(null);
  // const [customPoliciesData, setCustomPoliciesData] = useState([]);
  const [changeModalVisible, setChangeModalVisible] = useState(false);
  const { formatMessage } = useIntl();

  useLayoutEffect(() => {
    if (adminId) {
      CustomAxiosGet(
        getPolicyLogsApi(adminId),
        (data) => {
          setTableData(
            data.map((d) => ({
              ...d,
              policyName: d.type === "GLOBAL" ? <FormattedMessage id="DEFAULTPOLICY" /> : d.changes.afterPolicy.title,
              detail: () => {
                setChangeModalVisible(d.policyLogId);
              },
            }))
          );
          setTableLoading(false);
        },
        () => {
          setTableLoading(false);
        }
      );
      // CustomAxiosGetAll(
      //   [getGlobalPolicyApi(adminId), getCustomPoliciesApi(adminId)],
      //   [
      //     (defaultPolicy) => {
      //       setDefaultPolicyData(defaultPolicy);
      //     },
      //     (customPolicies) => {
      //       setCustomPoliciesData(customPolicies);
            
      //     },
      //   ]
      // );
    }
  }, [adminId]);

  useLayoutEffect(() => {
    if (changeModalVisible) {
      setSelectedData(
        tableData.find((td) => td.policyLogId === changeModalVisible)
      );
    } else {
      setSelectedData(null);
    }
  }, [changeModalVisible, tableData]);

  const closeModal = useCallback(() => {
    setChangeModalVisible(false);
  }, []);

  const searchTitleFunction = useCallback(
    (rowValue, searchValue) => {
      const title = rowValue.changes.afterPolicy.title;
      if (title === 'Default Policy') {
        if (locale === 'ko') {
          return '기본 정책'.includes(searchValue)
        } else {
          return title.includes(searchValue)
        }
      } else {
        return title.includes(searchValue)
      }
    },
    [locale]
  );

  return (
    <div className="contents-container">
      <ContentsTitle title="PolicyLogs" />

      <LinkDocument link="/document/log" />

      <div className="LogBox">
        <CustomTable
          columns={PolicyLogsColumns}
          loading={tableLoading}
          datas={tableData}
          pagination
          searched
          searchFunction={searchTitleFunction}
          numPerPage={10}
        />
      </div>
      <CustomConfirm
        visible={changeModalVisible}
        maskClosable={true}
        footer={null}
        wrapClassName="policy-change-container"
        cancelCallback={closeModal}
      >
        {selectedData && (
          <div>
            {selectedData.changes.beforePolicy && (
              <>
                <p className="policy-change-arrow">
                  <FormattedMessage id="UPDATE_BEFORE" />
                  &nbsp;(
                  {selectedData.type === "GLOBAL" ? (
                    <FormattedMessage id="DEFAULTPOLICY" />
                  ) : (
                    selectedData.changes.beforePolicy.title
                  )}
                  )
                </p>
                <CustomTable
                  className="policy-modal-log"
                  columns={PolicyLogsChangeColumns}
                  datas={Object.keys(selectedData.changes.beforePolicy)
                    .filter((d) => d !== "title" && d !== "active")
                    .map((d) => ({
                      type: d,
                      value:
                        d === "userLocationEnable"
                          ? selectedData.changes.beforePolicy[d]
                            ? "ACTIVE"
                            : "INACTIVE"
                          : d === "userLocations"
                            ? () => {
                              const value = selectedData.changes.beforePolicy[d];
                              const countryInfo = locale === 'ko' ? countryCodes_KR : countryCodes_US
                              const isOtherCountries = value.length > 1 ? formatMessage({ id: 'ETCUSERLOCATION' }) : formatMessage({ id: 'ALLUSERLOCATION' })
                              const isTrue = value.filter(v => v.status)
                              const isFalse = value.filter(v => !v.status)
                              return <FormattedMessage id="USERLOCATIONPOLICYDESCRIPTION3"
                                values={{
                                  permit: isTrue.length > 0 ? isTrue.map(v => countryInfo[v.location] || isOtherCountries).join(', ') : (locale === 'ko' ? '없음' : 'None'),
                                  deny: isFalse.length > 0 ? isFalse.map(v => countryInfo[v.location] || isOtherCountries).join(', ') : (locale === 'ko' ? '없음' : 'None')
                                }}
                              />
                            }
                            : d === 'browsers' ? selectedData.changes.beforePolicy[d].map(v => formatMessage({ id: v })).join(', ')
                              : selectedData.changes.beforePolicy[d],
                    }))}
                />
                <p className="policy-change-arrow2">↓</p>
                <p className="policy-change-arrow3">
                  <FormattedMessage id="UPDATE_AFTER" />
                  &nbsp;(
                  {selectedData.type === "GLOBAL" ? (
                    <FormattedMessage id="DEFAULTPOLICY" />
                  ) : (
                    selectedData.changes.afterPolicy.title
                  )}
                  )
                </p>
              </>
            )}
            <div className="policy-modal-log">
              <CustomTable
                columns={PolicyLogsChangeColumns}
                datas={Object.keys(selectedData.changes.afterPolicy)
                  .filter((d) => d !== "title" && d !== "active")
                  .map((d) => ({
                    type: d,
                    value:
                      d === "userLocationEnable"
                        ? selectedData.changes.afterPolicy[d]
                          ? "ACTIVE"
                          : "INACTIVE"
                        : d === "userLocations"
                          ? () => {
                            const value = selectedData.changes.afterPolicy[d];
                            const countryInfo = locale === 'ko' ? countryCodes_KR : countryCodes_US
                            const isOtherCountries = value.length > 1 ? formatMessage({ id: 'ETCUSERLOCATION' }) : formatMessage({ id: 'ALLUSERLOCATION' })
                            return <FormattedMessage id="USERLOCATIONPOLICYDESCRIPTION3"
                              values={{
                                permit: value.filter(v => v.status).map(v => countryInfo[v.location] || isOtherCountries).join(', '),
                                deny: value.filter(v => !v.status).map(v => countryInfo[v.location] || isOtherCountries).join(', ')
                              }}
                            />
                          }
                          : d === 'browsers' ? selectedData.changes.afterPolicy[d].map(v => formatMessage({ id: v })).join(', ')
                            : selectedData.changes.afterPolicy[d],
                  }))}
              />
            </div>
            {selectedData.changedAdmin && (
              <div className="policy-change-user-container">
                <UserOutlined /> <FormattedMessage id="CHANGEDADMIN" /> :{" "}
                {selectedData.changedAdmin}
              </div>
            )}
          </div>
        )}
      </CustomConfirm>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
    locale: state.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(PolicyLogs);
