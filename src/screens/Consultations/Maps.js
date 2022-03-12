import React, {useContext, useState, useEffect} from 'react';
import MapView from 'react-native-maps';
import {Block, Text, theme, View, Button as GaButton} from 'galio-framework';
import MapCalloutInfo from '../../components/MapCalloutInfo';
import {useIsFocused} from '@react-navigation/native';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  selectAppointmentRecords,
  selectCurrentUser,
  selectViewDoctorsOnMap,
} from '../../redux/user/user-selectors';
import {
  addAppointmentRecord,
  fetchMedicalAppointments,
  searchSpecialist,
  viewDoctorsOnMap,
} from '../../redux/user/user-actions';

function MapScreen(props) {
  const {specialistListsByCity, navigation, viewMap} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const lat = -17.84658433;
  const lng = 31.04918867;
  const name = 'Test';
  const isFocused = useIsFocused();
  const mapHeight = viewMap ? '50%' : '100%';

  useEffect(() => {
    setModalVisible(modalVisible);
  }, [modalVisible]);

  useEffect(() => {
    setModalVisible(modalVisible);
  }, [isFocused]);

  useEffect(() => {
    const {fetchMedicalAppointments} = props;
    fetchMedicalAppointments();
  }, []);

  const handleClick = specialistName => {
    const {searchSpecialist, viewMap, viewDoctorsOnMap} = props;
    const x = {name: specialistName.split(' ')[1], screen: 'bd'};
    if (!viewMap) {
      viewDoctorsOnMap();
    }
    searchSpecialist(x);
  };

  /*const addToAppointmentRecords = (recordToAdd) => {
    const { appointmentRecords, navigation } = props;
    addToAppointmentRecords(recordToAdd, appointmentRecords);
    navigation.navigate('AppointmentRecords');
  };*/

  return (
    <>
      <MapView
        style={{height: mapHeight}}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 1,
          longitudeDelta: 0.5,
        }}>
        {specialistListsByCity.map(specialist => {
          return (
            <MapView.Marker
              key={specialist.title}
              title={specialist.title}
              coordinate={{
                latitude: specialist.geometry.lat,
                longitude: specialist.geometry.lng,
              }}>
              <MapView.Callout onPress={() => handleClick(specialist.title)}>
                <MapCalloutInfo specialist={specialist} />
              </MapView.Callout>
            </MapView.Marker>
          );
        })}
      </MapView>
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  fetchMedicalAppointments: () => dispatch(fetchMedicalAppointments()),
  viewDoctorsOnMap: () => dispatch(viewDoctorsOnMap()),
  searchSpecialist: specialist => dispatch(searchSpecialist(specialist)),
  addAppointmentRecord: (appointmenToAdd, appointmentRecords) =>
    dispatch(addAppointmentRecord(appointmenToAdd, appointmentRecords)),
});

const mapStateToProps = createStructuredSelector({
  appointmentRecords: selectAppointmentRecords,
  currentUser: selectCurrentUser,
  viewMap: selectViewDoctorsOnMap,
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);

//import MapCalloutInfo from '../components/MapCalloutInfo';

//https://blog.logrocket.com/react-native-maps-introduction/
