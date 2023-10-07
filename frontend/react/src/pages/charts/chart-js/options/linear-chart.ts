import chartColors from './chart-colors';

const linearData = [
  { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
];

const lineLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const linearDataSets = () =>
  linearData.map((item, i) => ({ ...item, ...chartColors[i % chartColors.length] }));

export default {
  data: {
    datasets: linearDataSets(),
    labels: lineLabels
  }
};
