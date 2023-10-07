const barChartOptions = {
  scaleShowVerticalLines: false,
  responsive: true
};

const barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
const barChartType = 'bar';

const barChartData = [
  { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
];

const barChartColors = [
  {
    backgroundColor: '#fc8b37',
    borderColor: '#fc8b37',
    pointBackgroundColor: '#fc8b37',
    pointBorderColor: '#fc8b37',
    pointHoverBackgroundColor: '#fc8b37',
    pointHoverBorderColor: '#fc8b37'
  },
  {
    backgroundColor: '#7cdb86',
    borderColor: '#7cdb86',
    pointBackgroundColor: '#7cdb86',
    pointBorderColor: '#7cdb86',
    pointHoverBackgroundColor: '#7cdb86',
    pointHoverBorderColor: '#7cdb86'
  }
];

const barDatasets = () => barChartData.map((item, i) => ({ ...item, ...barChartColors[i] }));

export default {
  data: {
    labels: barChartLabels,
    datasets: barDatasets(),
    type: barChartType
  },
  options: barChartOptions
};
