// Mock data object used for LineChart and BarChart

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [10, 7, 2, 13, 19, 5],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
    },
    {
      data: [4, 10, 18, 15, 7, 1],
      color: (opacity = 1) => `rgba(234, 3, 144, ${opacity})`, // optional
    },
    {
      data: [13, 9, 17, 8, 5, 14],
    },
  ],
  legend: ['Physical', 'Virtual', 'Home Visits'], // optional
};

// Mock data object used for Contribution Graph

const contributionData = [
  {date: '2016-01-02', count: 1},
  {date: '2016-01-03', count: 2},
  {date: '2016-01-04', count: 3},
  {date: '2016-01-05', count: 4},
  {date: '2016-01-06', count: 5},
  {date: '2016-01-30', count: 2},
  {date: '2016-01-31', count: 3},
  {date: '2016-03-01', count: 2},
  {date: '2016-04-02', count: 4},
  {date: '2016-03-05', count: 2},
  {date: '2016-02-30', count: 4},
];

// Mock data object for Pie Chart

const pieChartData = [
  {
    name: 'Physical',
    population: 21500000,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Virtual',
    population: 2800000,
    color: '#F00',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Home Visits',
    population: 527612,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  /*{
    name: 'New York',
    population: 8538000,
    color: '#ffffff',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },*/
];

// Mock data object for Progress

const progressChartData = {
  data: [0.2, 0.5, 0.3],
  labels: ['Complete', 'Overdue', 'Pending'],
  color: ['rgba(131, 167, 234, 1)', '#F00', 'rgb(0, 0, 255)'],
};

export {data, contributionData, pieChartData, progressChartData};
