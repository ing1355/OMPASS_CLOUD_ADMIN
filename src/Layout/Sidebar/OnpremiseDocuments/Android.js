import React from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import qrImg from '../../../assets/docs/QR_android.png'
import appImgKr from '../../../assets/docs/app_1.png'
import appImgEn from '../../../assets/docs/app_1_eng.png'
import appImg2Kr from '../../../assets/docs/app_2.png'
import appImg2En from '../../../assets/docs/app_2_eng.png'
import { isKorea } from "../../../Functions/isKorea";
import MobileApp from "./MobileApp";

const Android = () => {
  const { locale } = useSelector(state => ({
    locale: state.locale
  }))
  return (
    <div>
      <h4>▶ <FormattedMessage id="안드로이드" /></h4>
      <div className="document-text-box">
        <div className="qrcode-mobile">
          <br />
          <img
            className="qrcode-mobile"
            width="15%"
            src={qrImg}
            alt="QR코드"
          />
          <h6
            style={{
              borderBottom: "1px solid black",
              marginTop: "1rem",
              paddingBottom: "1rem",
            }}
          >
            <FormattedMessage id="안드로이드 전용 Play 스토어에서 원모어패스(OMPASS)를 다운로드하여 설치해야 합니다." />
            <br />
            <FormattedMessage id="QR 스캔을 위한 단말의 해당 권한 요청 사항을 반드시" />
            <b style={{ color: "red" }}> <FormattedMessage id="허용" /> </b>
            <FormattedMessage id="으로 합니다." />
          </h6>
          <br />
        </div>
        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? appImgKr : appImgEn}
            alt="안드로이드 이미지"
          />
        </div>
        <div className="documnet-box">
          <div className="document-label">
            <label className="number">❶-⑴&nbsp;</label>
            <span>
              <p>
                <FormattedMessage id="해당 앱이 최신이 아닐 경우 업데이트 팝업창이 표시됩니다." />
              </p>
              <div className="document-label">
                <label className="number">→&nbsp;</label>
                <p>
                  <FormattedMessage id="최신 업데이트를 진행하고 앱을 실행해주세요." />
                </p>
              </div>

            </span>
          </div>


          <div className="document-label">
            <label className="number">❶-⑵&nbsp;</label>
            <p>
              <FormattedMessage id="해당 앱을 다운로드시 최초 설정이 진행됩니다." />
            </p>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      <div className="document-text-box">
        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? appImg2Kr : appImg2En}
            alt="안드로이드 이미지"
          />
        </div>
        <div className="documnet-box">
          <div className="document-label">
            <label className="number">❷&nbsp;</label>
            <span>
              <p><FormattedMessage id="로그인 인증방식을 설정 합니다." /></p>
              <div className="document-label">
                <label className="number">→&nbsp;</label>
                <p>
                  <FormattedMessage id="생체 인증(지문, 얼굴인식), PIN CODE, 패턴 중 2가지 이상 등록해야 합니다." />
                </p>
              </div>
            </span>
          </div>

        </div>
      </div>

      <MobileApp type='android' />
    </div>
  );
}
export default Android;
