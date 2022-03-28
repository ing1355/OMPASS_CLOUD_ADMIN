import React, { useMemo } from 'react'
import ompassMobileIcon from "../../../../assets/ompassMobile.png";
import mobileIcon from "../../../../assets/mobileIcon.png";
import iosIcon from "../../../../assets/iosIcon.png";
import androidIcon from "../../../../assets/androidIcon.png";
import unknownIcon from '../../../../assets/unknownIcon.png'
import { FormattedMessage } from 'react-intl';

const MobileInfo = ({ data }) => {
    const { appVersion, model, os, osVersion } = data || {};

    const getMobileOSByOS = useMemo(() => {
        if (os) {
            if (os === 'android') return 'Android'
            if (os === 'ios') return 'iOS'
            return os
        }
    }, [os])

    return <>
        <li>
            <div className="img-div">
                <img src={data ? ompassMobileIcon : unknownIcon} />
            </div>

            <p>
                {/* <b><FormattedMessage id="TYPE" /></b> */}
                <b>Type</b>
                <br />
                {data ? "OMPASS Moblie " + appVersion : <FormattedMessage id="Unknown" />}
            </p>
        </li>
        <li>
            <div className="img-div">
                <img src={data ? ((os === 'ios') ? iosIcon : androidIcon) : unknownIcon} />
            </div>
            <p>
                <b>OS</b>
                <br />
                {data ? getMobileOSByOS + " " + osVersion : <FormattedMessage id="Unknown" />}
            </p>
        </li>
        <li>
            <div className="img-div">
                <img src={data ? mobileIcon : unknownIcon} />
            </div>
            <p>
                <b>Model</b>
                <br />
                {data ? model : <FormattedMessage id="Unknown" />}
            </p>
        </li>
    </>
}

export default MobileInfo