import React from "react";
import { connect } from "react-redux";
import { allUserColumns } from "../../../Constants/TableColumns";
import CustomTable from "../../../CustomComponents/CustomTable";

const UsersTable = ({ tableData, setDetailData, columns }) => {
  // console.log(tableData);
  return (
    <>
      <ul className="UsersBox3_contents">
        <li>
          <CustomTable columns={columns ? columns : allUserColumns} datas={tableData} rowClick={setDetailData} pagination/>
        </li>
      </ul>
    </>
  );
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
