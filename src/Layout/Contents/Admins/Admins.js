import React, { useEffect, useState } from "react";
import "./Admins.css";
// import "../../Login/Login.css";
import ContentsTitle from "../ContentsTitle";
import AdminAdd from "./AdminAdd";
import AdminUpdate from "./AdminUpdate";
import { CustomAxiosGet } from "../../../Functions/CustomAxios";
import { getAdminsApi } from "../../../Constants/Api_Route";
import { Link, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import CustomTable from "../../../Constants/CustomTable";

const columns = [
  { name: "이름", key: "name" },
  { name: "이메일", key: "email" },
  { name: "권한", key: "role" },
  { name: "전화번호", key: "phone" },
  { name: "국가", key: "country" },
];

const Admins = ({ userProfile, history }) => {
  const [tableData, setTableData] = useState([]);
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    CustomAxiosGet(getAdminsApi(userProfile.adminId), (data) => {
      setTableData(data.map((d) => ({ ...d, name: d.firstName + d.lastName })));
    });
  }, []);

  const clickToDetail = (rowData) => {
    setDetailData(rowData);
    history.push("/Admins/Detail");
  };

  const updateAdmin = (rowData) => {
    setTableData(
      tableData.map((t) => (t.adminId === rowData.adminId ? rowData : t))
    );
  };

  const deleteAdmin = (adminId) => {
    setTableData(tableData.filter((t) => t.adminId !== adminId * 1));
  };

  return (
    <div className="contents-container">
      <ContentsTitle title="Admins Info" />
      <Switch>
        <Route
          path="/Admins"
          exact
          render={() => (
            <div className="AdminBox">
              <div>
                <div className="adminAdd">
                  <p>Admin Login Settings</p>
                  <Link to="/Admins/Add">
                    <button>관리자 추가</button>
                  </Link>
                </div>
                <CustomTable
                  columns={columns}
                  datas={tableData}
                  rowClick={clickToDetail}
                />
              </div>
            </div>
          )}
        />
        <Route path="/Admins/Add" component={AdminAdd} />
        <Route
          path="/Admins/Detail"
          render={() => (
            <AdminUpdate
              data={detailData}
              updateEvent={updateAdmin}
              deleteEvent={deleteAdmin}
            />
          )}
        />
      </Switch>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Admins);
