import React, { Component } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  Block,
  Checkbox,
  Text,
  Button as GaButton,
  theme,
} from "galio-framework";

import Icon from "../../components/Icon";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Images, nowTheme } from "../../constants";

import { emailLogInStart, signOut } from "../../redux/user/user-actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectCurrentUserLoginError,
} from "../../redux/user/user-selectors";

import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const { width, height } = Dimensions.get("screen");

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      spinner: false,
      isLoggedIn: false,
      error: "",
    };
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin = async () => {
    const { email, password } = this.state;
    const { emailLogInStart } = this.props;
    this.setState({ isShowError: false, spinner: true });
    emailLogInStart(email, password);
    this.setState({
      email: "",
      password: "",
    });
  };

  signInWithGoogleAsync = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      await auth()
        .signInWithCredential(googleCredential)
        .catch((error) => {
          console.log("Something went wrong with sign up: ", error);
        });
    } catch (error) {
      console.log({ error });
    }
  };

  render() {
    const { navigation, error, currentUser, signOut } = this.props;
    const { isShowError, spinner, isLoggedIn } = this.state;

    return (
      <DismissKeyboard>
        <Block flex middle>
          <Block flex>
            <Block style={styles.registerContainer}>
              <Block flex space="evenly" style={{ marginTop: 20 }}>
                <Block flex={0.4} middle style={styles.socialConnect}>
                  <Block flex={0.5} middle>
                    <Text
                      style={{
                        fontFamily: "montserrat-regular",
                        textAlign: "center",
                      }}
                      color="#333"
                      size={24}
                    >
                    </Text>
                  </Block>

                  <Block
                    flex={0.5}
                    row
                    middle
                    space="between"
                    style={{ marginBottom: 20 }}
                  >
                    <GaButton
                      round
                      onlyIcon
                      shadowless
                      icon="twitter"
                      iconFamily="Font-Awesome"
                      iconColor={theme.COLORS.WHITE}
                      iconSize={theme.SIZES.BASE * 1.625}
                      color={nowTheme.COLORS.TWITTER}
                      style={[styles.social, styles.shadow]}
                    />

                    <GaButton
                      round
                      onlyIcon
                      shadowless
                      icon="google"
                      iconFamily="Font-Awesome"
                      iconColor={theme.COLORS.WHITE}
                      iconSize={theme.SIZES.BASE * 1.625}
                      color={nowTheme.COLORS.DRIBBBLE}
                      style={[styles.social, styles.shadow]}
                      onPress={() => {
                        if (!currentUser) this.signInWithGoogleAsync();
                      }}
                    />
                    <GaButton
                      round
                      onlyIcon
                      shadowless
                      icon="facebook"
                      iconFamily="Font-Awesome"
                      iconColor={theme.COLORS.WHITE}
                      iconSize={theme.SIZES.BASE * 1.625}
                      color={nowTheme.COLORS.FACEBOOK}
                      style={[styles.social, styles.shadow]}
                    />
                  </Block>
                </Block>
                <Block flex={0.1} middle style={{ marginBottom: 20 }}>
                  <Text
                    style={{
                      fontFamily: "montserrat-regular",
                      textAlign: "center",
                    }}
                    muted
                    size={16}
                  >
                    or be classical
                  </Text>
                </Block>
                <Block center flex={0.9}>
                  <Block flex space="between">
                    <Block>
                      <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                        <Input
                          placeholder="Email"
                          style={styles.inputs}
                          name="email"
                          value={this.state.email}
                          iconContent={<Icon
                            size={16}
                            color="#ADB5BD"
                            name="email-852x"
                            family="NowExtra"
                            style={styles.inputIcons}
                          />}
                          onChangeText={(email) => this.setState({ email })}
                        />
                      </Block>
                      <Block width={width * 0.8}>
                        <Input
                          placeholder="Password"
                          name="Password"
                          password
                          viewPass
                          style={styles.inputs}
                          iconContent={<Icon
                            size={16}
                            color="#ADB5BD"
                            name="profile-circle"
                            family="NowExtra"
                            style={styles.inputIcons}
                          />}
                          onChangeText={(password) =>
                            this.setState({ password })}
                        />
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
              <Block center>
                {spinner && !currentUser
                  ? (
                    error
                      ? (
                        <Block flex={0.1} middle>
                          {error.code == "auth/wrong-password"
                            ? (
                              <Text
                                style={{
                                  fontFamily: "montserrat-regular",
                                  textAlign: "center",
                                  color: "#ff0000",
                                }}
                                size={12}
                              >
                                Wrong credentials.
                              </Text>
                            )
                            : error.code == '"auth/user-not-found'
                            ? (
                              <Text
                                style={{
                                  fontFamily: "montserrat-regular",
                                  textAlign: "center",
                                  color: "#ff0000",
                                }}
                                size={12}
                              >
                                Account not found.
                              </Text>
                            )
                            : null}
                          <Block center>
                            <Button
                              color="warning"
                              style={styles.createButton}
                              onPress={() => this.onLogin()}
                            >
                              <Text
                                style={{ fontFamily: "montserrat-bold" }}
                                size={14}
                                color={nowTheme.COLORS.WHITE}
                              >
                                Error : Re-Submit
                              </Text>
                            </Button>
                          </Block>
                        </Block>
                      )
                      : (
                        <Block center>
                          <Button color="info" style={styles.createButton}>
                            <Text
                              style={{ fontFamily: "montserrat-bold" }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Loading...
                            </Text>
                          </Button>
                        </Block>
                      )
                  )
                  : currentUser
                  ? (
                    <Block center>
                      <Button
                        color="success"
                        style={styles.createButton}
                        onPress={() => navigation.navigate("App")}
                      >
                        <Text
                          style={{ fontFamily: "montserrat-bold" }}
                          size={14}
                          color={nowTheme.COLORS.WHITE}
                        >
                          Logged In : Proceed!!
                        </Text>
                      </Button>
                    </Block>
                  )
                  : (
                    <Block center>
                      <Button
                        color="primary"
                        style={styles.createButton}
                        onPress={() => this.onLogin()}
                      >
                        <Text
                          style={{ fontFamily: "montserrat-bold" }}
                          size={14}
                          color={nowTheme.COLORS.WHITE}
                        >
                          Login
                        </Text>
                      </Button>
                    </Block>
                  )}
                {currentUser ? null : (
                  <Button
                    color="primary"
                    style={styles.createButton}
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text
                      style={{ fontFamily: "montserrat-bold" }}
                      size={14}
                      color={nowTheme.COLORS.WHITE}
                    >
                      Register
                    </Text>
                  </Button>
                )}
              </Block>
            </Block>
          </Block>
        </Block>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    marginTop: 20,
    width: width * 0.9,
    height: height * 0.45,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputs: {
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 21.5,
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15,
  },
  createButtonOptions: {
    width: width * 0.35,
    marginTop: 25,
    marginBottom: 40,
  },
  createButton: {
    width: width * 0.5,
    //marginTop: 25,
    //marginBottom: 40,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center",
    marginHorizontal: 10,
  },
});

const mapDispatchToProps = (dispatch) => ({
  emailLogInStart: (email, password) =>
    dispatch(emailLogInStart({ email, password })),
  signOut: () => dispatch(signOut()),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  error: selectCurrentUserLoginError,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
