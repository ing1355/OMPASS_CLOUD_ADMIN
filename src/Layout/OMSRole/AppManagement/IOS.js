import React, { useLayoutEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAppManagementApi, registerAppManagementApi } from "../../../Constants/Api_Route";
import { AppManagementIOSColumns } from "../../../Constants/TableColumns";
import CustomTable from "../../../CustomComponents/CustomTable";
import {
  CustomAxiosGet,
  CustomAxiosPost,
} from "../../../Functions/CustomAxios";
import ActionCreators from "../../../redux/actions";
import './AppManagement.css'

const IOS = ({showErrorMessage}) => {
  const [appVersion, setAppVersion] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);

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
            os : "ios"
        }
      }
    );
  }, []);

  const onChangeAppVersion = (e) => {
    setAppVersion(e.target.value);
  };

  const upadteIosVersion = () => {
    if(!appVersion) {
      return showErrorMessage('NO_APP_VERSION')
    }
    if(tableData.find(d => d.version === appVersion)) {
      return showErrorMessage('ALREADY_HAVE_VERSION')
    }
    const formData = new FormData();
    formData.append("version", appVersion);
    formData.append("os", "ios");
    CustomAxiosPost(
      registerAppManagementApi,
      formData,
      (res) => {
        console.log(res);
        setTableLoading(false);
      },
      (err) => {
        console.log(err);
        setTableLoading(false);
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };
  return (
    <div className="contents-container">
      <div className="app-management-div">
        <div>
          <FormattedMessage id="AppVersion"/> :{" "}
          <input value={appVersion || ""} onChange={onChangeAppVersion} />
          <button onClick={upadteIosVersion}><FormattedMessage id="REGISTER"/></button>
        </div>
      </div>

      <CustomTable
        columns={AppManagementIOSColumns}
        datas={tableData}
        pagination
        rowClick={({ version }) => {
          setAppVersion(version);
        }}
        numPerPage={10}
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

export default connect(mapStateToProps, mapDispatchToProps)(IOS);