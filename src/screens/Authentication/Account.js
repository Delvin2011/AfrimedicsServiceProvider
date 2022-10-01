import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Block, Text, theme, View, Button as GaButton } from "galio-framework";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectTabOptionChange,
} from "../../redux/user/user-selectors";
import AccountInfoCard from "../../components/Cards/AccountInfoCard";

const { width, height } = Dimensions.get("screen");

const Account = (props) => {
  const { navigation, currentUser, tabOption } = props;

  const entries = Object.entries(currentUser);
  var buttonsListArr = [];
  const handleRegionChange = () => {
    for (var x = 0; x < entries.length; x++) {
      if (typeof tabOption !== "undefined") {
        if (tabOption.tabOption.toString().toLowerCase() == entries[x][0]) {
          const category = entries[x][1];
          for (var y = 0; y < category.length; y++) {
            buttonsListArr.push(
              <Text
                size={16}
                muted
                key={y}
                style={{
                  textAlign: "left",
                  fontFamily: "montserrat-regular",
                  zIndex: 2,
                  lineHeight: 35,
                  color: "#9A9A9A",
                  paddingHorizontal: 15,
                }}
              >
                {`\u2022`}
                {category[y]}
              </Text>,
            );
          }
        }
      }
    }
    return buttonsListArr;
  };

  return (
    <>
      {currentUser
        ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30, width }}
          >
            <Block style={styles.container}>
              {/*typeof tabOption !== "undefined"
                ? (
                  tabOption.tabOption.toString().toLowerCase() == "bio" &&
                  currentUser
                    ? (
                      <AccountInfoCard />
                    )
                    : null
                )
                : null*/}
            </Block>
            <Block flex style={{ marginTop: 50 }} left>
              {currentUser ? handleRegionChange() : null}
            </Block>
          </ScrollView>
        )
        : (
          <Text>Loading...</Text>
        )}
    </>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    width,
    height,
    padding: 0,
    zIndex: 1,
  },
  container: {
    paddingHorizontal: theme.SIZES.BASE,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  tabOption: selectTabOptionChange,
});

export default connect(mapStateToProps, null)(Account);
