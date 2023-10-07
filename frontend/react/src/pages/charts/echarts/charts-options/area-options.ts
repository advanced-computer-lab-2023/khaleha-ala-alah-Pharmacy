export const areaOptions = {
  color: ['#b7ce63', '#e9e165', '#64B5F6', '#ed5564', '#336cfb'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: ['X-1', 'X-2', 'X-3', 'X-4', 'X-5']
  },
  grid: {
    left: 0,
    right: 0,
    bottom: 0,
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'X-1',
      type: 'line',
      stack: 'counts',
      areaStyle: {},
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'X-2',
      type: 'line',
      stack: 'counts',
      areaStyle: {},
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'X-3',
      type: 'line',
      stack: 'counts',
      areaStyle: {},
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'X-4',
      type: 'line',
      stack: 'counts',
      areaStyle: {},
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'X-5',
      type: 'line',
      stack: 'counts',
      label: {
        show: true,
        position: 'top'
      },
      areaStyle: {},
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};
