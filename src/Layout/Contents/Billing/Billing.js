import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { connect } from "react-redux";
import LinkDocument from "../../../CustomComponents/LinkDocument";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCheckSquare,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

import {
  getPaymentHistoryApi,
  getBillingInfoApi,
  startPaypalApi,
} from "../../../Constants/Api_Route";
import {
  CustomAxiosGetAll,
  CustomAxiosPost,
} from "../../../Functions/CustomAxios";
import ContentsTitle from "../ContentsTitle";
import "./Billing.css";
import CustomTable from "../../../CustomComponents/CustomTable";
import { BillingColumns } from "../../../Constants/TableColumns";
import { slicePrice } from "../../../Functions/SlicePrice";
import { FormattedMessage, useIntl } from "react-intl";
import ActionCreators from "../../../redux/actions";
import {
  getDateFormatEn,
  getDateFormatKr,
} from "../../../Functions/GetFullDate";
import { planStatusCodes } from "../Dashboard/Dashboard";
import PaymentModal from "./PaymentModal";
import SubscriptionCancel from "./SubscriptionCancel";
import { Navigate } from "react-router-dom";
import TermsOfUse from "./TermsOfUse";

const Billing = ({
  userProfile,
  locale,
  showErrorMessage,
  openTermsOfPurchase,
}) => {
  const { adminId, country } = userProfile;
  const isKorea = useCallback(
    () => (country === "KR" ? true : false),
    [country]
  );
  const [allCheck, setAllCheck] = useState(false);
  const [subCheck1, setSubCheck1] = useState(false);
  const [subCheck2, setSubCheck2] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [allUserNum, setAllUserNum] = useState(0);
  const [editions, setEditions] = useState([]);
  const [inputEdition, setInputEdition] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [paypalLoading, setPaypalLoading] = useState(false);
  const [inputTerm, setInputTerm] = useState("MONTHLY");
  const [inputUserNum, setInputUserNum] = useState(11);
  const [tableData, setTableData] = useState([]);
  const [cost, setCost] = useState(0);
  const [termsOfUseVisible, setTermsOfUseVisible] = useState(false);
  const userNumList = useMemo(() => new Array(990).fill(1), []);

  const { formatMessage } = useIntl();
  const inputTermRef = useRef(null);
  const inputUserNumRef = useRef(null);

  const getColorByUserNum = useCallback((num, maxNum) => {
    const rate = getRateByUserNum(num, maxNum);
    if (rate < 33) {
      return "#00a9ec";
    } else if (rate < 66) {
      return "#00ec90";
    } else {
      return "#ecbf00";
    }
  }, []);

  const getRateByUserNum = useCallback((num, maxNum) => {
    return (num / maxNum) * 100;
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
    if (adminId) {
      CustomAxiosGetAll(
        [getBillingInfoApi(adminId), getPaymentHistoryApi(adminId)],
        [
          (data) => {
            const { numberUsers, plan, pricing } = data;
            setAllUserNum(numberUsers);
            setCurrentPlan(plan);
            setEditions(pricing);
            setInputEdition(pricing[0].name);
            setCost(pricing[0].priceForOneUser * inputUserNum);
          },
          (data) => {
            setTableData(data);
          },
        ]
      );
    }
  }, [adminId]);

  const billingsInfo = [
    {
      itemLists: [
        { content: <FormattedMessage id="BILLINGPLANDESCRIPTION1_1" /> },
        { content: <FormattedMessage id="BILLINGPLANDESCRIPTION1_2" /> },
        { content: <FormattedMessage id="BILLINGPLANDESCRIPTION1_3" /> },
        { content: <FormattedMessage id="BILLINGPLANDESCRIPTION1_4" /> },
      ],
    },
  ];

  const BillingInfoCard = ({ title, subTitle }) => (
    <div className="billing-info-card">
      <div className="billing-info-card-title">{title}</div>
      <div className="billing-info-card-subtitle">{subTitle}</div>
    </div>
  );

  const closeConfirmModal = useCallback(() => {
    setConfirmModal(false);
  }, []);

  const onFinish = (e) => {
    e.preventDefault();
    const { term, userNum, checkAll } = e.target.elements;
    if (currentPlan.status === "RUN") {
      if (currentPlan.numberUsers === userNum.value * 1)
        return showErrorMessage("PLEASE_CHANGE_USER_NUM_DIFFERNT");
      if (allUserNum > userNum.value * 1)
        return showErrorMessage("PLEASE_CHANGE_USER_NUM_MORE_THAN_BEFORE");
    } else {
      if (allUserNum > userNum.value * 1)
        return showErrorMessage("PLEASE_CHANGE_USER_NUM_MORE_THAN_BEFORE");
    }
    if (currentPlan.status !== "RUN" && !checkAll.checked)
      return showErrorMessage("PLEASE_AGREEMENT_CHECK");
    if (currentPlan && currentPlan.status === "RUN") {
      if (
        new Date(currentPlan.createDate).getFullYear() ===
        new Date(currentPlan.expireDate).getFullYear()
      )
        inputTermRef.current = "MONTHLY";
      else inputTermRef.current = "ANNUALLY";
    } else inputTermRef.current = term.value;
    inputUserNumRef.current = userNum.value;
    setConfirmModal(true);
    if (!isKorea()) {
      setPaypalLoading(true);
      requestPaypal();
    }
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
              window.location.reload();
            },
            onError: function (err) {
              console.log(err);
            },
          })
          .render("#paypal-button-container");
      }
    );
  };

  const changeAllCheck = useCallback((e) => {
    setAllCheck(e.target.checked);
    if (e.target.checked) {
      setSubCheck1(true);
      setSubCheck2(true);
    } else {
      setSubCheck1(false);
      setSubCheck2(false);
    }
  }, []);

  const changeCheck1 = useCallback((e) => {
    setSubCheck1(e.target.checked);
  }, []);

  const changeCheck2 = useCallback((e) => {
    setSubCheck2(e.target.checked);
  }, []);

  useLayoutEffect(() => {
    if (subCheck1 && subCheck2) setAllCheck(true);
    else setAllCheck(false);
  }, [subCheck1, subCheck2]);

  const openTermsOfUse = useCallback(() => {
    setTermsOfUseVisible(true);
  }, []);

  return userProfile.role !== "SUB_ADMIN" ? (
    <div className="contents-container">
      <ContentsTitle title="Billing" />

      <LinkDocument link="/document/billing" />

      <section className="billing-edition-container">
        <div className="billing-edition">
          <div className="billing-edition-data">
            {!currentPlan || currentPlan.status === "FREE" ? (
              <FormattedMessage id="FREE_TRIAL" />
            ) : (
              currentPlan.name
            )}
          </div>
          <div className="billing-edition-subtitle">
            {currentPlan &&
              (currentPlan.status === "FREE" ? (
                ""
              ) : (
                <FormattedMessage
                  id="DAYSLEFT"
                  values={{ day: currentPlan.remainingDate }}
                />
              ))}
          </div>
        </div>
        <div className="billing-edition billing-info">
          <h5>
            <FontAwesomeIcon
              style={{
                color: "rgb(0, 209, 52)",
                fontSize: "1.1rem",
                marginBottom: "0.12rem",
              }}
              icon={faCheckSquare}
            />
            &nbsp;&nbsp;&nbsp;
            {currentPlan && currentPlan.status
              ? planStatusCodes[currentPlan.status]
              : planStatusCodes["STOPPED"]}
          </h5>
          <h6>
            <FontAwesomeIcon
              style={{ fontSize: "1.1rem", marginBottom: "0.15rem" }}
              icon={faCalendarCheck}
            />
            &nbsp;&nbsp;&nbsp;
            {currentPlan && currentPlan.status !== "FREE" ? (
              locale === "ko" ? (
                getDateFormatKr(currentPlan.createDate) +
                " ~ " +
                getDateFormatKr(currentPlan.expireDate)
              ) : (
                getDateFormatEn(currentPlan.createDate) +
                " ~ " +
                getDateFormatEn(currentPlan.expireDate)
              )
            ) : (
              <FormattedMessage id="USED_FREE_PLAN" />
            )}
          </h6>
          <SubscriptionCancel
            isKorea={isKorea}
            currentPlan={currentPlan}
            setCurrentPlan={setCurrentPlan}
            editions={editions}
          />
        </div>
        <div className="billing-edition billing-edition-user-count">
          <div className="billing-edition-top-box billing-edition-users">
            <b style={{ color: "#00a9ec" }}>
              {allUserNum}
              <FormattedMessage id="PERNUM" />
            </b>
            &nbsp;/&nbsp;
            {currentPlan && currentPlan.numberUsers}
            <FormattedMessage id="PERNUM" />
          </div>
          <div className="billing-edition-top-box">
            <label>
              <FontAwesomeIcon
                style={{
                  fontSize: "15px",
                  color: "#00a9ec",
                  marginRight: "5px",
                }}
                icon={faUser}
              />
              <FormattedMessage id="USER" />
            </label>
            <div className="progress-bar">
              <div
                className="progress-bar-front"
                style={{
                  backgroundColor: getColorByUserNum(
                    allUserNum,
                    currentPlan && currentPlan.numberUsers
                  ),
                  width:
                    getRateByUserNum(
                      allUserNum,
                      currentPlan && currentPlan.numberUsers
                    ) + "%",
                }}
              ></div>
              <div className="progress-bar-back"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="billing-info-container">
        {editions.length > 0 &&
          billingsInfo.map((item, ind) => (
            <div key={ind} className="billing-info-contents">
              <BillingInfoCard
                title={
                  <>
                    {editions[ind].name} <FormattedMessage id="PLAN" />
                  </>
                }
                subTitle={`${isKorea() ? "" : "$ "}${formatMessage(
                  { id: "PRICEUNIT" },
                  { param: slicePrice(editions[ind].priceForOneUser) }
                )} ${isKorea() ? "원" : ""} 
                / ${formatMessage({ id: "PERUSER" })} / ${formatMessage({
                  id: "MONTHLY",
                })}`}
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
        <h2>
          OMPASS <FormattedMessage id="PAYMENT" />
          {currentPlan && tableData.length > 0 && (currentPlan.numberUsers !== tableData[0].numberUsers) &&
            <span style={{ fontSize: '12px', color: 'red', marginLeft: '12px' }}>
              <FormattedMessage id="PRICE_CHANGE_DESCRIPTION" 
              values={{param: isKorea() ? slicePrice(editions[0].priceForOneUser * currentPlan.numberUsers) + '원 ' : slicePrice(editions[0].priceForOneUser * currentPlan.numberUsers) + '$'}}/></span>}
        </h2>
        <form onSubmit={onFinish}>
          <div className="billing-change-item">
            <label className="billing-change-form-label">
              {!currentPlan || currentPlan.status !== "RUN" ? (
                <FormattedMessage id="USERNUM" />
              ) : (
                <FormattedMessage id="CHANGEUSERNUM" />
              )}
            </label>
            <div>
              <select
                className="billing-change-form-select"
                name="userNum"
                value={inputUserNum}
                onChange={(e) => {
                  setInputUserNum(e.target.value);
                }}
              >
                {userNumList.map((item, ind) => (
                  <option key={ind + 11} value={ind + 11}>
                    {ind + 11}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {(!currentPlan || currentPlan.status !== "RUN") && (
            <div className="billing-change-item">
              <label className="billing-change-form-label">
                <FormattedMessage id="BILLINGCYCLE" />
              </label>
              <select
                className="billing-change-form-select"
                name="term"
                onChange={(e) => {
                  setInputTerm(e.target.value);
                }}
              >
                <option value="MONTHLY">
                  {formatMessage({ id: "MONTHLY" })}
                </option>
                {/* <option value="ANNUALLY">
                {formatMessage({ id: "ANNUALLY" })}
              </option> */}
              </select>
            </div>
          )}
          <div className="billing-change-item">
            <label className="billing-change-form-label">
              <FormattedMessage id="PRICECOLUMN" />
            </label>
            <b>
              {isKorea() ? "" : "$ "}
              {formatMessage(
                { id: "PRICEUNIT" },
                {
                  param: slicePrice(inputTerm === "MONTHLY" ? cost : cost * 12),
                }
              )}
              {isKorea() ? " 원" : ""}
            </b>
            <span>
              &nbsp;/ <FormattedMessage id={inputTerm} />
            </span>
          </div>
          {(!currentPlan || currentPlan.status !== "RUN") && (
            <div
              className="billing-change-item"
              style={{ alignItems: "baseline" }}
            >
              <label className="billing-change-form-label">
                <FormattedMessage id="AGREE" />
              </label>
              <div>
                <input
                  type="checkbox"
                  name="checkAll"
                  checked={allCheck}
                  onChange={changeAllCheck}
                />
                <label>
                  &nbsp;
                  <FormattedMessage id="ALLAGREE" />
                  {/* <FormattedMessage id="BILLINGCHECKDESCRIPTION" /> */}
                  <br />
                </label>
                <div className="sub-checkbox">
                  <div className="inner-check-line" />
                  <input
                    type="checkbox"
                    name="check1"
                    checked={subCheck1}
                    onChange={changeCheck1}
                  />
                  <label>
                    &nbsp;
                    {locale === "ko" ? (
                      <>
                        <a
                          href="#purchaseTarget"
                          className="see-policy"
                          onClick={openTermsOfUse}
                        >
                          <FormattedMessage id="TERMSOFUSE" />
                        </a>
                        <FormattedMessage id="TERMS_SUB" />
                      </>
                    ) : (
                      <>
                        <FormattedMessage id="TERMS_SUB" />
                        <a
                          href="#purchaseTarget"
                          className="see-policy"
                          onClick={openTermsOfUse}
                        >
                          <FormattedMessage id="TERMSOFUSE" />
                        </a>
                      </>
                    )}
                  </label>
                </div>
                <div className="sub-checkbox">
                  <div className="inner-check-line" />
                  <input
                    type="checkbox"
                    name="check1"
                    checked={subCheck2}
                    onChange={changeCheck2}
                  />
                  <label>
                    &nbsp;
                    {locale === "ko" ? (
                      <>
                        <a
                          href="#purchaseTarget"
                          className="see-policy"
                          onClick={openTermsOfPurchase}
                        >
                          <FormattedMessage id="TERMSOFPURCHASE" />
                        </a>
                        <FormattedMessage id="TERMS_SUB" />
                      </>
                    ) : (
                      <>
                        <FormattedMessage id="TERMS_SUB" />
                        <a
                          href="#purchaseTarget"
                          className="see-policy"
                          onClick={openTermsOfPurchase}
                        >
                          <FormattedMessage id="TERMSOFPURCHASE" />
                        </a>
                      </>
                    )}
                  </label>
                </div>
                <div style={{ marginTop: "8px" }}>
                  <label>
                    {inputTerm === "MONTHLY"
                      ? formatMessage(
                        { id: "BILLINGPRICEDESCRIPTIONMONTHLY" },
                        {
                          param:
                            slicePrice(
                              inputTerm === "MONTHLY" ? cost : cost * 12
                            ) + (isKorea() ? "원" : "$"),
                        }
                      )
                      : formatMessage(
                        { id: "BILLINGPRICEDESCRIPTIONANNUALLY" },
                        {
                          param:
                            slicePrice(
                              inputTerm === "MONTHLY" ? cost : cost * 12
                            ) + (isKorea() ? "원" : "$"),
                        }
                      )}
                  </label>
                </div>
              </div>
            </div>
          )}
          <div className="billing-change-item" style={{ paddingBottom: "0" }}>
            <button
              name="payType"
              className="button"
              value="iamPort"
              type="submit"
            >
              {!currentPlan || currentPlan.status !== "RUN" ? (
                <FormattedMessage id="SUBSCRIPTION" />
              ) : (
                <FormattedMessage id="CHANGESUBSCRIPTION" />
              )}
            </button>
          </div>
        </form>
      </section>

      <section className="Payment-History-table" style={{ border: "none" }}>
        <h2>
          <FormattedMessage id="PAYMENTHISTORY" />
        </h2>
        <CustomTable
          columns={BillingColumns}
          datas={tableData}
          pagination
          numPerPage={5}
        />
      </section>

      <PaymentModal
        confirmModal={confirmModal}
        paypalLoading={paypalLoading}
        inputTerm={inputTerm}
        inputUserNum={inputUserNum}
        inputEdition={inputEdition}
        cost={cost}
        editions={editions}
        currentPlan={currentPlan}
        lastHistory={tableData[0] || {}}
        isKorea={isKorea}
        setConfirmModal={setConfirmModal}
        closeConfirmModal={closeConfirmModal}
      />
      <TermsOfUse
        visible={termsOfUseVisible}
        setVisible={setTermsOfUseVisible}
      />
    </div>
  ) : (
    <Navigate to="/" />
  );
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
    locale: state.locale,
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
    openTermsOfPurchase: () => {
      dispatch(ActionCreators.termsOfPurchaseVisibleChange(true));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Billing);
