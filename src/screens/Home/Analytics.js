import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import ReviewCard from "../../components/Cards/ReviewCard";
import { Block, Text, Button as GaButton, theme } from "galio-framework";
import { useIsFocused } from "@react-navigation/native";
// Now UI themed components
import Statistics from "./Statistics";
import Earnings from "./Earnings";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectAppointmentRecords,
  selectCurrentUser,
  selectTabOptionChange,
} from "../../redux/user/user-selectors";
import { fetchMedicalAppointments } from "../../redux/user/user-actions";
import styles from "../../styles/Styles";
const { width } = Dimensions.get("screen");

function Analytics(props) {
  const isFocused = useIsFocused();
  const { navigation, appointmentRecords, tabOption, currentUser } = props;
  useEffect(() => {
    (async () => {
      const { fetchMedicalAppointments, currentUser } = props;
      fetchMedicalAppointments(currentUser.practiceNumber);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const { fetchMedicalAppointments, currentUser } = props;
      fetchMedicalAppointments(currentUser.practiceNumber);
    })();
  }, [isFocused]);

  const renderStatistics = () => {
    return (
      <>
        <Statistics />
      </>
    );
  };

  const renderTabBar = () => {
    return <StatusBar hidden={true} />;
  };

  const renderReviews = () => {
    return (
      <ScrollView
        renderTabBar={renderTabBar}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30, width }}
      >
        {appointmentRecords == null
          ? (
            <View
              style={[
                styles.activityIndicatorContainer,
                styles.activityIndicatorHorizontal,
              ]}
            >
              <ActivityIndicator size="large" />
            </View>
          )
          : (
            appointmentRecords
              .filter((item) =>
                item.VisitationStatus.toString().toLowerCase() == "completed"
              )
              .map((filteredItem, index) => {
                return (
                  <ReviewCard
                    key={index}
                    item={filteredItem}
                    horizontal
                    //titleStyle={styles.title}
                    imageStyle={{ height: "100%", width: "100%" }}
                  />
                );
              })
          )}
      </ScrollView>
    );
  };

  const renderEarnings = () => {
    return (
      <>
        <Earnings />
      </>
    );
  };

  return (
    <>
      {tabOption
        ? tabOption.tabOption.toString().toLowerCase() == "statistics"
          ? renderStatistics()
          : tabOption.tabOption.toString().toLowerCase() == "reviews"
          ? renderReviews()
          : renderEarnings()
        : null}
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchMedicalAppointments: (practiceNumber) =>
    dispatch(fetchMedicalAppointments(practiceNumber)),
});

const mapStateToProps = createStructuredSelector({
  appointmentRecords: selectAppointmentRecords,
  currentUser: selectCurrentUser,
  tabOption: selectTabOptionChange,
});

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
