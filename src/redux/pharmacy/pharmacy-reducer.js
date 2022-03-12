import PhamarcyActionTypes from './pharmacy-types';

const INITIAL_STATE = {
  collections: null,
  isFetching: false, //whether or not we are fetching data for our collections property
  erroMessage: undefined,
  pharmacyOrders: null,
  //prescriptionOrders: null,
};

const pharmacyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PhamarcyActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true, //indicating to the reducer where isFetching is true
      };

    case PhamarcyActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        //once API call is successfully, update isFetching
        ...state,
        isFetching: false,
        collections: action.payload,
      };

    case PhamarcyActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        erroMessage: action.payload,
      };
    case PhamarcyActionTypes.UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: action.payload, //reducer waiting for the backend update
      };
    case PhamarcyActionTypes.FETCH_PHARMACYORDER_SUCCESS:
      return {
        ...state,
        pharmacyOrders: action.payload, //reducer waiting for the backend update
      };
    case PhamarcyActionTypes.FETCH_PHARMACYORDER_FAILURE:
      return {
        ...state,
        orderErrorMessage: action.payload, //reducer waiting for the backend update
      };
    case PhamarcyActionTypes.ADD_PHARMACYORDER_SUCCESS:
      return {
        ...state,
        pharmacyOrders: action.payload, //reducer waiting for the backend update
      };
    case PhamarcyActionTypes.ADD_PHARMACYORDER_FAILURE:
      return {
        ...state,
        orderErrorMessage: action.payload, //reducer waiting for the backend update
      };
    default:
      return state;
  }
};

export default pharmacyReducer;
