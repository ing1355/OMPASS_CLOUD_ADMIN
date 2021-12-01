import React from "react";
import { connect } from "react-redux";
import { unRegisteredUserColumns } from "../../../Constants/TableColumns";
import UsersTable from "./UsersTable";

const UserUnregistered = ({ tableData, setDetailData }) => {

  return (
    <>
      <UsersTable tableData={tableData} setDetailData={setDetailData} columns={unRegisteredUserColumns}/>
    </>
  );
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserUnregistered);
