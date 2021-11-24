import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { updateBypassApi } from "../../../Constants/Api_Route";
import CustomSwitch from "../../../CustomComponents/CustomSwitch";
import CustomTable from "../../../CustomComponents/CustomTable";
import { CustomAxiosPatch } from "../../../Functions/CustomAxios";

const UsersTable = ({ tableData, setDetailData, userProfile }) => {
  const {adminId} = userProfile;
  const history = useHistory();
  const clickToDetail = (rowData) => {
    setDetailData(rowData);
    history.push("/Users/Detail/" + rowData.userId);
  }

  const columns = [
    { name: '이름', key: 'userId' },
    { name: '이메일', key: 'appName' },
    { name: '상태', key: 'type' },
    { name: '마지막 로그인', key: 'updateDate' },
    { name: '바이패스', key: 'bypass', render: (d) => <CustomSwitch checked={d.bypass} onChange={e => {
      CustomAxiosPatch(updateBypassApi(adminId, d.appId, d.userId),{
        bypass: e.target.checked
      }, (data) => {
        console.log(data);
      })
    }}/>},
  ]
  
  return (
    <>
      <ul className="UsersBox3_contents">
        <li>
          <CustomTable columns={columns} datas={tableData} rowClick={clickToDetail} pagination/>
        </li>
      </ul>
    </>
  );
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
