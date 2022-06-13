import React from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import ompassLogImgKr from '../../../assets/docs/document_OMPASSlog_1.png'
import ompassLogImgEn from '../../../assets/docs/document_OMPASSlog_1_eng.png'
import { isKorea } from "../../../Functions/isKorea";

const OmpassLogs = () => {
  const {locale} = useSelector(state => ({
    locale: state.locale
  }))
  return (
    <div>

      <h4>▶ <FormattedMessage id="OMPASS 로그"/></h4>

      <div className="document-text-box">
        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? ompassLogImgKr : ompassLogImgEn}
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

            <p><FormattedMessage id="OMPASS 로그가 표시됩니다."/></p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OmpassLogs;