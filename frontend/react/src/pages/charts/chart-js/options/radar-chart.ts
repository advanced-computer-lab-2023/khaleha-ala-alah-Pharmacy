import chartColors from './chart-colors';

const radarChartLabels = [
  'Eating',
  'Drinking',
  'Sleeping',
  'Designing',
  'Coding',
  'Cycling',
  'Running'
];

const radarChartData = [
  { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
  { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
];
const radarChartType = 'radar';

const radarDatasets = radarChartData.map((item, i) => ({ ...item, ...chartColors[i] }));

export default {
  data: {
    datasets: radarDatasets,
    labels: radarChartLabels,
    type: radarChartType
  }
};
