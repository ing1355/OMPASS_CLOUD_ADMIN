import CustomSwitch from "../../../CustomComponents/CustomSwitch"

export const allUserColumns = [
    { name: '이름', key: 'userId' },
    { name: '이메일', key: 'appName' },
    { name: '상태', key: 'type' },
    { name: '마지막 로그인', key: 'lastLoginDate' },
    { name: '바이패스', key: 'byPass', render: (d) => <CustomSwitch defaultChecked={d.byPass}/>},
  ]

export const disabledUserColumns = [
    { name: '이름', key: 'userId' },
    { name: '이메일', key: 'appName' },
    { name: '상태', key: 'type' },
    { name: '마지막 로그인', key: 'lastLoginDate' },
    { name: '바이패스', key: 'byPass', render: (d) => <CustomSwitch defaultChecked={d.byPass}/>},
  ]

export const byPassUserColumns = [
    { name: '이름', key: 'userId' },
    { name: '이메일', key: 'appName' },
    { name: '상태', key: 'type' },
    { name: '마지막 로그인', key: 'lastLoginDate' },
    { name: '바이패스', key: 'byPass', render: (d) => <CustomSwitch defaultChecked={d.byPass}/>},
  ]

export const unRegisteredUserColumns = [
    { name: '이름', key: 'userId' },
    { name: '이메일', key: 'appName' },
    { name: '상태', key: 'type' },
    { name: '마지막 로그인', key: 'lastLoginDate' },
    { name: '바이패스', key: 'byPass', render: (d) => <CustomSwitch defaultChecked={d.byPass}/>},
  ]