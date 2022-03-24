import React from "react";
import CustomSwitch from "../CustomComponents/CustomSwitch";
import { slicePrice } from "../Functions/SlicePrice";
import { FormattedMessage } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faTimes } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../CustomComponents/CustomButton";
import { EllipsisOutlined } from "@ant-design/icons";
import { Popover } from "antd";

const paymentIsSuccessComponent = (status) => <div style={{ textAlign: "center" }}>
  {status === true ? (
    <FontAwesomeIcon
      style={{
        color: "rgb(0, 209, 52)",
        width: "100%",
        height: "20px",
      }}
      icon={faCheckSquare}
    />
  ) : (
    <FontAwesomeIcon
      style={{
        color: "rgb(162 162 162)",
        width: "100%",
        height: "20px",
      }}
      icon={faTimes}
    />
  )}
</div>

export const AdminsColumns = [
  { name: "Name", key: "name", width: 220 },
  { name: "Email", key: "email", width: 250 },
  { name: "Authority", key: "role" },
  { name: "phoneNumber", key: "phone", width: 250 },
  { name: "Country", key: "country" },
];

export const OMSAdminsColumns = [
  { name: "Name", key: "name", width: 300 },
  { name: "Email", key: "email" },
  { name: "phoneNumber", key: "phone", width: 300 },
  { name: "Country", key: "country", width: 150 },
];

export const ApplicationsColumns = [
  {
    name: "APPLICATIONNAME",
    key: "name",
    width: 250,
    searched: true,
    maxLength: 24,
  },
  {
    name: "Domain",
    key: "domain",
    width: 250,
    searched: true,
    maxLength: 48,
  },
  {
    name: "REDIRECTURI",
    key: "redirectUri",
    width: 250,
    searched: true,
    maxLength: 48,
  },
  {
    name: "Policies",
    key: "policy",
    render: (d) =>
      d === "!DEFAULTPOLICY!" ? <FormattedMessage id={"DEFAULTPOLICY"} /> : d,
  },
];

export const OMSApplicationsColumns = [
  {
    name: "APPLICATIONNAME",
    key: "name",
    width: 300,
    searched: true,
    maxLength: 24,
  },
  {
    name: "Domain",
    key: "domain",
    width: 300,
    searched: true,
    maxLength: 48,
  },
  {
    name: "REDIRECTURI",
    key: "redirectUri",
    width: 300,
    searched: true,
    maxLength: 48,
  },
  {
    name: "SECRETKEY",
    key: "integrationKey",
  },
];

export const OMSPaymentEventsColumns = [
  {
    name: 'EventName',
    key: 'tx'
  },
  {
    name: 'METHOD',
    key: 'method'
  },
  {
    name: 'DESCRIPTION',
    key: 'description',
    render: (data) => <Popover trigger="click" placement="bottom" content={data}><button className="button">상세보기</button></Popover>
  },
  {
    name: 'PAYMENTDATE',
    key: 'createdDate'
  },
  {
    name: 'ISSUCCESS',
    key: 'success',
    render: (status) => paymentIsSuccessComponent(status)
  },
]

export const BillingColumns = [
  {
    name: "PLAN",
    key: "paymentHistory",
  },
  {
    name: "BILLINGCYCLE",
    key: "paymentInterval",
    render: (data) => data && <FormattedMessage id={data} />,
    width: 150
  },
  {
    name: "PRICECOLUMN",
    key: "amount",
    render: (amount) => amount && slicePrice(amount),
  },
  { name: "USERNUM", key: "numberUsers", width: 200 },
  { name: "PAYMENTDATE", key: "paymentDate", width: 200 },
  {
    name: "PAYMENTSTATUS",
    key: 'paymentSuccess',
    width: 120,
    render: (status) => paymentIsSuccessComponent(status)
  },
  {
    name: 'NOTE',
    key: 'paymentType',
    render: (type) => type
  }
];

export const DashboardLogColumns = [
  { name: "User", key: "userId" },
  { name: "Action", key: "act" },
  { name: "APPLICATIONNAME", key: "appName" },
  { name: "Status", key: "status" },
  { name: "Date", key: "createdDate" },
];

export const LogsColumns = [
  {
    name: "User",
    key: "userId",
    width: 250,
    searched: true,
    maxLength: 48,
  },
  {
    name: "Action",
    key: "act",
    searched: true,
    searchedOptions: ["register", "authenticate"],
  },
  {
    name: "APPLICATIONNAME",
    key: "appName",
    searched: true,
    maxLength: 24,
    width: 250,
  },
  {
    name: "Status",
    key: "status",
    searched: true,
    searchedOptions: ["success", "fail"],
  },
  { name: "Date", key: "createdDate", width: 250 },
];

export const PolicyLogsColumns = [
  {
    name: "COLUMNPOLICYTITLE",
    key: "policyName",
    searched: true,
    searchFunction: true,
    maxLength: 24,
    width: 250,
  },
  {
    name: "User",
    key: "changedAdmin",
    width: 250,
    searched: true,
    maxLength: 48,
  },
  {
    name: "Action",
    key: "act",
    searched: true,
    searchedOptions: ["CREATE", "UPDATE", "DELETE"],
  },
  { name: "Date", key: "createdDate", width: 250 },
  {
    name: "detailColumn",
    key: "detail",
    width: 170,
    render: (callback, row) => (
      <CustomButton
        className="poclicy-button-detail-button"
        // style={{ padding: 8 }}
        onClick={callback}
      >
        <EllipsisOutlined />
      </CustomButton>
    ),
  },
];

export const PolicyLogsChangeColumns = [
  {
    name: "POLICYNAME",
    key: "type",
    width: 200,
    render: (d) => {
      switch (d) {
        case "accessControl":
          return <FormattedMessage id={"ACCESSCONTROLTITLE"} />;
        case "userLocationEnable":
          return <FormattedMessage id={"USERLOCATIONENABLEPOLICYTITLE"} />;
        case "userLocations":
          return <FormattedMessage id={"USERLOCATIONCHANGEPOLICYTITLE"} />;
        case "browsers":
          return <FormattedMessage id={"BROWSERSPOLICYTITLE"} />;
        default:
          return;
      }
    },
  },
  {
    name: "Status",
    key: "value",
    render: (value) =>
      value ? (value instanceof Function ? value() : value) : "No data",
  },
];

export const allUserColumns = [
  {
    name: "User",
    key: "userId",
    width: 250,
    searched: true,
    maxLength: 48,
  },
  {
    name: "APPLICATIONNAME",
    key: "appName",
    width: 250,
    searched: true,
    maxLength: 24,
  },
  {
    name: "AUTHTYPE",
    key: "type",
    searched: true,
    searchedOptions: ["OMPASS", "WEBAUTHN"],
  },
  {
    name: "LastLogin",
    key: "lastLoginDate",
    width: 250,
  },
  {
    name: "Bypass",
    key: "byPass",
    render: (byPass) => {
      return <CustomSwitch checked={byPass} />;
    },
    width: "200px",
    searched: true,
    searchedOptions: [true, false],
    getSearchedLabel: (value) => (value ? "ON" : "OFF"),
  },
];

export const disabledUserColumns = [
  {
    name: "User",
    key: "userId",
    width: 250,
    searched: true,
    maxLength: 48,
  },
  {
    name: "APPLICATIONNAME",
    key: "appName",
    width: 250,
    searched: true,
    maxLength: 24,
  },
  {
    name: "AUTHTYPE",
    key: "type",
    searched: true,
    searchedOptions: ["ompass"],
  },
  { name: "LastLogin", key: "lastLoginDate", width: 250 },
  {
    name: "Bypass",
    key: "byPass",
    width: "200px",
    render: (byPass) => {
      return <CustomSwitch checked={byPass} />;
    },

    searched: true,
    searchedOptions: [true, false],
    getSearchedLabel: (value) => (value ? "ON" : "OFF"),
  },
];

export const byPassUserColumns = [
  {
    name: "User",
    key: "userId",
    width: 250,
    searched: true,
    maxLength: 48,
  },
  { name: "APPLICATIONNAME", key: "appName", searched: true, width: 250 },
  {
    name: "AUTHTYPE",
    key: "type",
    searched: true,
    searchedOptions: ["ompass"],
  },
  { name: "LastLogin", key: "lastLoginDate", width: 250 },
  {
    name: "Bypass",
    key: "byPass",
    render: (byPass) => {
      return <CustomSwitch checked={byPass} />;
    },
    width: "200px",
    searched: true,
    searchedOptions: [true, false],
    getSearchedLabel: (value) => (value ? "ON" : "OFF"),
  },
];

export const unRegisteredUserColumns = [
  {
    name: "User",
    key: "userId",
    width: 250,
    searched: true,
    maxLength: 48,
  },
  { name: "APPLICATIONNAME", key: "appName", searched: true, width: 250 },
  {
    name: "AUTHTYPE",
    key: "type",
    searched: true,
    searchedOptions: ["ompass"],
  },
  { name: "LastLogin", key: "lastLoginDate", width: 250 },
  {
    name: "Bypass",
    key: "byPass",
    render: (byPass) => {
      return <CustomSwitch checked={byPass} />;
    },
    width: "200px",
    searched: true,
    searchedOptions: [true, false],
    getSearchedLabel: (value) => (value ? "ON" : "OFF"),
  },
];

const getPolicyInActiveDescription = (key) =>
({
  accessControl: "NORESTRICTION",
  userLocations: "NONEUSERLOCATIONS",
  browsers: "NONEBROWSERS",
  // mobilePatch: 'NOMOBILEPATCH'
}[key]);

export const PolicyColumns = [
  {
    name: "Status",
    key: "status",
    render: (status, b) => (
      <div style={{ textAlign: "center" }}>
        {status === true ? (
          <FontAwesomeIcon
            style={{
              color: "rgb(0, 209, 52)",
              width: "100%",
              height: "20px",
            }}
            icon={faCheckSquare}
          />
        ) : (
          <FontAwesomeIcon
            style={{
              color: "rgb(162 162 162)",
              width: "100%",
              height: "20px",
            }}
            icon={faTimes}
          />
        )}
      </div>
    ),
    width: 80,
  },
  {
    name: "POLICYNAME",
    key: "policy",
    width: 200,
    render: (d) => <FormattedMessage id={d} />,
  },
  {
    name: "DESCRIPTION",
    key: "description",
    width: 600,
    render: (getDescription, row) => {
      const { status, key, index } = row;
      return status === "disable" ? (
        <FormattedMessage id="DISABLEDPOLICY" />
      ) : status ? (
        getDescription(key, index)
      ) : (
        <FormattedMessage id={getPolicyInActiveDescription(key)} />
      );
    },
  },
];

export const AppManagementAndroidColumns = [
  {
    name: "AppVersion",
    key: "version",
    width: 100,
  },
  {
    name: "AppHash",
    key: "hash",
    width: 300
  },
  {
    name: "UploadDate",
    key: "createdDate",
    width: 150
  },
];

export const AppManagementIOSColumns = [
  {
    name: "AppVersion",
    key: "version",
    width: 100,
  },
  {
    name: "UploadDate",
    key: "createdDate",
    width: 150
  },
];