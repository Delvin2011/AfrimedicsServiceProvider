import React from 'react';
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
  StackedBarChart,
} from 'react-native-chart-kit';
import {
  //data,
  contributionData,
  pieChartData,
  progressChartData,
} from '../../constants/data';
//import 'babel-polyfill';
const {width, height} = Dimensions.get('screen');
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
const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  legend: ['Physical', 'Virtual', 'Home Visits'],
  data: [
    [60, 60, 60],
    [30, 40, 56],
    [23, 47, 88],
    [14, 38, 56],
    [60, 20, 89],
  ],
  barColors: ['#91a0ba', '#62789d', '#45546e'],
};

export default class Earnings extends React.Component {
  renderTabBar() {
    return <StatusBar hidden />;
  }
  render() {
    const width = Dimensions.get('window').width;
    const height = 220;
    return (
      <ScrollableTabView renderTabBar={this.renderTabBar}>
        {chartConfigs.map(chartConfig => {
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
              <Text style={labelStyle}>Appointments Earnings</Text>
              <StackedBarChart
                style={graphStyle}
                data={data}
                width={width}
                height={220}
                chartConfig={chartConfig}
                yAxisLabel="$"
                decimalPlaces={0}
              />
              <Text style={labelStyle}>Earnings Distribution</Text>
              <PieChart
                data={pieChartData}
                height={height}
                width={width}
                chartConfig={chartConfig}
                accessor="population"
                style={graphStyle}
              />
            </ScrollView>
          );
        })}
      </ScrollableTabView>
    );
  }
}
