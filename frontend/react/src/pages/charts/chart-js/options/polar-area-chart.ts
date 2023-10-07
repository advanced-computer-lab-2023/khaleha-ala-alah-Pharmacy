const polarAreaData = [300, 500, 100, 120];
const polarAreaLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Corporate Sales'];
const polarAreaColors = {
  backgroundColor: ['#f741b5', '#2fa7ff', '#7cdb86', '#fc8b37'],
  borderColor: ['#f741b5', '#2fa7ff', '#7cdb86', '#fc8b37']
};

const polarDatasets = [
  {
    data: polarAreaData,
    ...polarAreaColors
  }
];

export default {
  data: {
    datasets: polarDatasets,
    labels: polarAreaLabels
  }
};
