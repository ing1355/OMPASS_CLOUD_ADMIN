import React, { useLayoutEffect, useState } from 'react';
import CustomCard from '../../CustomComponents/CustomCard';
import './Dashboard.css'
import { CustomAxiosGetAll } from '../../Functions/CustomAxios';
import { getOMSDashboardTopApi } from '../../Constants/Api_Route';
import { connect } from 'react-redux';

const Dashboard = ({userProfile}) => {
    const {adminId} = userProfile;
    const [topData, setTopData] = useState({});

    useLayoutEffect(() => {
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
    }, [])

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
            <div className="chart-container first">
                <div className="chart-container-1">
                    <div className="chart-title">
                        국가 별 사용자 비율
                    </div>
                </div>
            </div>
            <div className="chart-container second">
                <div className="chart-container-2">
                    <div className="chart-title">
                        OS 별 사용자 비율
                    </div>
                    <div className="chart-content">
                    </div>
                </div>
            </div>
        </section>
        <section className="dashboard">
            <div className="chart-container third">
                <div className="chart-container-3">
                    <div className="chart-title">
                        브라우저 별 사용자 비율
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