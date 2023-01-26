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
import {
  getPaymentHistoryApi,
  getBillingInfoApi,
  startPaypalApi,
  successPaypalApi,
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
import PaymentModal from "./PaymentModal";
import { Navigate } from "react-router-dom";
import BillingEdtion from "./BillingEdition";

export const otherCardType = 'otherCardPayment'
export const equalCardType = 'equalCardPayment'

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
  const [subCheck2, setSubCheck2] = useState(false);
  const [currentPlan, setCurrentPlan] = useState({});
  const [allUserNum, setAllUserNum] = useState(0);
  const [editions, setEditions] = useState([]);
  const [inputEdition, setInputEdition] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [paypalLoading, setPaypalLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0)
  const [inputTerm, setInputTerm] = useState("MONTHLY");
  const [inputUserNum, setInputUserNum] = useState(11);
  const [tableData, setTableData] = useState([]);
  const [cost, setCost] = useState(0);
  const [paymentType, setPaymentType] = useState(null)
  const [sorted, setSorted] = useState({});
  const { status, numberUsers } = currentPlan
  const statusIsRUN = status === 'RUN' || status === 'REFUNDABLE_RUN'
  const userNumList = useMemo(() => new Array(990).fill(1), []);

  const { formatMessage } = useIntl();
  const inputTermRef = useRef(null);
  const inputUserNumRef = useRef(null);

  useLayoutEffect(() => {
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
            setCost(pricing[0].priceForOneUser * (plan.status === 'FAILED_REGULAR_PAYMENT' ? plan.numberUsers : inputUserNum));
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
    const { userNum, check } = e.target.elements;
    if (status === "RUN") {
      if (numberUsers === userNum.value * 1)
        return showErrorMessage("PLEASE_CHANGE_USER_NUM_DIFFERNT");
      if (allUserNum >= userNum.value * 1)
        return showErrorMessage("PLEASE_CHANGE_USER_NUM_MORE_THAN_BEFORE");
    } else if(status !== 'FAILED_REGULAR_PAYMENT') {
      if (allUserNum > userNum.value * 1)
        return showErrorMessage("PLEASE_CHANGE_USER_NUM_MORE_THAN_BEFORE");
    }
    if (status !== 'FAILED_REGULAR_PAYMENT' && !statusIsRUN && !check.checked)
      return showErrorMessage("PLEASE_AGREEMENT_CHECK");
    // if (status !== "RUN" && !checkAll.checked)
    //   return showErrorMessage("PLEASE_AGREEMENT_CHECK");
    // if (currentPlan && status === "RUN") {
    //   if (
    //     new Date(createDate).getFullYear() ===
    //     new Date(expireDate).getFullYear()
    //   )
    //     inputTermRef.current = "MONTHLY";
    //   else inputTermRef.current = "ANNUALLY";
    // } else inputTermRef.current = term.value;
    if(status !== 'FAILED_REGULAR_PAYMENT') inputUserNumRef.current = userNum.value;
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
        const callback = () => {
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
              onApprove: function ({ subscriptionID }, actions) {
                CustomAxiosPost(successPaypalApi(adminId), {
                  subscriptionID
                }, () => {
                  window.location.reload();
                })
              },
              onError: function (err) {
                console.log(err);
              },
            })
            .render("#paypal-button-container");
        };
        if (window.paypal) callback();
        else {
          var script = document.createElement("script");
          script.src =
            "https://www.paypal.com/sdk/js?client-id=" + (process.env.REACT_APP_SERVICE_TARGET === 'aws' ? "AXI4UuS0o9whZmj9UDfzWLEhf3vl11W_j-kj_c5leAhsicOhZk-HEruD62M9Nq1SFJRVMJQ9qeme9Yyl" : "AWw5IOnvdd3vmni_i077RknEFRFAS2l443P72P0ZOjQqaAWUS4LU83mgHCQdRdcTe31feT0Sn7oTBluo") + "&vault=true&intent=subscription&locale=" + (isKorea() === 'ko' ? 'ko_KR' : 'en_US');
          script.onload = callback;
          document.head.appendChild(script);
        }
      }
    );
  };

  const changeCheck2 = useCallback((e) => {
    setSubCheck2(e.target.checked);
  }, []);

  return userProfile.role !== "SUB_ADMIN" ? (
    <div className="contents-container">
      <ContentsTitle title="Billing" />

      <LinkDocument link="/document/billing" />

      <BillingEdtion plan={currentPlan} allUserNum={allUserNum} setCurrentPlan={setCurrentPlan} editions={editions} />

      <section className="billing-info-container">
        {editions.length > 0 &&
          billingsInfo.map((item, ind) => (
            <div key={ind} className="billing-info-contents">
              <BillingInfoCard
                title={
                  <>
                    <FormattedMessage
                      id="OMPASSSERVICE"
                      values={{ name: editions[ind].name }}
                    />
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
          {currentPlan &&
            statusIsRUN &&
            tableData.length > 0 &&
            numberUsers !== tableData[0].numberUsers && (
              <span
                style={{ fontSize: "12px", color: "red", marginLeft: "12px" }}
              >
                <FormattedMessage
                  id="PRICE_CHANGE_DESCRIPTION"
                  values={{
                    param: isKorea()
                      ? slicePrice(
                        editions[0].priceForOneUser * numberUsers
                      ) + "원 "
                      : slicePrice(
                        editions[0].priceForOneUser * numberUsers
                      ) + "$",
                  }}
                />
              </span>
            )}
        </h2>
        <form onSubmit={onFinish}>
          <div className="billing-change-item">
            <label className="billing-change-form-label">
              {!statusIsRUN ? (
                <FormattedMessage id="USERNUM" />
              ) : (
                <FormattedMessage id="CHANGEUSERNUM" />
              )}
            </label>
            <div>
              {
                status === 'FAILED_REGULAR_PAYMENT' ? <span>{numberUsers}</span>
                  : <select
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
              }
            </div>
          </div>
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
          {!statusIsRUN && status !== 'FAILED_REGULAR_PAYMENT' && (
            <div
              className="billing-change-item"
              style={{ alignItems: "baseline" }}
            >
              <label className="billing-change-form-label">
                <FormattedMessage id="AGREE" />
              </label>
              <div>
                <div>
                  <input
                    type="checkbox"
                    name="check"
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
            {status === 'FAILED_REGULAR_PAYMENT' ? <>
              <button
                name="payType"
                className="button"
                value="iamPort"
                type="submit"
                onClick={() => {
                  setPaymentType(equalCardType)
                }}
                style={{marginRight: '8px'}}
              >
                <FormattedMessage id="EQUAL_CARD_PAYMENT" />
              </button>
              <button
                name="payType"
                className="button"
                value="iamPort"
                type="submit"
                onClick={() => {
                  setPaymentType(otherCardType)
                }}
              >
                <FormattedMessage id="OTHER_CARD_PAYMENT" />
              </button>
            </> : <button
              name="payType"
              className="button"
              value="iamPort"
              type="submit"
            >
              {!statusIsRUN ? (
                <FormattedMessage id="SUBSCRIPTION" />
              ) : (
                <FormattedMessage id="CHANGESUBSCRIPTION" />
              )}
            </button>}
          </div>
        </form>
      </section>

      <section className="Payment-History-table" style={{ border: "none" }}>
        <h2>
          <FormattedMessage id="PAYMENTHISTORY" />
        </h2>
        <CustomTable
          columns={BillingColumns}
          sorted={sorted}
          setSorted={setSorted}
          datas={tableData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagination
          numPerPage={5}
        />
      </section>

      <PaymentModal
        confirmModal={confirmModal}
        paypalLoading={paypalLoading}
        inputTerm={inputTerm}
        inputUserNum={status === 'FAILED_REGULAR_PAYMENT' ? numberUsers : inputUserNum}
        inputEdition={inputEdition}
        cost={cost}
        statusIsRUN={statusIsRUN}
        editions={editions}
        currentPlan={currentPlan}
        isKorea={isKorea}
        paymentType={paymentType}
        setPaymentType={setPaymentType}
        setConfirmModal={setConfirmModal}
        closeConfirmModal={closeConfirmModal}
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
