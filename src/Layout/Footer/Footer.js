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
            <p>
              <FormattedMessage id="FOOTER_1" />
            </p>
            <p>
              <FormattedMessage id="FOOTER_2" />
            </p>
            <p>
              <FormattedMessage id="FOOTER_3" />
            </p>
            <p>
              <FormattedMessage id="FOOTER_4" />
            </p>
          </div>

          <div></div>
          <div className="footerTextBox2">
            <p className="agree">
              <a
                href="#"
                style={{ textDecoration: "underline", color: "#1890ff" }}
                onClick={openTermsOfService}
              >
                <FormattedMessage id="TERMS_OF_SERVICE" />
              </a>
              <br/>
              <span className="copyRight">
                © OneMoreSecurity Inc. All Rights Reserved.
              </span>
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
