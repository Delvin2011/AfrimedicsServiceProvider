import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import AppointmentCard from "../components/Cards/AppointmentCard";
import { Block, Text, Button as GaButton, theme } from "galio-framework";
import { useIsFocused } from "@react-navigation/native";
// Now UI themed components
import { nowTheme } from "../constants";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectAppointmentRecords,
  selectCurrentUser,
  selectTabOptionChange,
} from "../redux/user/user-selectors";
import { fetchMedicalAppointments } from "../redux/user/user-actions";

const { width } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

function AppointmentsRecords(props) {
  const isFocused = useIsFocused();
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

  const renderAppointmentRecords = () => {
    const { navigation, appointmentRecords, tabOption } = props;
    return (
      <Block>
        <Block style={styles.container}>
          {appointmentRecords == null
            ? (
              <Text>Loading...</Text>
            )
            : (
              appointmentRecords
                .filter(
                  (item) =>
                    item.AppointmentType.toString().toLowerCase() ==
                      tabOption.tabOption,
                )
                .map((filteredItem, index) => {
                  return (
                    <AppointmentCard
                      key={index}
                      item={filteredItem}
                      horizontal
                      titleStyle={styles.title}
                      imageStyle={{ height: "100%", width: "100%" }}
                    />
                  );
                })
            )}
        </Block>
      </Block>
    );
  };

  return (
    <Block flex center>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30, width }}
      >
        {renderAppointmentRecords()}
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SIZES.BASE,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  title: {
    fontFamily: "montserrat-bold",
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER,
  },
  productTitle: {
    color: nowTheme.COLORS.PRIMARY,
    textAlign: "center",
    fontFamily: "montserrat-bold",
    fontSize: 18,
  },
  notify: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: "absolute",
    top: 8,
    right: 50,
  },
  addButton: {
    padding: 12,
    position: "relative",
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center",
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
  },
  addButton: {
    padding: 12,
    position: "absolute",

    top: 0,
    left: 10,
  },
  notify: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    borderRadius: 10,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: "absolute",
    top: 0,
    left: 0,
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4,
    marginHorizontal: 10,
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  productTitle: {
    color: nowTheme.COLORS.PRIMARY,
    textAlign: "center",
    fontFamily: "montserrat-bold",
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  imageContainer: {
    marginBottom: 30,
    borderRadius: 3,
    elevation: 1,
    overflow: "hidden",
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 150,
    width: "auto",
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  shadow: {
    shadowColor: "#8898AA",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

const mapDispatchToProps = (dispatch) => ({
  fetchMedicalAppointments: (practiceNumber) =>
    dispatch(fetchMedicalAppointments(practiceNumber)),
});

const mapStateToProps = createStructuredSelector({
  appointmentRecords: selectAppointmentRecords,
  currentUser: selectCurrentUser,
  tabOption: selectTabOptionChange,
});

//export default withNavigation(Header);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppointmentsRecords);
