import React, { useEffect, useState } from "react";
import "./Logs.css";
import ContentsTitle from "../ContentsTitle";
import { CustomAxiosGet } from "../../../Functions/CustomAxios";
import { getLogsApi } from "../../../Constants/Api_Route";
import { connect } from "react-redux";

const Logs = ({userProfile}) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    CustomAxiosGet(
      getLogsApi(userProfile.adminId),
      (data) => {
        setTableData(data);
      }
    );
  }, []);

  return (
    <>
      <ContentsTitle title="Logs Info"/>
      <div className="LogBox">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Action</th>
              <th>Application Name</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, ind) => <tr key={ind}>
              <td>{item.userId}</td>
              <td>{item.act}</td>
              <td>{item.appName}</td>
              <td>{item.status}</td>
              <td>{item.createdDate}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </>
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