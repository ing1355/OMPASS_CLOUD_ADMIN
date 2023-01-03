import React, { lazy } from "react";
import {
  HomeOutlined,
  SolutionOutlined,
  UserOutlined,
  AppstoreOutlined,
  DollarCircleOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

const OMSDashboard = lazy(() => import("../Layout/OMSRole/Dashboard"));
const OMSAdmins = lazy(() => import("../Layout/OMSRole/Admins/Admins"));
const OMSNotices = lazy(() => import("../Layout/OMSRole/Notice/Notice"));
// const OMSBilling = lazy(() => import("../Layout/OMSRole/Billing"));
const OMSAppAndroid = lazy(() => import("../Layout/OMSRole/AppManagement/Android"));
const OMSAppIOS = lazy(() => import("../Layout/OMSRole/AppManagement/IOS"));

const Dashboard = lazy(() => import("../Layout/Contents/Dashboard/Dashboard"));
const DefaultPolicies = lazy(() =>
  import("../Layout/Contents/Policies/DefaultPolicy")
);
const CustomPolicies = lazy(() =>
  import("../Layout/Contents/Policies/CustomPolicy")
);
const Users = lazy(() => import("../Layout/Contents/Users/Users"));
// const TwoFactorDevices = lazy(() =>
//   import("../Layout/Contents/TwoFactorDevices/TwoFactorDevices")
// );
const Admins = lazy(() => import("../Layout/Contents/Admins/Admins"));
const Applications = lazy(() =>
  import("../Layout/Contents/Applications/Applications")
);
const Billing = lazy(() => import("../Layout/Contents/Billing/Billing"));
const AuthLogs = lazy(() => import("../Layout/Contents/Logs/AuthLogs"));
const PolicyLogs = lazy(() => import("../Layout/Contents/Logs/PolicyLogs"));

const DashboardIcon = <HomeOutlined />;
const UsersIcon = <UserOutlined />;
const AdminsIcon = <SolutionOutlined />;
const ApplicationsIcon = <AppstoreOutlined />;
const BillingIcon = <DollarCircleOutlined />;
const LogsIcon = <ProfileOutlined />;

const AdminRoutes = [
  {
    key: "Dashboard",
    name: "Dashboard",
    route: "/Dashboard/*",
    component: <Dashboard/>,
    icon: DashboardIcon,
  },
  {
    key: "Applications",
    name: "Applications",
    icon: ApplicationsIcon,
    submenu: [
      {
        key: 'ApplicationsManagement',
        name: 'ApplicationsManagement',
        route: "/Applications/*",
        component: <Applications/>,
      },
      {
        key: "GlobalPolicy",
        name: "DEFAULTPOLICY",
        route: "/DefaultPolicy/*",
        component: <DefaultPolicies/>,
      },
      {
        key: "CustomPolicy",
        name: "CUSTOMPOLICY",
        route: "/CustomPolicy/*",
        component: <CustomPolicies/>,
      }
    ]
  },
  {
    key: "Users",
    name: "Users",
    route: "/Users/*",
    component: <Users/>,
    icon: UsersIcon,
  },
  {
    key: "Admins",
    name: "Admins",
    route: "/Admins/*",
    component: <Admins/>,
    icon: AdminsIcon,
  },
  {
    key: "Billing",
    name: "Billing",
    route: "/Billing/*",
    component: <Billing/>,
    icon: BillingIcon,
  },
  {
    key: "Logs",
    name: "Logs",
    icon: LogsIcon,
    submenu: [
      {
        key: "AuthenticationLogs",
        name: "AuthLogs",
        route: "/AuthenticationLogs/*",
        component: <AuthLogs/>,
      },
      {
        key: "PolicyLogs",
        name: "PolicyLogs",
        route: "/PolicyLogs/*",
        component: <PolicyLogs/>,
      },
    ],
  },
];

const route_info = (role, isStandalone) => role === "OMS"
    ? [
      {
        key: "Dashboard",
        name: "Dashboard",
        route: "/Dashboard/*",
        component: <OMSDashboard/>,
        icon: DashboardIcon,
      },
      {
        key: "Admins",
        name: "Admins",
        route: "/Admins/*",
        component: <OMSAdmins/>,
        icon: AdminsIcon,
      },
      {
        key: "AppManagement",
        name: "AppManagement",
        icon: BillingIcon,
        submenu: [
          {
            key: "Android",
            name: "ANDROID",
            route: "/AppManagement/android/*",
            component: <OMSAppAndroid/>,
          },
          {
            key: "ios",
            name: "IOS",
            route: "/AppManagement/ios/*",
            component: <OMSAppIOS/>,
          },
        ],
      },
      {
        key: "Notices",
        name: "Notices",
        icon: AdminsIcon,
        submenu: [
          {
            key: 'NoticesKR',
            name: 'NoticesKR',
            route: '/Notice/KR',
            component: <OMSNotices/>
          },
          {
            key: 'NoticesEN',
            name: 'NoticesEN',
            route: '/Notice/EN',
            component: <OMSNotices/>
          }
        ]
      },
    ]
    : ((role === "ADMIN" && !isStandalone)
      ? AdminRoutes
      : AdminRoutes.filter((route) => route.name !== "Billing"));

export default route_info;
