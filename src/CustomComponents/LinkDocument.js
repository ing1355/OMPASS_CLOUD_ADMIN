import React from 'react'
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";

const LinkDocument = ({ locale, link }) => {
    return <div className="document-link">
        <>
            <a
                target="_blank"
                href={locale === 'ko' ? ("https://ompass.kr:4003/ko" + link) : ("https://ompass.kr:4003" + link)}
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