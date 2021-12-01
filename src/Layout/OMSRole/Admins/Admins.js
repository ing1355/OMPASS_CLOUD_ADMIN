import React, { useState } from 'react';
import CustomTable from '../../../CustomComponents/CustomTable';
import { Link, Switch, Route } from "react-router-dom";
import AdminsDetail from './AdminsDetail';
import { AdminsColumns } from '../../../Constants/TableColumns';

const testData = [
    {name: 'test', email: 'test2', role: 'test3', phone: 'test4', country: 'test5'}
]


const Admins = ({history}) => {
    const [detailData, setDetailData] = useState(null)
    const clickForDetail = row => {
        setDetailData(row);
        history.push('/Admins/Detail')
    }
    return <div className="contents-container">
        <Switch>
            <Route path="/Admins" exact render={() => <CustomTable columns={AdminsColumns} datas={testData} rowClick={clickForDetail}/>} />
            <Route path="/Admins/Detail" exact render={() => <AdminsDetail data={detailData}/>} />
        </Switch>
    </div>
}

export default Admins;