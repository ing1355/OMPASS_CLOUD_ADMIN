import React from "react";
import { allUserColumns } from "../../../Constants/TableColumns";
import UsersTable from "./UsersTable";

const UserAll = ({
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
        columns={allUserColumns}
        tableLoadng={tableLoading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sorted={sorted}
        setSorted={setSorted}
      />
    </>
  );
};

export default UserAll;
