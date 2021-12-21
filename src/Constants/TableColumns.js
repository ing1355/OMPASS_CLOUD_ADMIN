import { Link } from "react-router-dom";
import CustomSwitch from "../CustomComponents/CustomSwitch";
import { slicePrice } from "../Functions/SlicePrice";
import { FormattedMessage } from "react-intl";

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
  },
  {
    name: "Domain",
    key: "domain",
    width: 250,
    searched: true,
  },
  { name: "Redirect Uri", key: "redirectUri", width: 250, searched: true },
  { name: "Policies", key: "policy" },
  // { name: "상세정보", key: "detail", render: makeDetail },
];

export const BillingColumns = [
  { name: "금액", key: "amount", render: (amount) => slicePrice(amount) },
  { name: "결제 날짜", key: "paymentDate" },
  { name: "결제 종류", key: "paymentHistory" },
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
    name: "Status",
    key: "type",
    searched: true,
    searchedOptions: ["ompass"],
  },
  {
    name: <FormattedMessage id="LastLogin" />,
    key: "lastLoginDate",
    width: 250,
  },
  {
    name: "Bypass",
    key: "byPass",
    render: (byPass) => {
      return <CustomSwitch defaultChecked={byPass} />;
    },
    width: "200px",
    searched: true,
    searchedOptions: [true, false],
    getSearchedLabel: (value) => (value ? "ON" : "OFF"),
  },
];

export const disabledUserColumns = [
  { name: "Users", key: "userId", width: 200, searched: true },
  {
    name: "Application",
    key: "appName",
    searched: true,
  },
  {
    name: "Status",
    key: "type",
    width: 200,
    searched: true,
    searchedOptions: ["ompass"],
  },
  { name: "마지막 로그인", key: "lastLoginDate", width: 200 },
  {
    name: "2차인증 바이패스",
    key: "byPass",
    render: (byPass) => {
      return <CustomSwitch defaultChecked={byPass} />;
    },
    width: "200px",
    searched: true,
    searchedOptions: [true, false],
    getSearchedLabel: (value) => (value ? "ON" : "OFF"),
  },
];

export const byPassUserColumns = [
  { name: "Users", key: "userId", width: 200, searched: true },
  { name: "Application", key: "appName", searched: true },
  {
    name: "Status",
    key: "type",
    width: 200,
    searched: true,
    searchedOptions: ["ompass"],
  },
  { name: "마지막 로그인", key: "lastLoginDate", width: 200 },
  {
    name: "2차인증 바이패스",
    key: "byPass",
    render: (byPass) => {
      return <CustomSwitch defaultChecked={byPass} />;
    },
    width: "200px",
    searched: true,
    searchedOptions: [true, false],
    getSearchedLabel: (value) => (value ? "ON" : "OFF"),
  },
];

export const unRegisteredUserColumns = [
  { name: "아이디", key: "userId", width: 200, searched: true },
  { name: "어플리케이션", key: "appName", searched: true },
  {
    name: "상태",
    key: "type",
    width: 200,
    searched: true,
    searchedOptions: ["ompass"],
  },
  { name: "마지막 로그인", key: "lastLoginDate", width: 200 },
  {
    name: "2차인증 바이패스",
    key: "byPass",
    render: (byPass) => {
      return <CustomSwitch defaultChecked={byPass} />;
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
      <div style={{ textAlign: "center" }}>{status ? "O" : "X"}</div>
    ),
    width: 100,
  },
  {
    name: "Policy Name",
    key: "policy",
    width: 200,
    render: (d) => <FormattedMessage id={d} />,
  },
  {
    name: "Description",
    key: "description",
    width: 600,
    render: (descriptionKey, row) => (
      <FormattedMessage id={row.status ? descriptionKey : "NORESTRICTION"} />
    ),
  },
];
