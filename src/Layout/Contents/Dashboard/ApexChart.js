import React from 'react';
import Chart from 'react-apexcharts'
import { GetFullDate } from '../../../Functions/GetFullDate';

const ApexChart = ({data}) => {
    const options = {
        chart: {
            type: 'area',
            stacked: false,
            height: 400,
            zoom: {
                type: 'x',
                enabled: false,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
            },
        },
        yaxis: {
            labels: {
                formatter: (val) => {
                    return (val / 1000000).toFixed(0);
                },
            },
            title: {
                text: 'Count'
            },
        },
        xaxis: {
            type: 'datetime',
            labels: {
                formatter: (val) => {
                    return GetFullDate(val);
                }
            }
        },
        tooltip: {
            shared: false,
            y: {
                formatter: function (val) {
                    return (val / 1000000).toFixed(0)
                }
            }
        }
    }
    return <Chart options={options} series={data} type="area" height={600}/>
}

export default ApexChart;