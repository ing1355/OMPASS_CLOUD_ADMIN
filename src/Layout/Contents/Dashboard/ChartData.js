const getRandomInt = () => {
  const min = 0, max = 12;
  return Math.floor(Math.random() * (max - min)) + min;
}

const _data = [
  {
    name: 'application 1',
    datas: [
      { date: '2021-12-11', value: 10, rank: 1 },
      { date: '2021-12-12', value: 20, rank: 2 },
      { date: '2021-12-13', value: 30, rank: 3 },
      { date: '2021-12-14', value: 33, rank: 4 },
      { date: '2021-12-15', value: 34, rank: 5 },
      { date: '2021-12-16', value: 35, rank: 1 }
    ]
  },
  {
    name: 'application 2',
    datas: [
      { date: '2021-12-11', value: 11, rank: 2 },
      { date: '2021-12-12', value: 22, rank: 3 },
      { date: '2021-12-13', value: 33, rank: 4 },
      { date: '2021-12-14', value: 44, rank: 5 },
      { date: '2021-12-15', value: 55, rank: 1 },
      { date: '2021-12-16', value: 66, rank: 2 }
    ]
  },
  {
    name: 'application 3',
    datas: [
      { date: '2021-12-11', value: 77, rank: 3 },
      { date: '2021-12-12', value: 88, rank: 4 },
      { date: '2021-12-13', value: 99, rank: 5 },
      { date: '2021-12-14', value: 111, rank: 1 },
      { date: '2021-12-15', value: 222, rank: 2 },
      { date: '2021-12-16', value: 333, rank: 3 }
    ]
  },
  {
    name: 'application 4',
    datas: [
      { date: '2021-12-11', value: 444, rank: 4 },
      { date: '2021-12-12', value: 555, rank: 5 },
      { date: '2021-12-13', value: 666, rank: 1 },
      { date: '2021-12-14', value: 777, rank: 2 },
      { date: '2021-12-15', value: 888, rank: 3 },
      { date: '2021-12-16', value: 999, rank: 4 }
    ]
  }
]

export const testData = _data.map((d,ind) => ({
  id: d.name,
  data: d.datas.map(_ => ({x: _.date, y: _.rank, value: _.value}))
}))

// export const testData = new Array(10).fill(1).map((_, ind) => ({
//   id: "Application " + ind,
//   test: 'test',
//   data: new Array(5).fill(1).map((__, _ind) => ({
//     x: _ind,
//     y: getRandomInt()
//   }))
// }))

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