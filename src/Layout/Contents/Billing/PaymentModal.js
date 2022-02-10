import { Spin } from "antd";
import React, { useLayoutEffect } from "react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  getBillingKeyApi,
  subscriptionIamportApi,
  updateSubscriptionIamportApi,
} from "../../../Constants/Api_Route";
import CustomConfirm from "../../../CustomComponents/CustomConfirm";
import { CustomAxiosPost, CustomAxiosPut } from "../../../Functions/CustomAxios";
import { slicePrice } from "../../../Functions/SlicePrice";
import ActionCreators from "../../../redux/actions";

const PaymentModal = ({
  showSuccessMessage,
  showErrorMessage,
  userProfile,
  isKorea,
  confirmModal,
  closeConfirmModal,
  paypalLoading,
  inputTerm,
  inputUserNum,
  inputEdition,
  cost,
  setConfirmModal,
  currentPlan,
  editions
}) => {
  const { adminId } = userProfile;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [costPerUser, setCostPerUser] = useState(0);

  useLayoutEffect(() => {
    if(currentPlan && editions.length > 0 && editions.find((e) => e.name === currentPlan.name)) {
      setCostPerUser(editions.find((e) => e.name === currentPlan.name).priceForOneUser)
    }
  },[editions, currentPlan])
  
  const requestIamPort = () => {
    setConfirmLoading(true);
    if(currentPlan.status === 'RUN') {
      CustomAxiosPut(updateSubscriptionIamportApi(adminId), {
        userCount: inputUserNum
      }, (data) => {
        setConfirmLoading(false);
        window.location.reload();
      })
    } else {
      CustomAxiosPost(
        getBillingKeyApi(adminId),
        {
          paymentInterval: inputTerm,
          users: inputUserNum,
        },
        (data) => {
          const {
            merchant_uid,
            name,
            amount,
            customer_uid,
            buyer_email,
            buyer_name,
            buyer_tel,
            iamportCode,
          } = data;
          setConfirmLoading(false);
          setConfirmModal(false);
          window.IMP.init(iamportCode);
          window.IMP.request_pay(
            {
              merchant_uid,
              name,
              amount,
              customer_uid,
              buyer_email,
              buyer_name,
              buyer_tel,
            },
            (res) => {
              const {
                success,
                apply_num,
                bank_name,
                buyer_addr,
                buyer_email,
                buyer_name,
                buyer_postcode,
                buyer_tel,
                card_name,
                card_number,
                card_quota,
                currency,
                custom_data,
                customer_uid,
                imp_uid,
                merchant_uid,
                name,
                paid_amount,
                paid_at,
                pay_method,
                pg_provider,
                pg_tid,
                pg_type,
                receipt_url,
                status,
              } = res;
              console.log(res);
              if (success) {
                CustomAxiosPost(
                  subscriptionIamportApi(adminId),
                  {
                    apply_num,
                    bank_name,
                    buyer_addr,
                    buyer_email,
                    buyer_name,
                    buyer_postcode,
                    buyer_tel,
                    card_name,
                    card_number,
                    card_quota,
                    currency,
                    custom_data,
                    customer_uid,
                    imp_uid,
                    merchant_uid,
                    name,
                    paid_amount,
                    paid_at,
                    pay_method,
                    pg_provider,
                    pg_tid,
                    pg_type,
                    receipt_url,
                    status,
                  },
                  (data) => {
                    const { paymentSuccess, paymentHistoryResponses, plan } =
                      data;
                    if (paymentSuccess) {
                      showSuccessMessage("PAYMENT_SUCCESS");
                      window.location.reload();
                    } else showErrorMessage("PAYMENT_FAIL");
                  }
                );
              } else {
                showErrorMessage("PAYMENT_FAIL");
              }
            }
          );
        },
        () => {
          setConfirmLoading(false);
        }
      );
    }
  };

  return (
    <CustomConfirm
      visible={confirmModal}
      confirmCallback={requestIamPort}
      className="billing-modal"
      footer={isKorea()}
      closable={!isKorea()}
      okLoading={confirmLoading}
      cancelCallback={closeConfirmModal}
    >
      {(!currentPlan || currentPlan.status !== 'RUN') ? <><div>
        <FormattedMessage id="PLAN" /> : {inputEdition}
        <br />
        <FormattedMessage id="USERNUM" /> : {inputUserNum}
        <br />
        <FormattedMessage id="PRICE" />
        &nbsp;:&nbsp;
        <b style={{ color: "Red" }}>
          {isKorea()
            ? slicePrice(inputTerm === "MONTHLY" ? cost : cost * 12) + " 원"
            : "$" + slicePrice(inputTerm === "MONTHLY" ? cost : cost * 12)}
        </b>
        <span>
          &nbsp;/ <FormattedMessage id={inputTerm} />
        </span>
      </div>
        <br />
        <div>
          <FormattedMessage id="BILLINGCONFIRMMESSAGE" />
        </div>
        <div
          id="paypal-button-container"
          style={{ textAlign: "center", marginTop: "2rem" }}
        >
          {paypalLoading && (
            <Spin>
              <FormattedMessage id="BILLINGLOADING" />
            </Spin>
          )}
        </div></> : <div>
          <FormattedMessage id="CHANGEBILLINGDESCRIPTION1" values={{param:currentPlan.numberUsers}}/><br/>
          <FormattedMessage id="CHANGEBILLINGDESCRIPTION2" values={{param:<span>{inputUserNum}</span>}}/><br/>
          <FormattedMessage id="CHANGEBILLINGDESCRIPTION3" values={{param:<><b style={{ color: "Red" }}>
          {isKorea()
            ? slicePrice(inputTerm === "MONTHLY" ? (currentPlan.numberUsers * costPerUser) : (currentPlan.numberUsers * costPerUser) * 12) + " 원"
            : "$" + slicePrice(inputTerm === "MONTHLY" ? (currentPlan.numberUsers * costPerUser) : (currentPlan.numberUsers * costPerUser) * 12)}
        </b>
        <span>
          &nbsp;/ <FormattedMessage id={inputTerm} />
        </span></>}}/><br/>
          <FormattedMessage id="CHANGEBILLINGDESCRIPTION4" values={{param:<><b style={{ color: "Red" }}>
          {isKorea()
            ? slicePrice(inputTerm === "MONTHLY" ? cost : cost * 12) + " 원"
            : "$" + slicePrice(inputTerm === "MONTHLY" ? cost : cost * 12)}
        </b>
        <span>
          &nbsp;/ <FormattedMessage id={inputTerm} />
        </span></>}}/><br/><br/>
          <b><FormattedMessage id="CHANGEBILLINGDESCRIPTION5"/></b><br/><br/>
          <FormattedMessage id="CHANGEBILLINGDESCRIPTION6"/><br/><br/>
        </div>}
    </CustomConfirm>
  );
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showSuccessMessage: (id) => {
      dispatch(ActionCreators.showSuccessMessage(id));
    },
    showErrorMessage: (id) => {
      dispatch(ActionCreators.showErrorMessage(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModal);
