import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

const HighChart = () => {
    const options = {
        yAxis: [
          {
            height: "80%"
          },
          {
            top: "80%",
            height: "20%",
            offset: 0
          }
        ],
      
        series: [
          {
            type: "ohlc",
            data: [
              [0, 4, 3, 4, 5],
              [1, 4, 3, 4, 5],
              [2, 4, 3, 4, 5],
              [3, 4, 3, 4, 5],
              [4, 4, 3, 4, 5]
            ],
            yAxis: 0
          },
          {
            type: "column",
            data: [4, 3, 4, 5, 6],
            yAxis: 1
          }
        ]
      };
    return <>
        <HighchartsReact highcharts={Highcharts} options={options}/>
    </>
}

export default HighChart;