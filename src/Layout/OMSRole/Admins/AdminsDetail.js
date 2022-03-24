import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import CustomConfirm from "../../../CustomComponents/CustomConfirm";
import "./AdminsDetail.css";
import '../../Contents/Billing/Billing.css'
import CustomButton from "../../../CustomComponents/CustomButton";
import CustomTable from "../../../CustomComponents/CustomTable";
import {
  AdminsColumns,
  OMSApplicationsColumns,
  BillingColumns,
  OMSPaymentEventsColumns
} from "../../../Constants/TableColumns";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import BillingEdtion from "../../Contents/Billing/BillingEdition";

const AdminsDetail = ({ data, locale }) => {
  const { applications, billing, paymentHistories, policies, subAdmins, eventLogs } = data || {};
  const subAdminTableData = subAdmins && subAdmins.map(d => ({...d, name: d.firstName + d.lastName}))
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
    <> <div className="contents-container" style={{width:'80%'}}>
      {/* <section className="delete-data-button">
        <CustomButton onClick={openConfirm}>데이터 삭제</CustomButton>
      </section> */}

      <BillingEdtion plan={billing && billing.plan} allUserNum={billing && billing.numberUsers} isOMS/>

      <section className="no-border">
        <h2>Payment History</h2>
        <CustomTable columns={BillingColumns} datas={paymentHistories} numPerPage={5} pagination />
      </section>


      <section className="no-border">
        <h2>Payment Events</h2>
        <CustomTable columns={OMSPaymentEventsColumns} datas={eventLogs} numPerPage={5} pagination />
      </section>

      <section className="no-border">
        <h2>Applications</h2>
        <CustomTable
          columns={OMSApplicationsColumns}
          datas={applications}
          pagination
          numPerPage={5}
        />
      </section>


      <section className="no-border">
        <h2>Sub Admins</h2>
        <CustomTable
          columns={AdminsColumns}
          datas={subAdminTableData}
          pagination
          numPerPage={5}
        />
      </section>


      {/* <section>
        <h2>Policy</h2>
        <CustomTable
          columns={PolicyColumns}
          datas={policies}
          pagination
          numPerPage={5}
        />
      </section> */}
    </div>

      <CustomConfirm
        visible={confirmVisible}
        footer={true}
        cancelCallback={closeConfirm}
        confirmCallback={confirmCallback}
      >
        <FormattedMessage id="DELETECONFIRM" />
      </CustomConfirm>
    </>
  ) : (
    <Navigate to="/Admins" />
  );
};

function mapStateToProps(state) {
  return {
    locale: state.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminsDetail);