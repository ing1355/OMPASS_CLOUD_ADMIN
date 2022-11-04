import React from 'react'
import CustomTable from '../../../CustomComponents/CustomTable';
import { OMSAdminsColumns } from '../../../Constants/TableColumns';
import { useNavigate } from 'react-router';
import { CustomAxiosGet } from '../../../Functions/CustomAxios';
import { getAdminDetailApi } from '../../../Constants/Api_Route';

const AdminHome = ({ data, setDetailData }) => {
    const tableData = data.map(d => ({ ...d, name: d.firstName + d.lastName }))
    const navigate = useNavigate()
    const clickForDetail = row => {
        CustomAxiosGet(getAdminDetailApi(row.adminId), detailData => {
            setDetailData({adminData: row, ...detailData});
            navigate('/Admins/Detail')
        })
    }
    return <div className="contents-container">
        <CustomTable columns={OMSAdminsColumns} datas={tableData} rowClick={clickForDetail} pagination numPerPage={10}/>
    </div>
}

export default AdminHome;