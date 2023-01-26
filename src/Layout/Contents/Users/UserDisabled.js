import React from "react";
import { disabledUserColumns } from "../../../Constants/TableColumns";
import UsersTable from "./UsersTable";

const UserDisabled = ({
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
        columns={disabledUserColumns}
        tableLoading={tableLoading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sorted={sorted}
        setSorted={setSorted}
      />
    </>
  );
};

export default UserDisabled;
