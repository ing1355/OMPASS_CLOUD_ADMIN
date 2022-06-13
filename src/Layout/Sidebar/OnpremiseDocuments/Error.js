import React from 'react'
import { Table } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { isKorea } from '../../../Functions/isKorea'

const Error = () => {
    const {locale} = useSelector(state => ({
        locale: state.locale
    }))
    return <div className="8st 9st">
        <div className="guide restapi-div error-table">
            <h5 style={{ margin: "0" }}><FormattedMessage id="API 에러 메시지"/></h5>
            <Table striped bordered hover size="sm" className="codeTable">
                <thead>
                    <tr>
                        <th>code</th>
                        <th>message</th>
                        {isKorea(locale) && <th>description</th>}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>000</td>
                        <td>Required Request Body is missing.</td>
                        {isKorea(locale) && <td>Request Body 가 누락되었습니다.</td>}
                    </tr>
                    <tr>
                        <td>001</td>
                        <td>Please make a request including the secret key.</td>
                        {isKorea(locale) && <td>Secret Key 를 포함하여 요청해주세요.</td>}
                    </tr>
                    <tr>
                        <td>002</td>
                        <td>Please make a request including the user ID.</td>
                        {isKorea(locale) && <td>사용자 ID 를 포함하여 요청해주세요.</td>}
                    </tr>
                    <tr>
                        <td>003</td>
                        <td>Please make a request including the access token.</td>
                        {isKorea(locale) && <td>access token 을 포함하여 요청해주세요.</td>}
                    </tr>
                    <tr>
                        <td>004</td>
                        <td>Invalid secret key.</td>
                        {isKorea(locale) && <td>유효하지 않은 Secret Key 입니다.</td>}
                    </tr>
                    <tr>
                        <td style={{ paddingTop: "15px" }}>005</td>
                        <td>The secret key format does not match.<br />
                        example) Bearer dl239d29dl292kmdjf139f2ds</td>
                        {isKorea(locale) && <td>Secret Key 의 형식이 올바르지 않습니다.<br />
                        예) Bearer dl239d29dl292kmdjf139f2ds")</td>}
                    </tr>
                    <tr>
                        <td>006</td>
                        <td>User ID cannot exceed 30 digits.</td>
                        {isKorea(locale) && <td>사용자 ID 의 길이는 30자를 초과할 수 없습니다.</td>}
                    </tr>
                    <tr>
                        <td>011</td>
                        <td>The token has expired.</td>
                        {isKorea(locale) && <td> 토큰이 만료되었습니다.</td>}
                    </tr>
                    <tr>
                        <td>012</td>
                        <td>It is a token of an unsupported format.</td>
                        {isKorea(locale) && <td>지원하지 않는 형식의 토큰입니다.</td>}
                    </tr>
                    <tr>
                        <td>013</td>
                        <td>The token is not configured correctly.</td>
                        {isKorea(locale) && <td>토큰의 구성이 올바르지 않습니다.</td>}
                    </tr>
                    <tr>
                        <td>014</td>
                        <td>Failed to verify the existing signature.</td>
                        {isKorea(locale) && <td>기존 서명을 확인하지 못했습니다.</td>}
                    </tr>
                </tbody>
            </Table>
        </div>
    </div>
}

export default Error