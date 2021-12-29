import { Link } from "react-router-dom";
import CustomSwitch from "../CustomComponents/CustomSwitch";
import { slicePrice } from "../Functions/SlicePrice";
import { FormattedMessage } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faTimes } from "@fortawesome/free-solid-svg-icons";

export const AdminsColumns = [
  { name: "Name", key: "name", width: 220 },
  { name: "Email", key: "email", width: 250 },
  { name: "Authority", key: "role" },
  { name: "phoneNumber", key: "phone", width: 250 },
  { name: "Country", key: "country" },
];

const makeDetail = (data, row) => (
  <Link to={`/Applications/Detail/${row.appId}`}>
    <button className="button">보기</button>
  </Link>
);

export const ApplicationsColumns = [
  {
    name: "Application",
    key: "name",
    width: 250,
    searched: true,
  },
  {
    name: "Status",
    key: "status",
    searched: true,
    searchedOptions: ["ACTIVE", "INACTIVE"],
    getSearchedLabel: (value) => (value === "ACTIVE" ? "Active" : "Inactive"),
    render: (d) => <FormattedMessage id={d} />,
  },
  {
    name: "Domain",
    key: "domain",
    width: 250,
    searched: true,
  },
  { name: "REDIRECTURI", key: "redirectUri", width: 250, searched: true },
  { name: "Policies", key: "policy" },
  // { name: "상세정보", key: "detail", render: makeDetail },
];

export const BillingColumns = [
  {
    name: 'PLAN',
    key: 'paymentHistory'
  },
  {
    name: 'BILLINGCYCLE',
    key: 'billingCycle'
  },
  {
    name: "PRICECOLUMN",
    key: "amount",
    render: (amount) => slicePrice(amount),
  },
  { name: "USERNUM", key: "userNum" },
  { name: "PAYMENTDATE", key: "paymentDate" },
];

export const DashboardLogColumns = [
  { name: "User", key: "userId" },
  { name: "Action", key: "act" },
  { name: "Application", key: "appName" },
  { name: "Status", key: "status" },
  { name: "Date", key: "createdDate" },
];

export const LogsColumns = [
  {
    name: "User",
    key: "userId",
    width: 250,
    searched: true,
  },
  {
    name: "Action",
    key: "act",
    searched: true,
    searchedOptions: ["register", "authenticate"],
  },
  {
    name: "Application",
    key: "appName",
    searched: true,
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
    name: "POLICYNAME",
    key: "policyName",
    searched: true,
    width: 250,
    searched: true,
    render: (value,row) => row.policyType === 'GLOBAL' ? <FormattedMessage id="DEFAULTPOLICY"/> : value
  },
  {
    name: "User",
    key: "userId",
    width: 250,
    searched: true,
  },
  {
    name: "Action",
    key: "act",
    searched: true,
    searchedOptions: ['CREATE','UPDATE','DELETE']
  },
  { name: "Date", key: "createdDate", width: 250 },
];

export const allUserColumns = [
  {
    name: "Users",
    key: "userId",
    width: 250,
    searched: true,
  },
  {
    name: "Application",
    key: "appName",
    width: 250,
    searched: true,
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
  { name: "Users", key: "userId", width: 250, searched: true },
  {
    name: "Application",
    key: "appName",
    width: 250,
    searched: true,
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
  { name: "Users", key: "userId", width: 250, searched: true },
  { name: "Application", key: "appName", searched: true, width: 250 },
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
  { name: "Users", key: "userId", width: 250, searched: true },
  { name: "Application", key: "appName", searched: true, width: 250 },
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

export const PolicyColumns = [
  {
    name: "Status",
    key: "status",
    render: (status, b) => (
      <div style={{ textAlign: "center" }}>
        {status ? (
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
      const {status, key, index} = row;
      return status ? getDescription(key, index) : <FormattedMessage id="NORESTRICTION" />
    },
  },
];
