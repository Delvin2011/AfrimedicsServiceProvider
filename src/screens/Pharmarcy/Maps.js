import React, {useContext, useState, useEffect} from 'react';
import MapView from 'react-native-maps';
import {Block, Text, theme, View, Button as GaButton} from 'galio-framework';
import MapCalloutInfo from '../../components/MapCalloutInfo';
import {useIsFocused} from '@react-navigation/native';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

function MapScreen(props) {
  const {phamarciesSelected, selectedPhamarcyLocation, navigation} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  let region = {
    latitude: -18.774364,
    longitude: 29.978059,
    latitudeDelta: 1,
    longitudeDelta: 0.5,
  };
  const [initialRegion, setInitialRegion] = useState(region);
  const [newRegion, setNewRegion] = useState(region);
  const name = 'Test';
  const isFocused = useIsFocused();
  const mapHeight = '50%';
  let provinces = [
    {
      id: 0,
      name: 'Location?',
      value: 'Location?',
      geometry: {
        lat: -18.774364,
        lng: 29.978059,
      },
    },
    {
      id: 1,
      name: 'Harare',
      value: 'Harare',
      geometry: {
        lat: -17.823875,
        lng: 31.035886,
      },
    },
    {
      id: 2,
      name: 'Masvingo',
      value: 'Masvingo',
      geometry: {
        lat: -20.072217,
        lng: 30.829824,
      },
    },
    {
      id: 3,
      name: 'Gweru',
      value: 'Gweru',
      geometry: {
        lat: -19.456382,
        lng: 29.811787,
      },
    },
    {
      id: 4,
      name: 'Bulawayo',
      value: 'Bulawayo',
      geometry: {
        lat: -20.148393,
        lng: 28.575895,
      },
    },
    {
      id: 5,
      name: 'Mutare',
      value: 'Mutare',
      geometry: {
        lat: -18.975795,
        lng: 32.652897,
      },
    },
    {
      id: 6,
      name: 'Chinhoyi',
      value: 'Chinhoyi',
      geometry: {
        lat: -17.368725,
        lng: 30.187309,
      },
    },
  ];

  useEffect(() => {
    setModalVisible(modalVisible);
  }, [modalVisible]);

  useEffect(() => {
    setModalVisible(modalVisible);
  }, [isFocused]);

  useEffect(() => {
    handleRegionChange();
  }, [selectedPhamarcyLocation]);

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

  const handleRegionChange = () => {
    let newRegion = {};
    for (var x = 0; x < provinces.length; x++) {
      if (selectedPhamarcyLocation === provinces[x].name) {
        newRegion = {
          latitude: provinces[x].geometry.lat,
          longitude: provinces[x].geometry.lng,
          latitudeDelta: 0.5,
          longitudeDelta: 0.25,
        };
        if (selectedPhamarcyLocation === 'Location?') {
          newRegion = {
            latitude: provinces[x].geometry.lat,
            longitude: provinces[x].geometry.lng,
            latitudeDelta: 6,
            longitudeDelta: 6,
          };
        }
        setNewRegion(newRegion);
      }
    }
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
        initialRegion={initialRegion}
        region={newRegion}>
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
