import React, { useEffect, useState } from "react";
import "./Admins.css";
// import "../../Login/Login.css";
import ContentsTitle from "../ContentsTitle";
import AdminAdd from "./AdminAdd";
import AdminDetail from "./AdminDetail";
import { CustomAxiosGet, CustomAxiosPatch } from "../../../Functions/CustomAxios";
import { getAdminsApi, update2faApi } from "../../../Constants/Api_Route";
import { Link, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import CustomTable from "../../../CustomComponents/CustomTable";
import ActionCreators from "../../../redux/actions";
import CustomConfirm from "../../../CustomComponents/CustomConfirm";
import PasswordConfirm from "../../../CustomComponents/PasswordConfirm";

const columns = [
  { name: "이름", key: "name" },
  { name: "이메일", key: "email" },
  { name: "권한", key: "role" },
  { name: "전화번호", key: "phone" },
  { name: "국가", key: "country" },
];

const Admins = ({ userProfile, history, setUserProfile }) => {
  console.log(userProfile);
  const { adminId, ompass } = userProfile;
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [detailData, setDetailData] = useState({});
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    CustomAxiosGet(getAdminsApi(adminId), (data) => {
      setTableData(
        data.map((d, index) => ({
          ...d,
          name: d.firstName + d.lastName,
          index,
        }))
      );
      setTableLoading(false);
    }, () => {
      setTableLoading(false);
    });
  }, []);

  const clickToDetail = (rowData) => {
    setDetailData(rowData);
    history.push("/Admins/Detail");
  };

  const updateAdmin = (rowData) => {
    setTableData(
      tableData.map((t) =>
        t.index === rowData.index
          ? { ...rowData, name: rowData.firstName + rowData.lastName }
          : t
      )
    );
  };

  const deleteAdmin = (index) => {
    setTableData(tableData.filter((t) => t.index !== index * 1));
  };

  const openConfirmModal = () => {
    setConfirmVisible(true);
  }

  const OMPASSToggle = () => {
    setConfirmLoading(true);
    CustomAxiosPatch(update2faApi(adminId), {
      flag: !ompass
    }, data => {
      setUserProfile({ ...userProfile, ompass: !ompass })
      setConfirmVisible(false);
      setConfirmLoading(false);
    }, () => {
      setConfirmLoading(false);
    })
  }

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
                  <Link to="/Admins/Add">
                    <button className="button admin-button">관리자 추가</button>
                  </Link>
                  <button className="button two-Auth-button admin-button" onClick={openConfirmModal}>
                    2차 인증 {ompass ? '비활성화' : '활성화'}
                  </button>
                </div>
                <CustomTable
                  columns={columns}
                  datas={tableData}
                  loading={tableLoading}
                  rowClick={clickToDetail}
                />
              </div>
              <PasswordConfirm visible={confirmVisible} setVisible={setConfirmVisible} loading={confirmLoading} setLoading={setConfirmLoading} callback={OMPASSToggle}/>
            </div>
          )}
        />
        <Route path="/Admins/Add" component={AdminAdd} />
        <Route
          path="/Admins/Detail"
          render={() => (
            <AdminDetail
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
  return {
    setUserProfile: (data) => {
      dispatch(ActionCreators.setProfile(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admins);
