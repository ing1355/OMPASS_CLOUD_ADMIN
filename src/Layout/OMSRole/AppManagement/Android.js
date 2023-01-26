import React, { useLayoutEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  getAppManagementApi,
  registerAppManagementApi,
  updateAppManagementApi,
} from "../../../Constants/Api_Route";
import { AppManagementColumns } from "../../../Constants/TableColumns";
import CustomTable from "../../../CustomComponents/CustomTable";
import {
  CustomAxiosGet,
  CustomAxiosPost,
  CustomAxiosPut,
} from "../../../Functions/CustomAxios";
import ActionCreators from "../../../redux/actions";
import './AppManagement.css'

const Android = ({ showErrorMessage }) => {
  const [appVersion, setAppVersion] = useState("");
  const [description, setDescription] = useState("");
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0)

  useLayoutEffect(() => {
    CustomAxiosGet(
      getAppManagementApi,
      (data) => {
        console.log(data);
        setTableLoading(false);
        setTableData(data);
      },
      (err) => {
        setTableLoading(false);
      },
      {
        params: {
          os: "android"
        }
      }
    );
  }, []);

  const onChangeAppVersion = (e) => {
    setAppVersion(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const uploadApk = (e) => {
    if (!appVersion.length) {
      return showErrorMessage('NO_APP_VERSION')
    }
    setTableLoading(true);
    if (tableData.find((t) => t.version === appVersion)) {
      CustomAxiosPut(
        updateAppManagementApi,
        {
          version: appVersion,
          description,
          os:'android'
        },
        (data) => {
          setTableData(tableData.map(td => td.version === appVersion ? data : td))
          setTableLoading(false);
        },
        (err) => {
          console.log(err);
          setTableLoading(false);
        }
      );
    } else {
      CustomAxiosPost(
        registerAppManagementApi,
        {
          version: appVersion,
          description,
          os:'android'
        },
        (data) => {
          setTableData([data, ...tableData])
          setTableLoading(false);
        },
        (err) => {
          console.log(err);
          setTableLoading(false);
        }
      );
    }
  };

  return (
    <div className="contents-container">
      <div className="app-management-div">
        <div style={{ marginBottom: "1rem" }}>
          <FormattedMessage id="AppVersion" /> :{" "}
          <input value={appVersion} onChange={onChangeAppVersion} />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <FormattedMessage id="DESCRIPTION" /> :{" "}
          <input value={description} onChange={onChangeDescription} style={{ width: '45%' }} />
          <button onClick={uploadApk}><FormattedMessage id="REGISTER" /></button>
        </div>
      </div>
      <CustomTable
        columns={AppManagementColumns}
        datas={tableData}
        pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowClick={({ version, description }) => {
          setAppVersion(version);
          setDescription(description)
        }}
        loading={tableLoading}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    showErrorMessage: (id) => {
      dispatch(ActionCreators.showErrorMessage(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Android);