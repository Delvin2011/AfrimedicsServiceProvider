import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';

import {
  Block,
  Checkbox,
  Text,
  Button as GaButton,
  theme,
} from 'galio-framework';

import Icon from '../../components/Icon';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {nowTheme} from '../../constants';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {createUserProfileDocument} from '../../firebase/firebase-utils';

const {width, height} = Dimensions.get('screen');
const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      isShowError: false,
      errorMessage: '',
      spinner: false,
      isRegistered: false,
      error: '',
    };
    this.onRegister = this.onRegister.bind(this);
  }

  onRegister = async () => {
    const {displayName, email, password, confirmPassword} = this.state;

    if (
      displayName == '' ||
      email == '' ||
      password == '' ||
      confirmPassword == ''
    ) {
      this.setState({isShowError: true, errorMessage: 'Complete the form!!!'});
    } else if (password != confirmPassword) {
      this.setState({
        isShowError: true,
        errorMessage: "Passwords don't match!!!",
      });
    } else {
      this.setState({isShowError: false, spinner: true});
      try {
        const {user} = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        try {
          await createUserProfileDocument(user, displayName);
          this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
          this.setState({isRegistered: true, spinner: false});
        } catch (error) {
          console.log(error);
          this.setState({error: error});
        }
      } catch (error) {
        console.log(error);
        this.setState({error: error});
      }
    }
  };

  signInWithGoogleAsync = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      await auth()
        .signInWithCredential(googleCredential)
        .catch(error => {
          console.log('Something went wrong with sign up: ', error);
        });
    } catch (error) {
      console.log({error});
    }
  };

  render() {
    const {isShowError, errorMessage, spinner, isRegistered, error} =
      this.state;

    const {navigation} = this.props;

    return (
      <DismissKeyboard>
        <Block flex middle>
          <Block flex>
            <Block style={styles.registerContainer}>
              <Block flex space="evenly" style={{marginTop: -30}}>
                <Block flex={0.4} middle style={styles.socialConnect}>
                  <Block flex={0.5} middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center',
                      }}
                      color="#333"
                      size={24}></Text>
                  </Block>
                  <Block
                    flex={0.5}
                    row
                    middle
                    space="between"
                    style={{marginBottom: 12}}>
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
                        this.signInWithGoogleAsync();
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
                <Block flex={0.1} middle>
                  <Text
                    style={{
                      fontFamily: 'montserrat-regular',
                      textAlign: 'center',
                    }}
                    muted
                    size={16}>
                    or be classical
                  </Text>
                </Block>
                <Block flex={1} middle space="between">
                  <Block center flex={0.9}>
                    <Block flex space="between">
                      <Block>
                        <Block width={width * 0.8} style={{marginBottom: 5}}>
                          <Input
                            placeholder="Name & Surname"
                            name="displayName"
                            style={styles.inputs}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="profile-circle"
                                family="NowExtra"
                                style={styles.inputIcons}
                              />
                            }
                            onChangeText={displayName =>
                              this.setState({displayName})
                            }
                          />
                        </Block>
                        <Block width={width * 0.8}>
                          <Input
                            placeholder="Email"
                            style={styles.inputs}
                            name="email"
                            value={this.state.email}
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="email-852x"
                                family="NowExtra"
                                style={styles.inputIcons}
                              />
                            }
                            onChangeText={email => this.setState({email})}
                          />
                        </Block>
                        <Block width={width * 0.8} style={{marginBottom: 5}}>
                          <Input
                            placeholder="Password"
                            style={styles.inputs}
                            name="password"
                            password
                            viewPass
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="lock-circle-open2x"
                                family="NowExtra"
                                style={styles.inputIcons}
                              />
                            }
                            onChangeText={password => this.setState({password})}
                          />
                        </Block>
                        <Block width={width * 0.8} style={{marginBottom: 5}}>
                          <Input
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            style={styles.inputs}
                            password
                            viewPass
                            iconContent={
                              <Icon
                                size={16}
                                color="#ADB5BD"
                                name="lock-circle-open2x"
                                family="NowExtra"
                                style={styles.inputIcons}
                              />
                            }
                            onChangeText={confirmPassword =>
                              this.setState({confirmPassword})
                            }
                          />
                        </Block>
                        <Block
                          style={{
                            marginVertical: theme.SIZES.BASE,
                            marginLeft: 15,
                          }}
                          row
                          width={width * 0.75}>
                          <Checkbox
                            checkboxStyle={{
                              borderWidth: 1,
                              borderRadius: 2,
                              borderColor: '#E3E3E3',
                            }}
                            color={nowTheme.COLORS.PRIMARY}
                            labelStyle={{
                              color: nowTheme.COLORS.HEADER,
                              fontFamily: 'montserrat-regular',
                            }}
                            label="I agree to the terms and conditions."
                          />
                        </Block>
                      </Block>
                      {isShowError ? (
                        <Block middle>
                          <Text
                            style={{
                              fontFamily: 'montserrat-regular',
                              textAlign: 'center',
                              color: '#ff0000',
                            }}
                            //muted
                            size={14}>
                            {errorMessage}
                          </Text>
                        </Block>
                      ) : null}
                      {spinner && !isRegistered ? (
                        error ? (
                          <Block flex={0.1} middle>
                            {error.code == 'auth/email-already-in-use' ? (
                              <Text
                                style={{
                                  fontFamily: 'montserrat-regular',
                                  textAlign: 'center',
                                  color: '#ff0000',
                                }}
                                muted
                                size={12}>
                                Account already exist.
                              </Text>
                            ) : error.code == 'auth/weak-password' ? (
                              <Text
                                style={{
                                  fontFamily: 'montserrat-regular',
                                  textAlign: 'center',
                                  color: '#ff0000',
                                }}
                                muted
                                size={12}>
                                Password to contain more that 6 characters..
                              </Text>
                            ) : null}
                            <Block center>
                              <Button
                                color="warning"
                                //round
                                style={styles.createButton}
                                onPress={() => this.onRegister()}>
                                <Text
                                  style={{fontFamily: 'montserrat-bold'}}
                                  size={14}
                                  color={nowTheme.COLORS.WHITE}>
                                  Re-Submit
                                </Text>
                              </Button>
                            </Block>
                          </Block>
                        ) : (
                          <Block center>
                            <Button color="info" style={styles.createButton}>
                              <Text
                                style={{fontFamily: 'montserrat-bold'}}
                                size={14}
                                color={nowTheme.COLORS.WHITE}>
                                Loading...
                              </Text>
                            </Button>
                          </Block>
                        )
                      ) : isRegistered ? (
                        <Block center>
                          <Button
                            color="success"
                            style={styles.createButton}
                            onPress={() => navigation.navigate('App')}>
                            <Text
                              style={{fontFamily: 'montserrat-bold'}}
                              size={14}
                              color={nowTheme.COLORS.WHITE}>
                              Registered : Proceed!!!
                            </Text>
                          </Button>
                        </Block>
                      ) : (
                        <Block center>
                          <Button
                            color="primary"
                            style={styles.createButton}
                            onPress={() => this.onRegister()}>
                            <Text
                              style={{fontFamily: 'montserrat-bold'}}
                              size={14}
                              color={nowTheme.COLORS.WHITE}>
                              Submit
                            </Text>
                          </Button>
                        </Block>
                      )}
                    </Block>
                  </Block>
                </Block>
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
    height: height * 0.6,
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
    overflow: 'hidden',
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
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
    fontWeight: '800',
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15,
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
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});

export default Register;
