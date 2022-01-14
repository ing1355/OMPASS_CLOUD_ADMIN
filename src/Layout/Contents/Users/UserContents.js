import React, { useCallback, useMemo, useState } from 'react';
import UserUnregistered from "./UserUnregistered";
import UserDisabled from "./UserDisabled";
import UserBypass from "./UserBypass";
import CustomButton from "../../../CustomComponents/CustomButton";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import { ReadCsvData, SaveCsvData } from "../../../Functions/ControlCsvData";
import UserAll from "./UserAll";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate } from 'react-router';
import { emailTest } from "../../../Constants/InputRules";
import { connect } from 'react-redux';
import CustomConfirm from '../../../CustomComponents/CustomConfirm';
import { CustomAxiosPost } from '../../../Functions/CustomAxios';
import { updateCSVApi } from '../../../Constants/Api_Route';
import ActionCreators from '../../../redux/actions';

var excelData = null;

const UsersContents = ({ setDetailData, tableLoading, tableData, selectView, setSelectView, _tableData, lang, userProfile, selectedApplication, setSelectedApplication,
    showSuccessMessage, showErrorMessage, applicationsData, setTableData }) => {
    const [uploadConfirmVisible, setUploadConfirmVisible] = useState(false);
    const [csvConfirmLoading, setCsvConfirmLoading] = useState(false);
    const navigate = useNavigate();
    const { formatMessage } = useIntl();
    const { adminId } = userProfile

    const submitCSV = useCallback(() => {
        setCsvConfirmLoading(true);
        CustomAxiosPost(
            updateCSVApi(adminId, selectedApplication),
            excelData.map((d) => ({
                email: d.email,
                userId: d.userId,
            })),
            (data) => {
                setTableData(data);
                setCsvConfirmLoading(false);
                setUploadConfirmVisible(false);
                showSuccessMessage("SUCCESS_CSV_UPLOAD");
            },
            () => {
                setCsvConfirmLoading(false);
                showErrorMessage("FAIL_CSV_UPLOAD");
            }
        );
    }, [adminId, selectedApplication]);

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
        setUploadConfirmVisible(false);
    }, []);

    const changeSelectedApplication = useCallback((e) => {
        setSelectedApplication(e.target.value);
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
                        onInput={(e) => {
                            try {
                                ReadCsvData(e.target.files[0], (jsonData) => {
                                    const columns = ["userId", "email"];
                                    const result = [];
                                    jsonData.forEach((data) => {
                                        if(!emailTest(data[0]) || !emailTest(data[1])) return;
                                        const _result = {};
                                        columns.forEach((c, ind) => {
                                            if (c === "email") {
                                                if (!emailTest(data[ind])) _result[c] = "";
                                                else _result[c] = data[ind];
                                            } else _result[c] = data[ind];
                                        });
                                        result.push(_result);
                                    });
                                    excelData = result;
                                    e.target.value = null;
                                    setUploadConfirmVisible(true);
                                });
                            } catch(e) {
                                showErrorMessage('IS_NOT_CSV')
                            }
                        }}
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
                    onClick={() => {
                        SaveCsvData([
                            {
                                userId: formatMessage({ id: "id" }),
                                email: formatMessage({ id: "Email" }),
                                appName: formatMessage({ id: "APPLICATIONNAME" }),
                                byPass: formatMessage({ id: "ISBYPASS" }),
                            },
                            ..._tableData.map((t) => ({
                                userId: t.userId,
                                email: t.email,
                                appName: t.appName,
                                byPass: t.byPass ? "O" : "X",
                            })),
                        ]);
                    }}
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
            <div>* 이미 존재하는 사용자는 덮어쓰기 됩니다.</div>
            <div>* 이메일 형식이 잘못되어 있을 경우 무시됩니다.</div>
            <div>* .csv 파일만 업로드 가능합니다.</div>
            <select
                className="excel-select"
                value={selectedApplication}
                onChange={changeSelectedApplication}
            >
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
        showErrorMessage: (id) => {
            dispatch(ActionCreators.showErrorMessage(id));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContents);
