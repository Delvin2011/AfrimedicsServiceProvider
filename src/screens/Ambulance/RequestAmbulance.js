import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  View,
} from 'react-native';
import {Block, Text, Button as GaButton, theme} from 'galio-framework';

// Now UI themed components
import {nowTheme} from '../../constants';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  selectUserDependants,
  selectCurrentUser,
} from '../../redux/user/user-selectors';
import {
  selectPickup,
  selectDestination,
  selectTravelTimeInfo,
} from '../../redux/ambulance/ambulance-selectors';

import {fetchUserDependants} from '../../redux/user/user-actions';
import MapScreen from './Maps';
import Ambulancies from './AmbulanceSelection';

import {
  setPickupLocation,
  setDestinationLocation,
  setTravelTimeInfo,
} from '../../redux/ambulance/ambulance-actions';
const {width} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

function RequestAmbulance(props) {
  const isFocused = useIsFocused();
  const {
    origin,
    destination,
    setPickupLocation,
    setDestinationLocation,
    setTravelTimeInfo,
    travelInfo,
  } = props;
  useEffect(() => {
    if (!origin || !destination) return;
    setPickupLocation(null);
    setDestinationLocation(null);
    setTravelTimeInfo(null);
  }, [isFocused]);

  const renderTravelInfo = () => {
    return (
      <Block
        row={true}
        middle
        flex
        space="between"
        style={{
          marginHorizontal: 40,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            marginTop: 10,
          }}>
          Distance : {travelInfo?.distance.text}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 14,
            marginTop: 10,
          }}>
          Travel Time : {travelInfo?.duration.text}
        </Text>
      </Block>
    );
  };

  const renderAmbulanceServices = () => {
    return (
      <>
        {origin ? <MapScreen /> : null}
        {origin && destination && travelInfo ? renderTravelInfo() : null}
        {origin && destination && travelInfo ? <Ambulancies /> : null}
      </>
    );
  };

  return <>{renderAmbulanceServices()}</>;
}

const mapDispatchToProps = dispatch => ({
  fetchUserDependants: () => dispatch(fetchUserDependants()),
  setPickupLocation: location => dispatch(setPickupLocation(location)),
  setDestinationLocation: location =>
    dispatch(setDestinationLocation(location)),
  setTravelTimeInfo: travelInfo => dispatch(setTravelTimeInfo(travelInfo)),
});

const mapStateToProps = createStructuredSelector({
  dependantsDetails: selectUserDependants,
  currentUser: selectCurrentUser,
  origin: selectPickup,
  destination: selectDestination,
  travelInfo: selectTravelTimeInfo,
});

//export default withNavigation(Header);
export default connect(mapStateToProps, mapDispatchToProps)(RequestAmbulance);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SIZES.BASE,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER,
  },
  productTitle: {
    color: nowTheme.COLORS.PRIMARY,
    textAlign: 'center',
    fontFamily: 'montserrat-bold',
    fontSize: 18,
  },
  notify: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 8,
    right: 50,
  },
  addButton: {
    padding: 12,
    position: 'relative',
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
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
    position: 'absolute',

    top: 0,
    left: 10,
  },
  notify: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    borderRadius: 10,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  optionsButton: {
    width: 'auto',
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
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
    marginHorizontal: 10,
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
  productTitle: {
    color: nowTheme.COLORS.PRIMARY,
    textAlign: 'center',
    fontFamily: 'montserrat-bold',
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  imageContainer: {
    marginBottom: 30,
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 150,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  activityIndicatorHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
