export const line2Options = {
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
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'line',
      symbol: 'triangle',
      symbolSize: 20,
      lineStyle: {
        color: '#64B5F6',
        width: 4,
        type: 'dashed'
      },
      itemStyle: {
        borderWidth: 2,
        borderColor: '#336cfb',
        color: '#64B5F6'
      }
    }
  ]
};
