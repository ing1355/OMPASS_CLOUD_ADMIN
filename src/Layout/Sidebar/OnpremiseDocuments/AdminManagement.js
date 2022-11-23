import React from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import adminImgKr from "../../../assets/docs/document_admin_1.png";
import adminImgEn from "../../../assets/docs/document_admin_1_eng.png";
import adminImg2Kr from "../../../assets/docs/document_admin_2.png";
import adminImg2En from "../../../assets/docs/document_admin_2_eng.png";
import adminImg3Kr from "../../../assets/docs/document_admin_7.png";
import adminImg3En from "../../../assets/docs/document_admin_7_eng.png";
import adminImg4Kr from "../../../assets/docs/document_admin_5.png";
import adminImg4En from "../../../assets/docs/document_admin_5_eng.png";
import adminImg5Kr from "../../../assets/docs/document_admin_6.png";
import adminImg5En from "../../../assets/docs/document_admin_6_eng.png";
import { isKorea } from "../../../Functions/isKorea";

const AdminManagement = () => {
  const { locale } = useSelector((state) => ({
    locale: state.locale,
  }));
  return (
    <div>
      <h4>
        ▶ <FormattedMessage id="관리자 관리" />
      </h4>

      {/* =================================================================== */}
      <div className="document-text-box">
        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? adminImgKr : adminImgEn}
            alt="관리자 페이지"
          />
        </div>

        <div className="documnet-box">
          <div className="document-label">
            <label className="number">❶&nbsp;</label>
            <p>
              <FormattedMessage id="관리자 추가 등록이 가능합니다." />
            </p>
          </div>
          <div className="document-label">
            <label className="number">❷&nbsp;</label>
            <p>
              <FormattedMessage id="관리자 정보를 제공합니다." />
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
          <p>
            <FormattedMessage id="관리자 목록 클릭 시" />
          </p>
        </div>
        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? adminImg2Kr : adminImg2En}
            alt="관리자 페이지"
          />
        </div>

        <div className="documnet-box">
          <div className="document-label">
            <label className="number">❶&nbsp;</label>
            <p>
              <FormattedMessage id="관리자 상세정보가 표기됩니다." />
            </p>
          </div>
          <div className="document-label">
            <label className="number">❷&nbsp;</label>
            <p>
              <FormattedMessage id="관리자 정보 수정이 가능합니다." />
            </p>
          </div>
          <div className="document-label">
            <label>* &nbsp;</label>
            <p>
              <FormattedMessage id="현재 로그인 된 계정의 비밀번호만 수정이 가능합니다." />
              <br />(
              <FormattedMessage id="비밀번호는 문자, 숫자, 특수문자를 활용하여 최대 16자리 까지 8자 이상 3가지 조합 또는 10자 이상 2가지 조합으로 입력해야 합니다." />
              )
            </p>
          </div>
          <div className="document-label">
            <label className="number">❸&nbsp;</label>
            <p>
              <FormattedMessage id="관리자 삭제가 가능합니다." />
              <span style={{ padding: "1rem 0 0" }}>
                <div className="document-label">
                  <label>→ &nbsp;</label>
                  <p>
                    <FormattedMessage id="Sub Admin 선택 시 “삭제” 버튼이 보여지며, Sub Admin 삭제가 가능합니다." />
                  </p>
                </div>
                <div className="document-label">
                  <label>→ &nbsp;</label>
                  <p>
                    <FormattedMessage id="기본으로 제공되는 ADMIN 계정은 삭제가 불가능합니다." />
                  </p>
                </div>
              </span>
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
          <p>
            <FormattedMessage id="관리자 등록 버튼 클릭 시" />
          </p>
        </div>
        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? adminImg4Kr : adminImg4En}
            alt="관리자 페이지"
          />
        </div>

        <div className="documnet-box">
          <div className="document-label">
            <label className="number">❶&nbsp;</label>
            <p>
              <FormattedMessage id="신규 등록하고자 하는 관리자의 기본 정보를 입력합니다." />
            </p>
          </div>
          <div className="document-label">
            <label className="number">❷&nbsp;</label>
            <p>
              <FormattedMessage id="등록 버튼 클릭 시 입력하신 이메일로 회원가입 인증 메일을 전송합니다." />
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
          <p>
            <FormattedMessage id="관리자 등록 인증 메일" />
          </p>
        </div>
        <div className="document-img">
          <img
            width="100%"
            src={isKorea(locale) ? adminImg5Kr : adminImg5En}
            alt="회원가입 이메일 창"
          />
        </div>

        <div className="documnet-box">
          <div className="document-label">
            <label className="number">❸&nbsp;</label>
            <p>
              <FormattedMessage id="“인증하기” 버튼을 클릭하면 관리자 등록이 완료됩니다." />
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
};

export default AdminManagement;
