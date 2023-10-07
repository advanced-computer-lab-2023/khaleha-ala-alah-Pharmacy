const incomeInMonth = {
  color: ['#ed5564'],
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
      data: [95, 124, 132, 143, 138, 178, 194, 211, 234, 257, 241, 226],
      areaStyle: {}
    }
  ]
};
const incomeInWeek = {
  color: ['#64B5F6'],
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
      data: [94, 111, 90, 85, 70, 83, 94, 109, 89, 74, 83, 78],
      areaStyle: {}
    }
  ]
};

export { incomeInMonth, incomeInWeek };
