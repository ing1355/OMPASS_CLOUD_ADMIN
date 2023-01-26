import React from "react";
import { byPassUserColumns } from "../../../Constants/TableColumns";
import UsersTable from "./UsersTable";

const UserBypass = ({
  tableData,
  setDetailData,
  tableLoading,
  currentPage,
  setCurrentPage,
  sorted,
  setSorted,
}) => {
  return (
    <>
      <UsersTable
        tableData={tableData}
        setDetailData={setDetailData}
        columns={byPassUserColumns}
        tableLoading={tableLoading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sorted={sorted}
        setSorted={setSorted}
      />
    </>
  );
};

export default UserBypass;
