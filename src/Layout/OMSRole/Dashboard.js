import React, { useCallback, useLayoutEffect, useState } from 'react';
import CustomCard from '../../CustomComponents/CustomCard';
import {Radio} from 'antd';
import './Dashboard.css'
import { CustomAxiosGetAll } from '../../Functions/CustomAxios';
import { getOMSDashboardTopApi } from '../../Constants/Api_Route';
import { connect } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';

const Dashboard = ({ userProfile }) => {
    const { adminId } = userProfile;
    const [chartType, setChartType] = useState('OS');
    const [topData, setTopData] = useState({});
    const {formatMessage} = useIntl()

    useLayoutEffect(() => {
        if (adminId) {
            CustomAxiosGetAll(
                [
                    getOMSDashboardTopApi(adminId),
                ],
                [
                    (data) => {
                        console.log(data);
                        setTopData(data);
                    },
                ]
            );
        }
    }, [adminId])

    const onTypeChange = useCallback((e) => {
        setChartType(e.target.value)
    },[])

    return <div className="contents-container" style={{ backgroundColor: 'transparent', width: 1400 }}>
        <section className="flex-card-container dashboard">
            <CustomCard title="총 Admin 수">
                {topData.totalAdminNumber} 명
            </CustomCard>
            <CustomCard title="총 Application 수">
                {topData.totalApplicationNumber} 개
            </CustomCard>
            <CustomCard title="오늘 새로 가입한 Admin 수">
                {topData.signedUpTodayNumber} 명
            </CustomCard>
            <CustomCard title="현재 총 결제 금액">
                {topData.totalKoreaPaymentAmount} / {topData.totalGlobalPaymentAmount}
            </CustomCard>
        </section>
        <section className="dashboard">
            <div className="chart-container">
                <div>
                    <div className="chart-title">
                        <div>
                            <FormattedMessage id="DASHBOARD_CHART_TITLE" values={{value: formatMessage({id:chartType})}}/>
                        </div>
                        <div>
                            <Radio.Group onChange={onTypeChange} value={chartType}>
                                <Radio value="OS"><FormattedMessage id="OS"/></Radio>
                                <Radio value="Country"><FormattedMessage id="Country"/></Radio>
                                <Radio value="Browser"><FormattedMessage id="Browser"/></Radio>
                            </Radio.Group>
                        </div>
                    </div>
                    <div className="chart-content">
                    </div>
                </div>
            </div>
        </section>
    </div>
}

function mapStateToProps(state) {
    return {
        userProfile: state.userProfile,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);