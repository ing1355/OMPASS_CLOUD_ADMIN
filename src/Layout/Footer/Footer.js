import React, { useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect, useSelector } from "react-redux";
import PrivacyPolicy from "../../CustomComponents/PrivacyPolicy";
import TermsOfPurchase from "../../CustomComponents/TermsOfPurchase";
import ActionCreators from "../../redux/actions";
import "./Footer.css";

const Footer = ({ setVisible }) => {
  const [visiblePrivacy, setVisiblePrivacy] = useState(false);
  const { standalone } = useSelector(state => ({
    standalone: state.standalone
  }))

  const openTermsOfService = useCallback(() => {
    setVisible(true);
  }, []);
  const openPrivacyPolicy = useCallback(() => {
    setVisiblePrivacy(true);
  }, []);
  return (
    <>
      <div className={"footer" + (standalone.standalone ? ' standalone' : '')}>
        <div className="footerSubBox">
          {!standalone.standalone && <>
            <div className="footerTextBox">
              <p className="title">
                <FormattedMessage id="OMPASS_title" />
              </p>
            </div><div className="footerTextBox">
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
          </>}

          <div className="footerTextBox2">
            <p className="agree">
              {!standalone.standalone && <><a
                href="#"
                style={{ textDecoration: "underline" }}
                onClick={openTermsOfService}
              >
                <FormattedMessage id="TERMS_OF_SERVICE" />
              </a>
                <br />
                <a
                  href="#"
                  style={{ textDecoration: "underline" }}
                  onClick={openPrivacyPolicy}
                >
                  <FormattedMessage id="Privacy_Policy" />
                </a>
                <br /></>}
              <span className="copyRight">
                © OneMoreSecurity Inc. All Rights Reserved.
              </span>
            </p>
          </div>
        </div>
      </div>
      <PrivacyPolicy visible={visiblePrivacy} setVisible={setVisiblePrivacy} />
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
