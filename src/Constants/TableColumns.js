import { Link } from "react-router-dom";
import CustomSwitch from "../CustomComponents/CustomSwitch";

export const AdminsColumns = [
  { name: "이름", key: "name" },
  { name: "이메일", key: "email" },
  { name: "권한", key: "role" },
  { name: "전화번호", key: "phone" },
  { name: "국가", key: "country" },
];

const makeDetail = (d) => (
  <Link to={`/Applications/Detail/${d.appId}`}>
    <button className="button">보기</button>
  </Link>
);

export const ApplicationsColumns = [
  { name: "이름", key: "name" },
  { name: "상태", key: "status" },
  { name: "상세정보", key: "detail", render: makeDetail },
];

export const BillingColumns = [
  { name: "금액", key: "amount" },
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
  { name: "User ID", key: "userId" },
  { name: "Action", key: "act" },
  { name: "Application Name", key: "appName" },
  { name: "Status", key: "status" },
  { name: "Time", key: "createdDate" },
];

export const allUserColumns = [
  { name: "아이디", key: "userId" },
  { name: "어플리케이션", key: "appName" },
  { name: "상태", key: "type" },
  { name: "마지막 로그인", key: "lastLoginDate" },
  {
    name: "바이패스",
    key: "byPass",
    render: (d) => <CustomSwitch defaultChecked={d.byPass} />,
  },
];

export const disabledUserColumns = [
  { name: "아이디", key: "userId" },
  { name: "어플리케이션", key: "appName" },
  { name: "상태", key: "type" },
  { name: "마지막 로그인", key: "lastLoginDate" },
  {
    name: "바이패스",
    key: "byPass",
    render: (d) => <CustomSwitch defaultChecked={d.byPass} />,
  },
];

export const byPassUserColumns = [
  { name: "아이디", key: "userId" },
  { name: "어플리케이션", key: "appName" },
  { name: "상태", key: "type" },
  { name: "마지막 로그인", key: "lastLoginDate" },
  {
    name: "바이패스",
    key: "byPass",
    render: (d) => <CustomSwitch defaultChecked={d.byPass} />,
  },
];

export const unRegisteredUserColumns = [
  { name: "아이디", key: "userId" },
  { name: "어플리케이션", key: "appName" },
  { name: "상태", key: "type" },
  { name: "마지막 로그인", key: "lastLoginDate" },
  {
    name: "바이패스",
    key: "byPass",
    render: (d) => <CustomSwitch defaultChecked={d.byPass} />,
  },
];
