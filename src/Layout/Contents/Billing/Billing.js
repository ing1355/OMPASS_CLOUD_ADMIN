import { message, Spin } from "antd";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import {
  getBillingKeyApi,
  getPaymentHistoryApi,
  getBillingInfoApi,
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
import CustomTable from "../../../CustomComponents/CustomTable";
import { BillingColumns } from "../../../Constants/TableColumns";

const Billing = ({ userProfile }) => {
  const { adminId, country } = userProfile;
  const isKorea = useCallback(() => (country === "KR" ? true : false), []);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [allUserNum, setAllUserNum] = useState(0);
  const [editions, setEditions] = useState([]);
  const [inputEdition, setInputEdition] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [paypalLoading, setPaypalLoading] = useState(false);
  const [inputTerm, setInputTerm] = useState("MONTHLY");
  const [inputUserNum, setInputUserNum] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [cost, setCost] = useState(0);
  const inputTermRef = useRef(null);
  const inputUserNumRef = useRef(null);

  const slicePrice = useCallback((price) => {
    const _price = price + "";
    if (_price.length < 4) return _price;
    else {
      const result = [];
      for (var i = 0; i < _price.length / 3; i++) {
        if (_price.length % 3 === 0)
          result.push(_price.substring(i * 3, i * 3 + 3));
        else {
          if (i === 0) result.push(_price.substring(0, _price.length % 3));
          else
            result.push(
              _price.substring(
                (i - 1) * 3 + (_price.length % 3),
                (i - 1) * 3 + (_price.length % 3) + 3
              )
            );
        }
      }
      return result.join(",");
    }
  }, []);

  useEffect(() => {
    if (inputUserNum && editions && inputEdition) {
      setCost(
        inputUserNum *
          editions.find((e) => e.name === inputEdition).priceForOneUser
      );
    }
  }, [inputUserNum, editions, inputEdition]);

  useLayoutEffect(() => {
    CustomAxiosGetAll(
      [getBillingInfoApi(adminId), getPaymentHistoryApi(adminId)],
      [
        (data) => {
          const { numberUsers, plan, pricing } = data;
          setAllUserNum(numberUsers);
          setCurrentPlan(plan);
          setEditions(pricing);
          setInputEdition(pricing[0].name);
          setCost(pricing[0].priceForOneUser * 1);
        },
        (data) => {
          setTableData(data);
        },
      ]
    );
  }, []);

  const changeEdition = (e) => {
    setInputEdition(e.target.value);
  };

  const billingsInfo = [
    {
      cardTitle: "OMPASS Free",
      itemLists: [
        { content: "Limited to 10 users", fontWeight: 700 },
        { content: "Designed for personal and home usage" },
      ],
    },
    {
      cardTitle: "OMPASS",
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
    if (!isKorea()) {
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
          <div className="billing-edition-data">
            {currentPlan ? currentPlan.name : billingsInfo[0].cardTitle}
          </div>
          <div className="billing-edition-title">Edition</div>
          <div className="billing-edition-subtitle">
            {currentPlan ? currentPlan.remainingDate : 0} days left
          </div>
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
            사용자
          </div>
        </div>
      </section>
      <section className="billing-info-container">
        {editions.length > 0 &&
          billingsInfo.map((item, ind) => (
            <div key={ind} className="billing-info-contents">
              <BillingInfoCard
                title={ind === 0 ? item.cardTitle : editions[ind - 1].name}
                subTitle={`${
                  isKorea()
                    ? slicePrice(
                        ind === 0 ? 0 : editions[ind - 1].priceForOneUser
                      ) + " 원"
                    : slicePrice(
                        ind === 0 ? 0 : editions[ind - 1].priceForOneUser
                      ) + " $"
                } / ${isKorea() ? "1인" : "User"} / Month`}
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

      <section className="Payment-History-table" style={{ border: "none" }}>
        <h2>결제 내역</h2>
        <CustomTable columns={BillingColumns} datas={tableData} />
      </section>

      <section className="billing-change-container">
        <h2>OMPASS Plan 결제</h2>
        <form onSubmit={onFinish}>
          <div className="billing-change-item">
            <label className="billing-change-form-label">플랜</label>
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
            <label className="billing-change-form-label">사용자 수</label>
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
            </div>
          </div>
          <div className="billing-change-item">
            <label className="billing-change-form-label">결제 주기</label>
            <select
              className="billing-change-form-select"
              name="term"
              onChange={(e) => {
                setInputTerm(e.target.value);
              }}
            >
              <option value="MONTHLY">매 월</option>
              {/* <option value="ANNUALY">Annual</option> */}
            </select>
          </div>
          <div className="billing-change-item">
            <label className="billing-change-form-label">가격</label>
            <b>
              {isKorea() ? slicePrice(cost) + " 원" : "$" + slicePrice(cost)}
            </b>
            <span>&nbsp;/ {isKorea() ? "월" : "month"}</span>
          </div>
          <div className="billing-change-item">
            <label className="billing-change-form-label">이용 동의</label>
            <div>
              <input type="checkbox" name="check" />
              <label>
                {" "}
                이용약관, 가격 및 수수료 규정에 동의합니다.
                <br /> 결제일로 부터 30일 간격으로 2,200원이 자동으로
                결제됩니다.
              </label>
            </div>
          </div>
          <div className="billing-change-item">
            <button
              name="payType"
              className="button"
              value="iamPort"
              type="submit"
            >
              결제하기
            </button>
          </div>
        </form>
      </section>
      <div className="pay-CustomConfirm">
        <CustomConfirm
          visible={confirmModal}
          confirmCallback={requestIamPort}
          footer={isKorea()}
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
            Cost :{" "}
            <b style={{ color: "Red" }}>
              {isKorea() ? slicePrice(cost) + " 원" : "$" + slicePrice(cost)}
            </b>
            <span>&nbsp;/ {isKorea() ? "월" : "month"}</span>
          </div>
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
