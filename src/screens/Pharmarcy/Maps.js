import React, {useContext, useState, useEffect} from 'react';
import MapView from 'react-native-maps';
import {Block, Text, theme, View, Button as GaButton} from 'galio-framework';
import MapCalloutInfo from '../../components/MapCalloutInfo';
import {useIsFocused} from '@react-navigation/native';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

function MapScreen(props) {
  const {phamarciesSelected, navigation} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const lat = -17.84658433;
  const lng = 31.04918867;
  const name = 'Test';
  const isFocused = useIsFocused();
  const mapHeight = '50%';

  useEffect(() => {
    setModalVisible(modalVisible);
  }, [modalVisible]);

  useEffect(() => {
    setModalVisible(modalVisible);
  }, [isFocused]);

  /*useEffect(() => {
    const {fetchMedicalAppointments} = props;
    fetchMedicalAppointments();
  }, []);*/

  /*const handleClick = specialistName => {
    const {searchSpecialist, viewMap, viewDoctorsOnMap} = props;
    const x = {name: specialistName.split(' ')[1], screen: 'bd'};
    if (!viewMap) {
      viewDoctorsOnMap();
    }
    searchSpecialist(x);
  };*/
  const handleMapReady = () => {
    setMapReady(true);
  };
  return (
    <>
      <MapView
        style={{height: mapHeight}}
        onMapReady={handleMapReady}
        loadingEnabled={true}
        loadingIndicatorColor="#666666"
        loadingBackgroundColor="#eeeeee"
        moveOnMarkerPress={false}
        showsUserLocation={true}
        showsCompass={true}
        showsPointsOfInterest={false}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 1,
          longitudeDelta: 0.5,
        }}>
        {mapReady === true
          ? phamarciesSelected.map(phamarcy => {
              return (
                <MapView.Marker
                  key={phamarcy.id}
                  title={phamarcy.name}
                  coordinate={{
                    latitude: phamarcy.latitude,
                    longitude: phamarcy.longitude,
                  }}>
                  <MapView.Callout>
                    <MapCalloutInfo specialist={phamarcy} />
                  </MapView.Callout>
                </MapView.Marker>
              );
            })
          : null}
      </MapView>
    </>
  );
}

/*const mapDispatchToProps = dispatch => ({
  fetchMedicalAppointments: () => dispatch(fetchMedicalAppointments()),
  viewDoctorsOnMap: () => dispatch(viewDoctorsOnMap()),
  searchSpecialist: specialist => dispatch(searchSpecialist(specialist)),
  addAppointmentRecord: (appointmenToAdd, appointmentRecords) =>
    dispatch(addAppointmentRecord(appointmenToAdd, appointmentRecords)),
});

const mapStateToProps = createStructuredSelector({
  viewMap: selectViewDoctorsOnMap,
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);*/

export default MapScreen;
//import MapCalloutInfo from '../components/MapCalloutInfo';

//https://blog.logrocket.com/react-native-maps-introduction/
