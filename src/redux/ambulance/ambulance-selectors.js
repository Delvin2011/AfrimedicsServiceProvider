import {createSelector} from 'reselect';

const selectAmbulance = state => state.ambulance;

export const selectPickup = createSelector(
  [selectAmbulance], //input (takes in)
  ambulance => ambulance.pickupLocation, //output
);

export const selectDestination = createSelector(
  [selectAmbulance], //input (takes in)
  ambulance => ambulance.destinationLocation, //output
);

export const selectTravelTimeInfo = createSelector(
  [selectAmbulance], //input (takes in)
  ambulance => ambulance.travelTimeInfo, //output
);
