import React, { useEffect, useState } from "react";
import "./Logs.css";
import ContentsTitle from "../ContentsTitle";
import { CustomAxiosGet } from "../../../Functions/CustomAxios";
import { getLogsApi } from "../../../Constants/Api_Route";
import { connect } from "react-redux";
import CustomTable from "../../../CustomComponents/CustomTable";
import { LogsColumns } from "../../../Constants/TableColumns";

const Logs = ({ userProfile }) => {
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);

  useEffect(() => {
    CustomAxiosGet(
      getLogsApi(userProfile.adminId),
      (data) => {
        setTableData(data);
        setTableLoading(false);
      },() => {
        setTableLoading(false);
      }
    );
  }, []);

  return (
    <div className="contents-container">
      <ContentsTitle title="Logs Info" />
      <div className="LogBox">
        <CustomTable columns={LogsColumns} datas={tableData} pagination numPerPage={10}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Logs);