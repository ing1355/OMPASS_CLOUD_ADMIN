import React, { useEffect, useState } from "react";
import "./Logs.css";
import ContentsTitle from "../ContentsTitle";
import { CustomAxiosGet } from "../../../Functions/CustomAxios";
import { getLogsApi } from "../../../Constants/Api_Route";
import { connect } from "react-redux";
import CustomTable from "../../../CustomComponents/CustomTable";
import { LogsColumns } from "../../../Constants/TableColumns";
import LinkDocument from "../../../CustomComponents/LinkDocument";

const AuthLogs = ({ userProfile }) => {
  const {adminId} = userProfile
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0)
  const [sorted, setSorted] = useState({});

  useEffect(() => {
    if(adminId) {
      CustomAxiosGet(
        getLogsApi(adminId),
        (data) => {
          setTableData(data);
          setTableLoading(false);
        },
        () => {
          setTableLoading(false);
        }
      );
    }
  }, [adminId]);

  return (
    <div className="contents-container">
      <ContentsTitle title="AuthLogs" />

      <LinkDocument link="/document/ompass-log" />

      <div className="LogBox">
        <CustomTable
          columns={LogsColumns}
          loading={tableLoading}
          sorted={sorted}
          setSorted={setSorted}
          datas={tableData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagination
          searched
        />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthLogs);
