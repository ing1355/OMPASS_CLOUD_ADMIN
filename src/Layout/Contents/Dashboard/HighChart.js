import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

const HighChart = ({ data }) => {
  console.log(data);
  const options = {
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      floating: true,
      x: 50,
      y: 40
    },
    xAxis: {
      categories: data.length && data[0].data.map(d => d.date),
      labels: {
        enabled: true,
      },
      height: '100%',
      crossHair: {
        width: 1
      }
    },
    yAxis: [
      {
        labels: {
          align: 'right'
        },
        height: "100%",
        resize: {
          enabled: true
        },
        title: {
          text : 'Ranking'
        }
      }
    ],
    series: [
      ...data
    ],
    title: {
      text: '인증 횟수 Ranking'
    },
    chart: {
      defaultSeriesType: 'line'
    },
    tooltip: {
      pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.tip} 회</b><br/>',
      split: true,
    }
  };
  return <>
    <HighchartsReact highcharts={Highcharts} options={options} />
  </>
}

export default HighChart;