import React from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { isKorea } from "../../../Functions/isKorea";
import loginImgKr from '../../../assets/docs/document_login_img.png'
import loginImgEn from '../../../assets/docs/document_login_img_eng.png'
import loginPasswordImgKr from '../../../assets/docs/document_login_password.png'
import loginPasswordImgEn from '../../../assets/docs/document_login_password_eng.png'
import passwordEmailImgKr from '../../../assets/docs/document_password_Email.png'
import passwordEmailImgEn from '../../../assets/docs/document_password_Email_eng.png'

const Login = () => {
  const { locale } = useSelector(state => ({
    locale: state.locale
  }))
  return (
    <div>
      <h4>▶ <FormattedMessage id="로그인" /></h4>

      <div className="document-text-box">
        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? loginImgKr : loginImgEn}
            alt="로그인 창"
          />
        </div>

        <div className="documnet-box">
          <div className="document-label">
            <label className="number">❶&nbsp;</label>
            <p><FormattedMessage id="이메일 형식의 사용자 ID를 입력합니다." /></p>
          </div>
          <div className="document-label">
            <label className="number">❷&nbsp;</label>
            <p>
              <FormattedMessage id="비밀번호는 문자, 숫자, 특수문자를 활용하여 최대 16자리 까지 8자 이상 3가지 조합 또는 10자 이상 2가지 조합으로 입력해야 합니다." />
            </p>
          </div>
          <div className="document-label">
            <label className="number">❸&nbsp;</label>
            <p>
              <FormattedMessage id="로그인 버튼을 누르면 대시보드로 이동합니다." />
            </p>
          </div>
          <div className="document-label">
            <label className="number">❹&nbsp;</label>
            <p>
              <FormattedMessage id="비밀번호를 잊어버렸을 시 사용가능 한 기능입니다." />
            </p>
          </div>
        </div>
      </div>
      {/* =================================================================== */}

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
          <p><FormattedMessage id="비밀번호 찾기 버튼 클릭 시" /></p>
        </div>
        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? loginPasswordImgKr : loginPasswordImgEn}
            alt="비밀번호 초기화"
          />
        </div>

        <div className="documnet-box">
          <div className="document-label">
            <label className="number">❶&nbsp;</label>
            <p><FormattedMessage id="비밀번호를 초기화 할 이메일을 입력합니다." /></p>
          </div>
          <div className="document-label">
            <label className="number">❷&nbsp;</label>
            <p>
              <FormattedMessage id="❝이메일 인증❞ 버튼 클릭 시 비밀번호 초기화를 위한 인증 메일을 전송합니다." />
            </p>
          </div>
        </div>
      </div>
      {/* =================================================================== */}

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
          <p><FormattedMessage id="비밀번호 초기화 인증 메일" /></p>
        </div>
        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? passwordEmailImgKr : passwordEmailImgEn}
            alt="비밀번호 초기화 인증 메일"
          />
        </div>

        <div className="documnet-box">
          <div className="document-label">
            <label className="number">❸&nbsp;</label>
            <p>
              <FormattedMessage id="비밀번호 초기화 버튼을 클릭합니다." />
            </p>
          </div>
          <div className="document-label">
            <label className="number">❹&nbsp;</label>
            <p>
              <FormattedMessage id="본 이메일의 URL은 5분 후에 만료되므로 이메일 수신 후 바로 인증하시길 바랍니다." />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;