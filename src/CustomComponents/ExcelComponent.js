import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
    ExcelExport,
    ExcelExportColumn,
    ExcelExportColumnGroup,
} from "@progress/kendo-react-excel-export";
import { connect } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import CustomButton from './CustomButton';
import './ExcelComponent.css'
import CustomConfirm from './CustomConfirm';
import ActionCreators from '../redux/actions';
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import * as XLSX from 'xlsx';
import { ApplicationNameTest, emailTest, userIdTest } from '../Constants/InputRules';
import { updateExcelApi } from '../Constants/Api_Route'
import { CustomAxiosPost } from '../Functions/CustomAxios';

const ExcelComponent = ({ type, lang, applicationsData, tableData, showSuccessMessage, showErrorMessage, userProfile }) => {
    const [excelData, setExcelData] = useState([])
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(-1);
    const { formatMessage } = useIntl();
    const {adminId} = userProfile
    const columns = useMemo(() => [['userId', formatMessage({ id: 'User' })], ['appName', formatMessage({ id: 'APPLICATIONNAME' })], ['byPass', formatMessage({ id: 'Bypass' })], ['email', formatMessage({ id: 'Email' })]], [lang]);
    const _exporter = useRef(null);

    useLayoutEffect(() => {
        if(type === 'download') {
            if (selectedApplication !== -1) {
                setExcelData(tableData.filter(td => td.appId === selectedApplication))
            } else {
                setExcelData([])
            }
        }
    }, [type, selectedApplication])

    const changeSelectedApplication = useCallback((e) => {
        setSelectedApplication(e.target.value * 1);
    }, []);

    const openConfirmModal = useCallback(() => {
        setConfirmVisible(true);
    }, [])

    const closeConfirmModal = useCallback(() => {
        setSelectedApplication(-1)
        setConfirmVisible(false);
    }, [])

    const downloadExcel = useCallback(() => {
        if (selectedApplication === -1) return showErrorMessage('PLEASE_SELECTE_APPLICATION')
        let workbook = _exporter.current.workbookOptions();
        let title_row = workbook.sheets[0].rows[0];
        let columns = workbook.sheets[0].columns;
        title_row.height = 70;
        title_row.cells[0] = {
            ...title_row.cells[0],
            background: "#ffffff",
            color: "#000000",
            fontSize: 50,
        };
        workbook.sheets[0].rows.map((row, ind) => {
            if (ind > 1) {
                row.cells[2].value = row.cells[2].value ? 'O' : 'X'
            }
        })
        columns.map((col, ind) => {
            if (ind === 0) col.width = 250;
            else if (ind === 1) col.width = 300;
            else if (ind === 2) col.width = 200;
            else if (ind === 3) col.width = 250;
        });
        _exporter.current.save(workbook);
        closeConfirmModal();
    }, [excelData, selectedApplication])

    const uploadExcel = useCallback(() => {
        if (selectedApplication === -1) return showErrorMessage('PLEASE_SELECTE_APPLICATION')
        setConfirmLoading(true);
        CustomAxiosPost(
            updateExcelApi(adminId, selectedApplication),
            excelData.map((d) => ({
                email: d[3],
                userId: d[0],
            })),
            (data) => {
                setConfirmLoading(false);
                window.location.reload()
            },
            () => {
                setConfirmLoading(false);
            }
        );
    }, [excelData, selectedApplication])

    const uploadExcelEvent = useCallback(async (e) => {
        const file = e.target.files[0]
        const ft = file.name.split(".").pop();
        if (ft === "xlsx" || ft === "xls" || ft == "xml" || ft === "csv") {
            const reader = new FileReader();
            const rABS = !!reader.readAsBinaryString;
            reader.onload = (e) => {
                const bstr = e.target.result;
                let wb = 0;
                document.getElementById('excel-upload').value = null;
                try {
                    wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
                } catch (error) {
                    showErrorMessage("FAIL_EXCEL_UPLOAD")
                }
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const _data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                const data = _data.slice(2,).filter(d => d.length)

                let regex_confirm = {
                    userId: false,
                    email: false,
                    ind: 0,
                    appName: false,
                    length: false,
                    duplicate: false,
                    duplicate_ind: 0
                };

                if (!data.flat().length) {
                    showErrorMessage('EXCEL_DATA_NO_LENGTH')
                    return;
                }
                data.some((res, index) => {
                    const sliced_data = data.slice(index+1,);
                    if(sliced_data.length) {
                        let duplicate_check = sliced_data.findIndex(d => d[0] === res[0] && d[1] === res[1])
                        if (duplicate_check !== -1) {
                            regex_confirm.duplicate = true;
                            regex_confirm.duplicate_ind = index + duplicate_check + 4
                            regex_confirm.ind = index + 3;
                            return true;
                        }
                    }
                    if (!res[0] || !(emailTest(res[0]) || userIdTest(res[0]))) {
                        regex_confirm.userId = true;
                        regex_confirm.ind = index + 3;
                        return true;
                    }
                    if (!res[1] || !ApplicationNameTest(res[1])) {
                        regex_confirm.name = true;
                        regex_confirm.ind = index + 3;
                        return true;
                    }
                });
                if (Object.values(regex_confirm).includes(true)) {
                    if (regex_confirm.userId) {
                        return showErrorMessage('EXCEL_DATA_INVALID_USERID', regex_confirm.ind)
                    } else if (regex_confirm.appName) {
                        return showErrorMessage('EXCEL_DATA_INVALID_APPLICATION_NAME', regex_confirm.ind)
                    } else if (regex_confirm.duplicate) {
                        return showErrorMessage('EXCEL_DATA_DUPLICATED', {param : regex_confirm.ind, param2 : regex_confirm.duplicate_ind})
                    }
                }
                setExcelData(data);
                setConfirmVisible(true);
            };

            if (rABS) reader.readAsBinaryString(file);
            else reader.readAsArrayBuffer(file);
        } else {
            showErrorMessage("FAIL_EXCEL_UPLOAD")
        }
    }, [])

    return (
        <>
            {type === 'upload' && <CustomButton
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
                    accept=".csv,.xls,.xlsx,.xml"
                    style={{ display: "none" }}
                    onInput={uploadExcelEvent}
                />
            </CustomButton>}
            {type === 'download' && <CustomButton
                id="download"
                className="excel-button"
                style={{
                    float: "right",
                    minWidth: lang === "ko" ? 170 : 200,
                }}
                onClick={openConfirmModal}
            >
                <DownloadOutlined />&nbsp;&nbsp;<FormattedMessage id="EXCELDOWNLOAD" />
            </CustomButton>}
            <ExcelExport
                data={excelData}
                fileName={`${formatMessage({ id: 'USER_EXCEL_TITLE' })}.xlsx`}
                ref={_exporter}
            >
                <ExcelExportColumnGroup
                    title={formatMessage({ id: 'USER_EXCEL_TITLE_PARAMS' }, { param : '(' + (selectedApplication !== -1 ? applicationsData.find(d => d.appId === selectedApplication).name : '') + ')'})}
                    headerPaddingCellOptions={{ background: "#ff0000" }}
                    headerCellOptions={{
                        textAlign: "center",
                        borderBottom: 3,
                        borderLeft: 3,
                        borderRight: 3,
                        borderTop: 3,
                        fontSize: 16,
                        bold: true,
                        verticalAlign: "center",
                    }}
                >
                    {columns.map((res, ind) =>
                        <ExcelExportColumn
                            key={ind}
                            field={res[0]}
                            title={res[1]}
                            width={res[1].length * 30}
                            cellOptions={{ textAlign: "center" }}
                            headerCellOptions={{ textAlign: "center" }}
                        />
                    )}
                </ExcelExportColumnGroup>
            </ExcelExport>

            <CustomConfirm
                visible={confirmVisible}
                className="user-excel-modal-container"
                cancelCallback={closeConfirmModal}
                confirmCallback={type === 'download' ? downloadExcel : uploadExcel}
                okLoading={confirmLoading}
            >
                {type === 'download' ? <><h6 className="execel-modal-text">
                    <FormattedMessage id="EXCEL_DOWNLOAD_TITLE" />
                </h6>
                    <div><FormattedMessage id="EXCEL_DOWNLOAD_DESCRIPTION" /></div>
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
                    </select></> : <><h6 className="execel-modal-text">
                        <FormattedMessage id="EXCELIMPORTTEXT" />
                    </h6>
                    <div><FormattedMessage id="EXCEL_DESCRIPTION_1" /></div>
                    <div><FormattedMessage id="EXCEL_DESCRIPTION_2" /></div>
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
                    </select></>}
            </CustomConfirm>
        </>
    )
}

function mapStateToProps(state) {
    return {
        userProfile: state.userProfile,
        lang: state.langState
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ExcelComponent);