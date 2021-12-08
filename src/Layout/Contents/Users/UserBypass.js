import React from "react";
import { connect } from "react-redux";
import { byPassUserColumns } from "../../../Constants/TableColumns";
import UsersTable from "./UsersTable";

const UserBypass = ({ tableData, setDetailData, tableLoading }) => {
  return (
    <>
      <UsersTable tableData={tableData} setDetailData={setDetailData} columns={byPassUserColumns} tableLoading={tableLoading}/>
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
