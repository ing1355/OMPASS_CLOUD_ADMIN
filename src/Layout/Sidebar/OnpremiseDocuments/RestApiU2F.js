import React from "react";
import $ from "jquery";
import u2fPdfKr from '../../../assets/docs/pdf/REST API_U2F.pdf'
import u2fPdfEn from '../../../assets/docs/pdf/REST API_U2F_eng.pdf'
import restApiImgKr from '../../../assets/docs/rest_api_img_4.png'
import restApiImgEn from '../../../assets/docs/rest_api_img_4_eng.png'

import { DownloadOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { isKorea } from "../../../Functions/isKorea";
import AuthNToken from "./AuthNToken";
import AuthNTokenSecond from "./AuthNTokenSecond";
import OmpassPopUp from "./OmpassPopUp";
import Ompass from "./Ompass";
import Error from "./Error";
import Start from "./Start";
import Git_Demo from "./Git_Demo";

const RestApiU2F = () => {
  const { locale } = useSelector(state => ({
    locale: state.locale
  }))
  
  return <>
    <div id="docs-scroll-container" style={{width: isKorea(locale) ? '85%' : '80%'}}>
      <h4>▶ U2F</h4>
      <div className="pdf-download">
        <a href={isKorea(locale) ? u2fPdfKr : u2fPdfEn} download>
          <DownloadOutlined /> &nbsp; <FormattedMessage id="PDF 다운받기" />
        </a>
      </div>

      <div className="1st">
        <div className="restapi-div">
          {/* =================================================================== */}
          <div className="document-text-box">
            <h5 style={{ margin: "0" }}><FormattedMessage id="U2F 란?" /><Git_Demo/></h5>
            <div className="documnet-box">
              <div className="document-label">
                <label className="number">-&nbsp;</label>
                <p>
                  <FormattedMessage id="U2F는 패스워드 인증이 완료된 후 OMPASS 2차 인증을 통해 최종 로그인이 가능한 인증 방식입니다." />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Start/>

      <div className="guide restapi-div 3st">
        <h5 style={{ margin: "0" }}><FormattedMessage id="OMPASS 적용 프로세스" /></h5>
        <br />

        <img
          width="100%"
          src={isKorea(locale) ? restApiImgKr : restApiImgEn}
          alt="U2F 프로세스"
        />
      </div>

      <Ompass />

      <OmpassPopUp />

      <AuthNToken />

      <AuthNTokenSecond />

      <Error />
    </div>

    <div className="popbox">
      <h3
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        U2F
          </h3>
      <p
        onClick={() => {
          var offset = $(".1st").offset();
          $("#docs-scroll-container").animate({ scrollTop: offset.top + document.getElementById('docs-scroll-container').scrollTop }, "linear");
        }}
      >
        <FormattedMessage id="U2F 란?" />
      </p>
      <p
        onClick={() => {
          var offset = $(".2st").offset();
          $("#docs-scroll-container").animate({ scrollTop: offset.top + document.getElementById('docs-scroll-container').scrollTop }, "linear");
        }}
      >
        <FormattedMessage id="준비 사항" />
      </p>
      <p
        onClick={() => {
          var offset = $(".3st").offset();
          $("#docs-scroll-container").animate({ scrollTop: offset.top + document.getElementById('docs-scroll-container').scrollTop }, "linear");
        }}
      >
        <FormattedMessage id="OMPASS 적용 프로세스" />
      </p>
      <p
        onClick={() => {
          var offset = $(".4st").offset();
          $("#docs-scroll-container").animate({ scrollTop: offset.top + document.getElementById('docs-scroll-container').scrollTop }, "linear");
        }}
      >
        OMPASS-U2F
          </p>
      <p
        onClick={() => {
          var offset = $(".5st").offset();
          $("#docs-scroll-container").animate({ scrollTop: offset.top + document.getElementById('docs-scroll-container').scrollTop }, "linear");
        }}
      >
        <FormattedMessage id="OMPASS 등록 및 U2F 인증" />
      </p>

      <p
        onClick={() => {
          var offset = $(".6st").offset();
          $("#docs-scroll-container").animate({ scrollTop: offset.top + document.getElementById('docs-scroll-container').scrollTop }, "linear");
        }}
      >
        <FormattedMessage id="인증 토큰 받기" />
      </p>
      <p
        onClick={() => {
          var offset = $(".77st").offset();
          $("#docs-scroll-container").animate({ scrollTop: offset.top + document.getElementById('docs-scroll-container').scrollTop }, "linear");
        }}
      >
        <FormattedMessage id="인증 토큰 검증" />
      </p>
      <p
        onClick={() => {
          var offset = $(".9st").offset();
          $("#docs-scroll-container").animate({ scrollTop: offset.top + document.getElementById('docs-scroll-container').scrollTop }, "linear");
        }}
      >
        <FormattedMessage id="API 에러 메시지" />
      </p>
    </div>
  </>
}

export default RestApiU2F;