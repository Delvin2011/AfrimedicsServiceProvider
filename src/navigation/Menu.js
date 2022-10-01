import React from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";
import Images from "../constants/Images";
import DrawerItem from "../components/DrawerItem";
import Icon from "../components/Icon";
//import nowTheme from '../constants/Theme';
import { signOut } from "../redux/user/user-actions";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../redux/user/user-selectors";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("screen");

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  currentUser,
  signOut,
  ...rest
}) {
  //const insets = useSafeArea();
  const screens = [
    "Home",
    "Analytics",
    "Account",
    "MedicalRecords",
  ];
  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block style={styles.header}>
        <Image style={styles.logo} source={Images.Logo} />
        <Block right style={styles.headerIcon}>
          <Ionicons
            name="ios-menu"
            color="rgba(255, 255, 255, .9)"
            size={18}
            style={{ backgroundColor: "transparent" }}
          />
        </Block>
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerItem
                title={item}
                key={index}
                navigation={navigation}
              /> //focused={state.index === index ? true : false}
            );
          })}
          <Block
            flex
            style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}
          >
            <Block
              style={{
                borderColor: "white",
                width: "93%",
                borderWidth: StyleSheet.hairlineWidth,
                marginHorizontal: 10,
              }}
            />
            {currentUser
              ? (
                <TouchableOpacity
                  style={{ height: 60 }}
                  onPress={() => {
                    signOut();
                    navigation.navigate("Onboarding");
                  }}
                >
                  <Block flex row style={styles.defaultStyle}>
                    <Block middle flex={0.1} style={{ marginRight: 5 }}>
                      <Ionicons
                        name="ios-arrow-undo-sharp"
                        color="rgba(255, 255, 255, .9)"
                        size={18}
                        style={{ backgroundColor: "transparent" }}
                      />
                    </Block>
                    <Block row center flex={0.9}>
                      <Text
                        style={{
                          fontFamily: "montserrat-regular",
                          textTransform: "uppercase",
                          fontWeight: "300",
                        }}
                        size={12}
                        bold={false}
                        color={"white"}
                      >
                        LOGOUT
                      </Text>
                    </Block>
                  </Block>
                </TouchableOpacity>
              )
              : null}
          </Block>
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    color: "white",
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: "center",
  },
  headerIcon: {
    marginTop: -20,
  },
  logo: {
    height: 40,
    width: 37,
  },
});

//export default CustomDrawerContent;

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomDrawerContent);
