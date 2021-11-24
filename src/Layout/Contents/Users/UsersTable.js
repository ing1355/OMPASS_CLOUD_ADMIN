import React from "react";
import { connect } from "react-redux";
import CustomSwitch from "../../../CustomComponents/CustomSwitch";
import CustomTable from "../../../CustomComponents/CustomTable";
import { allUserColumns } from "./columns";

const UsersTable = ({ tableData, setDetailData, columns }) => {
  
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
