import React from 'react';
import { Redirect } from 'react-router-dom';

const AdminsDetail = ({data}) => {
    console.log(data);
    return data ? <>
        
    </> : <Redirect to="/Admins"/>
}

export default AdminsDetail;