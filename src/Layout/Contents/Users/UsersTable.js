import React, { useState } from "react";
import { connect } from "react-redux";
import { allUserColumns } from "../../../Constants/TableColumns";
import CustomTable from "../../../CustomComponents/CustomTable";

const UsersTable = ({ tableData, tableLoadng, setDetailData, columns, currentPage, setCurrentPage, sorted, setSorted }) => {
  return (
    <>
      <ul className="UsersBox3_contents">
        <li>
          <CustomTable
            columns={columns ? columns : allUserColumns}
            datas={tableData}
            rowClick={setDetailData}
            sorted={sorted}
            setSorted={setSorted}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pagination
            loading={tableLoadng}
            searched
          />
        </li>
      </ul>
    </>
  );
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
