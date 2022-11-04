import React, { useMemo } from 'react'
import webAuthnIcon from "../../../../assets/webauthnIcon.png";
import chromeIcon from "../../../../assets/chromeIcon.png";
import windowsIcon from '../../../../assets/windowsIcon.png'
import iosIcon from "../../../../assets/iosIcon.png";
import androidIcon from "../../../../assets/androidIcon.png";
import unknownIcon from '../../../../assets/unknownIcon.png'
import { FormattedMessage } from 'react-intl';

const WebAuthnInfo = ({data}) => {
    const { os, osVersion } = data || {};

    const getIconByOS = useMemo(() => {
        if(os) {
            if(os.includes('Windows')) return windowsIcon
            if(os.includes('Mac')) return iosIcon
            if(os.includes('Android') || os.includes('android')) return androidIcon
            if(os.includes('Chrome')) return chromeIcon
            if(os.includes('iOS') || os.includes('ios')) return iosIcon
        }
        return unknownIcon
    },[os])

    const getMobileOSByOS = useMemo(() => {
        if(os) {
            if(os === 'android') return 'Android'
            if(os === 'ios') return 'iOS'
            return os
        }
    },[os])

    return <>
        <li>
            <div className="img-div">
                <img src={data ? webAuthnIcon : unknownIcon} alt=""/>
            </div>

            <p>
                {/* <b><FormattedMessage id="TYPE"/></b> */}
                <b>Type</b>
                <br />
                {data ? "WebAuthn" : <FormattedMessage id="Unknown"/>}
            </p>
        </li>
        <li>
            <div className="img-div">
                <img src={getIconByOS} alt=""/>
            </div>
            <p>
                <b>OS</b>
                <br />
                {data ? getMobileOSByOS + ' ' + osVersion : <FormattedMessage id="Unknown" />}
            </p>
        </li>
        {/* <li>
            <div className="img-div">
                <img src={data ? authenticatorIcon : unknownIcon} />
            </div>
            <p>
                <b>Model</b>
                <br />
                {data ? model : <FormattedMessage id="Unknown" />}
            </p>
        </li> */}
    </>
}

export default WebAuthnInfo