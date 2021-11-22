import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getBillingKeyApi, subscriptionIamportApi } from '../../../Constants/Api_Route';
import { CustomAxiosPost } from '../../../Functions/CustomAxios';
import ContentsTitle from '../ContentsTitle';
import './Billing.css'

const Billing = ({userProfile}) => {
    const [billingKey, setBillingKey] = useState(null);
    const [inputEdtion, setInputEdtion] = useState('OMPASS Free');

    useEffect(() => {
        CustomAxiosPost(getBillingKeyApi(userProfile.adminId), null, data => {
            window.IMP.init('imp92288614');
            setBillingKey(data);
        })
    }, [])

    const changeEdtion = e => {
        setInputEdtion(e.target.value);
    }

    const billingsInfo = [
        {
            cardTitle: 'OMPASS Free', billing: 0, itemLists: [
                { content: 'Limited to 10 users', fontWeight: 700 },
                { content: 'Designed for personal and home usage' }
            ]
        },
        {
            cardTitle: 'OMPASS MFA', billing: 2, itemLists: [
                { content: '2FA for VPN and Web Apps' },
                { content: 'Single Sign-On' },
                { content: 'Role Based Access Controls (RBAC)' },
                { content: 'Single Sign-On' },
            ]
        }
    ]

    const BillingInfoCard = ({ title, subTitle }) => (
        <div className="billing-info-card">
            <div className="billing-info-card-title">{title}</div>
            <div className="billing-info-card-subtitle">{subTitle}</div>
        </div>
    );

    const onFinish = e => {
        e.preventDefault()
        const { check, edition, term, userNum } = e.target.elements;
        if (!check.checked) return message.error('Agreement에 체크해주세요.')
        const { merchant_uid, name, amount, customer_uid, buyer_email, buyer_name, buyer_tel } = billingKey;
        console.log(billingKey)
        window.IMP.request_pay({
            merchant_uid,
            name,
            amount,
            customer_uid,
            buyer_email,
            buyer_name,
            buyer_tel
        }, res => {
            const { success, apply_num, bank_name, buyer_addr, buyer_email, buyer_name, buyer_postcode, buyer_tel, card_name, card_number, card_quota, currency, custom_data,
                customer_uid, imp_uid, merchant_uid, name, paid_amount, paid_at, pay_method, pg_provider, pg_tid, pg_type, receipt_url, status } = res;
            console.log(res);
            if (success) {
                CustomAxiosPost(subscriptionIamportApi(userProfile.adminId), {
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
                    status
                }, () => {

                })
            } else {

            }
        })
    }

    return (
        userProfile.role === 'ADMIN' ? <div className="contents-container">
            <ContentsTitle title="Billings Info"/>
            <div className="billing-change-help-container">
                <div className="billing-change-help-icon">test</div>
                <div className="billing-change-help-msg">
                    평가판이 종료되면 최대 10명의 사용자에게 항상 무료로 제공되는 OMPASS
                    Free로 전환됩니다. 아래 양식을 사용하여 다른 버전으로 변경하십시오.
        </div>
            </div>
            <section className="billing-edition-container">
                <div className="billing-edition">
                    <div className="billing-edition-data">OMPASS Free Trial</div>
                    <div className="billing-edition-title">Edition</div>
                    <div className="billing-edition-subtitle">30 days left</div>
                </div>
                <div className="billing-edition">
                    <div className="billing-edition-data">0</div>
                    <div className="billing-edition-title">Users</div>
                </div>
            </section>
            <section className="billing-info-container">
                {billingsInfo.map((item, ind) => (
                    <div key={ind} className="billing-info-contents">
                        <BillingInfoCard
                            title={item.cardTitle}
                            subTitle={`$${item.billing} / User / Month`}
                        />
                        {item.itemLists.map((itemList, _ind) => (
                            <div
                                key={_ind}
                                style={{
                                    fontWeight: itemList.fontWeight,
                                }}
                                className="billing-info-contents-list"
                            >
                                {itemList.content}
                            </div>
                        ))}
                    </div>
                ))}
            </section>
            <section className="billing-change-container">
                <h2>Make Changes</h2>
                <form onSubmit={onFinish}>
                    <div className="billing-change-item">
                        <label className="billing-change-form-label">Edition</label>
                        <select
                            className="billing-change-form-select"
                            name="edition"
                            onChange={changeEdtion}
                        >
                            {billingsInfo.map((item, ind) => (
                                <option key={ind} value={item.cardTitle}>
                                    {item.cardTitle}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="billing-change-item">
                        <label className="billing-change-form-label">Number of Users</label>
                        <div>
                            <select className="billing-change-form-select" name="userNum">
                                {
                                    inputEdtion === 'OMPASS Free' ? <option value={10}>
                                        {10}
                                    </option> : new Array(1000).fill(1).map((item, ind) => (
                                        <option key={ind} value={ind}>
                                            {ind}
                                        </option>
                                    ))
                                }
                            </select>
                            <div style={{ marginTop: "16px" }}>
                                More than 2500 users? No problem.
                            </div>
                            <div>
                                Contact our sales team for multi-year discounts and invoiced
                                billing.
                            </div>
                            <div>Just call 0-000-000-0000 or contact us.</div>
                        </div>
                    </div>
                    <div className="billing-change-item">
                        <label className="billing-change-form-label">Term</label>
                        <select
                            className="billing-change-form-select" name="term">
                            <option value="Monthly">Monthly</option>
                            <option value="Annual">Annual</option>
                        </select>
                    </div>
                    <div className="billing-change-item">
                        <label className="billing-change-form-label">Cost</label>
                        <b>$90</b>
                        <span>/month</span>
                    </div>
                    <div className="billing-change-item">
                        <label className="billing-change-form-label">Agreement</label>
                        <div>
                            <input type="checkbox" name="check"/>
                            <label>
                                {" "}
                                I agree to the Terms and Conditions as well as well pricing and
                                fee rules
                            </label>
                        </div>
                    </div>
                    <div className="billing-change-item">
                        <div>
                            Subscription changes made during your current billing cycle may
                            result in a prorate<br />
                            charge once the subscription changes have benn updated
                        </div>
                        <button type="submit">Update Subscription</button>
                    </div>
                </form>
            </section>
        </div> : <Redirect to="/"/>
    );
};

function mapStateToProps(state) {
    return {
      userProfile: state.userProfile
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Billing);