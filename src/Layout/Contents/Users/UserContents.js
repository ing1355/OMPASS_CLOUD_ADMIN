import React, { useCallback, useMemo, useRef, useState } from 'react';
import UserUnregistered from "./UserUnregistered";
import UserDisabled from "./UserDisabled";
import UserBypass from "./UserBypass";
import CustomButton from "../../../CustomComponents/CustomButton";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import { ReadCsvData, SaveCsvData } from "../../../Functions/ControlCsvData";
import UserAll from "./UserAll";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from 'react-router';
import { emailTest, userIdTest } from "../../../Constants/InputRules";
import { connect } from 'react-redux';
import CustomConfirm from '../../../CustomComponents/CustomConfirm';
import { CustomAxiosPost } from '../../../Functions/CustomAxios';
import { updateCSVApi } from '../../../Constants/Api_Route';
import ActionCreators from '../../../redux/actions';

const UsersContents = ({ setDetailData, tableLoading, tableData, selectView, setSelectView, _tableData, lang, userProfile, selectedApplication, setSelectedApplication,
    showSuccessMessage, showErrorMessage, applicationsData, setTableData, maxCount }) => {
    const [uploadConfirmVisible, setUploadConfirmVisible] = useState(false);
    const [downloadConfirmVisible, setDownloadConfirmVisible] = useState(false);
    const [csvConfirmLoading, setCsvConfirmLoading] = useState(false);
    const excelData = useRef(null);
    const navigate = useNavigate();
    const { formatMessage } = useIntl();
    const { adminId } = userProfile
    const uploadCSVEvent = useCallback((e) => {
        try {
            ReadCsvData(e.target.files[0], (jsonData) => {
                const columns = ["userId", "email"];
                const result = [];
                try {
                    console.log(jsonData);
                    if(jsonData.length === 0) throw {
                        msg: 'users empty'
                    }
                    jsonData.forEach((data, ind) => {
                        if (!emailTest(data[0])) {
                            if (!userIdTest(data[0])) throw {
                                msg: 'userId invalid',
                                param: ind + 1
                            };
                        }
                        if (data[1]) {
                            if (!emailTest(data[1])) {
                                throw {
                                    msg: 'email invalid',
                                    param: ind + 1
                                }
                            }
                        }
                        const _result = {};
                        columns.forEach((c, ind) => {
                            if (c === "email") {
                                if (!emailTest(data[ind])) _result[c] = "";
                                else _result[c] = data[ind];
                            } else _result[c] = data[ind];
                        });
                        result.push(_result);
                    });
                    setUploadConfirmVisible(true)
                    excelData.current = result
                } catch ({ msg, param }) {
                    if (msg === 'userId invalid') showErrorMessage('INVALID_CSV_USERID_DATA', param)
                    else if (msg === 'email invalid') showErrorMessage('INVALID_CSV_EMAIL_DATA', param)
                    else if (msg === 'users empty') showErrorMessage('EXCEL_EMPTY')
                }
            });
        } catch (e) {
            if (e === 'is not csv') showErrorMessage('IS_NOT_CSV')
        }
        e.target.value = null;
    }, [maxCount])

    const downloadCsvEvent = useCallback(() => {
        setDownloadConfirmVisible(true);
    }, [])

    const submitCSV = useCallback(() => {
        if (selectedApplication === -1) return showErrorMessage('PLEASE_SELECTE_APPLICATION')
        const userCount = Math.abs(tableData.length - excelData.current.filter(ex => !tableData.find(td => td.appId === selectedApplication && td.userId === ex.userId)).length);
        if(maxCount < userCount) return showErrorMessage('TOO_MANY_PERSON', userCount - maxCount)
        setCsvConfirmLoading(true);
        CustomAxiosPost(
            updateCSVApi(adminId, selectedApplication),
            excelData.current.map((d) => ({
                email: d.email,
                userId: d.userId,
            })),
            (data) => {
                setTableData(data);
                setCsvConfirmLoading(false);
                setSelectedApplication(-1)
                setUploadConfirmVisible(false);
                showSuccessMessage("SUCCESS_CSV_UPLOAD");
            },
            () => {
                setCsvConfirmLoading(false);
                showErrorMessage("FAIL_CSV_UPLOAD");
            }
        );
    }, [adminId, selectedApplication, tableData, maxCount]);

    const downloadCSV = useCallback(() => {
        if (selectedApplication === -1) return showErrorMessage('PLEASE_SELECTE_APPLICATION')
        setCsvConfirmLoading(true);
        SaveCsvData([
            {
                userId: formatMessage({ id: "id" }),
                email: formatMessage({ id: "Email" }),
                appName: formatMessage({ id: "APPLICATIONNAME" }),
                byPass: formatMessage({ id: "ISBYPASS" }),
            },
            ...(_tableData.filter(t => t.appId === selectedApplication).map(t => ({
                userId: t.userId,
                email: t.email,
                appName: t.appName,
                byPass: t.byPass ? "O" : "X",
            }))),
        ], () => {
            setSelectedApplication(-1)
            setCsvConfirmLoading(false);
            setDownloadConfirmVisible(false);
        }, () => {
            setCsvConfirmLoading(false);
            showErrorMessage('EXCEL_DOWNLOAD_FAIL')
        }, lang);
    }, [_tableData, selectedApplication, lang])

    const selectedBorder = useMemo(
        () => (
            <div className="selectedBorder" style={{ left: selectView * 25 + "%" }} />
        ),
        [selectView]
    );

    const clickToDetail = useCallback((rowData) => {
        setDetailData(rowData);
        navigate("/Users/Detail/" + rowData.userId);
    }, []);

    const closeConfirmModal = useCallback(() => {
        setSelectedApplication(-1)
        setUploadConfirmVisible(false);
    }, [applicationsData]);

    const closeDownloadModal = useCallback(() => {
        setSelectedApplication(-1)
        setDownloadConfirmVisible(false);
    }, [applicationsData])

    const changeSelectedApplication = useCallback((e) => {
        setSelectedApplication(e.target.value * 1);
    }, []);

    return <>
        <div className="UsersBox3">
            <ul className="UsersBox3_title">
                {selectedBorder}
                <li
                    onClick={() => {
                        setSelectView(0);
                    }}
                    className={
                        "user-concept-title" +
                        (selectView === 0 ? " selected" : "")
                    }
                >
                    <h3>{tableData.length}</h3>
                    <p>
                        <FormattedMessage id="ALLUSERNUM" />
                    </p>
                </li>
                <li
                    onClick={() => {
                        setSelectView(1);
                    }}
                    className={
                        "user-concept-title" +
                        (selectView === 1 ? " selected" : "")
                    }
                >
                    <h3>{tableData.filter((t) => t.register).length}</h3>
                    <p>
                        <FormattedMessage id="REGISTEREDUSERNUM" />
                    </p>
                </li>
                <li
                    onClick={() => {
                        setSelectView(2);
                    }}
                    className={
                        "user-concept-title" +
                        (selectView === 2 ? " selected" : "")
                    }
                >
                    <h3>{tableData.filter((t) => !t.register).length}</h3>
                    <p>
                        <FormattedMessage id="UNREGISTEREDUSERNUM" />
                    </p>
                </li>
                <li
                    onClick={() => {
                        setSelectView(3);
                    }}
                    className={
                        "user-concept-title" +
                        (selectView === 3 ? " selected" : "")
                    }
                >
                    <h3>{tableData.filter((t) => t.byPass).length}</h3>
                    <p>
                        <FormattedMessage id="BYPASSUSERNUM" />
                    </p>
                </li>
            </ul>
            <ul className="UsersBox3_contents">
                {selectView === 0 && (
                    <UserAll
                        tableData={_tableData}
                        tableLoading={tableLoading}
                        setDetailData={clickToDetail}
                    />
                )}
                {selectView === 1 && (
                    <UserUnregistered
                        tableData={_tableData}
                        tableLoading={tableLoading}
                        setDetailData={clickToDetail}
                    />
                )}
                {selectView === 2 && (
                    <UserDisabled
                        tableData={_tableData}
                        tableLoading={tableLoading}
                        setDetailData={clickToDetail}
                    />
                )}
                {selectView === 3 && (
                    <UserBypass
                        tableData={_tableData}
                        tableLoading={tableLoading}
                        setDetailData={clickToDetail}
                    />
                )}
            </ul>
        </div>
        <div className="excel-button-box">
            <div>
                <CustomButton
                    className="excel-button"
                    style={{ minWidth: lang === "ko" ? 170 : 200 }}>
                    <label
                        htmlFor="excel-upload"
                        className="pointer center-position full-size">
                        <UploadOutlined />&nbsp;&nbsp;
                        <FormattedMessage id="EXCELUPLOAD" />
                    </label>
                    <input
                        id="excel-upload"
                        type="file"
                        accept=".csv"
                        style={{ display: "none" }}
                        onInput={uploadCSVEvent}
                    />
                </CustomButton>
            </div>
            <div style={{ marginLeft: "1rem" }}>
                <CustomButton
                    id="download"
                    className="excel-button"
                    style={{
                        float: "right",
                        minWidth: lang === "ko" ? 170 : 200,
                    }}
                    onClick={downloadCsvEvent}
                >
                    <DownloadOutlined />
                    &nbsp;&nbsp;
                    <FormattedMessage id="EXCELDOWNLOAD" />
                </CustomButton>
            </div>
        </div>
        <CustomConfirm
            visible={uploadConfirmVisible}
            cancelCallback={closeConfirmModal}
            confirmCallback={submitCSV}
            okLoading={csvConfirmLoading}
        >
            <h6 className="execel-modal-text">
                <FormattedMessage id="EXCELIMPORTTEXT" />
            </h6>
            <div><FormattedMessage id="CSV_DESCRIPTION_1" /></div>
            <div><FormattedMessage id="CSV_DESCRIPTION_2" /></div>
            <div><FormattedMessage id="CSV_DESCRIPTION_3" /></div>
            <select
                className="excel-select"
                value={selectedApplication}
                onChange={changeSelectedApplication}
            >
                <option value={-1}>
                    {formatMessage({ id: 'NULL_OPTION' })}
                </option>
                {applicationsData.map((d, ind) => (
                    <option key={ind} value={d.appId}>
                        {d.name}
                    </option>
                ))}
            </select>
        </CustomConfirm>
        <CustomConfirm
            visible={downloadConfirmVisible}
            cancelCallback={closeDownloadModal}
            confirmCallback={downloadCSV}
            okLoading={csvConfirmLoading}
        >
            <h6 className="execel-modal-text">
                <FormattedMessage id="EXCEL_DOWNLOAD_TITLE"/>
            </h6>
            <div><FormattedMessage id="EXCEL_DOWNLOAD_DESCRIPTION"/></div>
            <select
                className="excel-select"
                value={selectedApplication}
                onChange={changeSelectedApplication}
            >
                <option value={-1}>
                    {formatMessage({ id: 'NULL_OPTION' })}
                </option>
                {applicationsData.map((d, ind) => (
                    <option key={ind} value={d.appId}>
                        {d.name}
                    </option>
                ))}
            </select>
        </CustomConfirm>
    </>
}

function mapStateToProps(state) {
    return {
        userProfile: state.userProfile,
        lang: state.locale,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showSuccessMessage: (id) => {
            dispatch(ActionCreators.showSuccessMessage(id));
        },
        showErrorMessage: (id, param) => {
            dispatch(ActionCreators.showErrorMessage(id, param));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContents);
