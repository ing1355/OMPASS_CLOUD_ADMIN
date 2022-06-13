import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

const Git_Demo = () => {
    const {formatMessage} = useIntl()
    return <a className="git-demo-container"
        href="https://github.com/OMSecurity/OMPASS_DEMO"
        target="_blank"
        name={"┗ " + formatMessage({id:"OMPASS API를 적용한 DEMO의 소스코드를 제공하고 있습니다."})}>
        <FormattedMessage id="데모 보기" />
    </a>
}

export default Git_Demo