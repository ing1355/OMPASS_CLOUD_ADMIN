import React, { useCallback, useState } from 'react'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { submitRefundIamportApi, submitRefundPaypalApi } from '../../../Constants/Api_Route';
import CustomConfirm from '../../../CustomComponents/CustomConfirm';
import { CustomAxiosPost } from '../../../Functions/CustomAxios';

const BillingRefund = ({userProfile, isKorea}) => {
    const {adminId} = userProfile
    const [refundOpen, setRefundOpen] = useState(false);
    const [refundLoading, setRefundLoading] = useState(false);

    const openRefund = useCallback(() => {
        setRefundOpen(true)
    },[])

    const closeRefund = useCallback(() => {
        setRefundOpen(false)
    },[])

    const submitRefund = () => {
        setRefundLoading(true);
        CustomAxiosPost(isKorea() ? submitRefundIamportApi(adminId) : submitRefundPaypalApi(adminId), null,
        (data) => {
            setRefundLoading(false);
            window.location.reload();
        }, () => {
            setRefundLoading(false);
        })
    }
    return <>
        <button className="refund" onClick={openRefund}><FormattedMessage id="Refund" /></button>
        <CustomConfirm
            visible={refundOpen}
            className="billing-modal"
            footer={true}
            confirmCallback={submitRefund}
            okLoading={refundLoading}
            cancelCallback={closeRefund}
        >
            <p className="subscription-cancel-title">
                <FormattedMessage id="SUBSCRIPTION_REFUND_TITLE" />
            </p>
            <div className="subscription-cancel-confirm">
                <FormattedMessage id="REFUNDSUBSCRIPTION_1" />
            </div>
            <div className="subscription-cancel-confirm">
                <FormattedMessage id="REFUNDSUBSCRIPTION_2" />
            </div>
        </CustomConfirm>
    </>
}

function mapStateToProps(state) {
    return {
      userProfile: state.userProfile
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(BillingRefund);