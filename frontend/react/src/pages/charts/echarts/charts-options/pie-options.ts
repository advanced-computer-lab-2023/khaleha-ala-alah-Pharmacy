export const pieOptions = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  grid: {
    left: 0,
    right: 0,
    bottom: 0,
    containLabel: true
  },
  series: [
    {
      name: 'Counters',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: [
        { value: 335, name: 'C-1' },
        { value: 310, name: 'C-2' },
        { value: 274, name: 'C-3' },
        { value: 235, name: 'C-4' },
        { value: 400, name: 'C-5' }
      ].sort(function (a, b) {
        return a.value - b.value;
      }),
      roseType: 'radius',
      label: {
        color: 'rgba(0, 0, 0, 0.3)'
      },
      labelLine: {
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.3)'
        },
        smooth: 0.2,
        length: 10,
        length2: 20
      },
      itemStyle: {
        color: '#c23531',
        shadowBlur: 200,
        shadowColor: 'rgba(0,0,0,0.05)'
      },
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    }
  ]
};
