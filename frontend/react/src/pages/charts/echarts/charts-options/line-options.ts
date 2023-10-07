export const lineOptions = {
  grid: {
    left: 0,
    right: 0,
    bottom: 0,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [350, 933, 1184, 857, 1167, 1330, 1035],
      type: 'line',
      lineStyle: {
        color: '#ed5564'
      }
    }
  ]
};
