import React from "react";
import { connect } from "react-redux";
import { allUserColumns } from "../../../Constants/TableColumns";
import UsersTable from "./UsersTable";

const UserAll = ({ tableData, setDetailData, tableLoading }) => {

  return (
    <>
      <UsersTable tableData={tableData} setDetailData={setDetailData} columns={allUserColumns} tableLoadng={tableLoading}/>
    </>
  );
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAll);
