import React from 'react';
import CustomTable from '../../CustomComponents/CustomTable';

const columns = [
    { name: "이름", key: "name" },
    { name: "이메일", key: "email" },
    { name: "권한", key: "role" },
    { name: "전화번호", key: "phone" },
    { name: "국가", key: "country" },
  ];

const Admins = () => {
    return <div className="contents-container">
        <CustomTable columns={columns} datas={[]}/>
    </div>
}

export default Admins;