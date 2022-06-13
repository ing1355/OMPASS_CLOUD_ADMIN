import React from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import applicationImgKr from '../../../assets/docs/document_application_1.png'
import applicationImgEn from '../../../assets/docs/document_application_1_eng.png'
import application2ImgKr from '../../../assets/docs/document_application_2.png'
import application2ImgEn from '../../../assets/docs/document_application_2_eng.png'
import application3ImgKr from '../../../assets/docs/document_application_4.png'
import application3ImgEn from '../../../assets/docs/document_application_4_eng.png'
import { isKorea } from "../../../Functions/isKorea";

const Application = () => {
  const { locale } = useSelector(state => ({
    locale: state.locale
  }))
  return (
    <div>
      <h4>▶ <FormattedMessage id="어플리케이션"/></h4>

      <div className="document-text-box">
        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? applicationImgKr : applicationImgEn}
            alt="어플리케이션"
          />
        </div>

        <div className="documnet-box">
          <div className="document-label">
            <label className="number">❶&nbsp;</label>
            <p><FormattedMessage id="테이블 필드명으로 검색기능을 제공합니다."/></p>
          </div>
          <div className="document-label">
            <label className="number">❷&nbsp;</label>
            <p>
              <FormattedMessage id="어플리케이션의 이름, 상태, 도메인, 리다이렉트 URI를 제공합니다."/>
            </p>
          </div>
          <div className="document-label">
            <label className="number">❸&nbsp;</label>
            <p>
              <FormattedMessage id="어플리케이션 등록, 수정, 삭제가 가능합니다."/>
            </p>
          </div>
        </div>
      </div>

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
          <p><FormattedMessage id="체크 후 수정버튼 클릭 시"/></p>
        </div>
        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? application2ImgKr : application2ImgEn}
            alt="어플리케이션"
          />
        </div>

        <div className="documnet-box">
          <div className="document-label">
            <label className="number">❶&nbsp;</label>
            <p>
              <FormattedMessage id="어플리케이션의 이름 입력, 중복 체크를 합니다."/>
            </p>
          </div>
          <div className="document-label">
            <label className="number">❷&nbsp;</label>
            <p>
              <FormattedMessage id="비밀 키는 어플리케이션을 등록시 자동으로 생성 됩니다."/>
            </p>
          </div>
          <div className="document-label">
            <label className="number">❸&nbsp;</label>
            <p><FormattedMessage id="새로운 비밀 키를 재발급 해줍니다."/></p>
          </div>
          <div
            className="document-label-notice"
            style={{ marginTop: "0rem" }}
          >
            <div>
              <label>-&nbsp;</label>
              <p>
                <FormattedMessage id="비밀키를 재발급할 경우 기존에 사용하던 비밀키를 사용하실 수 없습니다."/>
              </p>
            </div>
            <div>
              <label>-&nbsp;</label>
              <p>
                <FormattedMessage id="서비스하고 있는 어플리케이션에서 기존 비밀키를 사용 중일 때 비밀키를 재발급 하면 기존 비밀키 사용이 불가하여 서비스 장애가 발생할 수 있으니 주의하시기 바랍니다."/>
              </p>
            </div>
          </div>
          <div className="document-label">
            <label className="number">❹&nbsp;</label>
            <p><FormattedMessage id="사용하고자 하는 도메인 주소를 입력합니다."/></p>
          </div>
          <div className="document-label">
            <label className="number">❺&nbsp;</label>
            <p>
              <FormattedMessage id="OMPASS 인증 후 리다이렉트 될 URI를 입력합니다."/>
            </p>
          </div>
          <div className="document-label">
            <label className="number">❻&nbsp;</label>
            <p><FormattedMessage id="정책을 설정할 수 있습니다."/></p>
          </div>
          <div className="document-label">
            <label className="number">❼&nbsp;</label>
            <p><FormattedMessage id="수정된 내용이 반영됩니다."/></p>
          </div>
        </div>
      </div>

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
          <p><FormattedMessage id="등록 버튼 클릭 시"/></p>
        </div>
        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? application3ImgKr : application3ImgEn}
            alt="어플리케이션"
          />
        </div>

        <div className="documnet-box">
          <div className="document-label">
            <label className="number">❶&nbsp;</label>
            <p>
              <FormattedMessage id="등록 하고자 하는 어플리케이션 이름을 입력, 중복 체크를 합니다."/>
            </p>
          </div>
          <div className="document-label">
            <label className="number">❷&nbsp;</label>
            <p><FormattedMessage id="등록 할 도메인 주소를 입력합니다."/></p>
          </div>
          <div className="document-label">
            <label className="number">❸&nbsp;</label>
            <p>
              <FormattedMessage id="OMPASS 인증 후 리다이렉트 될 URI를 입력합니다."/>
            </p>
          </div>
          <div className="document-label">
            <label className="number">❹&nbsp;</label>
            <p><FormattedMessage id="등록 할 정책을 선택합니다."/></p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Application;
