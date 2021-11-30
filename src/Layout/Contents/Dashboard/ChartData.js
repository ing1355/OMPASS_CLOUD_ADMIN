const getRandomInt = () => {
    const min = 0, max = 12;
    return Math.floor(Math.random() * (max - min)) + min;
}

export const testData = [
    {
      "id": "Application 1",
      "data": new Array(5).fill(1).map((_,ind) => ({
          x: ind,
          y: getRandomInt()
      }))
    },
    {
      "id": "Application 2",
      "data": new Array(5).fill(1).map((_,ind) => ({
        x: ind,
        y: getRandomInt()
    }))
    },
    {
      "id": "Application 3",
      "data": new Array(5).fill(1).map((_,ind) => ({
        x: ind,
        y: getRandomInt()
    }))
    },
    {
      "id": "Application 4",
      "data": new Array(5).fill(1).map((_,ind) => ({
        x: ind,
        y: getRandomInt()
    }))
    },
    {
      "id": "Application 5",
      "data": new Array(5).fill(1).map((_,ind) => ({
        x: ind,
        y: getRandomInt()
    }))
    },
    {
      "id": "Application 6",
      "data": new Array(5).fill(1).map((_,ind) => ({
        x: ind,
        y: getRandomInt()
    }))
    },
    {
      "id": "Application 7",
      "data": new Array(5).fill(1).map((_,ind) => ({
        x: ind,
        y: getRandomInt()
    }))
    },
    {
      "id": "Application 8",
      "data": new Array(5).fill(1).map((_,ind) => ({
        x: ind,
        y: getRandomInt()
    }))
    },
    {
      "id": "Application 9",
      "data": new Array(5).fill(1).map((_,ind) => ({
        x: ind,
        y: getRandomInt()
    }))
    },
    {
      "id": "Application 10",
      "data": new Array(5).fill(1).map((_,ind) => ({
        x: ind,
        y: getRandomInt()
    }))
    }
  ]

  export const testData2 = [
    {
      "id": "Serie 1",
      "data": [
        {
          "x": 2000,
          "y": 12
        },
        {
          "x": 2001,
          "y": 4
        },
        {
          "x": 2002,
          "y": 3
        },
        {
          "x": 2003,
          "y": 1
        },
        {
          "x": 2004,
          "y": 1
        }
      ]
    },
    {
      "id": "Serie 2",
      "data": [
        {
          "x": 2000,
          "y": 8
        },
        {
          "x": 2001,
          "y": 1
        },
        {
          "x": 2002,
          "y": 1
        },
        {
          "x": 2003,
          "y": 3
        },
        {
          "x": 2004,
          "y": 9
        }
      ]
    },
    {
      "id": "Serie 3",
      "data": [
        {
          "x": 2000,
          "y": 6
        },
        {
          "x": 2001,
          "y": 2
        },
        {
          "x": 2002,
          "y": 8
        },
        {
          "x": 2003,
          "y": 4
        },
        {
          "x": 2004,
          "y": 8
        }
      ]
    },
    {
      "id": "Serie 4",
      "data": [
        {
          "x": 2000,
          "y": 9
        },
        {
          "x": 2001,
          "y": 6
        },
        {
          "x": 2002,
          "y": 5
        },
        {
          "x": 2003,
          "y": 12
        },
        {
          "x": 2004,
          "y": 12
        }
      ]
    },
    {
      "id": "Serie 5",
      "data": [
        {
          "x": 2000,
          "y": 4
        },
        {
          "x": 2001,
          "y": 11
        },
        {
          "x": 2002,
          "y": 10
        },
        {
          "x": 2003,
          "y": 7
        },
        {
          "x": 2004,
          "y": 2
        }
      ]
    },
    {
      "id": "Serie 6",
      "data": [
        {
          "x": 2000,
          "y": 5
        },
        {
          "x": 2001,
          "y": 5
        },
        {
          "x": 2002,
          "y": 6
        },
        {
          "x": 2003,
          "y": 5
        },
        {
          "x": 2004,
          "y": 10
        }
      ]
    },
    {
      "id": "Serie 7",
      "data": [
        {
          "x": 2000,
          "y": 2
        },
        {
          "x": 2001,
          "y": 10
        },
        {
          "x": 2002,
          "y": 2
        },
        {
          "x": 2003,
          "y": 2
        },
        {
          "x": 2004,
          "y": 5
        }
      ]
    },
    {
      "id": "Serie 8",
      "data": [
        {
          "x": 2000,
          "y": 10
        },
        {
          "x": 2001,
          "y": 3
        },
        {
          "x": 2002,
          "y": 12
        },
        {
          "x": 2003,
          "y": 9
        },
        {
          "x": 2004,
          "y": 6
        }
      ]
    },
    {
      "id": "Serie 9",
      "data": [
        {
          "x": 2000,
          "y": 7
        },
        {
          "x": 2001,
          "y": 7
        },
        {
          "x": 2002,
          "y": 11
        },
        {
          "x": 2003,
          "y": 6
        },
        {
          "x": 2004,
          "y": 4
        }
      ]
    },
    {
      "id": "Serie 10",
      "data": [
        {
          "x": 2000,
          "y": 1
        },
        {
          "x": 2001,
          "y": 9
        },
        {
          "x": 2002,
          "y": 7
        },
        {
          "x": 2003,
          "y": 8
        },
        {
          "x": 2004,
          "y": 11
        }
      ]
    },
    {
      "id": "Serie 11",
      "data": [
        {
          "x": 2000,
          "y": 3
        },
        {
          "x": 2001,
          "y": 12
        },
        {
          "x": 2002,
          "y": 4
        },
        {
          "x": 2003,
          "y": 10
        },
        {
          "x": 2004,
          "y": 3
        }
      ]
    },
    {
      "id": "Serie 12",
      "data": [
        {
          "x": 2000,
          "y": 11
        },
        {
          "x": 2001,
          "y": 8
        },
        {
          "x": 2002,
          "y": 9
        },
        {
          "x": 2003,
          "y": 11
        },
        {
          "x": 2004,
          "y": 7
        }
      ]
    }
  ]


// const animation = (data) => {
//   const totalDuration = 1000;
//   const delayBetweenPoints = totalDuration / (data.length ? data[0].length : 1);
//   const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
//   return {
//     x: {
//       type: 'number',
//       easing: 'linear',
//       duration: delayBetweenPoints,
//       from: NaN, // the point is initially skipped
//       delay(ctx) {
//         if (ctx.type !== 'data' || ctx.xStarted) {
//           return 0;
//         }
//         ctx.xStarted = true;
//         return ctx.index * delayBetweenPoints;
//       }
//     },
//     y: {
//       type: 'number',
//       easing: 'linear',
//       duration: delayBetweenPoints,
//       from: previousY,
//       delay(ctx) {
//         if (ctx.type !== 'data' || ctx.yStarted) {
//           return 0;
//         }
//         ctx.yStarted = true;
//         return ctx.index * delayBetweenPoints;
//       }
//     }
//   }
// };

// const getRandomColor = () => parseInt((Math.random() * 256) % 255)

// const getColorByData = () => `rgb(${getRandomColor()},${getRandomColor()},${getRandomColor()})`

// module.exports = (data) => {
//   const colors = data.map(d => getColorByData())
//   return {
//     data: {
//       labels: data.map((d,ind) => 'test' + ind),
//       datasets: data.map((d,ind) => {
//         return {
//           label: 'test' + ind,
//           borderColor: colors[ind],
//           borderWidth: 1,
//           radius: 0,
//           data: d
//         }
//       })
//     },
//     options: {
//       animation: animation(data),
//       interaction: {
//         intersect: false
//       },
//       plugins: {
//         legend: false
//       },
//       scales: {
//         x: {
//           type: 'linear'
//         }
//       }
//     }
//   }
// }