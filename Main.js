import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {Block, GalioProvider} from 'galio-framework';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './src/routes/routes';
import Screens from './src/navigation/Screens';
import {nowTheme} from './src/constants';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {createUserProfileDocument} from './src/firebase/firebase-utils';
import {setCurrentUser} from './src/redux/user/user-actions';
import {
  selectCurrentUser,
  selectCurrentUserLoginError,
} from './src/redux/user/user-selectors';
import {LogBox} from 'react-native';

const Main = props => {
  const [initializing, setInitializing] = useState(true);
  const {setCurrentUser} = props;
  const onAuthStateChanged = async user => {
    if (user) {
      const userRef = await createUserProfileDocument(user);
      userRef.onSnapshot(snapShot => {
        setCurrentUser({
          id: snapShot.id,
          ...snapShot.data(),
        });
      });
    }
    setCurrentUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '178690505813-4ct6vmd3jktcmjnmp4mkjaei7b66ep8t.apps.googleusercontent.com',
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    LogBox.ignoreLogs(['EventEmitter.removeListener']);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer ref={navigationRef}>
      <GalioProvider theme={nowTheme}>
        <Block flex>
          <Screens />
        </Block>
      </GalioProvider>
    </NavigationContainer>
  );
};

//export default Main;
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  error: selectCurrentUserLoginError,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
