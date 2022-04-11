import React, { useCallback, useState } from 'react'
import { planStatusCodes } from "../../../Constants/PlanStatusCodes";
import { billingStatusColor, getColorByUserNum, getRateByUserNum } from "../../../Constants/ConstantValues";
import {
    getDateFormatEn,
    getDateFormatKr,
} from "../../../Functions/GetFullDate";
import SubscriptionCancel from "./SubscriptionCancel";
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCalendarCheck, faCheckSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import BillingRefund from './BillingRefund';

const BillingEdtion = ({ plan, allUserNum, userProfile, locale, setCurrentPlan, editions, isOMS }) => {
    const { country } = userProfile;
    const { status, remainingDate, numberUsers, name, expirationDate, startDate } = plan || {};
    
    const statusColor = billingStatusColor(status)
    const isKorea = useCallback(
        () => (country === "KR" ? true : false),
        [country]
    );
    
    return <section className="billing-edition-container">
        <div className="billing-edition">
            <div className="billing-edition-data">
                {status === "FREE" ? (
                    <FormattedMessage id="FREE_TRIAL" />
                ) : (
                    name
                )}
            </div>
            <div className="billing-edition-subtitle">
                {status === "FREE" ? (
                    ""
                ) : (
                    <FormattedMessage
                        id="DAYSLEFT"
                        values={{ day: remainingDate > 0 ? remainingDate : 0 }}
                    />
                )}
            </div>
        </div>
        <div className="billing-edition billing-info">
            <h5 style={{ color: statusColor, fontWeight: "bold" }}>
                <FontAwesomeIcon
                    style={{
                        color: statusColor,
                        fontSize: "1rem",
                        marginBottom: "0rem",
                    }}
                    icon={
                        status === "EXPIRED"
                            ? faBan
                            : faCheckSquare
                    }
                />&nbsp;&nbsp;&nbsp;
                {status
                    ? planStatusCodes[status]
                    : planStatusCodes["EXPIRED"]}
            </h5>
            <h6>
                <FontAwesomeIcon
                    style={{ fontSize: "1.1rem", marginBottom: "0rem" }}
                    icon={faCalendarCheck}
                />&nbsp;&nbsp;&nbsp;
                {status !== "FREE" ? (
                    locale === "ko" ? (
                        getDateFormatKr(startDate) +
                        " ~ " +
                        getDateFormatKr(expirationDate)
                    ) : (
                        getDateFormatEn(startDate) +
                        " ~ " +
                        getDateFormatEn(expirationDate)
                    )
                ) : (
                    <FormattedMessage id="USED_FREE_PLAN" />
                )}
            </h6>
            {!isOMS && <><SubscriptionCancel
                isKorea={isKorea}
                currentPlan={plan}
                setCurrentPlan={setCurrentPlan}
                editions={editions}
            />
            {status === 'REFUNDABLE_RUN' && <BillingRefund isKorea={isKorea}/>}</>}
        </div>
        <div className="billing-edition billing-edition-user-count">
            <div className="billing-edition-top-box billing-edition-users">
                <b style={{ color: "#00a9ec" }}>
                    {allUserNum}
                    <FormattedMessage id="PERNUM" />
                </b>&nbsp;/&nbsp;{numberUsers}
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
                                numberUsers
                            ),
                            width:
                                getRateByUserNum(
                                    allUserNum,
                                    numberUsers
                                ) + "%",
                        }}
                    ></div>
                    <div className="progress-bar-back"></div>
                </div>
            </div>
        </div>
    </section>
}

function mapStateToProps(state) {
    return {
      userProfile: state.userProfile,
      locale: state.locale,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(BillingEdtion);  