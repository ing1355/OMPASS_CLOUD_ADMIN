import React, { useLayoutEffect, useState } from 'react'
import { registerAppManagementApi } from '../../../Constants/Api_Route';
import { AppManagementIOSColumns } from '../../../Constants/TableColumns';
import CustomTable from '../../../CustomComponents/CustomTable';
import { CustomAxiosGet, CustomAxiosPost } from '../../../Functions/CustomAxios';

const IOS = () => {
    const [appVersion, setAppVersion] = useState(null);
    const [tableData, setTableData] = useState([])
    const [tableLoading, setTableLoading] = useState(true);

    useLayoutEffect(() => {
        CustomAxiosGet('/oms/app/management', data => {
            console.log(data)
            setTableLoading(false);
            setTableData(data)
        }, err => {
            setTableLoading(false);
        }, {
            osType: 'ios'
        })
    }, [])

    const onChangeAppVersion = (e) => {
        setAppVersion(e.target.value);
    }

    const upadteIosVersion = () => {
        const formData = new FormData();
        formData.append('version', appVersion)
        formData.append('os', 'ios')
        CustomAxiosPost(registerAppManagementApi, formData, res => {
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
            앱 버전 : <input value={appVersion || ""} onChange={onChangeAppVersion} />
        </div>
        <button onClick={upadteIosVersion}>변경</button>
        <CustomTable
            columns={AppManagementIOSColumns}
            datas={tableData}
            pagination
            rowClick={({ version }) => { setAppVersion(version) }}
            numPerPage={10}
            loading={tableLoading} />
    </div>
}

export default IOS