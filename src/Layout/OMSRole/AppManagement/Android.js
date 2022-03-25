import React, { useLayoutEffect, useRef, useState } from "react";
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

const Android = ({showErrorMessage}) => {
  const [appVersion, setAppVersion] = useState("");
  const [description, setDescription] = useState("");
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const fileRef = useRef(null);

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
            os : "android"
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
    if(!appVersion.length) {
      return showErrorMessage('NO_APP_VERSION')
    }
    if(!fileRef.current.files.length) {
      return showErrorMessage('NO_APK_FILE')
    }
    const formData = new FormData();
    formData.append("file", fileRef.current.files[0]);
    formData.append("version", appVersion);
    formData.append("description", description);
    formData.append("os", "android");
    setTableLoading(true);
    if (tableData.find((t) => t.version === appVersion)) {
      CustomAxiosPut(
        updateAppManagementApi,
        formData,
        (data) => {
          setTableData(tableData.map(td => td.version === appVersion ? data : td))
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
    } else {
      CustomAxiosPost(
        registerAppManagementApi,
        formData,
        (data) => {
          setTableData([data, ...tableData])
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
    }
  };
  return (
    <div className="contents-container">
      <div className="app-management-div">
        <div style={{ marginBottom: "1rem" }}>
          <FormattedMessage id="AppVersion"/> :{" "}
          <input value={appVersion} onChange={onChangeAppVersion} />
        </div>

        <div style={{ marginBottom: "1rem", width: '600px' }}>
          <FormattedMessage id="DESCRIPTION"/> :{" "}
          <input value={description} onChange={onChangeDescription} style={{width:'80%'}}/>
        </div>

        <div>
          앱 무결성 체크 :{" "}
          <input
            type="file"
            name="file"
            ref={fileRef}
            id="file"
            accept=".apk"
          />
          <button onClick={uploadApk}><FormattedMessage id="UPLOAD"/></button>
        </div>
      </div>
      <CustomTable
        columns={AppManagementColumns}
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

export default connect(mapStateToProps, mapDispatchToProps)(Android);