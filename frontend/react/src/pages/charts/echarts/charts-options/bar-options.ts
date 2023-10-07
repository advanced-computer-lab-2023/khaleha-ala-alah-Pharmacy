export const barFactoryOptions = () => {
  const barXAxisData = [];
  const barData1 = [];
  const barData2 = [];

  for (let i = 0; i < 100; i++) {
    barXAxisData.push('Prod. ' + i);
    barData1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
    barData2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
  }

  return {
    color: ['#e9e165', '#ed5564'],
    legend: {
      data: ['USA', 'UK'],
      align: 'left'
    },
    tooltip: {},
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      containLabel: true
    },
    xAxis: {
      data: barXAxisData,
      silent: false,
      splitLine: {
        show: false
      }
    },
    yAxis: {},
    series: [
      {
        name: 'USA',
        type: 'bar',
        data: barData1,
        animationDelay: function (idx) {
          return idx * 10;
        }
      },
      {
        name: 'UK',
        type: 'bar',
        data: barData2,
        animationDelay: function (idx) {
          return idx * 10 + 100;
        }
      }
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
      return idx * 5;
    }
  };
};
