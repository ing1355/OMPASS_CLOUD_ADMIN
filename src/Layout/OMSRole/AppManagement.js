import React, { useLayoutEffect, useRef, useState } from 'react';
import { CustomAxiosPost, CustomAxiosGet, CustomAxiosPut } from '../../Functions/CustomAxios';
import CustomTable from '../../CustomComponents/CustomTable'
import { AppManagementAndroidColumns, AppManagementIOSColumns } from '../../Constants/TableColumns';

const AppManagement = () => {
    const [appVersion, setAppVersion] = useState(null);
    const [osType, setOsType] = useState('android')
    const [tableLoading, setTableLoading] = useState(true);
    const [globalTableData, setGlobalTableData] = useState([])
    const [tableData, setTableData] = useState([])
    const fileRef = useRef(null);

    useLayoutEffect(() => {
        CustomAxiosGet('/oms/app/management', data => {
            console.log(data)
            setTableLoading(false);
            setTableData(data.filter(d => d.os === osType))
            setGlobalTableData(data)
        }, err => {
            setTableLoading(false);
        })
    }, [])

    useLayoutEffect(() => {
        if (osType && !tableLoading) setTableData(globalTableData.filter(d => d.os === osType))
    }, [osType, tableLoading])

    const onChangeAppVersion = (e) => {
        setAppVersion(e.target.value);
    }

    const uploadApk = (e) => {
        const formData = new FormData();
        formData.append('file', fileRef.current.files[0])
        formData.append('version', appVersion)
        formData.append('os', osType)
        setTableLoading(true);
        if (tableData.find(t => t.version === appVersion)) {
            CustomAxiosPut(`/oms/app/management`, formData, res => {
                console.log(res);
                setTableLoading(false);
            }, err => {
                console.log(err)
                setTableLoading(false);
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        } else {
            CustomAxiosPost(`/oms/app/management`, formData, res => {
                console.log(res);
                setTableLoading(false);
            }, err => {
                console.log(err)
                setTableLoading(false);
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        }
    }

    const upadteIosVersion = () => {
        const formData = new FormData();
        formData.append('version', appVersion)
        formData.append('os', osType)
        CustomAxiosPost(`/oms/app/management`, formData, res => {
            console.log(res);
            setTableLoading(false);
        }, err => {
            console.log(err)
            setTableLoading(false);
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    return <div className="contents-container">
        <div>
            <input type="radio" name="android" checked={osType === 'android'} value="android" onChange={e => {
                setOsType(e.target.value);
            }} />
            <label htmlFor="android">android</label>
            <input type="radio" name="ios" checked={osType === 'ios'} value="ios" onChange={e => {
                setOsType(e.target.value);
            }} />
            <label htmlFor="ios">ios</label>
        </div>
        <div>
            앱 버전 : <input value={appVersion || ""} onChange={onChangeAppVersion} />
            {osType === 'ios' && <button onClick={upadteIosVersion}>변경</button>}
        </div>
        {osType === 'android' && <div>
            앱 무결성 체크 : <input type="file" name="file" ref={fileRef} id="file" accept=".apk" />
            <button onClick={uploadApk}>업로드</button>
        </div>}
        <CustomTable
            columns={osType === 'android' ? AppManagementAndroidColumns : AppManagementIOSColumns}
            datas={tableData}
            pagination
            rowClick={({ version }) => { setAppVersion(version) }}
            numPerPage={10}
            loading={tableLoading} />
    </div>
}

export default AppManagement;