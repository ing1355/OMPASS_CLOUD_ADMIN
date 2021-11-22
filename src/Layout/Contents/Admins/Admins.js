import React, { useEffect, useState } from "react";
import "./Admins.css";
// import "../../Login/Login.css";
import ContentsTitle from "../ContentsTitle";
import AdminAdd from "./AdminAdd";
import AdminUpdate from "./AdminUpdate";
import { CustomAxiosGet } from "../../../Functions/CustomAxios";
import { getAdminsApi } from "../../../Constants/Api_Route";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import CustomTable from "../../../Constants/CustomTable";

const columns = [
  { name: '이름', key: 'name' },
  { name: '이메일', key: 'email' },
  { name: '권한', key: 'role' },
  { name: '폰', key: 'phone' },
  { name: '국가', key: 'country' }
]

const Admins = ({ userProfile }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    CustomAxiosGet(getAdminsApi(userProfile.adminId), (data) => {
      setTableData(data.map(d => ({ name: d.lastName + d.firstName, email: d.email, role: d.role, phone: d.phone, country: d.country })));
      console.log(data);
    });
  }, []);

  return (
    <div className="contents-container">
      <ContentsTitle title="Admins Info" />
      <div className="AdminBox">
        <div>
          <div className="adminAdd">
            <p>Admin Login Settings</p>
            <Link to="/Admins/Add">
              <button>
                관리자 추가
              </button>
            </Link>
          </div>
          <CustomTable columns={columns} datas={tableData} />
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admins);
