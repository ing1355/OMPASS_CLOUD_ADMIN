import React from 'react'
import { FormattedMessage } from 'react-intl'
import { dracula, CopyBlock, CodeBlock } from "react-code-blocks";
import { codeBlockLanguage } from '../../../Constants/ConstantValues';
import { Table } from 'react-bootstrap';
import copyBtnImg from '../../../assets/docs/CopyButton.png'

const UserResetOmpass = () => {
    return <div>
        <div className="guide restapi-div 2st">
            <h5 style={{ margin: "0" }}> <FormattedMessage id="OMPASS 등록 초기화 API"/></h5>
            <h6 className="sub-title"><FormattedMessage id="server-side"/></h6>
            <p style={{ marginBottom: "0" }}>
                <FormattedMessage id="server-side에서 HTTP HEADER에는 Secret Key를 포함하고 Path Variable에는 사용자의 아이디를 포함하여 OMPASS API를 호출합니다."/>
            </p>
            <div className="copyblock">
                <h6 className="codeH6">■ <FormattedMessage id="OMPASS 등록 초기화 API"/></h6>
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
          DELETE 
          URL /v1/ompass/users/{userId}
          URL EXAMPLE – https://interface-api.ompasscloud.com/v1/ompass/users/{userId}
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
                    <tbody>
                        <tr>
                            <td style={{ paddingTop: "2rem" }} rowSpan="3">
                                Authorization
                            </td>
                            <td style={{ paddingTop: "2rem" }} rowSpan="3">
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
            <h6 className="codeH6">■ Response (JSON)</h6>
            <p
                style={{
                    color: "#3c9edb",
                    fontWeight: "bold",
                    marginBottom: "-1rem"
                }}
                >
                · {t("OMPASS 등록 초기화 성공 시")}
            </p>
            <p>
                {t("HTTP STATUS CODE 204 반환")}
            </p>
        </div>
    </div>
}

export default UserResetOmpass