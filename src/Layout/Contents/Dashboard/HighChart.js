import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

const HighChart = ({data}) => {
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
    xAxis: [
      {
        labels: {
          enabled: true,
          formatter: (f) => Highcharts.dateFormat('%Y-%m-%d', f.value)
        },
        height: '100%'
      }
    ],
    yAxis: [
      {
        labels: {
          align: 'right'
        },
        height: "100%",
        resize: {
          enabled: true
        }
      }
    ],
    series: [
      ...data
    ],
    title: {
      text: '인증 횟수 Ranking'
    },
    tooltip: {
      split: true
    }
  };
  return <>
    <HighchartsReact highcharts={Highcharts} options={options}/>
  </>
}

export default HighChart;