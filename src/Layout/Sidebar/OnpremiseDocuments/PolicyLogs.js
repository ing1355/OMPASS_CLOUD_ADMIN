import React from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import policyLogImgKr from '../../../assets/docs/document_policy_log_1.png'
import policyLogImgEn from '../../../assets/docs/document_policy_log_1_eng.png'
import policyLogImg2Kr from '../../../assets/docs/document_policy_log_2.png'
import policyLogImg2En from '../../../assets/docs/document_policy_log_2_eng.png'
import { isKorea } from "../../../Functions/isKorea";

const PolicyLogs = () => {
  const {locale} = useSelector(state => ({
    locale: state.locale
  }))
  return (
    <div>
      <h4>▶ <FormattedMessage id="정책 로그"/></h4>
      {/* =================================================================== */}

      <div className="document-text-box">
        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? policyLogImgKr : policyLogImgEn}
            alt="logs 페이지"
          />
        </div>

        <div className="documnet-box">
          <div className="document-label">
            <label className="number">❶&nbsp;</label>
            <p><FormattedMessage id="테이블 필드명으로 검색기능을 제공합니다."/></p>
          </div>
          <div className="document-label">
            <label className="number">❷&nbsp;</label>
            <p><FormattedMessage id="정책 로그가 표시됩니다."/></p>
          </div>
          <div className="document-label">
            <label className="number">❸&nbsp;</label>
            <p><FormattedMessage id="변경된 정책 로그를 자세하게 볼 수있습니다."/></p>
          </div>
        </div>
      </div>
      {/* =================================================================== */}
      <div className="document-text-box">
        <div
          className="document-label"
          style={{
            color: "#3c9edb",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          <label>↓&nbsp;</label>
          <p><FormattedMessage id="상세보기 클릭 시"/></p>
        </div>
        <div className="document-img">
          <img
            width="70%"
            src={isKorea(locale) ? policyLogImg2Kr : policyLogImg2En}
            alt="logs 페이지"
          />
        </div>

        <div className="documnet-box">
          <div className="document-label">
            <label className="number">*&nbsp;</label>
            <p><FormattedMessage id="변경 전/변경 후 정책 로그가 반영됩니다."/></p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PolicyLogs;
