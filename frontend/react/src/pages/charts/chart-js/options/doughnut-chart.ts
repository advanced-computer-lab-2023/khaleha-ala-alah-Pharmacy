const doughnutChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
const doughnutChartData = [350, 450, 100];
const doughnutChartType = 'doughnut';

export default {
  data: {
    labels: doughnutChartLabels,
    type: doughnutChartType,
    datasets: [
      {
        data: doughnutChartData,
        backgroundColor: ['#805aff', '#fc8b37', '#2fa7ff'],
        borderColor: ['#805aff', '#fc8b37', '#2fa7ff']
      }
    ]
  }
};
