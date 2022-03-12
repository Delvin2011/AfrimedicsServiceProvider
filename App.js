/*
 * Copyright (c) 2011-2021, Zingaya, Inc. All rights reserved.
 */

import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import Main from './Main';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
/*
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/routes/routes';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';
import CallScreen from './src/screens/CallScreen';
import IncomingCallScreen from './src/screens/IncomingCallScreen';
import Main from './Main';
const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return <Main />;
    /*return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{headerLeft: null}}
          />
          <Stack.Screen
            name="Call"
            component={CallScreen}
            options={{headerLeft: null}}
          />
          <Stack.Screen
            name="IncomingCall"
            component={IncomingCallScreen}
            options={{headerLeft: null}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

//entry point of the project




/*      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{headerLeft: null}}
          />
          <Stack.Screen
            name="Call"
            component={CallScreen}
            options={{headerLeft: null}}
          />
          <Stack.Screen
            name="IncomingCall"
            component={IncomingCallScreen}
            options={{headerLeft: null}}
          />
        </Stack.Navigator>
      </NavigationContainer>*/
