/*
 * Copyright (c) 2011-2021, Zingaya, Inc. All rights reserved.
 */

'use strict';

import React from 'react';
import {
  Text,
  View,
  TextInput,
  Platform,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginManager from '../manager/LoginManager';
import COLOR_SCHEME from '../styles/ColorScheme';
import COLOR from '../styles/Color';
import styles from '../styles/Styles';
import CallManager from '../manager/CallManager';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.password = this.props.route.params.password;
    this.username = this.props.route.params.username;
    this.state = {
      username: this.props.route.params.username,
      isModalOpen: false,
      modalText: '',
      specialistName: this.props.route.params.specialistName,
      loading: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('usernameValue').then(username => {
      this.setState({username: username});
    });
    LoginManager.getInstance().on('onConnectionFailed', reason =>
      this.onConnectionFailed(reason),
    );
    LoginManager.getInstance().on('onLoggedIn', displayName =>
      this.onLoggedIn(displayName),
    );
    LoginManager.getInstance().on('onLoginFailed', errorCode =>
      this.onLoginFailed(errorCode),
    );

    // Workaround to navigate to the IncomingCallScreen if a push notification was received in 'killed' state
    if (Platform.OS === 'android') {
      if (CallManager.getInstance().showIncomingCallScreen) {
        this.props.navigation.navigate('IncomingCall', {
          callId: CallManager.getInstance().call.callId,
          isVideo: null,
          from: CallManager.getInstance().call.getEndpoints()[0].displayName,
        });
      }
    }
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  onLoginFailed(errorCode) {
    switch (errorCode) {
      case 401:
        this.setState({isModalOpen: true, modalText: 'Invalid password'});
        break;
      case 403:
        this.setState({isModalOpen: true, modalText: 'Account frozen'});
        break;
      case 404:
        this.setState({isModalOpen: true, modalText: 'Invalid username'});
        break;
      case 701:
        this.setState({isModalOpen: true, modalText: 'Token expired'});
        break;
      default:
      case 500:
        this.setState({isModalOpen: true, modalText: 'Internal error'});
    }
    this.setState({loading: false});
  }

  onLoggedIn(displayName) {
    (async () => {
      await AsyncStorage.setItem('usernameValue', this.username);
    })();
    this.setState({loading: false});
    this.props.navigation.navigate('Main', {
      specialistName: this.state.specialistName,
    });
  }

  onConnectionFailed(reason) {
    this.setState({
      isModalOpen: true,
      modalText: 'Failed to connect, check internet settings',
    });
  }

  loginClicked() {
    //console.log(this.props.route.params.password);
    //console.log(this.props.route.params.username);
    this.setState({loading: true});
    LoginManager.getInstance().loginWithPassword(
      //this.state.username + '.voximplant.com',
      this.username + '.voximplant.com',
      this.password,
    );
  }

  loginWithOneTimeKeyClicked() {
    LoginManager.getInstance().loginWithOneTimeKey(
      this.state.username + '.voximplant.com',
      this.password,
    );
  }

  _focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  render() {
    return (
      <SafeAreaView style={styles.safearea}>
        <StatusBar
          barStyle={
            Platform.OS === 'ios' ? COLOR_SCHEME.DARK : COLOR_SCHEME.LIGHT
          }
          backgroundColor={COLOR.PRIMARY_DARK}
        />
        <View style={[styles.container]}>
          <View>
            <View style={styles.loginform}>
              {/*              <TextInput
                underlineColorAndroid="transparent"
                style={styles.forminput}
                placeholder="user@app.account"
                value={this.state.username}
                autoFocus={true}
                returnKeyType={'next'}
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={() => this._focusNextField('password')}
                onChangeText={text => {
                  this.setState({username: text});
                }}
                blurOnSubmit={false}
              />
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.forminput}
                placeholder="User password"
                secureTextEntry={true}
                ref="password"
                onChangeText={text => {
                  this.password = text;
                }}
                blurOnSubmit={true}
              />*/}
              {!this.state.loading ? (
                <TouchableOpacity
                  onPress={() => this.loginClicked()}
                  style={{width: 220, alignSelf: 'center'}}>
                  <Text style={styles.loginbutton}>
                    Proceed to call {this.state.specialistName}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  style={[
                    styles.activityIndicatorContainer,
                    styles.activityIndicatorHorizontal,
                  ]}>
                  <ActivityIndicator size="large" />
                </View>
              )}

              {/*              <TouchableOpacity
                onPress={() => this.loginWithOneTimeKeyClicked()}
                style={{width: 220, alignSelf: 'center'}}>
                <Text style={styles.loginbutton}>LOGIN WITH ONE TIME KEY</Text>
              </TouchableOpacity>*/}
            </View>
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isModalOpen}>
            <TouchableHighlight
              onPress={e => this.setState({isModalOpen: false})}
              style={styles.container}>
              <View style={[styles.container, styles.modalBackground]}>
                <View
                  style={[
                    styles.innerContainer,
                    styles.innerContainerTransparent,
                  ]}>
                  <Text>{this.state.modalText}</Text>
                </View>
              </View>
            </TouchableHighlight>
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
}
