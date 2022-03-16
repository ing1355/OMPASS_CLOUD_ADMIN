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

  const scrollToElement = (id) => {
    document
      .getElementById(id)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
      <div className="agree-title">
        <ul className="agree-title-top">
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
        </ul>
        <ul className="en-title">
          <h4>
            <FormattedMessage id="Privacy_Policy_text" />
            <br />
            <FormattedMessage id="Privacy_Policy_text2" />
          </h4>
          <br />
          <div>
            <label>1.</label>
            <p onClick={() => scrollToElement("1st")}>
              {" "}
              <FormattedMessage id="Privacy_Policy_title_1" />
            </p>
          </div>

          <div>
            <label>2.</label>
            <p onClick={() => scrollToElement("2nd")}>
              {" "}
              <FormattedMessage id="Privacy_Policy_title_2" />
            </p>
          </div>
          <div>
            <label>3.</label>
            <p onClick={() => scrollToElement("3rd")}>
              {" "}
              <FormattedMessage id="Privacy_Policy_title_3" />
            </p>
          </div>
          <div>
            <label>4.</label>
            <p onClick={() => scrollToElement("4th")}>
              {" "}
              <FormattedMessage id="Privacy_Policy_title_4" />
            </p>
          </div>
          <div>
            <label>5.</label>
            <p onClick={() => scrollToElement("5th")}>
              {" "}
              <FormattedMessage id="Privacy_Policy_title_5" />
            </p>
          </div>
          <div>
            <label>6.</label>
            <p onClick={() => scrollToElement("6th")}>
              {" "}
              <FormattedMessage id="Privacy_Policy_title_6" />
            </p>
          </div>
          <div>
            <label>7.</label>
            <p onClick={() => scrollToElement("7th")}>
              {" "}
              <FormattedMessage id="Privacy_Policy_title_7" />
            </p>
          </div>
          <div>
            <label>8.</label>
            <p onClick={() => scrollToElement("8th")}>
              {" "}
              <FormattedMessage id="Privacy_Policy_title_8" />
            </p>
          </div>
          <div>
            <label>9.</label>
            <p onClick={() => scrollToElement("9th")}>
              {" "}
              <FormattedMessage id="Privacy_Policy_title_9" />
            </p>
          </div>
          <div>
            <label>10.</label>
            <p onClick={() => scrollToElement("10th")}>
              {" "}
              <FormattedMessage id="Privacy_Policy_title_10" />
            </p>
          </div>
        </ul>
      </div>
      <div className="agree-text-box2">
        <p id="1st">
          <h5>
            <FormattedMessage id="Privacy_Policy_title1" />
          </h5>
          <FormattedMessage id="Privacy_Policy_title1_1" />
        </p>

        <p id="2nd">
          <h5>
            <FormattedMessage id="Privacy_Policy_title2" />
          </h5>
          <ul>
            <li>❶</li>
            <li>
              <FormattedMessage id="Privacy_Policy_title2_1" />
            </li>
          </ul>
          {locale === "ko" && (
            <ul className="enter hyphen-div">
              <li>-</li>
              <li>성, 이름, 이메일, 국가코드, 전화번호, 회사/조직명</li>
            </ul>
          )}

          <ul>
            <li>❷</li>
            <li>
              <FormattedMessage id="Privacy_Policy_title2_2" />
            </li>
          </ul>
          {locale === "ko" && (
            <ul className="agree-text-ko enter hyphen-div">
              <li>-</li>
              <li>성, 이름, 이메일, 국가번호, 전화번호</li>
            </ul>
          )}

          <ul>
            <li>❸</li>
            <li>
              <FormattedMessage id="Privacy_Policy_title2_3" />
            </li>
          </ul>
          {locale === "ko" && (
            <ul className="agree-text-ko enter hyphen-div">
              <li>-</li>
              <li>OMPASS 로그, 정책 로그, 쿠키, 접속 IP정보, 방문 시간</li>
            </ul>
          )}

          <ul>
            <li>❹</li>
            <li>
              <FormattedMessage id="Privacy_Policy_title2_4" />
            </li>
          </ul>

          {locale === "ko" && (
            <ul className="agree-text-ko enter hyphen-div">
              <li>-</li>
              <li>
                사용자 아이디, 어플리케이션명, 인증 유형, 쿠키, 접속 IP정보,
                로그인 시간
              </li>
            </ul>
          )}

          {locale === "ko" && (
            <>
              <ul>
                <li className="agree-text-ko">❺</li>
                <li>신원확인과정에서 수집되는 사용자 정보</li>
              </ul>
              <ul className="hyphen-div agree-text-ko">
                <li>-</li>
                <li>내용 : 서비스 처음 사용 시 휴대폰 본인 인증을 진행</li>
              </ul>
              <ul className="agree-text-ko hyphen-div">
                <li>-</li>
                <li>비고 : 진위 확인 후 고유식별정보 등은 저장되지 않음</li>
              </ul>
            </>
          )}
        </p>

        <p id="3rd">
          <h5>
            <FormattedMessage id="Privacy_Policy_title3" />
          </h5>
          <FormattedMessage id="Privacy_Policy_title3_1" />
        </p>
        <p id="4th">
          <h5>
            <FormattedMessage id="Privacy_Policy_title4" />
          </h5>
          <FormattedMessage id="Privacy_Policy_title4_1" />
        </p>
        <p id="5th">
          <h5>
            <FormattedMessage id="Privacy_Policy_title5" />
          </h5>
          <ul>
            <li>❶</li>
            <li>
              <FormattedMessage id="Privacy_Policy_title5_1" />
            </li>
          </ul>
          <ul className="hyphen-div">
            <li>-</li>
            <li>
              <FormattedMessage id="Privacy_Policy_title5_1_1" />
            </li>
          </ul>
          <ul className="hyphen-div">
            <li>-</li>
            <li>
              <FormattedMessage id="Privacy_Policy_title5_1_2" />
            </li>
          </ul>
          <ul>
            <li>❷</li>
            <li>
              <FormattedMessage id="Privacy_Policy_title5_2" />
            </li>
          </ul>
          <ul className="hyphen-div">
            <li>-</li>
            <li>
              <FormattedMessage id="Privacy_Policy_title5_2_1" />
            </li>
          </ul>
          <ul className="hyphen-div">
            <li>-</li>
            <li>
              <FormattedMessage id="Privacy_Policy_title5_2_2" />
            </li>
          </ul>
          <ul className="hyphen-div">
            <li>-</li>
            <li>
              <FormattedMessage id="Privacy_Policy_title5_2_3" />
            </li>
          </ul>
        </p>
        <p id="6th">
          <h5>
            <FormattedMessage id="Privacy_Policy_title6" />
          </h5>
          <FormattedMessage id="Privacy_Policy_title6_1" />
          <br />
          <ul id="enter">
            <li>❶</li>
            <li>
              <FormattedMessage id="Privacy_Policy_title6_1_1" /> <br />
              <FormattedMessage id="Privacy_Policy_title6_1_2" />
            </li>
          </ul>
          <ul>
            <li>❷</li>
            <li>
              <FormattedMessage id="Privacy_Policy_title6_2_1" /> <br />
              <FormattedMessage id="Privacy_Policy_title6_2_2" />
            </li>
          </ul>
          <ul className="hyphen-div">
            <li>-</li>
            <li>
              <FormattedMessage id="Privacy_Policy_title6_2_2_1" />
            </li>
          </ul>
          <ul className="hyphen-div">
            <li>-</li>
            <li>
              <FormattedMessage id="Privacy_Policy_title6_2_2_2" />
            </li>
          </ul>
        </p>
        <p id="7th">
          <h5>
            <FormattedMessage id="Privacy_Policy_title7" />
          </h5>
          <FormattedMessage id="Privacy_Policy_title7_1" />
        </p>
        <p id="8th">
          <h5>
            <FormattedMessage id="Privacy_Policy_title8" />
          </h5>
          <FormattedMessage id="Privacy_Policy_title8_1" />
          <ul>
            <li>-</li>
            <li>
              <FormattedMessage id="Privacy_Policy_title8_1_1" />
            </li>
          </ul>
          <ul>
            <li>-</li>
            <li>
              <FormattedMessage id="Privacy_Policy_title8_1_2" />
            </li>
          </ul>
          <ul>
            <li>-</li>
            <li>
              <FormattedMessage id="Privacy_Policy_title8_1_3" />
            </li>
          </ul>
        </p>
        <p id="9th">
          <h5>
            <FormattedMessage id="Privacy_Policy_title9" />
          </h5>
          <FormattedMessage id="Privacy_Policy_title9_1" />
        </p>
        <p id="10th">
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

          <ul className="hyphen2">
            <li>-</li>
            <li>
              <FormattedMessage id="Privacy_Policy_title10_5_1" />
            </li>
          </ul>
          <ul className="hyphen2">
            <li>-</li>
            <li>
              <FormattedMessage id="Privacy_Policy_title10_5_2" />
            </li>
          </ul>
          <ul className="hyphen2">
            <li>-</li>
            <li>
              <FormattedMessage id="Privacy_Policy_title10_5_3" />
            </li>
          </ul>
          <ul className="hyphen2">
            <li>-</li>
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
