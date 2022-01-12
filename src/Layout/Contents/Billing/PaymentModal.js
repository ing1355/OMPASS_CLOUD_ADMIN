import { Spin } from 'antd';
import React from 'react';
import { useState } from "react";
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getBillingKeyApi, subscriptionIamportApi } from '../../../Constants/Api_Route';
import CustomConfirm from "../../../CustomComponents/CustomConfirm";
import { CustomAxiosPost } from '../../../Functions/CustomAxios';
import { slicePrice } from '../../../Functions/SlicePrice';
import ActionCreators from '../../../redux/actions';

const PaymentModal = ({ showSuccessMessage, showErrorMessage, userProfile, isKorea, confirmModal, closeConfirmModal, paypalLoading, inputTerm, inputUserNum, inputEdition, cost,
    setConfirmModal, setTableData, setCurrentPlan }) => {
    const { adminId } = userProfile
    const [confirmLoading, setConfirmLoading] = useState(false);

    const requestIamPort = () => {
        setConfirmLoading(true);
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
                } = data;
                setConfirmLoading(false);
                setConfirmModal(false);
                window.IMP.init("imp92288614");
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
                                    const { paymentSuccess, paymentHistoryResponses, plan } = data;
                                    if (paymentSuccess) {
                                        setTableData(paymentHistoryResponses);
                                        setCurrentPlan(plan);
                                        showSuccessMessage("PAYMENT_SUCCESS");
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
    };

    return <CustomConfirm
        visible={confirmModal}
        confirmCallback={requestIamPort}
        footer={isKorea()}
        closable={!isKorea()}
        okLoading={confirmLoading}
        cancelCallback={closeConfirmModal}
    >
        <div>
            Edition : {inputEdition}
            <br />
            User Nums : {inputUserNum}
            <br />
            Term : {inputTerm}
            <br />
            Cost&nbsp;:&nbsp;
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
    </CustomConfirm>
}

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