import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Switch } from "antd";
import CustomTable from "../../../CustomComponents/CustomTable";

const columns = [
  { name: "이름", key: "userId" },
  { name: "이메일", key: "appName" },
  { name: "상태", key: "type" },
  { name: "마지막 로그인", key: "updateDate" },
  {
    name: "바이패스",
    key: "bypass",
    render: (d) => (d.bypass ? "ACTIVE" : "INACTIVE"),
  },
];

const UserBypass = ({ tableData, setDetailData }) => {
  const history = useHistory();
  const clickToDetail = (rowData) => {
    setDetailData(rowData);
    history.push("/Users/UserBypass/" + rowData.userId);
  };

  return (
    <>
      <ul className="UsersBox3_contents">
        <li>
          <CustomTable
            columns={columns}
            datas={tableData}
            rowClick={clickToDetail}
            pagination
          />
        </li>
      </ul>
    </>
  );
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBypass);
