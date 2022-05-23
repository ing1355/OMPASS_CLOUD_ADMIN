import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import CustomConfirm from "./CustomConfirm";
import ActionCreators from "../redux/actions";
import "./TermsOfPurchase.css";
import { FormattedMessage } from "react-intl";
import refunded from "../assets/refunded.png";

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
    document
      .getElementById(id)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
        <ul className="agree-title-top">
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
        </ul>

        <ul className="en-title">
          <h4>
            <FormattedMessage id="TermsOfPurchase_text" />
          </h4>
          <br />
          <div>
            <label>1.</label>
            <p onClick={() => scrollToElement("1st")}>
              {" "}
              <FormattedMessage id="TermsOfPurchase_title_111" />
            </p>
          </div>

          <div>
            <label>2.</label>
            <p onClick={() => scrollToElement("2nd")}>
              {" "}
              <FormattedMessage id="TermsOfPurchase_title_22" />
            </p>
          </div>
          <div>
            <label>3.</label>
            <p onClick={() => scrollToElement("3rd")}>
              {" "}
              <FormattedMessage id="TermsOfPurchase_title_33" />
            </p>
          </div>
          <div>
            <label>4.</label>
            <p onClick={() => scrollToElement("purchaseTarget")}>
              {" "}
              <FormattedMessage id="TermsOfPurchase_title_44" />
            </p>
          </div>
          <div>
            <label>5.</label>
            <p onClick={() => scrollToElement("5th")}>
              {" "}
              <FormattedMessage id="TermsOfPurchase_title_55" />
            </p>
          </div>
          <div>
            <label>6.</label>
            <p onClick={() => scrollToElement("6th")}>
              {" "}
              <FormattedMessage id="TermsOfPurchase_title_66" />
            </p>
          </div>
          <div>
            <label>7.</label>
            <p onClick={() => scrollToElement("7th")}>
              {" "}
              <FormattedMessage id="TermsOfPurchase_title_77" />
            </p>
          </div>
          <div>
            <label>8.</label>
            <p onClick={() => scrollToElement("8th")}>
              {" "}
              <FormattedMessage id="TermsOfPurchase_title_88" />
            </p>
          </div>
          <div>
            <label>9.</label>
            <p onClick={() => scrollToElement("9th")}>
              {" "}
              <FormattedMessage id="TermsOfPurchase_title_99" />
            </p>
          </div>
          <div>
            <label>10.</label>
            <p onClick={() => scrollToElement("10th")}>
              {" "}
              <FormattedMessage id="TermsOfPurchase_title_1010" />
            </p>
          </div>

          <div>
            <label>11.</label>
            <p onClick={() => scrollToElement("11th")}>
              {" "}
              <FormattedMessage id="TermsOfPurchase_title_1111" />
            </p>
          </div>
          <div>
            <label>12.</label>
            <p onClick={() => scrollToElement("12th")}>
              {" "}
              <FormattedMessage id="TermsOfPurchase_title_1212" />
            </p>
          </div>
          <div>
            <label>13.</label>
            <p onClick={() => scrollToElement("13th")}>
              {" "}
              <FormattedMessage id="TermsOfPurchase_title_1313" />
            </p>
          </div>
        </ul>
      </div>

      <div className="agree-text-box2">
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

          <ul>
            <li>❶</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_3_1" />
            </li>
          </ul>

          <ul>
            <li>❷</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_3_2" />
            </li>
          </ul>

          <ul>
            <li>❸</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_3_3" />
            </li>
          </ul>

          <ul>
            <li>❹</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_3_4" />
            </li>
          </ul>
          <ul>
            <li>❺</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_3_5" />
            </li>
          </ul>
          <ul>
            <li>❻</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_3_6" />
            </li>
          </ul>
          <ul>
            <li>❼</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_3_7" />
            </li>
          </ul>
          <ul>
            <li>❽</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_3_8" />
            </li>
          </ul>
          <ul>
            <li>❾</li>
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
          <ul>
            <li>❶</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_4_1" />
            </li>
          </ul>
          <ul>
            <li>❷</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_4_2" />
            </li>
          </ul>
          <ul>
            <li>❸</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_4_3" />
            </li>
          </ul>
          <ul>
            <li>❹</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_4_4" />
            </li>
          </ul>
          <ul>
            <li>❺</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_4_5" />
            </li>
          </ul>
          <ul>
            <li>❻</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_4_6" />
            </li>
          </ul>
          <ul>
            <li>❼</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_4_7" />
            </li>
          </ul>
          <ul>
            <li>❽</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_4_8" />
            </li>
          </ul>
          <ul>
            <li>❾</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_4_9" />
            </li>
          </ul>
        </p>

        <p id="5th">
          <h5>
            <FormattedMessage id="TermsOfPurchase_title_5" />
          </h5>

          <ul>
            <li>❶</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_5_1" />
            </li>
          </ul>
          <ul>
            <li>❷</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_5_2" />
            </li>
          </ul>
          <ul>
            <li>❸</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_5_3" />
            </li>
          </ul>

          {locale === "en" ? (
            <>
              <ul>
                <li>❹</li>
                <li>
                  <FormattedMessage id="TermsOfPurchase_title_5_4" />
                </li>
              </ul>
              <ul>
                <img
                  src={refunded}
                  alt="원모어패스 이용약관"
                  style={{
                    width: "100%",
                    marginLeft: "10px",
                    marginTop: "5px",
                    border: "2px solid #e5e5e5",
                    padding: "10px",
                  }}
                />
              </ul>
            </>
          ) : null}
        </p>

        <p id="6th">
          <h5>
            <FormattedMessage id="TermsOfPurchase_title_6" />
          </h5>

          <ul>
            <li>❶</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_6_1" />
            </li>
          </ul>
          <ul>
            <li>❷</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_6_2" />
            </li>
          </ul>
        </p>

        <p id="7th">
          <h5>
            <FormattedMessage id="TermsOfPurchase_title_7" />
          </h5>

          <ul>
            <li>❶</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_7_1" />
            </li>
          </ul>
          <ul>
            <li>❷</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_7_2" />
            </li>
          </ul>
          <ul>
            <li>❸</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_7_3" />
            </li>
          </ul>
          <ul>
            <li>❹</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_7_4" />
            </li>
          </ul>
          <ul>
            <li>❺</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_7_5" />
            </li>
          </ul>
        </p>

        <p id="8th">
          <h5>
            <FormattedMessage id="TermsOfPurchase_title_8" />
          </h5>

          <ul>
            <li>❶</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_8_1" />
            </li>
          </ul>

          <ul>
            <li>❷</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_8_2" />
            </li>
          </ul>
        </p>

        <p id="9th">
          <h5>
            <FormattedMessage id="TermsOfPurchase_title_9" />
          </h5>

          <ul>
            <li>❶</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_9_1" />
            </li>
          </ul>

          <ul>
            <li>❷</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_9_2" />
            </li>
          </ul>
          <ul>
            <li>❸</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_9_3" />
            </li>
          </ul>
          <ul>
            <li>❹</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_9_4" />
            </li>
          </ul>
        </p>

        <p id="10th">
          <h5>
            <FormattedMessage id="TermsOfPurchase_title_10" />
          </h5>

          <ul>
            <li>❶</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_10_1" />
            </li>
          </ul>
          <ul>
            <li>❶</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_10_2" />
            </li>
          </ul>
          <ul className="enter hyphen-div">
            <li>-</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_10_2_1" />
            </li>
          </ul>
          <ul className="enter hyphen-div">
            <li>-</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_10_2_2" />
            </li>
          </ul>
          <ul className="enter hyphen-div">
            <li>-</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_10_2_3" />
            </li>
          </ul>
          <ul className="enter hyphen-div">
            <li>-</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_10_2_4" />
            </li>
          </ul>
          <ul>
            <li>❸</li>
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
          <ul>
            <li>❶</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_11_1" />
            </li>
          </ul>
          <ul>
            <li>❷</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_11_2" />
            </li>
          </ul>
          <ul>
            <li>❸</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_11_3" />
            </li>
          </ul>
          <ul>
            <li>❹</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_11_4" />
            </li>
          </ul>
          <ul>
            <li>❺</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_11_5" />
            </li>
          </ul>
          <ul>
            <li>❻</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_11_6" />
            </li>
          </ul>
          <ul>
            <li>❼</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_11_7" />
            </li>
          </ul>
          <ul>
            <li>❽</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_11_8" />
            </li>
          </ul>
        </p>

        <p id="12th">
          <h5>
            <FormattedMessage id="TermsOfPurchase_title_12" />
          </h5>

          <ul>
            <li>❶</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_12_1" />
            </li>
          </ul>

          <ul>
            <li>❷</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_12_2" />
            </li>
          </ul>
        </p>

        <p id="13th">
          <h5>
            <FormattedMessage id="TermsOfPurchase_title_13" />
          </h5>

          <ul>
            <li>❶</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_13_1" />
            </li>
          </ul>

          <ul>
            <li>❷</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_13_2" />
            </li>
          </ul>

          <ul>
            <li>❸</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_13_3" />
            </li>
          </ul>

          <ul>
            <li>❹</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_13_4" />
            </li>
          </ul>
          <ul>
            <li>❺</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_13_5" />
            </li>
          </ul>
          <ul>
            <li>❻</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_13_6" />
            </li>
          </ul>
          <ul>
            <li>❼</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_13_7" />
            </li>
          </ul>
          <ul>
            <li>❽</li>
            <li>
              <FormattedMessage id="TermsOfPurchase_title_13_8" />
            </li>
          </ul>
          <ul>
            <li>❾</li>
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
