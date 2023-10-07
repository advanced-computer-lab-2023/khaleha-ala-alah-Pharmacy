export const chartOptions = {
  color: ['#336cfb'],
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  xAxis: {
    boundaryGap: false,
    type: 'category'
  },
  yAxis: {
    show: false
  },
  series: [
    {
      name: 'patients 2019',
      type: 'line',
      smooth: true,
      data: [60, 124, 132, 143, 138, 178, 194, 211, 234, 257, 241, 226],
      areaStyle: {}
    }
  ]
};
