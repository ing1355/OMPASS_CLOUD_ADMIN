import { message, Spin } from "antd";
import React, { useLayoutEffect } from "react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  getBillingKeyApi,
  repayIamportEqualCardApi,
  repayIamportOtherCardApi,
  subscriptionIamportApi,
  updatePaypalApi,
  updateSubscriptionIamportApi,
} from "../../../Constants/Api_Route";
import CustomConfirm from "../../../CustomComponents/CustomConfirm";
import {
  CustomAxiosPost,
  CustomAxiosPut,
} from "../../../Functions/CustomAxios";
import { slicePrice } from "../../../Functions/SlicePrice";
import ActionCreators from "../../../redux/actions";
import { otherCardType, equalCardType } from "./Billing";

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
  editions,
  statusIsRUN,
  paymentType,
  setPaymentType,
}) => {
  const { adminId } = userProfile;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [costPerUser, setCostPerUser] = useState(0);

  useLayoutEffect(() => {
    if (
      currentPlan &&
      editions.length > 0 &&
      editions.find((e) => e.name === currentPlan.name)
    ) {
      setCostPerUser(
        editions.find((e) => e.name === currentPlan.name).priceForOneUser
      );
    }
  }, [editions, currentPlan]);

  const getBillingKeyFunction = (callback, repayment) => {
    setConfirmLoading(true);
    CustomAxiosPost(
      getBillingKeyApi(adminId),
      {
        paymentInterval: inputTerm,
        users: inputUserNum,
      },
      (data) => {
        callback(data, repayment);
      },
      () => {
        setConfirmLoading(false);
      }
    );
  };

  const subscriptionCallback = (data, repayment) => {
    const {
      merchant_uid,
      name,
      amount,
      customer_uid,
      buyer_email,
      buyer_name,
      buyer_tel,
      iamportCode,
      pg,
    } = data;
    setConfirmLoading(false);
    setConfirmModal(false);
    const callback = () => {
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
          pg,
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
            error_msg,
          } = res;
          console.log(res);
          if (success) {
            CustomAxiosPost(
              repayment
                ? repayIamportOtherCardApi(adminId)
                : subscriptionIamportApi(adminId),
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
                const { paymentSuccess } = data;
                if (paymentSuccess) {
                  showSuccessMessage("PAYMENT_SUCCESS");
                  window.location.reload();
                } else showErrorMessage("PAYMENT_FAIL");
              }
            );
          } else {
            message.error(error_msg);
          }
        }
      );
    };
    if (window.IMP) callback();
    else {
      let script2 = document.createElement("script");
      script2.src = "https://code.jquery.com/jquery-1.12.4.min.js";
      script2.onload = () => {
        let script = document.createElement("script");
        script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
        script.onload = callback;
        document.head.appendChild(script);
      };
      document.head.appendChild(script2);
    }
  };

  const requestIamPort = () => {
    if (statusIsRUN) {
      CustomAxiosPut(
        isKorea()
          ? updateSubscriptionIamportApi(adminId)
          : updatePaypalApi(adminId),
        {
          userCount: inputUserNum,
        },
        (data) => {
          setConfirmLoading(false);
          window.location.reload();
        },
        (err) => {
          setConfirmLoading(false);
        }
      );
    } else {
      if (!paymentType) {
        getBillingKeyFunction(subscriptionCallback);
      } else {
        if (paymentType === otherCardType) {
          getBillingKeyFunction(subscriptionCallback, true);
        } else {
          getBillingKeyFunction((data) => {
            CustomAxiosPost(
              repayIamportEqualCardApi(adminId),
              null,
              ({ paymentSuccess }) => {
                if (paymentSuccess) {
                  showSuccessMessage("PAYMENT_SUCCESS");
                  window.location.reload();
                } else {
                  setConfirmLoading(false);
                  showErrorMessage("PAYMENT_FAIL");
                }
              },
              (err) => {
                setConfirmLoading(false);
              }
            );
          });
        }
      }
    }
  };

  return (
    <CustomConfirm
      visible={confirmModal}
      confirmCallback={requestIamPort}
      className="billing-modal"
      footer={isKorea() || statusIsRUN}
      closable={!isKorea() && !statusIsRUN}
      okLoading={confirmLoading}
      cancelCallback={closeConfirmModal}
    >
      {!currentPlan || !statusIsRUN ? (
        <>
          <div>
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
          </div>
        </>
      ) : (
        <div>
          <FormattedMessage
            id="CHANGEBILLINGDESCRIPTION1"
            values={{ param: currentPlan.numberUsers }}
          />
          <br />
          <FormattedMessage
            id="CHANGEBILLINGDESCRIPTION2"
            values={{ param: <span>{inputUserNum}</span> }}
          />
          <br />
          <FormattedMessage
            id="CHANGEBILLINGDESCRIPTION3"
            values={{
              param: (
                <>
                  <b style={{ color: "Red" }}>
                    {isKorea()
                      ? slicePrice(
                          inputTerm === "MONTHLY"
                            ? currentPlan.numberUsers * costPerUser
                            : currentPlan.numberUsers * costPerUser * 12
                        ) + " 원"
                      : "$" +
                        slicePrice(
                          inputTerm === "MONTHLY"
                            ? currentPlan.numberUsers * costPerUser
                            : currentPlan.numberUsers * costPerUser * 12
                        )}
                  </b>
                  <span>
                    &nbsp;/ <FormattedMessage id={inputTerm} />
                  </span>
                </>
              ),
            }}
          />
          <br />
          <FormattedMessage
            id="CHANGEBILLINGDESCRIPTION4"
            values={{
              param: (
                <>
                  <b style={{ color: "Red" }}>
                    {isKorea()
                      ? slicePrice(inputTerm === "MONTHLY" ? cost : cost * 12) +
                        " 원"
                      : "$" +
                        slicePrice(inputTerm === "MONTHLY" ? cost : cost * 12)}
                  </b>
                  <span>
                    &nbsp;/ <FormattedMessage id={inputTerm} />
                  </span>
                </>
              ),
            }}
          />
          <br />
          <br />
          <b>
            <FormattedMessage id="CHANGEBILLINGDESCRIPTION5" />
          </b>
          <br />
          <br />
          <FormattedMessage id="CHANGEBILLINGDESCRIPTION6" />
          <br />
          <br />
        </div>
      )}
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
