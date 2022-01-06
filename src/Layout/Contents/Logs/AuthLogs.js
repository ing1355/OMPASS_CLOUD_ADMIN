import React, { useEffect, useState } from "react";
import "./Logs.css";
import ContentsTitle from "../ContentsTitle";
import { CustomAxiosGet } from "../../../Functions/CustomAxios";
import { getLogsApi } from "../../../Constants/Api_Route";
import { connect } from "react-redux";
import CustomTable from "../../../CustomComponents/CustomTable";
import { LogsColumns } from "../../../Constants/TableColumns";

const AuthLogs = ({ userProfile, locale }) => {
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);

  useEffect(() => {
    CustomAxiosGet(
      getLogsApi(userProfile.adminId),
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
      <ContentsTitle title="AuthLogs" />

      <div className="document-link">
        {locale === "ko" ? (
          <>
            <a
              target="_blank"
              href={"https://ompass.kr:4003/ko/Document/OMPASSLog"}
            >
              문서 &#62; OMPASS 로그 <b>이동하기</b>
            </a>
          </>
        ) : (
          <>
            <a
              target="_blank"
              href={"https://ompass.kr:4003/Document/OMPASSLog"}
            >
              <b>Go</b> OMPASS Logs &#62; Dashboard
            </a>
          </>
        )}
      </div>

      <div className="LogBox">
        <CustomTable
          columns={LogsColumns}
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthLogs);
