import { message, Spin } from "antd";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import {
  getBillingKeyApi,
  getPricingApi,
  getUsersApi,
  startPaypalApi,
  subscriptionIamportApi,
} from "../../../Constants/Api_Route";

import CustomConfirm from "../../../CustomComponents/CustomConfirm";
import {
  CustomAxiosGet,
  CustomAxiosGetAll,
  CustomAxiosPost,
} from "../../../Functions/CustomAxios";
import ContentsTitle from "../ContentsTitle";
import "./Billing.css";

const Billing = ({ userProfile }) => {
  const { adminId, country } = userProfile;
  const [allUserNum, setAllUserNum] = useState(0);
  const [editions, setEditions] = useState([]);
  const [inputEdition, setInputEdition] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [paypalLoading, setPaypalLoading] = useState(false);
  const [inputTerm, setInputTerm] = useState("MONTHLY");
  const [inputUserNum, setInputUserNum] = useState(1);
  const [cost, setCost] = useState(0);
  const inputTermRef = useRef(null);
  const inputUserNumRef = useRef(null);

  useEffect(() => {
    if (inputUserNum && editions && inputEdition) {
      setCost(
        inputUserNum *
          editions.find((e) => e.name === inputEdition).priceForOneUser
      );
    }
  }, [inputUserNum, editions, inputEdition]);

  useLayoutEffect(() => {
    CustomAxiosGetAll([getUsersApi(adminId), getPricingApi(country)], [(data) => {
      setAllUserNum(data.length);
    }, (data) => {
      setEditions(data);
      setInputEdition(data[0].name);
      setCost(data[0].priceForOneUser * 1);
    }])
  }, []);

  const changeEdition = (e) => {
    setInputEdition(e.target.value);
  };

  const billingsInfo = [
    {
      cardTitle: "OMPASS Free",
      billing: 0,
      itemLists: [
        { content: "Limited to 10 users", fontWeight: 700 },
        { content: "Designed for personal and home usage" },
      ],
    },
    {
      cardTitle: "OMPASS",
      billing: 2,
      itemLists: [
        { content: "2FA for VPN and Web Apps" },
        { content: "패스워드 없이 인증" },
        { content: "2차 인증" },
        { content: "WEBAUTHN 지원" },
      ],
    },
  ];

  const BillingInfoCard = ({ title, subTitle }) => (
    <div className="billing-info-card">
      <div className="billing-info-card-title">{title}</div>
      <div className="billing-info-card-subtitle">{subTitle}</div>
    </div>
  );

  const closeConfirmModal = () => {
    setConfirmModal(false);
  };

  const onFinish = (e) => {
    e.preventDefault();
    const { check, term, userNum } = e.target.elements;
    if (!check.checked) return message.error("Agreement에 체크해주세요.");
    inputTermRef.current = term.value;
    inputUserNumRef.current = userNum.value;
    setConfirmModal(true);
    if (country === "KR") {
      setPaypalLoading(true);
      requestPaypal();
    }
  };

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
                () => {}
              );
            } else {
            }
          }
        );
      },
      () => {
        setConfirmLoading(false);
      }
    );
  };

  const requestPaypal = () => {
    CustomAxiosPost(
      startPaypalApi(adminId),
      {
        paymentInterval: inputTermRef.current,
        users: inputUserNumRef.current,
      },
      ({ planId }) => {
        setPaypalLoading(false);
        window.paypal
          .Buttons({
            createSubscription: function (data, actions) {
              return actions.subscription.create({
                plan_id: planId,
                admin_id: "adminId",
              });
            },
            onCancel: function (data) {
              console.log(data);
              setConfirmModal(false);
            },
            onApprove: function (data, actions) {
              console.log(data, actions);
            },
            onError: function (err) {
              console.log(err);
            },
          })
          .render("#paypal-button-container");
      }
    );
  };

  return userProfile.role !== "SUB_ADMIN" ? (
    <div className="contents-container">
      <ContentsTitle title="Billings Info" />
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
          <div className="billing-edition-data">
            <FontAwesomeIcon
              style={{ fontSize: "30px", color: "#00a9ec", marginLeft: "7px" }}
              icon={faUser}
            />
            &nbsp; &nbsp;
            <b style={{ color: "#00a9ec", fontWeight: "bold" }}>{allUserNum}</b>
          </div>
          <div
            className="billing-edition-title"
            // style={{ color: "#00a9ec", fontWeight: "bold" }}
          >
            Users
          </div>
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
              onChange={changeEdition}
            >
              {editions.map((item, ind) => (
                <option key={ind} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="billing-change-item">
            <label className="billing-change-form-label">Number of Users</label>
            <div>
              <select
                className="billing-change-form-select"
                name="userNum"
                onChange={(e) => {
                  setInputUserNum(e.target.value);
                }}
              >
                {new Array(1000).fill(1).map((item, ind) => (
                  <option key={ind} value={ind + 1}>
                    {ind + 1}
                  </option>
                ))}
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
              className="billing-change-form-select"
              name="term"
              onChange={(e) => {
                setInputTerm(e.target.value);
              }}
            >
              <option value="MONTHLY">Monthly</option>
              {/* <option value="ANNUALY">Annual</option> */}
            </select>
          </div>
          <div className="billing-change-item">
            <label className="billing-change-form-label">Cost</label>
            <b>{country === "KR" ? cost + " 원" : "$" + cost}</b>
            <span>&nbsp;/ {country === "KR" ? "월" : "month"}</span>
          </div>
          <div className="billing-change-item">
            <label className="billing-change-form-label">Agreement</label>
            <div>
              <input type="checkbox" name="check" />
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
              result in a prorate
              <br />
              charge once the subscription changes have benn updated
            </div>
            <button
              name="payType"
              className="button"
              value="iamPort"
              type="submit"
            >
              Update Subscription
            </button>
          </div>
        </form>
      </section>
      <CustomConfirm
        visible={confirmModal}
        confirmCallback={requestIamPort}
        okLoading={confirmLoading}
        cancelCallback={closeConfirmModal}
      >
        Edition : {inputEdition}
        <br />
        User Nums : {inputUserNum}
        <br />
        Term : {inputTerm}
        <br />
        Cost :{" "}
        <b style={{ color: "Red" }}>
          {country === "KR" ? cost + " 원" : "$" + cost}
        </b>
        <span>&nbsp;/ {country === "KR" ? "월" : "month"}</span>
        <br />
        상기 내용으로 결제를 진행하시겠습니까?
        <div
          id="paypal-button-container"
          style={{ textAlign: "center", marginTop: "2rem" }}
        >
          {paypalLoading && <Spin>결제 창 불러오는 중...</Spin>}
        </div>
      </CustomConfirm>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Billing);
