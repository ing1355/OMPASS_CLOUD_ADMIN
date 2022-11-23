import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import restApiImgKr from '../../../assets/docs/rest_api_img_1.png'
import restApiImgEn from '../../../assets/docs/rest_api_img_1_eng.png'
import restApiImg2Kr from '../../../assets/docs/rest_api_img_2.png'
import restApiImg2En from '../../../assets/docs/rest_api_img_2_eng.png'
import restApiImg3Kr from '../../../assets/docs/rest_api_img_3.png'
import restApiImg3En from '../../../assets/docs/rest_api_img_3_eng.png'
import { isKorea } from '../../../Functions/isKorea'

const OmpassPopUp = () => {
    const {locale} = useSelector(state => ({
        locale: state.locale
    }))
    return <div className="5st">
        <div className="guide restapi-div">
            <h5 style={{ margin: "0" }}><FormattedMessage id="OMPASS 등록 및 U2F 인증"/></h5>
            <h6 className="sub-title"><FormattedMessage id="client-side"/></h6>
            <p style={{ marginBottom: "0" }}>
                <FormattedMessage id="응답받은 OMPASS URI를 브라우저(client-side)에서 호출합니다."/>
            </p>
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
                    <p> <FormattedMessage id="등록 인터페이스 호출 예시 (팝업 창)"/></p>
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
                        <FormattedMessage id="OMPASS 에 등록되어 있지 않은 사용자인 경우 아래와 같은 등록 팝업 창이 표시됩니다."/>
                    </p>
                </div>
                <div className="document-img">
                    <img
                        width="100%"
                        src={isKorea(locale) ? restApiImgKr : restApiImgEn}
                        alt="등록 인터페이스"
                    />
                </div>

                <div className="documnet-box">
                    <div className="document-label">
                        <label className="number">❶&nbsp;</label>
                        <p><FormattedMessage id="“OMPASS 앱” 버튼을 클릭해주세요."/></p>
                    </div>
                    <div className="document-label">
                        <label className="number">❷&nbsp;</label>
                        <p><FormattedMessage id="QR코드를 OMPASS 앱으로 스캔해주세요."/></p>
                    </div>
                </div>
            </div>
            {/* =================================================================== */}
            <div className="document-text-box">
                <div className="document-img">
                    <img
                        width="100%"
                        src={isKorea(locale) ? restApiImg2Kr : restApiImg2En}
                        alt="등록 인터페이스"
                    />
                </div>

                <div className="documnet-box">
                    <div className="document-label">
                        <label className="number">❸&nbsp;</label>
                        <p>
                            <FormattedMessage id="인증방식 등록 완료 후 선택한 인증방식으로 등록을 완료해주세요."/>
                            <br />
                            <FormattedMessage id="인증방식 등록 방법을 보려면"/>&nbsp;
                            <Link target="_blank" to="/docs/appAndroid">
                                <FormattedMessage id="여기"/>
                            </Link>
                            <FormattedMessage id="를 클릭해주세요."/>
                        </p>
                    </div>
                </div>
            </div>
            {/* =================================================================== */}
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
                        <p><FormattedMessage id="로그인 시 바로 알림이 전송됩니다."/></p>
                    </div>
                    <div className="document-label">
                        <label className="number">❷&nbsp;</label>
                        <p><FormattedMessage id="모바일로 OMPASS 인증 알림이 옵니다."/></p>
                    </div>
                    <div className="document-label">
                        <label className="number">❸&nbsp;</label>
                        <p><FormattedMessage id="기존에 선택했던 인증방식으로 인증을 완료해주세요."/></p>
                    </div>
                </div>
            </div>
            {/* =================================================================== */}
        </div>
    </div>
}

export default OmpassPopUp