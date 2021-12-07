import React from "react";
import { connect } from "react-redux";
import { byPassUserColumns } from "../../../Constants/TableColumns";
import UsersTable from "./UsersTable";

const UserBypass = ({ tableData, setDetailData }) => {
  console.log(tableData);
  return (
    <>
      <UsersTable tableData={tableData} setDetailData={setDetailData} columns={byPassUserColumns}/>
    </>
  );
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBypass);
