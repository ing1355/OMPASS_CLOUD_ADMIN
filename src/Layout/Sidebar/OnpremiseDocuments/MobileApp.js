import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'

import appImg3Kr from '../../../assets/docs/mobileApp_1.png'
import appImg3En from '../../../assets/docs/mobileApp_1_eng.png'
import appImg4Kr from '../../../assets/docs/mobileApp_2.png'
import appImg4En from '../../../assets/docs/mobileApp_2_eng.png'
import appImg5Kr from '../../../assets/docs/mobileApp_3.png'
import appImg5En from '../../../assets/docs/mobileApp_3_eng.png'
import { isKorea } from '../../../Functions/isKorea'

const MobileApp = ({type}) => {
    const { locale } = useSelector(state => ({
        locale: state.locale
    }))
    return <>
        <div className="document-text-box">
            <div className="document-img">
                <img
                    width="100%"
                    src={isKorea(locale) ? appImg3Kr : appImg3En}
                    alt={type === 'android' ? "안드로이드 이미지" : 'ios 이미지'}
                />
            </div>
            <div className="documnet-box">
                <div className="document-label">
                    <label className="number number-2">❸-⑴&nbsp;</label>
                    <p>
                        <FormattedMessage id="OMPASS 인증을 적용하고 있는 웹페이지에서 ID/PW 입력 후 인터페이스 팝업 창이 뜨면 ‘2차인증 등록하기’ 버튼을 선택합니다." />
                    </p>
                </div>
                <div className="document-label">
                    <label className="number number-2">❸-⑵&nbsp;</label>
                    <p><FormattedMessage id="OMPASS 인증장치 등록 QR코드 창이 열립니다." /></p>
                </div>
                <div className="document-label">
                    <label className="number number-2">❸-⑶&nbsp;</label>
                    <p><FormattedMessage id="OMPASS 앱에서 인증장치 등록을 선택합니다." /></p>
                </div>
                <div className="document-label">
                    <label className="number number-2">❸-⑷&nbsp;</label>
                    <p><FormattedMessage id="QR 코드를 스캔합니다." /></p>
                </div>
                <div className="document-label">
                    <label className="number number-2">❸-⑸&nbsp;</label>
                    <p>
                        <FormattedMessage id="QR 코드를 인식한 결과 화면으로 ‘확인’ 버튼을 누른 후 사용자 인증 과정을 거쳐 등록을 완료하시면 됩니다." />
                    </p>
                </div>

                <div
                    className="document-label-notice"
                    style={{ marginTop: "0rem" }}
                >
                    <div>
                        <label>-&nbsp;</label>
                        <p>
                            <FormattedMessage id="스마트폰을 교체하거나 OMPASS 앱을 재설치 시, OMPASS 인증장치를 서버에 재등록 후 사용하시기 바랍니다." />
                            <br />
                            <FormattedMessage id="(사용자 관리 → 사용자 정보 삭제 시 OMPASS 인증 장치 재 등록이 가능 합니다.)" />
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div className="document-text-box">
            <div className="document-img">
                <img
                    width="100%"
                    src={isKorea(locale) ? appImg4Kr : appImg4En}
                    alt={type === 'android' ? "안드로이드 이미지" : 'ios 이미지'}
                />
            </div>
            <div className="documnet-box">
                <div className="document-label">
                    <label className="number number-2">❹-⑴&nbsp;</label>
                    <p>
                        <FormattedMessage id="OMPASS 인증을 적용하고 있는 웹페이지에서 ID/PW 입력 후 인터페이스 팝업 창이 뜨면 “2차 인증하기” 버튼을 선택합니다." />
                    </p>
                </div>
                <div className="document-label">
                    <label className="number number-2">❹-⑵&nbsp;</label>
                    <p><FormattedMessage id="OMPASS QR코드 인증창이 열립니다." /></p>
                </div>
                <div className="document-label">
                    <label className="number number-2">❹-⑶&nbsp;</label>
                    <p>
                        <FormattedMessage id="스마트폰에서 OMPASS 인증 알림을 확인합니다." />
                    </p>
                </div>
                <div className="document-label">
                    <label className="number number-2">❹-⑷&nbsp;</label>
                    <p>
                        <FormattedMessage id="설정한 인증방식으로 사용자 인증을 완료합니다." />
                    </p>
                </div>

                <div className="document-label-notice">
                    <div>
                        <label>*&nbsp;</label>
                        <p><FormattedMessage id="OMPASS 인증 알림이 오지 않는 경우" /></p>
                    </div>
                </div>
            </div>
            <div className="document-img">
                <img
                    width="100%"
                    src={isKorea(locale) ? appImg5Kr : appImg5En}
                    alt={type === 'android' ? "안드로이드 이미지" : 'ios 이미지'}
                />
            </div>
            <div className="documnet-box">
                <div className="document-label">
                    <label className="number">❶&nbsp;</label>
                    <p><FormattedMessage id="OMPASS 앱에서 QR 코드 인증을 선택합니다." /></p>
                </div>
                <div className="document-label">
                    <label className="number">❷&nbsp;</label>
                    <p><FormattedMessage id="QR 코드를 스캔합니다." /></p>
                </div>
                <div className="document-label">
                    <label className="number">❸&nbsp;</label>
                    <p>
                        <FormattedMessage id="QR 코드를 인식한 결과 화면으로 ‘확인’ 버튼을 누른 후 사용자 인증 과정을 거쳐 인증을 완료하시면 됩니다." />
                    </p>
                </div>
            </div>
        </div>
    </>
}

export default MobileApp