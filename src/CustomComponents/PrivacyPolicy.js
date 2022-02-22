import React, { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import CustomConfirm from "./CustomConfirm";
import "./PrivacyPolicy.css";
import { FormattedMessage, useIntl } from "react-intl";
import { connect } from "react-redux";

const PrivacyPolicy = ({ visible, setVisible, locale }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!visible) navigate(location.pathname);
  }, [visible]);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <CustomConfirm
      className="privacy-modal"
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <p>
          <b>
            <FormattedMessage id="Privacy_Policy" />
          </b>
        </p>
        <p>
          <b>
            <FormattedMessage id="Effective_date" />
          </b>
        </p>
      </div>
      <div className="agree-text-box2">
        <h4>
          <FormattedMessage id="Privacy_Policy_text" />
        </h4>
        <div className="agree-title">
          <h5>
            <FormattedMessage id="Privacy_Policy_text2" />
          </h5>
        </div>
        <p className="1st">
          <h5>
            <FormattedMessage id="Privacy_Policy_title1" />
          </h5>
          <FormattedMessage id="Privacy_Policy_title1_1" />
        </p>

        <p className="2st">
          <h5>
            <FormattedMessage id="Privacy_Policy_title2" />
          </h5>
          <ul className="enter2" style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_2_1" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title2_1" />
            </li>
          </ul>
          {locale === "ko" && <ul className="agree-text-ko enter hyphen-div">
              <li>&nbsp;&nbsp;-</li>
              <li>성, 이름, 이메일, 국가코드, 전화번호, 회사/조직명</li>
            </ul>}

          <ul className="enter2">
            <li>
              <FormattedMessage id="TermsOfPurchase_number_2_2" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title2_2" />
            </li>
          </ul>
          {locale === "ko" && <ul className="agree-text-ko enter hyphen-div">
              <li>&nbsp;&nbsp;-</li>
              <li>성, 이름, 이메일, 국가번호, 전화번호</li>
            </ul>}

          <ul className="enter2">
            <li>
              <FormattedMessage id="TermsOfPurchase_number_2_3" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title2_3" />
            </li>
          </ul>
          {locale === "ko" && <ul className="agree-text-ko enter hyphen-div">
              <li>&nbsp;&nbsp;-</li>
              <li>OMPASS 로그, 정책 로그, 쿠키, 접속 IP정보, 방문 시간</li>
            </ul>}

          <ul>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_2_4" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title2_4" />
            </li>
          </ul>

          {locale === "ko" && <ul className="agree-text-ko enter hyphen-div">
              <li>&nbsp;&nbsp;-</li>
              <li>
                사용자 아이디, 어플리케이션명, 인증 유형, 쿠키, 접속 IP정보,
                로그인 시간
              </li>
            </ul>}

          {locale === "ko" && <>
              <ul>
                <li className="agree-text-ko">❺</li>
                <li>신원확인과정에서 수집되는 사용자 정보</li>
              </ul>
              <ul className="hyphen-div agree-text-ko">
                <li>&nbsp;&nbsp;-</li>
                <li>내용:서비스 처음 사용 시 휴대폰 본인 인증을 진행</li>
              </ul>
              <ul className="agree-text-ko hyphen-div">
                <li>&nbsp;&nbsp;-</li>
                <li>비고:진위 확인 후 고유식별정보 등은 저장되지 않음</li>
              </ul>
            </>}
        </p>

        <p className="3st">
          <h5>
            <FormattedMessage id="Privacy_Policy_title3" />
          </h5>
          <FormattedMessage id="Privacy_Policy_title3_1" />
        </p>
        <p className="4st">
          <h5>
            <FormattedMessage id="Privacy_Policy_title4" />
          </h5>
          <FormattedMessage id="Privacy_Policy_title4_1" />
        </p>
        <p className="5st">
          <h5>
            <FormattedMessage id="Privacy_Policy_title5" />
          </h5>
          <ul style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_5_1" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title5_1" />
            </li>
          </ul>
          <ul>
            <li>
              &nbsp;&nbsp;
              <FormattedMessage id="TermsOfPurchase_number_10_2_1" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title5_1_1" />
            </li>
          </ul>
          <ul className="enter">
            <li>
              &nbsp;&nbsp;
              <FormattedMessage id="TermsOfPurchase_number_10_2_2" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title5_1_2" />
            </li>
          </ul>
          <ul>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_5_2" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title5_2" />
            </li>
          </ul>
          <ul className="hyphen-div">
            <li>
              &nbsp;&nbsp;
              <FormattedMessage id="TermsOfPurchase_number_10_2_1" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title5_2_1" />
            </li>
          </ul>
          <ul className="hyphen-div">
            <li>
              &nbsp;&nbsp;
              <FormattedMessage id="TermsOfPurchase_number_10_2_2" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title5_2_2" />
            </li>
          </ul>
          <ul className="hyphen-div">
            <li>
              &nbsp;&nbsp;
              <FormattedMessage id="TermsOfPurchase_number_10_2_3" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title5_2_3" />
            </li>
          </ul>
        </p>
        <p className="6st">
          <h5>
            <FormattedMessage id="Privacy_Policy_title6" />
          </h5>
          <FormattedMessage id="Privacy_Policy_title6_1" />
          <br />
          <ul className="enter" style={{ marginTop: "1.5rem" }}>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_6_1" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title6_1_1" /> <br />
              <FormattedMessage id="Privacy_Policy_title6_1_2" />
            </li>
          </ul>
          <ul>
            <li>
              <FormattedMessage id="TermsOfPurchase_number_6_2" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title6_2_1" /> <br />
              <FormattedMessage id="Privacy_Policy_title6_2_2" />
            </li>
          </ul>
          <ul className="hyphen-div">
            <li>
              &nbsp;&nbsp;
              <FormattedMessage id="TermsOfPurchase_number_10_2_1" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title6_2_2_1" />
            </li>
          </ul>
          <ul className="hyphen-div">
            <li>
              &nbsp;&nbsp;
              <FormattedMessage id="TermsOfPurchase_number_10_2_2" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title6_2_2_2" />
            </li>
          </ul>
        </p>
        <p className="7st">
          <h5>
            <FormattedMessage id="Privacy_Policy_title7" />
          </h5>
          <FormattedMessage id="Privacy_Policy_title7_1" />
        </p>
        <p className="8st">
          <h5>
            <FormattedMessage id="Privacy_Policy_title8" />
          </h5>
          <FormattedMessage id="Privacy_Policy_title8_1" />
          <ul className="hyphen-div">
            <li>
              &nbsp;&nbsp;
              <FormattedMessage id="TermsOfPurchase_number_10_2_1" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title8_1_1" />
            </li>
          </ul>
          <ul className="hyphen-div">
            <li>
              &nbsp;&nbsp;
              <FormattedMessage id="TermsOfPurchase_number_10_2_2" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title8_1_2" />
            </li>
          </ul>
          <ul className="hyphen-div">
            <li>
              &nbsp;&nbsp;
              <FormattedMessage id="TermsOfPurchase_number_10_2_3" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title8_1_3" />
            </li>
          </ul>
        </p>
        <p className="9st">
          <h5>
            <FormattedMessage id="Privacy_Policy_title9" />
          </h5>
          <FormattedMessage id="Privacy_Policy_title9_1" />
        </p>
        <p className="10st">
          <h5>
            <FormattedMessage id="Privacy_Policy_title10" />
          </h5>
          <FormattedMessage id="Privacy_Policy_title10_1" />
          <br />
          <FormattedMessage id="Privacy_Policy_title10_2" />
          <br />
          <FormattedMessage id="Privacy_Policy_title10_3" />
          <br />
          <FormattedMessage id="Privacy_Policy_title10_4" />
          <br />
          <ul className="hyphen-div">
            <li>
              &nbsp;&nbsp;
              <FormattedMessage id="TermsOfPurchase_number_10_2_1" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title10_5_1" />
            </li>
          </ul>
          <ul className="hyphen-div">
            <li>
              &nbsp;&nbsp;
              <FormattedMessage id="TermsOfPurchase_number_10_2_2" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title10_5_2" />
            </li>
          </ul>
          <ul className="hyphen-div">
            <li>
              &nbsp;&nbsp;
              <FormattedMessage id="TermsOfPurchase_number_10_2_3" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title10_5_3" />
            </li>
          </ul>
          <ul className="hyphen-div">
            <li>
              &nbsp;&nbsp;
              <FormattedMessage id="TermsOfPurchase_number_10_2_4" />
            </li>
            <li>
              <FormattedMessage id="Privacy_Policy_title10_5_4" />
            </li>
          </ul>
        </p>
      </div>
    </CustomConfirm>
  );
};

function mapStateToProps(state) {
  return {
    locale: state.locale,
  };
}

export default connect(mapStateToProps)(PrivacyPolicy);
