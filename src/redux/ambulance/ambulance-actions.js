import AmbulanceActionTypes from './ambulance-types';
import {convertCollectionsSnapshotToMap} from '../../firebase/firebase-utils';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {addNewOrder} from './ambulance-utils';

export const setPickupLocation = location => {
  return dispatch => {
    dispatch({
      type: AmbulanceActionTypes.SET_PICKUP_LOCATION,
      payload: location,
    });
  };
};

export const setDestinationLocation = location => {
  return dispatch => {
    dispatch({
      type: AmbulanceActionTypes.SET_DESTINATION_LOCATION,
      payload: location,
    });
  };
};

export const setTravelTimeInfo = travelTimeInfo => {
  console.log(travelTimeInfo);
  return dispatch => {
    dispatch({
      type: AmbulanceActionTypes.SET_TRAVEL_TIMEINFO,
      payload: travelTimeInfo,
    });
  };
};
