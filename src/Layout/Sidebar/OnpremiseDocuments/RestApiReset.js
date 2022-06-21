import React from "react";
import $ from "jquery";

import { DownloadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";

import resetPdfKr from '../../../assets/docs/pdf/REST_API_OMPASS 등록 초기화.pdf'
import resetPdfEn from '../../../assets/docs/pdf/REST_API_Initializing OMPASS registration.pdf'
import { isKorea } from "../../../Functions/isKorea";
import Git_Demo from "./Git_Demo";
import UserResetOmpass from "./UserResetOmpass";

const RestApiReset = () => {
  const { locale } = useSelector(state => ({
    locale: state.locale
  }))
  return <>
    <div id="docs-scroll-container">
      <h4>▶ <FormattedMessage id="OMPASS 등록 초기화" /></h4>
      <div className="pdf-download">
        <a
          href={isKorea(locale) ? resetPdfKr : resetPdfEn}
          download
        >
          <DownloadOutlined /> &nbsp; <FormattedMessage id="PDF 다운받기" />
        </a>
      </div>


      <div className="1st">
        <div className="guide restapi-div">
          <h5 style={{ margin: "0" }}><FormattedMessage id="OMPASS 등록 초기화란?"/><Git_Demo /></h5>

          <p>
            <FormattedMessage id="특정 사용자가 인증장치(스마트폰 및 기타 인증장치)를 분실하였을 경우 기존 OMPASS 등록을 초기화 해주고 새로운 인증장치로 OMPASS 등록이 가능하도록 해주는 기능입니다."/>
          </p>
          <div className="document-text-box">
            <div className="document-label-notice" style={{ marginTop: "0rem" }}>
              <div>
                <label>&nbsp;</label>
                <p>
                  <FormattedMessage id="OMPASS 등록 초기화 API를 사용하여 특정 사용자의 OMPASS 등록 정보를 초기화할 수 있습니다."/>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserResetOmpass/>
    </div>
  </>
}
export default RestApiReset;
