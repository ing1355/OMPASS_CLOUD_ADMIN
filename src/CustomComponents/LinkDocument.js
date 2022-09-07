import React from 'react'
import { FormattedMessage } from 'react-intl';
import { connect, useSelector } from "react-redux";
import { homepageUrl } from '../Constants/ConstantValues';
import './LinkDocument.css'

const LinkDocument = ({ locale, link }) => {
    const domain = homepageUrl(locale)
    const {standalone} = useSelector(state => ({
        standalone: state.standalone
    }))
    return !standalone.standalone && <div className="document-link">
        <>
            <a
                target="_blank"
                rel="noopener noreferrer"
                href={domain + link}
            >
                <b><FormattedMessage id="GODOCUMENT" /></b>
            </a>
        </>
    </div>
}

function mapStateToProps(state) {
    return {
        locale: state.locale,
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkDocument);