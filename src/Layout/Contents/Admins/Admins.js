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

const Admins = ({ userProfile }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    CustomAxiosGet(getAdminsApi(userProfile.adminId), (data) => {
      setTableData(data);
      console.log(data);
    });
  }, []);

  return (
    <>
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
          <table>
            <thead>
              <tr>
                <th>이름</th>
                <th>이메일</th>
                <th>권한</th>
                <th>폰</th>
                <th>국가</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((d, ind) => (
                <tr key={ind}>
                  <td><Link to={"/Admins/Detail/"}>
                    {d.lastName + d.firstName}
                  </Link></td>
                  <td>{d.email}</td>
                  <td>{d.role}</td>
                  <td>{d.phone}</td>
                  <td>{d.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
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
