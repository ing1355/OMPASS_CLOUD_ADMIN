import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import copyBtnImg from '../../../assets/docs/CopyButton.png'
import { Table } from 'react-bootstrap'
import { dracula, CopyBlock, CodeBlock } from "react-code-blocks";
import { codeBlockLanguage } from '../../../Constants/ConstantValues';

const AuthNTokenSecond = () => {
    const {formatMessage} = useIntl()
    return <div className="7st 8st 77st">
        <div className="guide restapi-div">
            <h5 style={{ margin: "0" }}><FormattedMessage id="인증 토큰 검증"/></h5>
            <h6 className="sub-title"><FormattedMessage id="server-side"/></h6>
            <p style={{ marginBottom: "0" }}>
                <FormattedMessage id="client-side 에서 전달받은 인증 토큰을 포함하여 OMPASS 인증 토큰 검증 API를 호출하여 토큰의 유효성을 검증 받습니다."/>
                <br />
                <FormattedMessage id="API 요청의 응답 HTTP STATUS CODE 가 200 이면 해당 아이디를 확인 후 로그인 처리합니다."/>
            </p>
            <div className="copyblock">
                <h6 className="codeH6">■ <FormattedMessage id="OMPASS 성공 토큰 검증 API"/></h6>
                <h6
                    className="copyblock-message"
                    style={{
                        color: "rgb(114, 114, 114)",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                        textAlign: "right",
                    }}
                ></h6>
            </div>
            <CodeBlock
                className="first codeBox"
                style={{ background: "#002c50" }}
                text={`
          POST 
          URL /v1/ompass/token-verification
          URL EXAMPLE https://(${formatMessage({id:'interfaceURL'})})/v1/ompass/token-verification
        `}
                language={codeBlockLanguage}
                theme={dracula}
            />
            <br />
            <h6 className="codeH6">■ Header </h6>
            <div className="error-table">
                <Table striped bordered hover size="sm" className="codeTable">
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody className="adff">
                        <tr>
                            <td className="adf" rowSpan="3">
                                Authorization
                            </td>
                            <td className="adf" rowSpan="3">
                                Bearer
                            </td>
                            <td><FormattedMessage id="어플리케이션에 할당된 Secret Key"/></td>
                        </tr>
                        <tr>
                            <td>
                                <FormattedMessage id="Authorization 타입으로 'Bearer' 를 반드시 명시하고 'Bearer' 와 'Secret Key' 사이에 공백 필수"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Example : Bearer djfk39dkfdl39dldjmgjd4idls83jflghidhs83jfk
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <br />
            <h6 className="codeH6">■ Request Body (JSON) </h6>
            <Table striped bordered hover size="sm" className="codeTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>user_id</td>
                        <td>String</td>
                        <td><FormattedMessage id="사용자 아이디"/></td>
                    </tr>
                    <tr>
                        <td>access_token</td>
                        <td>String</td>
                        <td><FormattedMessage id="리다이렉트 URI 로 전달 받은 access_token"/></td>
                    </tr>
                </tbody>
            </Table>

            <br />
            <div className="copyblock">
                <h6 className="codeH6">■ Example of Request Body </h6>
                <h6
                    className="copyblock-message"
                    style={{
                        color: "rgb(114, 114, 114)",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                        textAlign: "right",
                    }}
                >
                    <img
                        width="11%"
                        src={copyBtnImg}
                        alt="copy버튼"
                    />
                    <FormattedMessage id="(버튼 클릭 시 Copy 가능) ↓"/>
                </h6>
            </div>
            <CopyBlock
                className="first codeBox"
                style={{ background: "#002c50" }}
                text={`
          {
           "user_id" : "omsecurity",
           "access_token" : "dfj2ld92lldj29cldl29llduuufnbsd229312000dfl2ldio2o019029dj10wj"
          }
        `}
                language={codeBlockLanguage}
                theme={dracula}
            />

            <br />
            <h6 className="codeH6">■ Response (JSON)</h6>
            <p style={{ color: "#3c9edb", fontWeight: "bold" }}>
                · <FormattedMessage id="인증 성공 시"/>
            </p>
            <Table striped bordered hover size="sm" className="codeTable">
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>user_id</td>
                        <td>String</td>
                        <td><FormattedMessage id="사용자 아이디"/></td>
                    </tr>
                </tbody>
            </Table>
            <h6
                className="copyblock-message2"
                style={{
                    color: "rgb(114, 114, 114)",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    textAlign: "right",
                }}
            >
                <img
                    width="2.7%"
                    src={copyBtnImg}
                    alt="copy버튼"
                />
        &nbsp;
        <FormattedMessage id="(버튼 클릭 시 Copy 가능) ↓"/>
            </h6>
            <CopyBlock
                className="first codeBox"
                style={{ background: "#002c50" }}
                text={`
          {
            "code" : 200,
            "message" : "ok",
            "data" : {
              "user_id" : "omsecurity"
            }
          }
        `}
                language={codeBlockLanguage}
                theme={dracula}
            />
        </div>
    </div>
}

export default AuthNTokenSecond