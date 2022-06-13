import { Button } from 'antd'
import React, { useLayoutEffect, useState } from 'react'
import { Route, Routes, useNavigate, useParams } from 'react-router'
import { getOMSNoticeApi } from '../../../Constants/Api_Route'
import { OMSNoticeColumns } from '../../../Constants/TableColumns'
import CustomTable from '../../../CustomComponents/CustomTable'
import { CustomAxiosGet } from '../../../Functions/CustomAxios'
import './Notice.css'
import NoticeDetail from './NoticeDetail'

const Notice = () => {
    const [tableData, setTableData] = useState([])
    const [detailData, setDetailData] = useState(null)
    const [detailType, setDetailType] = useState(null)
    const navigate = useNavigate()
    const { country } = useParams()

    useLayoutEffect(() => {
        if(country) {
            CustomAxiosGet(getOMSNoticeApi, data => {
                setTableData(data.filter(d => d.country === country))
            })
        }
    }, [country])

    const addCallback = (newData) => {
        setTableData([newData, ...tableData])
    }

    const updateCallback = (modifiedData) => {
        setTableData(tableData.map(tD => tD.noticeId === modifiedData.noticeId ? modifiedData : tD))
    }

    const deleteCallback = (id) => {
        setTableData(tableData.filter(tD => tD.noticeId !== id))
    }

    const clickForDetail = (row) => {
        setDetailData(row)
        setDetailType('update')
        navigate(`/Notice/${country}/Detail`);
    }

    const clickForNewNotice = () => {
        setDetailType('add')
        navigate(`/Notice/${country}/Detail`)
    }

    return <div className="contents-container">
        <Routes>
            <Route
                path="/"
                element={<>
                    <CustomTable columns={OMSNoticeColumns} datas={tableData} rowClick={clickForDetail} pagination numPerPage={10} />
                    <div style={{ marginTop: '8px', textAlign: 'right' }}>
                        <Button onClick={clickForNewNotice}>글쓰기</Button>
                    </div>
                </>}
            />
            <Route
                path="Detail"
                element={<NoticeDetail
                    data={detailData}
                    type={detailType}
                    addCallback={addCallback}
                    updateCallback={updateCallback}
                    deleteCallback={deleteCallback}
                />}
            />
        </Routes>
    </div>
}

export default Notice