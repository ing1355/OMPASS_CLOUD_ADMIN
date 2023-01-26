import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import CustomConfirm from "../../../CustomComponents/CustomConfirm";
import "./AdminsDetail.css";
import '../../Contents/Billing/Billing.css'
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
import AdminInfo from "./AdminInfo";
import CustomButton from "../../../CustomComponents/CustomButton";
import { CustomAxiosPut } from '../../../Functions/CustomAxios';
import { adminAccessControlChangeByOMSApi } from "../../../Constants/Api_Route";

const AdminsDetail = ({ data }) => {
  const { applications, billing, paymentHistories, subAdmins, eventLogs, adminData, ompassAdminApplication } = data || {};
  const {accessControl, policyId} = ompassAdminApplication || {}
  const subAdminTableData = subAdmins && subAdmins.map(d => ({...d, name: d.firstName + d.lastName}))
  const [ompassStatus, setOmpassStatus] = useState(accessControl)
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0)
  const [currentPage2, setCurrentPage2] = useState(0)
  const [currentPage3, setCurrentPage3] = useState(0)
  const [currentPage4, setCurrentPage4] = useState(0)
  const [sorted, setSorted] = useState({});
  // const openConfirm = () => {
  //   setConfirmVisible(true);
  // };

  const closeConfirm = () => {
    setConfirmVisible(false);
  };

  const confirmCallback = () => {
    closeConfirm();
  };

  const adminOMPASSToggle = () => {
    const result = ompassStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    CustomAxiosPut(adminAccessControlChangeByOMSApi, {
      accessControl: result,
      policyId
    }, () => {
      setOmpassStatus(result)
    })
  }

  return data ? (
    <> <div className="contents-container" style={{width:'80%'}}>
      {/* <section className="delete-data-button">
        <CustomButton onClick={openConfirm}>데이터 삭제</CustomButton>
      </section> */}

      <AdminInfo data={adminData}/>

      <h2>Billing Info</h2>
      <BillingEdtion plan={billing && billing.plan} allUserNum={billing && billing.numberUsers} isOMS/>

      <section className="no-border">
        <h2>Payment History</h2>
        <CustomTable sorted={sorted} setSorted={setSorted} columns={BillingColumns} datas={paymentHistories} numPerPage={5} pagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </section>


      <section className="no-border">
        <h2>Payment Events</h2>
        <CustomTable columns={OMSPaymentEventsColumns} datas={eventLogs} numPerPage={5} pagination currentPage={currentPage2} setCurrentPage={setCurrentPage2}/>
      </section>

      <section className="no-border">
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <h2>Applications</h2><CustomButton className={"button" + (ompassStatus === 'INACTIVE' ? ' red' : '')} onClick={adminOMPASSToggle}>
            {ompassStatus === 'INACTIVE' ? 'OMPASS 인증 필수로 변경' : 'OMPASS 인증 패스로 변경'}
          </CustomButton>
        </div>
        <CustomTable
          columns={OMSApplicationsColumns}
          datas={applications}
          pagination
          currentPage={currentPage3}
          setCurrentPage={setCurrentPage3}
          numPerPage={5}
        />
      </section>


      <section className="no-border">
        <h2>Sub Admins</h2>
        <CustomTable
          columns={AdminsColumns}
          datas={subAdminTableData}
          pagination
          currentPage={currentPage4}
          setCurrentPage={setCurrentPage4}
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