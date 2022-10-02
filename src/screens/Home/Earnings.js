import React from "react";
import {
  ScrollView,
  StatusBar,
  Dimensions,
  Text,
  StyleSheet,
} from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import {
  //data,
  contributionData,
  pieChartData,
  progressChartData,
} from "../../constants/data";

//redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAppointmentRecords } from "../../redux/user/user-selectors";

//import 'babel-polyfill';
const { width, height } = Dimensions.get("screen");
// in Expo - swipe left to see the following styling, or create your own
const chartConfigs = [
  {
    backgroundColor: "#022173",
    backgroundGradientFrom: "#022173",
    backgroundGradientTo: "#1b3fa0",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    decimalPlaces: 0,
  },
];
const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  legend: ["Physical", "Virtual", "Home Visits"],
  data: [
    [60, 60, 60],
    [30, 40, 56],
    [23, 47, 88],
    [14, 38, 56],
    [60, 20, 89],
  ],
  barColors: ["#91a0ba", "#62789d", "#45546e"],
};

class Earnings extends React.Component {
  renderTabBar() {
    return <StatusBar hidden />;
  }

  getStartMonth(numOfMonths, date = new Date()) {
    date.setMonth(date.getMonth() - numOfMonths);
    return date.getMonth();
  }

  getEndMonth(date = new Date()) {
    return date.getMonth() + 1;
  }

  createObject = (appointmentRecords, startMonth, endMonth) => {
    var obj = {};
    obj.earnings = false;
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var labels = [];
    var legend = ["Physical", "Virtual", "Home Visit"];
    var datasets = [];
    var colours = ["#91a0ba", "#62789d", "#45546e"];
    for (var a = 0; a < months.length; a++) {
      if (a >= startMonth && endMonth >= a) {
        labels.push(months[a]);
      }
    }
    var data = [];
    for (var b = 0; b < labels.length; b++) {
      var dataArr = [];
      var fee = 0;
      for (var a = 0; a < legend.length; a++) {
        var count = 0;
        for (var c = 0; c < appointmentRecords.length; c++) {
          var date = new Date(appointmentRecords[c].DateTime);
          var month = date.getMonth();
          fee = appointmentRecords[c].AppointmentType == "Physical"
            ? 35
            : appointmentRecords[c].AppointmentType == "Virtual"
            ? 25
            : 50;
          if (
            legend[a] == appointmentRecords[c].AppointmentType &&
            labels[b] == months[month] &&
            appointmentRecords[c].VisitationStatus == "Completed"
          ) {
            obj.earnings = true;
            count++;
            console.log(count);
          }
        }
        dataArr.push(count * fee);
      }
      data.push(dataArr);
    }
    obj.legend = legend;
    obj.labels = labels;
    obj.data = data;
    obj.barColors = colours;
    console.log(obj);
    return obj;
  };

  createDistObj = (appointmentRecords) => {
    var legend = ["Physical", "Virtual", "Home Visit"];
    var color = ["rgba(131, 167, 234, 1)", "#F00", "rgb(0, 0, 255)"];
    const pieChartData = [];
    for (var a = 0; a < legend.length; a++) {
      var count = 0;
      var pieDistData = {};
      for (var b = 0; b < appointmentRecords.length; b++) {
        if (
          legend[a] == appointmentRecords[b].AppointmentType &&
          appointmentRecords[b].VisitationStatus == "Completed"
        ) {
          count++;
        }
      }
      pieDistData.name = legend[a];
      pieDistData.population = count;
      pieDistData.color = color[a];
      pieDistData.legendFontColor = "#7F7F7F";
      pieDistData.legendFontSize = 15;
      pieChartData.push(pieDistData);
    }

    return pieChartData;
  };

  render() {
    const width = Dimensions.get("window").width;
    const height = 220;
    const { appointmentRecords } = this.props;
    const startMonth = this.getStartMonth(4);
    const endMonth = this.getEndMonth();
    const stackedBarObj = this.createObject(
      appointmentRecords,
      startMonth,
      endMonth,
    );
    const pieDistObj = this.createDistObj(appointmentRecords);

    return (
      <ScrollableTabView renderTabBar={this.renderTabBar}>
        {chartConfigs.map((chartConfig) => {
          const labelStyle = {
            color: chartConfig.color(),
            marginVertical: 10,
            textAlign: "center",
            fontSize: 16,
            fontWeight: "900",
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
              }}
            >
              {stackedBarObj.earnings
                ? <>
                  <Text style={labelStyle}>Appointments Earnings</Text>
                  <StackedBarChart
                    style={graphStyle}
                    data={stackedBarObj}
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
                </>
                : <Text style={labelStyle}>
                  No Earnings in the last 5 months
                </Text>}
            </ScrollView>
          );
        })}
      </ScrollableTabView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  appointmentRecords: selectAppointmentRecords,
});

export default connect(mapStateToProps, null)(Earnings);
