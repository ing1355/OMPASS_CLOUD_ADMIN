import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import "./Logs.css";
import ContentsTitle from "../ContentsTitle";
import { CustomAxiosGet } from "../../../Functions/CustomAxios";
import { getPolicyLogsApi } from "../../../Constants/Api_Route";
import { connect } from "react-redux";
import CustomTable from "../../../CustomComponents/CustomTable";
import { PolicyLogsChangeColumns, PolicyLogsColumns } from "../../../Constants/TableColumns";
import LinkDocument from "../../../CustomComponents/LinkDocument";
import CustomConfirm from "../../../CustomComponents/CustomConfirm";

const PolicyLogs = ({ userProfile, locale }) => {
  const { adminId } = userProfile;
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [selectedData, setSelectedData] = useState(null);
  const [changeModalVisible, setChangeModalVisible] = useState(false);

  useLayoutEffect(() => {
    CustomAxiosGet(
      getPolicyLogsApi(adminId),
      (data) => {
        setTableData(data.map(d => ({
          ...d,
          policyName: d.changes.afterPolicy.title,
          detail: () => {
            setChangeModalVisible(d.policyLogId)
          }
        })));
        setTableLoading(false);
      },
      () => {
        setTableLoading(false);
      }
    );
  }, []);

  useLayoutEffect(() => {
    if (changeModalVisible) {
      setSelectedData(tableData.find(td => td.policyLogId === changeModalVisible))
    } else {
      setSelectedData(null)
    }
  }, [changeModalVisible])

  const closeModal = useCallback(() => {
    setChangeModalVisible(false);
  }, [])

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
      <CustomConfirm
        visible={changeModalVisible}
        maskClosable={true}
        footer={null}
        cancelCallback={closeModal}
      >
        {console.log(selectedData)}
        {selectedData && <div className="policy-change-container">
          <h5>정책명 : {selectedData.policyName}</h5>
          <h5>활동 : {selectedData.act}</h5>
          <h5>시각 : {selectedData.createdDate}</h5>
          {selectedData.changes.beforePolicy && <>
            <CustomTable columns={PolicyLogsChangeColumns} />
            <div></div>
          </>}
          <div>
            <CustomTable columns={PolicyLogsChangeColumns} />
          </div>
        </div>}
      </CustomConfirm>
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
