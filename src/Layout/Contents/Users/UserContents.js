import React, { useCallback, useMemo } from 'react';
import UserUnregistered from "./UserUnregistered";
import UserDisabled from "./UserDisabled";
import UserBypass from "./UserBypass";
import UserAll from "./UserAll";
import { FormattedMessage } from "react-intl";
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import ExcelComponent from '../../../CustomComponents/ExcelComponent';

const UsersContents = ({ setDetailData, tableLoading, tableData, selectView, setSelectView, _tableData, applicationsData }) => {    
    const navigate = useNavigate();

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
                <ExcelComponent type="download" applicationsData={applicationsData} tableData={_tableData}/>
            </div>
            <div style={{ marginLeft: "1rem" }}>
                <ExcelComponent type="upload" applicationsData={applicationsData} tableData={_tableData}/>
            </div>
        </div>
        
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContents);