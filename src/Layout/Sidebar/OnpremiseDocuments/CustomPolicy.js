import React from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import customPolicyImgKr from '../../../assets/docs/document_custompolicy_1.png'
import customPolicyImgEn from '../../../assets/docs/document_custompolicy_1_eng.png'
import { isKorea } from "../../../Functions/isKorea";

const CustomPolicy = () => {
  const {locale} = useSelector(state => ({
    locale: state.locale
  }))
  return (
    <div>
      <h4>▶ <FormattedMessage id="사용자 정의 정책"/></h4>

      <div className="document-text-box">
        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? customPolicyImgKr : customPolicyImgEn}
            alt="user 페이지"
          />
        </div>
        <>
          <div className="document-label">
            <label>*&nbsp;</label>
            <p className="space-pre">
              <FormattedMessage id="특정 어플리케이션에 적용할 수 있는 관리자 정의형 맞춤 정책입니다. 상세 항목에 대한 사항 "/>
              <Link to="/docs/defaultPolicy">
                <FormattedMessage id="기본 정책 페이지"/>
              </Link>
              <FormattedMessage id="를 참고하세요."/>
            </p>
          </div>
        </>
      </div>
    </div>
  );
}
export default CustomPolicy;
