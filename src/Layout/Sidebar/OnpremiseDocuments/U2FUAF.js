import React from "react";
import OMPASSAppImgKr from '../../../assets/docs/OmpassAppImg_2_Kor.png'
import OMPASSAppImgEn from '../../../assets/docs/OmpassAppImg_2_Eng.png'
import loginImgKr from '../../../assets/docs/document_login_2.png'
import loginImgEn from '../../../assets/docs/document_login_2_eng.png'
import loginImg2Kr from '../../../assets/docs/document_login_3.png'
import loginImg2En from '../../../assets/docs/document_login_3_eng.png'
import { useSelector } from "react-redux";
import { isKorea } from "../../../Functions/isKorea";
import { FormattedMessage } from "react-intl";

const U2FUAF = () => {
  const { locale } = useSelector(state => ({
    locale: state.locale
  }))

  return (
    <div>
      <h4>▶ <FormattedMessage id="U2F/UAF" /></h4>
      <div className="document-text-box">
        <div className="document-label">
          <label>*&nbsp;</label>
          <p>
            <FormattedMessage id="원모어패스는 사용자 선택형 인증장치(인증방식: 지문인식, 얼굴인식, 핀코드, 패턴, Windows Hello 로그인 등)를 활용하여 2차 인증 방식인 U2F와 패스워드 없이 로그인이 가능한 UAF 방식을 모두 제공합니다." />
          </p>
        </div>

        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? OMPASSAppImgKr : OMPASSAppImgEn}
            alt="원모어패스 앱_한글"
          />
        </div>
      </div>
      {/* =================================================================== */}
      <div className="document-text-box">
        <div className="document-label">
          <p className="h5">
            <FormattedMessage id="U2F(Universal 2nd Factor) 2차 인증" />
          </p>
        </div>

        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? loginImgKr : loginImgEn}
            alt="U2F방식"
          />
        </div>
      </div>
      {/* =================================================================== */}
      <div className="document-text-box">
        <div className="document-label">
          <p className="h5">
            <FormattedMessage id="UAF(Universal Authentication Framework) 패스워드 없이 로그인" />
          </p>
        </div>
        <div
          className="document-label"
          style={{
            color: "#3c9edb",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          <label>※&nbsp;</label>
          <p>
            <FormattedMessage id="패스워드 방식의 불편함과 불안함을 해소하고 사용자의 편의성과 보안성을 동시에 보장합니다." />
          </p>
        </div>
        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? loginImg2Kr : loginImg2En}
            alt="UAF방식"
          />
        </div>
      </div>
    </div>
  );
}
export default U2FUAF;