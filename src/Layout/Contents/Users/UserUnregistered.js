import React from "react";
import { unRegisteredUserColumns } from "../../../Constants/TableColumns";
import UsersTable from "./UsersTable";

const UserUnregistered = ({
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
        columns={unRegisteredUserColumns}
        tableLoading={tableLoading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sorted={sorted}
        setSorted={setSorted}
      />
    </>
  );
};

export default UserUnregistered;
