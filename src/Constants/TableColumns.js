import React from "react";
import CustomSwitch from "../CustomComponents/CustomSwitch";
import { slicePrice } from "../Functions/SlicePrice";
import { FormattedMessage } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faTimes } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../CustomComponents/CustomButton";

export const AdminsColumns = [
  { name: "Name", key: "name", width: 220 },
  { name: "Email", key: "email", width: 250 },
  { name: "Authority", key: "role" },
  { name: "phoneNumber", key: "phone", width: 250 },
  { name: "Country", key: "country" },
];

export const ApplicationsColumns = [
  {
    name: "APPLICATIONNAME",
    key: "name",
    width: 250,
    searched: true,
    maxLength: 24,
  },
  // {
  //   name: "Status",
  //   key: "status",
  //   searched: true,
  //   searchedOptions: ["ACTIVE", "INACTIVE"],
  //   getSearchedLabel: (value) => (value === "ACTIVE" ? "Active" : "Inactive"),
  //   render: (d) => <FormattedMessage id={d} />,
  // },
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
  // { name: "상세정보", key: "detail", render: makeDetail },
];

export const BillingColumns = [
  {
    name: "PLAN",
    key: "paymentHistory",
  },
  {
    name: "BILLINGCYCLE",
    key: "paymentInterval",
    render: (data) => <FormattedMessage id={data} />,
  },
  {
    name: "PRICECOLUMN",
    key: "amount",
    render: (amount) => slicePrice(amount),
  },
  { name: "USERNUM", key: "numberUsers" },
  { name: "PAYMENTDATE", key: "paymentDate" },
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
    name: "POLICYTITLE",
    key: "policyName",
    searched: true,
    maxLength: 24,
    width: 250,
    render: (value, row) =>
      !row.changes.afterPolicy.title ? (
        <FormattedMessage id="DEFAULTPOLICY" />
      ) : (
        value
      ),
  },
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
    searchedOptions: ["CREATE", "UPDATE", "DELETE"],
  },
  { name: "Date", key: "createdDate", width: 250 },
  {
    name: "",
    key: "detail",
    width: 200,
    render: (callback, row) => (
      <CustomButton className="button" onClick={callback}>
        <FormattedMessage id="detailColumn" />
      </CustomButton>
    ),
  },
];

export const PolicyLogsChangeColumns = [
  {
    name: "POLICYNAME",
    key: "type",
    width: 150,
  },
  {
    name: "Status",
    key: "value",
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
