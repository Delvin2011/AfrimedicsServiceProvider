import React, {useRef, useState, useEffect} from 'react';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {Block, Text, theme, View, Button as GaButton} from 'galio-framework';
import MapCalloutInfo from '../../components/MapCalloutInfo';
import {useIsFocused} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  selectPickup,
  selectDestination,
} from '../../redux/ambulance/ambulance-selectors';
import {setTravelTimeInfo} from '../../redux/ambulance/ambulance-actions';
import {GOOGLE_MAPS_APIKEY} from '@env';

function MapScreen(props) {
  const {origin, destination, setTravelTimeInfo} = props;
  const [modalVisible, setModalVisible] = useState(false);
  let region = {
    latitude: -18.774364,
    longitude: 29.978059,
    latitudeDelta: 1,
    longitudeDelta: 0.5,
  };
  const [initialRegion, setInitialRegion] = useState(region);
  const [newRegion, setNewRegion] = useState(region);
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef(null);

  const isFocused = useIsFocused();
  const mapHeight = '50%';
  console.log('sd');
  console.log(GOOGLE_MAPS_APIKEY);
  console.log(process.env.GOOGLE_MAPS_APIKEY);

  useEffect(() => {
    if (!origin || !destination) return;

    //Zoom to fit all markers
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
    });
  }, [origin, destination, isFocused]);

  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=km&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`,
      )
        .then(res => res.json())
        .then(data => {
          setTravelTimeInfo(data.rows[0].elements[0]);
        });
    };
    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  /*useEffect(() => {
  }, [isFocused]);

  useEffect(() => {
  }, []);*/

  const handleMapReady = () => {
    setMapReady(true);
    let region2 = {
      latitude: parseFloat(origin.location.lat),
      longitude: parseFloat(origin.location.lng),
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    };
    setNewRegion(region2);
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
    });
  };

  return (
    <>
      <MapView
        ref={mapRef}
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
        {mapReady ? (
          <>
            {origin?.location && (
              <MapView.Marker
                key={origin.description}
                title={origin.description}
                identifier="origin"
                coordinate={{
                  latitude: origin.location.lat,
                  longitude: origin.location.lng,
                }}></MapView.Marker>
            )}
            {destination?.location && (
              <MapView.Marker
                key={destination.description}
                title={destination.description}
                identifier="destination"
                coordinate={{
                  latitude: destination.location.lat,
                  longitude: destination.location.lng,
                }}></MapView.Marker>
            )}
            {origin && destination && (
              <MapViewDirections
                origin={origin.description}
                destination={destination.description}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="hotpink"
              />
            )}
          </>
        ) : null}
      </MapView>
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  setTravelTimeInfo: travelTimeInfo =>
    dispatch(setTravelTimeInfo(travelTimeInfo)),
});
const mapStateToProps = createStructuredSelector({
  origin: selectPickup,
  destination: selectDestination,
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);

//import MapCalloutInfo from '../components/MapCalloutInfo';

//https://blog.logrocket.com/react-native-maps-introduction/
