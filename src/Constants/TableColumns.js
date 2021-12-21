import { Link } from "react-router-dom";
import CustomSwitch from "../CustomComponents/CustomSwitch";
import { slicePrice } from "../Functions/SlicePrice";
import { FormattedMessage } from "react-intl";

export const AdminsColumns = [
  { name: <FormattedMessage id="Name" />, key: "name", width: 220 },
  { name: <FormattedMessage id="Email" />, key: "email", width: 250 },
  { name: <FormattedMessage id="Authority" />, key: "role" },
  { name: <FormattedMessage id="phoneNumber" />, key: "phone", width: 250 },
  { name: <FormattedMessage id="Country" />, key: "country" },
];

const makeDetail = (data, row) => (
  <Link to={`/Applications/Detail/${row.appId}`}>
    <button className="button">보기</button>
  </Link>
);

export const ApplicationsColumns = [
  { name: <FormattedMessage id="Application" />, key: "name", width: 250 },
  { name: <FormattedMessage id="Status" />, key: "status" },
  { name: <FormattedMessage id="Domain" />, key: "domain", width: 250 },
  { name: "Redirect Uri", key: "redirectUri", width: 250 },
  { name: <FormattedMessage id="Policies" />, key: "policy" },
  // { name: "상세정보", key: "detail", render: makeDetail },
];

export const BillingColumns = [
  { name: "금액", key: "amount", render: (amount) => slicePrice(amount) },
  { name: "결제 날짜", key: "paymentDate" },
  { name: "결제 종류", key: "paymentHistory" },
];

export const DashboardLogColumns = [
  { name: <FormattedMessage id="User" />, key: "userId" },
  { name: <FormattedMessage id="Action" />, key: "act" },
  { name: <FormattedMessage id="Application" />, key: "appName" },
  { name: <FormattedMessage id="Status" />, key: "status" },
  { name: <FormattedMessage id="Date" />, key: "createdDate" },
];

export const LogsColumns = [
  {
    name: <FormattedMessage id="User" />,
    title: "User",
    key: "userId",
    width: 250,
    searched: true,
  },
  {
    name: <FormattedMessage id="Action" />,
    title: "활동",
    key: "act",
    searched: true,
    searchedOptions: ["register", "authenticate"],
  },
  {
    name: <FormattedMessage id="Application" />,
    title: "어플리케이션",
    key: "appName",
    searched: true,
    width: 250,
  },
  {
    name: <FormattedMessage id="Status" />,
    title: "상태",
    key: "status",
    searched: true,
    searchedOptions: ["success", "fail"],
  },
  { name: <FormattedMessage id="Date" />, key: "createdDate", width: 250 },
];

export const allUserColumns = [
  {
    name: <FormattedMessage id="Users" />,
    title: "사용자 아이디",
    key: "userId",
    width: 250,
    searched: true,
  },
  {
    name: <FormattedMessage id="Application" />,
    title: "어플리케이션",
    key: "appName",
    width: 250,
    searched: true,
  },
  {
    name: <FormattedMessage id="Status" />,
    title: "상태",
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
    name: <FormattedMessage id="Bypass" />,
    title: "2차인증 바이패스",
    key: "byPass",
    render: (byPass) => {
      return <CustomSwitch defaultChecked={byPass} />;
    },
    width: "200px",
    searched: true,
    searchedOptions: ["ON", "OFF"],
  },
];

export const disabledUserColumns = [
  { name: "아이디", key: "userId", width: 200, searched: true },
  {
    name: <FormattedMessage id="Application" />,
    key: "appName",
    searched: true,
  },
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
    searchedOptions: ["ON", "OFF"],
  },
];

export const byPassUserColumns = [
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
    searchedOptions: ["ON", "OFF"],
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
    searchedOptions: ["ON", "OFF"],
  },
];

// export const globalPolicyColumns = [
//   {
//     name: "Status",
//     key: "status",
//     render: (status, b) => (
//       <div style={{ textAlign: "center" }}>{status ? "O" : "X"}</div>
//     ),
//     width: "100px",
//   },
//   { name: "Policy Name", key: "policy", width: "200px" },
//   { name: "Description", key: "description" },
// ];

export const globalPolicyColumns = [
  {
    name: "인증 접근 제한",
    key: "accessControl",
    render: (data) => (data ? "O" : "X"),
  },
  {
    name: "사용자 위치 제한",
    key: "userLocations",
    render: (data, row) => (data && data.length > 0 ? "O" : "X"),
  },
  {
    name: "브라우저 제한",
    key: "browsers",
    render: (data, row) => (data && data.length > 0 ? "O" : "X"),
  },
  {
    name: "인증 방법 제한",
    key: "authenticationMethods",
    render: (data) => (data && data.length > 0 ? "O" : "X"),
  },
  {
    name: "OMPASS APP 업데이트",
    key: "mobilePatch",
    render: (data) => (data ? "O" : "X"),
  },
];

const customPolicyItemWidth = 130;

export const customPolicyColumns = [
  { name: "이름", key: "title" },
  {
    name: "인증 접근 제한",
    key: "accessControl",
    width: customPolicyItemWidth,
    render: (data) => (data ? "O" : "X"),
  },
  {
    name: "사용자 위치 제한",
    key: "userLocations",
    width: customPolicyItemWidth,
    render: (data, row) => (data && data.length > 0 ? "O" : "X"),
  },
  {
    name: "브라우저 제한",
    key: "browsers",
    width: customPolicyItemWidth,
    render: (data) => (data && data.length > 0 ? "O" : "X"),
  },
  {
    name: "인증 방법 제한",
    key: "authenticationMethods",
    width: customPolicyItemWidth,
    render: (data) => (data && data.length > 0 ? "O" : "X"),
  },
  {
    name: "OMPASS APP 업데이트",
    key: "mobilePatch",
    width: customPolicyItemWidth,
    render: (data) => (data ? "O" : "X"),
  },
];
