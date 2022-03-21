import {UserActionTypes} from './user-types';

const INITIAL_STATE = {
  currentUser: null,
  hidden: true,
  profileImage: [],
  viewMap: false,
  records: null,
  digitalRecords: null,
  digitalRecords2: null,
  specialist: '',
  tabOption: '',
  appointmentRecords: null,
  userDependants: null,
  location: 'Location?',
  dependant: 'Dependant?',
  quotations: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload, //flexible value that we get on the object, setting the current user value with the payload
        error: null, //to clear any errors, in the event user get erro and retries successfully
      };
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload, //flexible value that we get on the object, setting the current user value with the payload
      };
    case UserActionTypes.USER_PROFILE_IMAGE_STATE_CHANGE:
      return {
        ...state,
        profileImage: action.profileImage,
      };

    case UserActionTypes.USER_TOGGLE_ADDRECORD: //option can be open or closed hence toggle
      return {
        ...state,
        hidden: !state.hidden,
      };
    case UserActionTypes.USER_RECORDS_STATE_CHANGE:
      return {
        ...state,
        records: action.payload,
      };
    case UserActionTypes.USER_DIGITALRECORDS_STATE_CHANGE:
      return {
        ...state,
        digitalRecords: action.payload,
      };
    case UserActionTypes.USER_DIGITALRECORDS_STATE_CHANGE2:
      return {
        ...state,
        digitalRecords2: action.payload,
      };
    case UserActionTypes.USER_VIEW_MAP: //option can be open or closed hence toggle
      return {
        ...state,
        viewMap: !state.viewMap,
      };

    case UserActionTypes.ADD_MEDICAL_RECORD: //option can be open or closed hence toggle
      return {
        ...state,
        records: action.payload,
      };
    case UserActionTypes.ADD_MEDICAL_RECORD_FAILER: //option can be open or closed hence toggle
      return {
        ...state,
        error: action.payload,
      };
    case UserActionTypes.REMOVE_MEDICAL_RECORD: //option can be open or closed hence toggle
      return {
        ...state,
        records: action.payload,
      };
    case UserActionTypes.REMOVE_MEDICAL_RECORD_FAILER: //option can be open or closed hence toggle
      return {
        ...state,
        error: action.payload,
      };
    case UserActionTypes.SEARCH_SPECIALIST: //option can be open or closed hence toggle
      return {
        ...state,
        specialist: action.payload,
      };
    case UserActionTypes.SPECIALIST_LOCATION: //option can be open or closed hence toggle
      return {
        ...state,
        location: action.payload,
      };
    case UserActionTypes.DEPENDANT_SELECTION: //option can be open or closed hence toggle
      return {
        ...state,
        dependant: action.payload,
      };
    case UserActionTypes.HEADER_TAB_OPTION_CHANGE:
      return {
        ...state,
        tabOption: action.payload,
      };
    case UserActionTypes.USER_APPOINTMENTS_STATE_CHANGE:
      return {
        ...state,
        appointmentRecords: action.payload,
      };
    case UserActionTypes.ADD_APPOINTMENT_RECORD: //option can be open or closed hence toggle
      return {
        ...state,
        appointmentRecords: action.payload,
      };
    case UserActionTypes.ADD_APPOINTMENT_RECORD_FAILER: //option can be open or closed hence toggle
      return {
        ...state,
        error: action.payload,
      };
    case UserActionTypes.USER_DEPENDANTS_STATE_CHANGE:
      return {
        ...state,
        userDependants: action.payload,
      };
    case UserActionTypes.USER_DEPENDANTS_STATE_CHANGE_FAILER: //option can be open or closed hence toggle
      return {
        ...state,
        error: action.payload,
      };
    case UserActionTypes.ADD_DEPENDANT_RECORD: //option can be open or closed hence toggle
      return {
        ...state,
        userDependants: action.payload,
      };
    case UserActionTypes.ADD_DEPENDANT_RECORD_FAILER: //option can be open or closed hence toggle
      return {
        ...state,
        error: action.payload,
      };
    case UserActionTypes.REMOVE_DEPENDANT: //option can be open or closed hence toggle
      return {
        ...state,
        userDependants: action.payload,
      };
    case UserActionTypes.REMOVE_DEPENDANT_FAILER: //option can be open or closed hence toggle
      return {
        ...state,
        error: action.payload,
      };
    case UserActionTypes.USER_QUOTATION_REQUEST_STATE_CHANGE: //option can be open or closed hence toggle
      return {
        ...state,
        quotations: action.payload,
      };
    case UserActionTypes.ADD_QUOTATION_REQUEST: //option can be open or closed hence toggle
      console.log('Heeerso...............');
      console.log(action.payload);
      return {
        ...state,
        quotations: action.payload,
      };
    case UserActionTypes.ADD_QUOTATION_REQUEST_FAILER: //option can be open or closed hence toggle
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
