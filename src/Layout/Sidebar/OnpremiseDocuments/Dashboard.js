import React from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { isKorea } from "../../../Functions/isKorea";
import dashboardImgKr from '../../../assets/docs/document_dashboard_1.png'
import dashboardImgEn from '../../../assets/docs/document_dashboard_1_eng.png'
import dashboard2ImgKr from '../../../assets/docs/document_dashboard_2.png'
import dashboard2ImgEn from '../../../assets/docs/document_dashboard_2_eng.png'
import dashboard3ImgKr from '../../../assets/docs/document_dashboard_3.png'
import dashboard3ImgEn from '../../../assets/docs/document_dashboard_3_eng.png'

const Dashboard = () => {
  const {locale} = useSelector(state => ({
    locale: state.locale
  }))
  return (
    <div>
      <h4>▶ <FormattedMessage id="대시보드"/></h4>

      <div className="document-text-box">
        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? dashboardImgKr : dashboardImgEn}
            alt="대시보드 사용자 정보"
          />
        </div>

        <div className="documnet-box">
          <div className="document-label">
            <label className="number">❶&nbsp;</label>
            <p className="space-pre">
              <FormattedMessage id="현재 사용하고 있는 서비스 유효기간 정보를 제공합니다."/>
            </p>
          </div>
          <div className="document-label">
            <label className="number">❷&nbsp;</label>
            <p className="space-pre">
                <FormattedMessage id="다음 결제 시 까지 남은 일 수가 표기됩니다."/>
            </p>
          </div>
          <div className="document-label">
            <label className="number">❸&nbsp;</label>
            <p className="space-pre">
              <FormattedMessage id="OMPASS 서비스를 이용 중인 사용자 수, 관리자 수, 바이패스 수, 비활성화 수 관련 정보를 제공합니다."/>
            </p>
          </div>
        </div>
      </div>

      <div className="document-text-box">
        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? dashboard2ImgKr : dashboard2ImgEn}
            alt="대스보드 인증 횟수 차트"
          />
        </div>

        <div className="documnet-box">
          <div className="document-label">
            <label className="number">❹&nbsp;</label>
            <p>
              <FormattedMessage id="어플리케이션 단위로 사용자 인증 횟수를 보여주는 차트입니다."/>
            </p>
          </div>
        </div>
      </div>

      <div className="document-text-box">
        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? dashboard3ImgKr : dashboard3ImgEn}
            alt="대시보드 최근 인증 로그"
          />
        </div>

        <div className="documnet-box">
          <div className="document-label">
            <label className="number">❺&nbsp;</label>
            <p>
              <FormattedMessage id="최근 ompass 인증을 이용한 사용자 로그입니다."/>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;