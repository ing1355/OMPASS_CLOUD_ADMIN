import { lazy } from "react";

const Dashboard = lazy(() => import("../Layout/Contents/Dashboard/Dashboard"));
const Policies = lazy(() => import("../Layout/Contents/Policies/Policies"));
const Users = lazy(() => import("../Layout/Contents/Users/Users"));
const TwoFactorDevices = lazy(() =>
  import("../Layout/Contents/TwoFactorDevices/TwoFactorDevices")
);
const Admins = lazy(() => import("../Layout/Contents/Admins/Admins"));
const Applications = lazy(() =>
  import("../Layout/Contents/Applications/Applications")
);
const Billing = lazy(() => import("../Layout/Contents/Billing/Billing"));
const Logs = lazy(() => import("../Layout/Contents/Logs/Logs"));

const route_info = [
  {
    key: "Dashboard",
    name: "Dashboard",
    route: "/Dashboard",
    component: Dashboard,
  },
  {
    key: "Policies",
    name: "Policies",
    route: "/Policies",
    component: Policies,
  },
  { key: "Users", name: "Users", route: "/Users", component: Users },
  {
    key: "2FA Devices",
    name: "2FA Devices",
    route: "/2FADevices",
    component: TwoFactorDevices,
  },
  { key: "Admins", name: "Admins", route: "/Admins", component: Admins },
  {
    key: "Applications",
    name: "Applications",
    route: "/Applications",
    component: Applications,
  },
  { key: "Billing", name: "Billing", route: "/Billing", component: Billing },
  { key: "Logs", name: "Logs", route: "/Logs", component: Logs },
];

export default route_info;
