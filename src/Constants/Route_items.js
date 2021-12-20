import { lazy } from "react";
import {
  HomeOutlined,
  SolutionOutlined,
  SettingOutlined,
  UserOutlined,
  AppstoreOutlined,
  DollarCircleOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

const OMSDashboard = lazy(() => import("../Layout/OMSRole/Dashboard"));
const OMSPolicies = lazy(() => import("../Layout/OMSRole/Policies"));
const OMSAdmins = lazy(() => import("../Layout/OMSRole/Admins/Admins"));
const OMSBilling = lazy(() => import("../Layout/OMSRole/Billing"));

const Dashboard = lazy(() => import("../Layout/Contents/Dashboard/Dashboard"));
const Policies = lazy(() => import("../Layout/Contents/Policies/Policies"));
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

const DashboardIcon = <HomeOutlined />
const PoliciesIcon = <SettingOutlined />
const UsersIcon = <UserOutlined />
const AdminsIcon = <SolutionOutlined />
const ApplicationsIcon = <AppstoreOutlined />
const BillingIcon = <DollarCircleOutlined />
const LogsIcon = <ProfileOutlined />

const AdminRoutes = [
  {
    key: "Dashboard",
    name: "Dashboard",
    route: "/",
    component: Dashboard,
    icon: DashboardIcon
  },
  {
    key: "Policies",
    name: "Policies",
    route: "/Policies",
    component: Policies,
    icon: PoliciesIcon
  },
  {
    key: "Users",
    name: "Users",
    route: "/Users",
    component: Users,
    icon: UsersIcon
  },
  // {
  //   key: "2FA Devices",
  //   name: "2FA Devices",
  //   route: "/2FADevices",
  //   component: TwoFactorDevices,
  // },
  {
    key: "Admins",
    name: "Admins",
    route: "/Admins",
    component: Admins,
    icon: AdminsIcon
  },
  {
    key: "Applications",
    name: "Applications",
    route: "/Applications",
    component: Applications,
    icon: ApplicationsIcon
  },
  {
    key: "Billing",
    name: "Billing",
    route: "/Billing",
    component: Billing,
    icon: BillingIcon
  },
  {
    key: "Logs",
    name: "Logs",
    route: "/Logs",
    icon: LogsIcon,
    submenu: [
      {
        key: "AuthenticationLogs",
        name: "AuthLogs",
        route: "/AuthenticationLogs",
        component: AuthLogs
      },
      {
        key: "PolicyLogs",
        name: "PolicyLogs",
        route: "/PolicyLogs",
        component: PolicyLogs
      }
    ]
  },
]

const route_info = (role) =>
  role === "OMS"
    ? [
      {
        key: "Dashboard",
        name: "Dashboard",
        route: "/",
        component: OMSDashboard,
        icon: DashboardIcon
      },
      {
        key: "Policies",
        name: "Policies",
        route: "/Policies",
        component: OMSPolicies,
        icon: PoliciesIcon
      },
      {
        key: "Admins",
        name: "Admins",
        route: "/Admins",
        component: OMSAdmins,
        icon: AdminsIcon
      },
      {
        key: "Billing",
        name: "Billing",
        route: "/Billing",
        component: OMSBilling,
        icon: BillingIcon
      },
    ]
    : role === "ADMIN"
      ? AdminRoutes
      : AdminRoutes.filter(route => route.route !== '/Billing')

export default route_info;
