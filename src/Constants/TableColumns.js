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
  { name: "User ID", key: "userId", width: 220 },
  { name: "Action", key: "act", width: 170 },
  { name: "Application Name", key: "appName" },
  { name: "Status", key: "status", width: 130 },
  { name: "Time", key: "createdDate", width: 220 },
];

export const allUserColumns = [
  { name: "아이디", key: "userId" },
  { name: "어플리케이션", key: "appName" },
  { name: "상태", key: "type" },
  { name: "마지막 로그인", key: "lastLoginDate" },
  {
    name: "바이패스",
    key: "byPass",
    render: (d) => {
      return <CustomSwitch defaultChecked={d.byPass} />
    },
    width: '100px'
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
    width: '100px'
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
    width: '100px'
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
    width: '100px'
  },
];

export const globalPolicyColumns = [
  { name: 'Status', key: 'status', render: row => <div style={{textAlign:'center'}}>{row.status}</div>, width: '100px' },
  { name: 'Policy Name', key: 'policy', width: '200px' },
  { name: 'Description', key: 'description' }
]

const customPolicyItemWidth = 130;

export const customPolicyColumns = [
  { name: 'Title', key: 'title'},
  { name: 'Auth policy', key: 'authenticationPolicy', width: customPolicyItemWidth},
  { name: 'User location', key: 'userLocation', width: customPolicyItemWidth},
  { name: 'Browsers', key: 'browsers', width: customPolicyItemWidth},
  { name: 'Auth methods', key: 'authenticationMethods', width: customPolicyItemWidth},
  { name: 'Mobile', key: 'mobile', width: customPolicyItemWidth}
]