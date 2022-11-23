import React from "react";
import $ from "jquery";

import { DownloadOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { isKorea } from "../../../Functions/isKorea";

import uafPdfKr from '../../../assets/docs/pdf/REST API_UAF.pdf'
import uafPdfEn from '../../../assets/docs/pdf/REST API_UAF_eng.pdf'
import restApiImgKr from '../../../assets/docs/rest_api_img_5.png'
import restApiImgEn from '../../../assets/docs/rest_api_img_5_eng.png'
import restApiImg2Kr from '../../../assets/docs/rest_api_img_7.png'
import restApiImg2En from '../../../assets/docs/rest_api_img_7_eng.png'
import restApiImg3Kr from '../../../assets/docs/rest_api_img_6.png'
import restApiImg3En from '../../../assets/docs/rest_api_img_6_eng.png'
import AuthNToken from "./AuthNToken";
import AuthNTokenSecond from "./AuthNTokenSecond";
import Error from "./Error";
import Start from "./Start";
import Git_Demo from "./Git_Demo";
import UAFOmpass from "./UAFOmpass";

const RestApiUAF = () => {
  const { locale } = useSelector(state => ({
    locale: state.locale
  }))
  return <>
    <div id="docs-scroll-container" className="code">
      <h4>▶ UAF</h4>
      <div className="pdf-download">
        <a href={isKorea(locale) ? uafPdfKr : uafPdfEn} download>
          <DownloadOutlined /> &nbsp; <FormattedMessage id="PDF 다운받기" />
        </a>
      </div>

      <div className="1st" id="1st">
        <div className="guide restapi-div">
          <h5 style={{ margin: "0" }}><FormattedMessage id="UAF 란?" /><Git_Demo /></h5>

          <p>
            <FormattedMessage id="UAF 인증은 패스워드 없이 OMPASS 인증만으로 로그인이 가능한 방법입니다." />
          </p>
          <div className="document-text-box">
            <div className="document-label-notice" style={{ marginTop: "0rem" }}>
              <div>
                <label>*&nbsp;</label>
                <p><FormattedMessage id="적용 주의사항" /></p>
              </div>
              <div style={{ padding: "0rem 1rem" }}>
                <label>-&nbsp;</label>
                <p>
                  <FormattedMessage id="UAF 인증 방식 단독으로 로그인 기능을 구현하실 수 없습니다." />
                </p>
              </div>
              <div style={{ padding: "0  1rem 0.5rem" }}>
                <label>-&nbsp;</label>
                <p>
                  <FormattedMessage id="반드시 U2F 인증 방식을 구현 후 UAF 인증을 구현해야 합니다." />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Start />

      <div className="guide restapi-div 3st">
        <h5 style={{ margin: "0" }}> <FormattedMessage id="OMPASS 적용 프로세스" /></h5>
        <br />

        <img
          width="100%"
          src={isKorea(locale) ? restApiImgKr : restApiImgEn}
          alt="UAF 프로세스"
        />
      </div>

      <div className="guide restapi-div 4st">
        <h5 style={{ margin: "0" }}> <FormattedMessage id="UAF 로그인 버튼 추가하기" /></h5>
        <h6 className="sub-title"><FormattedMessage id="client-side" /></h6>
        <p style={{ marginBottom: "0" }}>
          <FormattedMessage id="기존의 로그인 버튼 외에 UAF 방식으로 로그인 할 수 있는 버튼을 로그인 페이지에 구현합니다." />
          <br />
          <FormattedMessage id="버튼 클릭 시 Sever-side 로 로그인 요청을 보냅니다." />
        </p>

        <p style={{ fontWeight: "bold", marginBottom: "0" }}>■ <FormattedMessage id="예시"/></p>
        <img
          width="50%"
          src={isKorea(locale) ? restApiImg2Kr : restApiImg2En}
          alt="uaf"
        />
      </div>

      <UAFOmpass />

      <div className="6st">
        <div className="guide restapi-div">
          <h5 style={{ margin: "0" }}><FormattedMessage id="OMPASS UAF 인증"/></h5>
          <h6 className="sub-title"><FormattedMessage id="client-side"/></h6>
          <p style={{ marginBottom: "0" }}>
            <FormattedMessage id="응답받은 OMPASS URI를 브라우저(client-side)에서 호출합니다."/>
          </p>
          <div className="document-text-box" style={{ borderBottom: "0" }}>
            <div
              className="document-label"
              style={{
                color: "#3c9edb",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              <p> <FormattedMessage id="인증 인터페이스 호출 예시 (팝업 창)"/></p>
            </div>
            <div
              className="document-label"
              style={{
                color: "#3c9edb",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              <label>-&nbsp;</label>
              <p>
                <FormattedMessage id="OMPASS 에 등록되어 있는 사용자인 경우 아래와 같은 인증 팝업 창이 표시됩니다."/>
              </p>
            </div>
            <div className="document-img">
              <img
                width="100%"
                src={isKorea(locale) ? restApiImg3Kr : restApiImg3En}
                alt="등록 인터페이스"
              />
            </div>

            <div className="documnet-box">
              <div className="document-label">
                <label className="number">❶&nbsp;</label>
                <p><FormattedMessage id="인증할 아이디를 입력해주세요."/></p>
              </div>
              <div className="document-label">
                <label className="number">❷&nbsp;</label>
                <p> <FormattedMessage id="“패스워드 없이 로그인” 버튼을 클릭해주세요."/></p>
              </div>
              <div className="document-label">
                <label className="number">❸&nbsp;</label>
                <p><FormattedMessage id="모바일로 OMPASS 인증 알림이 옵니다."/></p>
              </div>
              <div className="document-label">
                <label className="number">❹&nbsp;</label>
                <p><FormattedMessage id="기존에 선택했던 인증방식으로 인증을 완료해주세요."/></p>
              </div>
            </div>
          </div>
          {/* =================================================================== */}
        </div>
      </div>

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
        UAF
        </h3>
      <p
        onClick={() => {
          var offset = $(".1st").offset();
          $("#docs-scroll-container").animate({ scrollTop: offset.top + document.getElementById('docs-scroll-container').scrollTop }, "linear");
        }}
      >
        <FormattedMessage id="UAF 란?" />
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
        <FormattedMessage id="UAF 로그인 버튼 추가하기" />
      </p>
      <p
        onClick={() => {
          var offset = $(".5st").offset();
          $("#docs-scroll-container").animate({ scrollTop: offset.top + document.getElementById('docs-scroll-container').scrollTop }, "linear");
        }}
      >
        OMPASS-UAF
        </p>
      <p
        onClick={() => {
          var offset = $(".6st").offset();
          $("#docs-scroll-container").animate({ scrollTop: offset.top + document.getElementById('docs-scroll-container').scrollTop }, "linear");
        }}
      >
        <FormattedMessage id="OMPASS UAF 인증" />
      </p>

      <p
        onClick={() => {
          var offset = $(".7st").offset();
          $("#docs-scroll-container").animate({ scrollTop: offset.top + document.getElementById('docs-scroll-container').scrollTop }, "linear");
        }}
      >
        <FormattedMessage id="인증 토큰 받기" />
      </p>
      <p
        onClick={() => {
          var offset = $(".8st").offset();
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
export default RestApiUAF;