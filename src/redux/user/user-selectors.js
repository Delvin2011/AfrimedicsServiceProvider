import {createSelector} from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser,
);

export const selectCurrentUserProfileImage = createSelector(
  [selectUser],
  user => user.profileImage,
);

export const selectCurrentUserLoginError = createSelector(
  [selectUser],
  user => user.error, //outputs of the input selectors
);

export const selectAddRecordHidden = createSelector(
  [selectUser], //array of input selectors
  user => user.hidden, //outputs of the input selectors
);

export const selectViewDoctorsOnMap = createSelector(
  [selectUser], //array of input selectors
  user => user.viewMap, //outputs of the input selectors
);

export const selectRecords = createSelector(
  [selectUser], //array of input selectors
  user => user.records, //outputs of the input selectors
);

export const selectDigitalRecords = createSelector(
  [selectUser], //array of input selectors
  user => user.digitalRecords, //outputs of the input selectors
);

export const selectDigitalRecords2 = createSelector(
  [selectUser], //array of input selectors
  user => user.digitalRecords2, //outputs of the input selectors
);

export const selectSeachedSpecialist = createSelector(
  [selectUser], //array of input selectors
  user => user.specialist, //outputs of the input selectors
);

export const selectSpecialistLocation = createSelector(
  [selectUser], //array of input selectors
  user => user.location, //outputs of the input selectors
);

export const selectDependant = createSelector(
  [selectUser], //array of input selectors
  user => user.dependant, //outputs of the input selectors
);

export const selectTabOptionChange = createSelector(
  [selectUser], //array of input selectors
  user => user.tabOption, //outputs of the input selectors
);

export const selectAppointmentRecords = createSelector(
  [selectUser], //array of input selectors
  user => user.appointmentRecords, //outputs of the input selectors
);

export const selectUserDependants = createSelector(
  [selectUser], //array of input selectors
  user => user.userDependants, //outputs of the input selectors
);
