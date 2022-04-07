import AmbulanceActionTypes from './ambulance-types';

const INITIAL_STATE = {
  pickupLocation: null,
  destinationLocation: null, //whether or not we are fetching data for our collections property
  travelTimeInfo: null,
};

const ambulanceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AmbulanceActionTypes.SET_PICKUP_LOCATION:
      return {
        ...state,
        pickupLocation: action.payload, //indicating to the reducer where isFetching is true
      };

    case AmbulanceActionTypes.SET_DESTINATION_LOCATION:
      return {
        ...state,
        destinationLocation: action.payload,
      };
    case AmbulanceActionTypes.SET_TRAVEL_TIMEINFO:
      return {
        ...state,
        travelTimeInfo: action.payload,
      };
    default:
      return state;
  }
};

export default ambulanceReducer;
