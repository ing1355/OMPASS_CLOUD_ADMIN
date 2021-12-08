import React from "react";
import { connect } from "react-redux";
import { disabledUserColumns } from "../../../Constants/TableColumns";
import UsersTable from "./UsersTable";

const UserDisabled = ({ tableData, setDetailData, tableLoading }) => {
  return (
    <>
      <UsersTable tableData={tableData} setDetailData={setDetailData} columns={disabledUserColumns} tableLoading={tableLoading}/>
    </>
  );
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDisabled);
