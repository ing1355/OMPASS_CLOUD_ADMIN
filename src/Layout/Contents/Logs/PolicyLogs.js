import React, { useEffect, useState } from "react";
import "./Logs.css";
import ContentsTitle from "../ContentsTitle";
import { CustomAxiosGet } from "../../../Functions/CustomAxios";
import { getPolicyLogsApi } from "../../../Constants/Api_Route";
import { connect } from "react-redux";
import CustomTable from "../../../CustomComponents/CustomTable";
import { PolicyLogsColumns } from "../../../Constants/TableColumns";
import LinkDocument from "../../../CustomComponents/LinkDocument";

const PolicyLogs = ({ userProfile, locale }) => {
  const { adminId } = userProfile;
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);

  useEffect(() => {
    CustomAxiosGet(
      getPolicyLogsApi(adminId),
      (data) => {
        setTableData(data);
        setTableLoading(false);
      },
      () => {
        setTableLoading(false);
      }
    );
  }, []);

  return (
    <div className="contents-container">
      <ContentsTitle title="PolicyLogs" />

      <LinkDocument link="/document/log" />

      <div className="LogBox">
        <CustomTable
          columns={PolicyLogsColumns}
          loading={tableLoading}
          datas={tableData}
          pagination
          searched
          numPerPage={10}
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

export default connect(mapStateToProps, mapDispatchToProps)(PolicyLogs);
