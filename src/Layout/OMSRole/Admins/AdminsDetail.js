import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import CustomButton from "../../../CustomComponents/CustomButton";
import CustomConfirm from "../../../CustomComponents/CustomConfirm";
import "./AdminsDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import CustomTable from "../../../CustomComponents/CustomTable";
import {
  AdminsColumns,
  ApplicationsColumns,
  BillingColumns,
} from "../../../Constants/TableColumns";
import { FormattedMessage } from "react-intl";

const testData = [
  {
    name: "test",
    email: "test2",
    role: "test3",
    phone: "test4",
    country: "test5",
  },
];

const testData2 = [{ name: "test", status: "test2" }];

const AdminsDetail = ({ data }) => {
  console.log(data);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const openConfirm = () => {
    setConfirmVisible(true);
  };

  const closeConfirm = () => {
    setConfirmVisible(false);
  };

  const confirmCallback = () => {
    closeConfirm();
  };

  return data ? (
    <>
      <section className="delete-data-button">
        <CustomButton onClick={openConfirm}>데이터 삭제</CustomButton>
      </section>

      <section className="billing-deition-section">
        <h2>Edition</h2>
        <div className="billing-edition-container">
          <div className="billing-edition">
            <div className="billing-edition-data">OMPASS Free</div>
            <div className="billing-edition-title">Edition</div>
            <div className="billing-edition-subtitle">30 days left</div>
          </div>
          <div className="billing-edition">
            <div className="billing-edition-data">
              <FontAwesomeIcon
                style={{
                  fontSize: "30px",
                  color: "#00a9ec",
                  marginLeft: "7px",
                }}
                icon={faUser}
              />
              &nbsp; &nbsp;
              <b style={{ color: "#00a9ec", fontWeight: "bold" }}>5</b>
            </div>
            <div
              className="billing-edition-title"
              // style={{ color: "#00a9ec", fontWeight: "bold" }}
            >
              Users
            </div>
          </div>
        </div>
      </section>
      <section className="no-border">
        <h2>Payment History</h2>
        <CustomTable columns={BillingColumns} datas={[]}/>
      </section>
      <section>
        <h2>Policy</h2>
      </section>
      <section className="no-border">
        <h2>Applications</h2>
        <CustomTable
          columns={ApplicationsColumns}
          datas={testData2}
          pagination
          numPerPage={5}
        />
      </section>
      <section className="no-border">
        <h2>Sub Admins</h2>
        <CustomTable
          columns={AdminsColumns}
          datas={testData}
          pagination
          numPerPage={5}
        />
      </section>
      <CustomConfirm
        visible={confirmVisible}
        footer={true}
        cancelCallback={closeConfirm}
        confirmCallback={confirmCallback}
      >
        <FormattedMessage id="DELETECONFIRM"/>
      </CustomConfirm>
    </>
  ) : (
    <Redirect to="/Admins" />
  );
};

export default React.memo(AdminsDetail, (pre, next) => {
  if (pre.data === next.data) return true;
  return false;
});
