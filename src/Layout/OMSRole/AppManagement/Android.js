import React, { useLayoutEffect, useRef, useState } from "react";
import {
  getAppManagementApi,
  registerAppManagementApi,
  updateAppManagementApi,
} from "../../../Constants/Api_Route";
import { AppManagementAndroidColumns } from "../../../Constants/TableColumns";
import CustomTable from "../../../CustomComponents/CustomTable";
import {
  CustomAxiosGet,
  CustomAxiosPost,
  CustomAxiosPut,
} from "../../../Functions/CustomAxios";

const Android = () => {
  const [appVersion, setAppVersion] = useState(null);
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
        osType: "android",
      }
    );
  }, []);

  const onChangeAppVersion = (e) => {
    setAppVersion(e.target.value);
  };

  const uploadApk = (e) => {
    const formData = new FormData();
    formData.append("file", fileRef.current.files[0]);
    formData.append("version", appVersion);
    formData.append("os", "android");
    setTableLoading(true);
    if (tableData.find((t) => t.version === appVersion)) {
      CustomAxiosPut(
        updateAppManagementApi,
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
    } else {
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
    }
  };
  return (
    <div className="contents-container">
      <div className="app-management-div">
        <div style={{ marginBottom: "1rem" }}>
          앱 버전 :{" "}
          <input value={appVersion || ""} onChange={onChangeAppVersion} />
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
          <button onClick={uploadApk}>업로드</button>
        </div>
      </div>
      <CustomTable
        columns={AppManagementAndroidColumns}
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

export default Android;
