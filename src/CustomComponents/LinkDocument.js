import React from 'react'
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import './LinkDocument.css'

const LinkDocument = ({ locale, link }) => {
    const domain = process.env.REACT_APP_SERVICE_TARGET === 'aws' ? 'https://ompasscloud.com' : (locale === 'ko' ? 'https://ompass.kr:4003/ko' : 'https://ompass.kr:4003')
    return <div className="document-link">
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