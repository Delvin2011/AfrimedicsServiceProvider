const AmbulanceActionTypes = {
  //setting up multiple states that our shop actions could be in as far as fetching the asynchronous data goes
  SET_PICKUP_LOCATION: 'SET_PICKUP_LOCATION', //telling redux we are starting to fetch the data i.e that is b4 any data gets fetched. 1st API call to our functions begins
  SET_DESTINATION_LOCATION: 'SET_DESTINATION_LOCATION', //when API call returns successfull. Whne the data that we want is returned.
  SET_TRAVEL_TIMEINFO: 'SET_TRAVEL_TIMEINFO',
};

export default AmbulanceActionTypes;
