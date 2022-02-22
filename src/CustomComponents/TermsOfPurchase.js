import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import CustomConfirm from "./CustomConfirm";
import ActionCreators from "../redux/actions";
import "./TermsOfPurchase.css";
import { FormattedMessage, useIntl } from "react-intl";

const TermsOfPurchase = ({ visible, setVisible, locale }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!visible) navigate(location.pathname);
  }, [visible]);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  const scrollToElement = (id) => {
    document.getElementById(id).scrollIntoView({behavior:'smooth', block:'start'});
  }

  return (
    <CustomConfirm
      className="terms-modal"
      centered
      maskClosable
      width={800}
      style={{
        maxHeight: 800,
        overflow: "auto",
        justifyContent: "start",
        overflowX: "hidden",
        padding: "0.5rem",
      }}
      visible={visible}
      footer={null}
      cancelCallback={closeModal}
    >
      <div className="agree-title">
        <div className="agree-title-top">
          <p>
            <b>
              <FormattedMessage id="TermsOfPurchase" />
            </b>
          </p>
          <p>
            <b>
              <FormattedMessage id="Effective_date" />
            </b>
          </p>
        </div>
        {locale === "en" && (
          <div className="en-title">
            <div>
              <label>1.</label>
              <p onClick={() => scrollToElement('1st')}>ACCEPTANCE OF AGREEMENT</p>
            </div>

            <div>
              <label>2.</label>
              <p onClick={() => scrollToElement('2nd')}>DEFINITIONS</p>
            </div>
            <div>
              <label>3.</label>
              <p onClick={() => scrollToElement('3rd')}>ADDITIONAL TERMS</p>
            </div>
            <div>
              <label>4.</label>
              <p onClick={() => scrollToElement('purchaseTarget')}>AGREEMENT OF USE AND PAYMENT OF FEES</p>
            </div>
            <div>
              <label>5.</label>
              <p onClick={() => scrollToElement('5th')}>INDEMNIFICATION</p>
            </div>
            <div>
              <label>6.</label>
              <p onClick={() => scrollToElement('6th')}>SERVICE REGISTRATION</p>
            </div>
            <div>
              <label>7.</label>
              <p onClick={() => scrollToElement('7th')}>PRIVACY POLICY</p>
            </div>
            <div>
              <label>8.</label>
              <p onClick={() => scrollToElement('8th')}>OBLIGATION OF THE COMPANY</p>
            </div>
            <div>
              <label>9.</label>
              <p onClick={() => scrollToElement('9th')}>OBLIGATION OF THE CUSOTMERS</p>
            </div>
            <div>
              <label>10.</label>
              <p onClick={() => scrollToElement('10th')}>SERVICE HOURS</p>
            </div>

            <div>
              <label>11.</label>
              <p onClick={() => scrollToElement('11th')}>LIMITATION OF OMPASS USE</p>
            </div>
            <div>
              <label>12.</label>
              <p onClick={() => scrollToElement('12th')}>INDEMNIFICATION FOR DAMAGE</p>
            </div>
            <div>
              <label>13.</label>
              <p onClick={() => scrollToElement('13th')}>DISCLAIMER AND LIMITS</p>
            </div>
          </div>
        )}
      </div>

      <div className="agree-text-box2">
        <h4>
          <FormattedMessage id="TermsOfPurchase_text" />
        </h4>
        <br />

        <p id="1st">
          <h5>
            <FormattedMessage id="TermsOfPurchase_title_1" />
          </h5>
          <FormattedMessage id="Privacy_Policy_title1_1" />
        </p>

        <p id="2nd">
          <h5>
            <FormattedMessage id="TermsOfPurchase_title_2" />
          </h5>

          {locale === "ko" &&
            "본 약관에서 사용되는 주요한 용어의 정의는 다음과 같습니다."}

          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_2_1" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_3_1" />
            </li>
          </ul>

          <ul>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_2_2" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_3_2" />
            </li>
          </ul>

          <ul>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_2_3" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_3_3" />
            </li>
          </ul>

          <ul>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_2_4" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_3_4" />
            </li>
          </ul>
          <ul>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_2_5" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_3_5" />
            </li>
          </ul>
          <ul>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_2_6" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_3_6" />
            </li>
          </ul>
          <ul>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_2_7" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_3_7" />
            </li>
          </ul>
          <ul>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_2_8" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_3_8" />
            </li>
          </ul>
          <ul>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_2_9" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_3_9" />
            </li>
          </ul>
        </p>

        <p id="3rd">
          <h5>
            <FormattedMessage id="TermsOfPurchase_title_3" />
          </h5>
          <FormattedMessage id="TermsOfPurchase_title_3_text" />
        </p>

        <p id="purchaseTarget">
          <h5>
            <FormattedMessage id="TermsOfPurchase_title_4" />
          </h5>

          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_4_1" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_4_1" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_4_2" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_4_2" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_4_3" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_4_3" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_4_4" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_4_4" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_4_5" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_4_5" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_4_6" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_4_6" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_4_7" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_4_7" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_4_8" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_4_8" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_4_9" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_4_9" />
            </li>
          </ul>
        </p>

        <p id="5th">
          <h5>
            <FormattedMessage id="TermsOfPurchase_title_5" />
          </h5>

          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_5_1" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_5_1" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_5_2" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_5_2" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_5_3" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_5_3" />
            </li>
          </ul>
        </p>

        <p id="6th">
          <h5>
            <FormattedMessage id="TermsOfPurchase_title_6" />
          </h5>

          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_6_1" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_6_1" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_6_2" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_6_2" />
            </li>
          </ul>
        </p>

        <p id="7th">
          <h5>
            <FormattedMessage id="TermsOfPurchase_title_7" />
          </h5>

          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_7_1" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_7_1" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_7_2" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_7_2" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_7_3" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_7_3" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_7_4" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_7_4" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_7_5" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_7_5" />
            </li>
          </ul>
        </p>

        <p id="8th">
          <h5>
            <FormattedMessage id="TermsOfPurchase_title_8" />
          </h5>

          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_8_1" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_8_1" />
            </li>
          </ul>

          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_8_2" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_8_2" />
            </li>
          </ul>
        </p>

        <p id="9th">
          <h5>
            <FormattedMessage id="TermsOfPurchase_title_9" />
          </h5>

          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_9_1" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_9_1" />
            </li>
          </ul>

          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_9_2" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_9_2" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_9_3" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_9_3" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_9_4" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_9_4" />
            </li>
          </ul>
        </p>

        <p id="10th">
          <h5>
            <FormattedMessage id="TermsOfPurchase_title_10" />
          </h5>

          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_10_1" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_10_1" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_10_2" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_10_2" />
            </li>
          </ul>
          <ul className="enter">
            <li>
              &nbsp;&nbsp;
              <FormattedMessage id="TermsOfPurchase_number_10_2_1" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_10_2_1" />
            </li>
          </ul>
          <ul className="enter">
            <li>
              &nbsp;&nbsp;
              <FormattedMessage id="TermsOfPurchase_number_10_2_2" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_10_2_2" />
            </li>
          </ul>
          <ul className="enter">
            <li>
              &nbsp;&nbsp;
              <FormattedMessage id="TermsOfPurchase_number_10_2_3" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_10_2_3" />
            </li>
          </ul>
          <ul className="enter">
            <li>
              &nbsp;&nbsp;
              <FormattedMessage id="TermsOfPurchase_number_10_2_4" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_10_2_4" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_10_3" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_10_3" />
            </li>
          </ul>
        </p>

        <p id="11th">
          <h5>
            <FormattedMessage id="TermsOfPurchase_title_11" />
          </h5>
          <FormattedMessage id="TermsOfPurchase_title_11_text" />
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_11_1" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_11_1" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_11_2" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_11_2" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_11_3" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_11_3" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_11_4" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_11_4" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_11_5" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_11_5" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_11_6" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_11_6" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_11_7" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_11_7" />
            </li>
          </ul>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_11_8" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_11_8" />
            </li>
          </ul>
        </p>

        <p id="12th">
          <h5>
            <FormattedMessage id="TermsOfPurchase_title_12" />
          </h5>

          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_12_1" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_12_1" />
            </li>
          </ul>

          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_12_2" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_12_2" />
            </li>
          </ul>
        </p>

        <p id="13th">
          <h5>
            <FormattedMessage id="TermsOfPurchase_title_13" />
          </h5>

          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_13_1" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_13_1" />
            </li>
          </ul>

          <ul>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_13_2" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_13_2" />
            </li>
          </ul>

          <ul>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_13_3" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_13_3" />
            </li>
          </ul>

          <ul>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_13_4" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_13_4" />
            </li>
          </ul>
          <ul>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_13_5" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_13_5" />
            </li>
          </ul>
          <ul>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_13_6" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_13_6" />
            </li>
          </ul>
          <ul>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_13_7" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_13_7" />
            </li>
          </ul>
          <ul>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_13_8" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_13_8" />
            </li>
          </ul>
          <ul>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_13_9" />
            </li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_13_9" />
            </li>
          </ul>
        </p>

        <p>
          {locale === "ko" && <h5>부칙</h5>}

          <FormattedMessage id="TermsOfPurchase_title_14_1" />
        </p>
      </div>
    </CustomConfirm>
  );
};

function mapStateToProps(state) {
  return {
    visible: state.termsOfPurchaseVisible,
    locale: state.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setVisible: (toggle) => {
      dispatch(ActionCreators.termsOfPurchaseVisibleChange(toggle));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  React.memo(TermsOfPurchase, (prev, cur) => {
    if (prev.visible !== cur.visible) return false;
    else return true;
  })
);
