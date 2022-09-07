import { LockOutlined, SendOutlined, SettingOutlined, FileTextOutlined, AppstoreOutlined } from '@ant-design/icons'
import { lazy } from 'react'
import { FormattedMessage } from 'react-intl';

const Login = lazy(() => import('../Layout/Sidebar/OnpremiseDocuments/Login'));
const U2FUAF = lazy(() => import('../Layout/Sidebar/OnpremiseDocuments/U2FUAF'));
const Dashboard = lazy(() => import('../Layout/Sidebar/OnpremiseDocuments/Dashboard'));
const Application = lazy(() => import('../Layout/Sidebar/OnpremiseDocuments/Application'));
const DefaultPolicy = lazy(() => import('../Layout/Sidebar/OnpremiseDocuments/DefaultPolicy'));
const CustomPolicy = lazy(() => import('../Layout/Sidebar/OnpremiseDocuments/CustomPolicy'));
const UserManagement = lazy(() => import('../Layout/Sidebar/OnpremiseDocuments/UserManagement'));
const AdminManagement = lazy(() => import('../Layout/Sidebar/OnpremiseDocuments/AdminManagement'));
const OmpassLogs = lazy(() => import('../Layout/Sidebar/OnpremiseDocuments/OmpassLogs'));
const PolicyLogs = lazy(() => import('../Layout/Sidebar/OnpremiseDocuments/PolicyLogs'));
const Android = lazy(() => import('../Layout/Sidebar/OnpremiseDocuments/Android'));
const IOS = lazy(() => import('../Layout/Sidebar/OnpremiseDocuments/IOS'));
const RestApiU2F = lazy(() => import('../Layout/Sidebar/OnpremiseDocuments/RestApiU2F'));
const RestApiUAF = lazy(() => import('../Layout/Sidebar/OnpremiseDocuments/RestApiUAF'));
const RestApiReset = lazy(() => import('../Layout/Sidebar/OnpremiseDocuments/RestApiReset'));

export const menuItems = [
    {
        title: <FormattedMessage id='원모어패스 로그인이란?'/>,
        icon: <LockOutlined />,
        subMenuItems: [
            {
                title: 'U2F/UAF',
                path: 'u2fuaf',
                component: <U2FUAF/>
            }
        ]
    },
    {
        title: <FormattedMessage id='원모어패스 시작하기'/>,
        icon: <SendOutlined />,
        subMenuItems: [
            {
                title: <FormattedMessage id='로그인'/>,
                path: 'login',
                component: <Login/>
            }
        ]
    },
    {
        title: <FormattedMessage id='관리자 페이지'/>,
        icon: <SettingOutlined />,
        subMenuItems: [
            {
                title: <FormattedMessage id='대시보드'/>,
                path: 'dashboard',
                component: <Dashboard/>
            },
            {
                title: <FormattedMessage id='어플리케이션 관리'/>,
                details: [
                    {
                        title: <FormattedMessage id='어플리케이션'/>,
                        path: 'application',
                        component: <Application/>
                    },
                    {
                        title: <FormattedMessage id='기본 정책'/>,
                        path: 'defaultPolicy',
                        component: <DefaultPolicy/>
                    },
                    {
                        title: <FormattedMessage id='사용자 정의 정책'/>,
                        path: 'customPolicy',
                        component: <CustomPolicy/>
                    }
                ]
            },
            {
                title: <FormattedMessage id='사용자 관리'/>,
                path: 'userManagement',
                component: <UserManagement/>
            },
            {
                title: <FormattedMessage id='관리자 관리'/>,
                path: 'adminManagement',
                component: <AdminManagement/>
            },
            {
                title: <FormattedMessage id='로그'/>,
                details: [
                    {
                        title: <FormattedMessage id='OMPASS 로그'/>,
                        path: 'ompassLogs',
                        component: <OmpassLogs/>
                    },
                    {
                        title: <FormattedMessage id='정책 로그'/>,
                        path: 'policyLogs',
                        component: <PolicyLogs/>
                    }
                ]
            }
        ]
    },
    {
        title: 'REST API',
        icon: <FileTextOutlined />,
        subMenuItems: [
            {
                title: 'U2F',
                path: 'restApiu2f',
                component: <RestApiU2F/>
            },
            {
                title: 'UAF',
                path: 'restApiuaf',
                component: <RestApiUAF/>
            },
            {
                title: <FormattedMessage id='OMPASS 등록 초기화'/>,
                path: 'restApiUserReset',
                component: <RestApiReset/>
            }
        ]
    },
    {
        title: <FormattedMessage id='모바일 앱'/>,
        icon: <AppstoreOutlined />,
        subMenuItems: [
            {
                title: <FormattedMessage id='안드로이드'/>,
                path: 'appAndroid',
                component: <Android/>
            },
            {
                title: 'iOS',
                path: 'appIOS',
                component: <IOS/>
            }
        ]
    }
]

export const getAllDocsMenuItems = () => {}