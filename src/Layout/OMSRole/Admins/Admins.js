import React, { useLayoutEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { getAllAdminsApi } from '../../../Constants/Api_Route';
import { CustomAxiosGet } from '../../../Functions/CustomAxios';
import AdminHome from './AdminHome';
import AdminsDetail from './AdminsDetail';

const Admins = (props) => {
    const [usersData, setUsersData] = useState([]);
    const [detailData, setDetailData] = useState(null)

    useLayoutEffect(() => {
        CustomAxiosGet(getAllAdminsApi, data => {
            setUsersData(data)
        })
    }, [])

    return <Routes>
        <Route path="/*" element={<AdminHome data={usersData} setDetailData={setDetailData} />} />
        <Route path="/Detail" element={<AdminsDetail data={detailData}/>} />
    </Routes>
}

export default Admins;