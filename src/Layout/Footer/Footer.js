import React, { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import TermsOfPurchase from "../../CustomComponents/TermsOfPurchase";
import ActionCreators from "../../redux/actions";
import "./Footer.css";

const Footer = ({ setVisible }) => {
  const openTermsOfService = useCallback(() => {
    setVisible(true);
  }, []);
  return (
    <>
      <div className="footer">
        <div className="footerSubBox">
          <div className="footerTextBox">
            <p>상호명：(주)원모어시큐리티 | 대표자：김민식</p>
            <p>사업자 번호：735-88-01175 | 통신판매신고번호：000000000</p>
            <p>TEL：+82 70 4298 3070 | E-Mail：service@omsecurity.kr</p>
            <p>
              세종특별자치시 한누리대로 2150, 605호 (보람동, 스마트허브 1동)
            </p>
          </div>
          <div className="footerTextBox2">
            <p className="agree">
              <a
                href="#"
                style={{ textDecoration: "underline", color: "#1890ff" }}
                onClick={openTermsOfService}
              >
                <FormattedMessage id="TERMS_OF_SERVICE" />
              </a>

              <p className="copyRight">
                © OneMoreSecurity Inc. All Rights Reserved.
              </p>
            </p>
          </div>
        </div>

        {/*
           © OneMoreSecurity Inc. All Rights Reserved.{" "}
        
           <a
          href="#"
          style={{ textDecoration: "underline", color: "#1890ff" }}
          onClick={openTermsOfService}
        >
          <FormattedMessage id="TERMS_OF_SERVICE" />
        </a> */}
      </div>
      <TermsOfPurchase />
    </>
  );
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    setVisible: (toggle) => {
      dispatch(ActionCreators.termsOfPurchaseVisibleChange(toggle));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
