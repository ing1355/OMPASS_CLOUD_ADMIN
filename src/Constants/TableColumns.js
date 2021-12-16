import { Link } from "react-router-dom";
import CustomSwitch from "../CustomComponents/CustomSwitch";
import { slicePrice } from "../Functions/SlicePrice";

export const AdminsColumns = [
  { name: "이름", key: "name" },
  { name: "이메일", key: "email" },
  { name: "권한", key: "role" },
  { name: "전화번호", key: "phone" },
  { name: "국가", key: "country" },
];

const makeDetail = (data, row) => (
  <Link to={`/Applications/Detail/${row.appId}`}>
    <button className="button">보기</button>
  </Link>
);

export const ApplicationsColumns = [
  { name: "이름", key: "name" },
  { name: "상태", key: "status" },
  { name: "도메인", key: "domain" },
  { name: "Redirect Uri", key: "redirectUri" },
  { name: "정책", key: "policy" }
  // { name: "상세정보", key: "detail", render: makeDetail },
];

export const BillingColumns = [
  { name: "금액", key: "amount", render: (amount) => slicePrice(amount) },
  { name: "결제 날짜", key: "paymentDate" },
  { name: "결제 종류", key: "paymentHistory" },
];

export const DashboardLogColumns = [
  { name: "사용자 아이디", key: "userId" },
  { name: "활동", key: "act" },
  { name: "어플리케이션", key: "appName" },
  { name: "상태", key: "status" },
  { name: "시간", key: "createdDate" },
];

export const LogsColumns = [
  { name: "사용자 아이디", key: "userId", width: 220 },
  { name: "활동", key: "act", width: 170 },
  { name: "어플리케이션 Name", key: "appName" },
  { name: "상태", key: "status", width: 130 },
  { name: "시간", key: "createdDate", width: 220 },
];

export const allUserColumns = [
  { name: "아이디", key: "userId", width: 200 },
  { name: "어플리케이션", key: "appName" },
  { name: "상태", key: "type", width: 200 },
  { name: "마지막 로그인", key: "lastLoginDate", width: 200 },
  {
    name: "바이패스",
    key: "byPass",
    render: (byPass) => {
      return <CustomSwitch defaultChecked={byPass} />;
    },
    width: "200px",
  },
];

export const disabledUserColumns = [
  { name: "아이디", key: "userId", width: 230 },
  { name: "어플리케이션", key: "appName" },
  { name: "상태", key: "type", width: 120 },
  { name: "마지막 로그인", key: "lastLoginDate", width: 220 },
  {
    name: "바이패스",
    key: "byPass",
    render: (byPass) => <CustomSwitch defaultChecked={byPass} />,
    width: "100px",
  },
];

export const byPassUserColumns = [
  { name: "아이디", key: "userId", width: 230 },
  { name: "어플리케이션", key: "appName" },
  { name: "상태", key: "type", width: 120 },
  { name: "마지막 로그인", key: "lastLoginDate", width: 220 },
  {
    name: "바이패스",
    key: "byPass",
    render: (byPass) => <CustomSwitch defaultChecked={byPass} />,
    width: "100px",
  },
];

export const unRegisteredUserColumns = [
  { name: "아이디", key: "userId", width: 230 },
  { name: "어플리케이션", key: "appName" },
  { name: "상태", key: "type", width: 120 },
  { name: "마지막 로그인", key: "lastLoginDate", width: 220 },
  {
    name: "바이패스",
    key: "byPass",
    render: (byPass) => <CustomSwitch defaultChecked={byPass} />,
    width: "100px",
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
    name: "접근 제한",
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
    name: "접근 제한",
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
