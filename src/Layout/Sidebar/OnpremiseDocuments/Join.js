import React from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { isKorea } from "../../../Functions/isKorea";
import joinImgKr from '../../../assets/docs/document_join.png'
import joinImgEn from '../../../assets/docs/document_join_eng.png'

const Join = () => {
  const {locale} = useSelector(state => ({
    locale: state.locale
  }))
  return (
    <div>
      <h4>▶ <FormattedMessage id="최초 로그인" /></h4>

      <div className="document-text-box">
        {/* <div
          className="document-label"
          style={{
            color: "#3c9edb",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          <label>↓&nbsp;</label>
          <p><FormattedMessage id="최초 로그인"/></p>
        </div> */}
        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? joinImgKr : joinImgEn}
            alt="회원가입 이메일 창"
          />
        </div>

        <div className="documnet-box">
          <div className="document-label">
            <label className="number">*&nbsp;</label>
            <p>
              <FormattedMessage id="최초 로그인 시 관리자 계정은 admin / 1234 로 로그인 가능합니다."/>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Join;
