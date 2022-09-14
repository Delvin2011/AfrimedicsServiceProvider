import React from 'react';
import {withNavigation} from '@react-navigation/compat';
import {
  ScrollView,
  StatusBar,
  Dimensions,
  Text,
  StyleSheet,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from 'react-native-chart-kit';
import {
  data,
  contributionData,
  pieChartData,
  progressChartData,
} from '../../constants/data';
//redux
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectAppointmentRecords} from '../../redux/user/user-selectors';

// in Expo - swipe left to see the following styling, or create your own
const chartConfigs = [
  {
    backgroundColor: '#022173',
    backgroundGradientFrom: '#022173',
    backgroundGradientTo: '#1b3fa0',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    decimalPlaces: 0,
  },
];

class Statistics extends React.Component {
  renderTabBar() {
    return <StatusBar hidden />;
  }

  getStartMonth(numOfMonths, date = new Date()) {
    date.setMonth(date.getMonth() - numOfMonths);
    return date.getMonth();
  }

  getEndMonth(date = new Date()) {
    return date.getMonth();
  }

  createPieChartObj = obj => {
    const pieChartData = [];
    var legend = ['Physical', 'Virtual', 'Home Visits'];
    var color = ['rgba(131, 167, 234, 1)', '#F00', 'rgb(0, 0, 255)'];

    for (var a = 0; a < legend.length; a++) {
      var b = obj.datasets[a].data;
      var pieData = {};
      var sum = b.reduce(function (b, c) {
        return b + c;
      }, 0);
      pieData.name = legend[a];
      pieData.population = sum;
      pieData.color = color[a];
      pieData.legendFontColor = '#7F7F7F';
      pieData.legendFontSize = 15;
      pieChartData.push(pieData);
    }

    return pieChartData;
  };

  createObject = (appointmentRecords, startMonth, endMonth) => {
    var obj = {};
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var labels = [];
    var legend = ['Physical', 'Virtual', 'Home Visit'];
    var datasets = [];
    for (var a = 0; a < months.length; a++) {
      if (a >= startMonth && endMonth >= a) {
        labels.push(months[a]);
      }
    }

    for (var a = 0; a < legend.length; a++) {
      var data = [];
      var dataObj = {};
      for (var b = 0; b < labels.length; b++) {
        var count = 0;
        for (var c = 0; c < appointmentRecords.length; c++) {
          var date = new Date(appointmentRecords[c].DateTime);
          var month = date.getMonth();
          if (
            legend[a] == appointmentRecords[c].AppointmentType &&
            labels[b] == months[month]
          ) {
            count++;
          }
        }
        data.push(count);
      }
      if (a == 1) {
        dataObj.color = (opacity = 1) => `rgba(134, 65, 244, ${opacity})`;
      } else if (a == 2) {
        dataObj.color = (opacity = 1) => `rgba(234, 3, 144, ${opacity})`;
      }
      dataObj.data = data;
      datasets[a] = dataObj;
      //datasets[a].color = data;
    }

    obj.legend = legend;
    obj.labels = labels;
    obj.datasets = datasets;
    return obj;
  };

  createDistObj = appointmentRecords => {
    var legend = ['Completed', 'Overdue', 'Pending'];
    var color = ['rgba(131, 167, 234, 1)', '#F00', 'rgb(0, 0, 255)'];
    const pieChartData = [];
    for (var a = 0; a < legend.length; a++) {
      var count = 0;
      var pieDistData = {};
      for (var b = 0; b < appointmentRecords.length; b++) {
        var appointmentDate = new Date(appointmentRecords[b].DateTime);
        if (
          legend[a] == 'Completed' &&
          appointmentRecords[b].Status == 'Completed'
        ) {
          count++;
        }
        if (
          legend[a] == 'Overdue' &&
          appointmentRecords[b].Status == 'Pending' &&
          Date.now() > appointmentDate
        ) {
          count++;
        }
        if (
          legend[a] == 'Pending' &&
          appointmentRecords[b].Status == 'Pending' &&
          Date.now() < appointmentDate
        ) {
          count++;
        }
      }
      pieDistData.name = legend[a];
      pieDistData.population = count;
      pieDistData.color = color[a];
      pieDistData.legendFontColor = '#7F7F7F';
      pieDistData.legendFontSize = 15;
      pieChartData.push(pieDistData);
    }

    return pieChartData;
  };

  render() {
    const width = Dimensions.get('window').width;
    const height = 220;
    const {appointmentRecords} = this.props;

    const startMonth = this.getStartMonth(4);
    const endMonth = this.getEndMonth();
    const lineGraphObj = this.createObject(
      appointmentRecords,
      startMonth,
      endMonth,
    );
    const pieChartObj = this.createPieChartObj(lineGraphObj);

    const pieDistObj = this.createDistObj(appointmentRecords);

    return (
      <ScrollableTabView renderTabBar={this.renderTabBar}>
        {appointmentRecords !== null ? (
          chartConfigs.map(chartConfig => {
            const labelStyle = {
              color: chartConfig.color(),
              marginVertical: 10,
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '900',
              paddingHorizontal: 9,
              paddingTop: 2,
              paddingBottom: 2,
            };
            const graphStyle = {
              marginVertical: 8,
              ...chartConfig.style,
            };
            return (
              <ScrollView
                key={Math.random()}
                style={{
                  backgroundColor: chartConfig.backgroundColor,
                }}>
                <Text style={labelStyle}>Appointments</Text>
                <LineChart
                  data={lineGraphObj}
                  width={width}
                  height={height}
                  chartConfig={chartConfig}
                  bezier
                  style={graphStyle}
                />
                <Text style={labelStyle}>Appointments Distribution</Text>
                <PieChart
                  data={pieChartObj}
                  height={height}
                  width={width}
                  chartConfig={chartConfig}
                  accessor="population"
                  style={graphStyle}
                />
                <Text style={labelStyle}>Appointments Status</Text>
                <PieChart
                  data={pieDistObj}
                  height={height}
                  width={width}
                  chartConfig={chartConfig}
                  accessor="population"
                  style={graphStyle}
                  bezier
                />
              </ScrollView>
            );
          })
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollableTabView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  appointmentRecords: selectAppointmentRecords,
});

export default connect(mapStateToProps, null)(Statistics);
//export default Statistics;
