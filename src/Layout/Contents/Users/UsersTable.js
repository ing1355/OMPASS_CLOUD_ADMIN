import React from "react";
import { connect } from "react-redux";
import { allUserColumns } from "../../../Constants/TableColumns";
import CustomTable from "../../../CustomComponents/CustomTable";

const UsersTable = ({ tableData, tableLoadng, setDetailData, columns }) => {
  return (
    <>
      <ul className="UsersBox3_contents">
        <li>
          <CustomTable columns={columns ? columns : allUserColumns} datas={tableData} rowClick={setDetailData} pagination loading={tableLoadng}/>
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
