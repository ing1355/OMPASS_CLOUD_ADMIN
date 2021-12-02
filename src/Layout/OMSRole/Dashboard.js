import React, { useLayoutEffect, useState } from 'react';
import CustomCard from '../../CustomComponents/CustomCard';
import './Dashboard.css'
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from '@nivo/bar'
import { barTestData, pieCountryTestData, pieDeviceTestData } from './ChartData';
import { CustomAxiosGetAll } from '../../Functions/CustomAxios';
import { getOMSDashboardTopApi } from '../../Constants/Api_Route';
import { message } from 'antd';
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
            ],
            () => {
                message.error("대시보드 정보를 가져오는데 실패하였습니다.");
            }
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
                    <div className="chart-content">
                        <ResponsivePie
                            data={pieCountryTestData}
                            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            activeOuterRadiusOffset={8}
                            borderWidth={1}
                            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                            arcLinkLabelsSkipAngle={10}
                            arcLinkLabelsTextColor="#333333"
                            arcLinkLabelsThickness={2}
                            arcLinkLabelsColor={{ from: 'color' }}
                            arcLabelsSkipAngle={10}
                            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                            defs={[
                                {
                                    id: 'dots',
                                    type: 'patternDots',
                                    background: 'inherit',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    size: 4,
                                    padding: 1,
                                    stagger: true
                                },
                                {
                                    id: 'lines',
                                    type: 'patternLines',
                                    background: 'inherit',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    rotation: -45,
                                    lineWidth: 6,
                                    spacing: 10
                                }
                            ]}
                            fill={[
                                {
                                    match: {
                                        id: 'ruby'
                                    },
                                    id: 'dots'
                                },
                                {
                                    match: {
                                        id: 'c'
                                    },
                                    id: 'dots'
                                },
                                {
                                    match: {
                                        id: 'go'
                                    },
                                    id: 'dots'
                                },
                                {
                                    match: {
                                        id: 'python'
                                    },
                                    id: 'dots'
                                },
                                {
                                    match: {
                                        id: 'scala'
                                    },
                                    id: 'lines'
                                },
                                {
                                    match: {
                                        id: 'lisp'
                                    },
                                    id: 'lines'
                                },
                                {
                                    match: {
                                        id: 'elixir'
                                    },
                                    id: 'lines'
                                },
                                {
                                    match: {
                                        id: 'javascript'
                                    },
                                    id: 'lines'
                                }
                            ]}
                            legends={[
                                {
                                    anchor: 'bottom',
                                    direction: 'row',
                                    justify: false,
                                    translateX: 0,
                                    translateY: 56,
                                    itemsSpacing: 0,
                                    itemWidth: 100,
                                    itemHeight: 18,
                                    itemTextColor: '#999',
                                    itemDirection: 'left-to-right',
                                    itemOpacity: 1,
                                    symbolSize: 18,
                                    symbolShape: 'circle',
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemTextColor: '#000'
                                            }
                                        }
                                    ]
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
            <div className="chart-container second">
                <div className="chart-container-2">
                    <div className="chart-title">
                        OS 별 사용자 비율
                    </div>
                    <div className="chart-content">
                        <ResponsivePie
                            data={pieDeviceTestData}
                            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            activeOuterRadiusOffset={8}
                            borderWidth={1}
                            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                            arcLinkLabelsSkipAngle={10}
                            arcLinkLabelsTextColor="#333333"
                            arcLinkLabelsThickness={2}
                            arcLinkLabelsColor={{ from: 'color' }}
                            arcLabelsSkipAngle={10}
                            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                            defs={[
                                {
                                    id: 'dots',
                                    type: 'patternDots',
                                    background: 'inherit',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    size: 4,
                                    padding: 1,
                                    stagger: true
                                },
                                {
                                    id: 'lines',
                                    type: 'patternLines',
                                    background: 'inherit',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    rotation: -45,
                                    lineWidth: 6,
                                    spacing: 10
                                }
                            ]}
                            fill={[
                                {
                                    match: {
                                        id: 'ruby'
                                    },
                                    id: 'dots'
                                },
                                {
                                    match: {
                                        id: 'c'
                                    },
                                    id: 'dots'
                                },
                                {
                                    match: {
                                        id: 'go'
                                    },
                                    id: 'dots'
                                },
                                {
                                    match: {
                                        id: 'python'
                                    },
                                    id: 'dots'
                                },
                                {
                                    match: {
                                        id: 'scala'
                                    },
                                    id: 'lines'
                                },
                                {
                                    match: {
                                        id: 'lisp'
                                    },
                                    id: 'lines'
                                },
                                {
                                    match: {
                                        id: 'elixir'
                                    },
                                    id: 'lines'
                                },
                                {
                                    match: {
                                        id: 'javascript'
                                    },
                                    id: 'lines'
                                }
                            ]}
                            legends={[
                                {
                                    anchor: 'bottom',
                                    direction: 'row',
                                    justify: false,
                                    translateX: 0,
                                    translateY: 56,
                                    itemsSpacing: 0,
                                    itemWidth: 100,
                                    itemHeight: 18,
                                    itemTextColor: '#999',
                                    itemDirection: 'left-to-right',
                                    itemOpacity: 1,
                                    symbolSize: 18,
                                    symbolShape: 'circle',
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemTextColor: '#000'
                                            }
                                        }
                                    ]
                                }
                            ]}
                        />
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
                        <ResponsiveBar
                            data={barTestData}
                            keys={['hot dog', 'burger', 'sandwich']}
                            indexBy="country"
                            layout="horizontal"
                            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                            padding={0.3}
                            valueScale={{ type: 'linear' }}
                            indexScale={{ type: 'band', round: true }}
                            colors={{ scheme: 'nivo' }}
                            defs={[
                                {
                                    id: 'dots',
                                    type: 'patternDots',
                                    background: 'inherit',
                                    color: '#38bcb2',
                                    size: 4,
                                    padding: 1,
                                    stagger: true
                                },
                                {
                                    id: 'lines',
                                    type: 'patternLines',
                                    background: 'inherit',
                                    color: '#eed312',
                                    rotation: -45,
                                    lineWidth: 6,
                                    spacing: 10
                                }
                            ]}
                            fill={[
                                {
                                    match: {
                                        id: 'fries'
                                    },
                                    id: 'dots'
                                },
                                {
                                    match: {
                                        id: 'sandwich'
                                    },
                                    id: 'lines'
                                }
                            ]}
                            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                            axisTop={null}
                            axisRight={null}
                            axisBottom={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'country',
                                legendPosition: 'middle',
                                legendOffset: 32
                            }}
                            axisLeft={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'food',
                                legendPosition: 'middle',
                                legendOffset: -40
                            }}
                            labelSkipWidth={12}
                            labelSkipHeight={12}
                            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                            legends={[
                                {
                                    dataFrom: 'keys',
                                    anchor: 'bottom-right',
                                    direction: 'column',
                                    justify: false,
                                    translateX: 120,
                                    translateY: 0,
                                    itemsSpacing: 2,
                                    itemWidth: 100,
                                    itemHeight: 20,
                                    itemDirection: 'left-to-right',
                                    itemOpacity: 0.85,
                                    symbolSize: 20,
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemOpacity: 1
                                            }
                                        }
                                    ]
                                }
                            ]}
                            role="application"
                            ariaLabel="Nivo bar chart demo"
                            barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in country: " + e.indexValue }}
                        />
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