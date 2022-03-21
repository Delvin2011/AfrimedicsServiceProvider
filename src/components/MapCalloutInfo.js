import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import WebView from 'react-native-webview';
import {Platform} from 'react-native';
import {Text, Block} from 'galio-framework';
import Button from './Button';
import Icon from './Icon';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  selectAppointmentRecords,
  selectCurrentUser,
  selectSeachedSpecialist,
} from '../redux/user/user-selectors';
import {
  addAppointmentRecord,
  fetchMedicalAppointments,
} from '../redux/user/user-actions';

import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';

const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const CompactWebview = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

const isAndroid = Platform.OS === 'android';

function MapCalloutInfo(props) {
  const Image = isAndroid ? CompactWebview : CompactImage;
  const {
    specialist,
    phamarcy,
    phamarcyView,
    modalVisible,
    setModalVisible,
    searchedSpecialists,
  } = props;

  const avatarPhoto =
    'https://firebasestorage.googleapis.com/v0/b/donewithit-db.appspot.com/o/post%2FnGsEHWbO84fHdNFFNCHSUGxANT62%2F0.eyfs5uxles5?alt=media&token=3a0d62a4-5f4b-4e26-b993-6bf2bc755807';

  const name = phamarcyView
    ? phamarcy.name.split(' ')[0] + '...'
    : specialist.title;

  const photo = phamarcyView ? phamarcy.logo : avatarPhoto;
  return (
    <Item>
      <Image source={{uri: photo}} />
      <Text center numberOfLines={4} ellipsizeMode="tail">
        {name}
      </Text>
      <Block flex={0.5} row middle space="between">
        <Button
          style={{width: 60, height: 30, marginHorizontal: 2, elevation: 0}}>
          View
        </Button>
      </Block>
    </Item>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingRight: 12,
    position: 'absolute',
    marginLeft: 156,
    marginTop: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
    marginBottom: 300,
    marginLeft: 30,
    marginRight: 30,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
    marginBottom: 320,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    //paddingRight: 12,
    marginLeft: 200,
    marginTop: -15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapDispatchToProps = dispatch => ({
  fetchMedicalAppointments: () => dispatch(fetchMedicalAppointments()),
  addAppointmentRecord: (appointmenToAdd, appointmentRecords) =>
    dispatch(addAppointmentRecord(appointmenToAdd, appointmentRecords)),
});

const mapStateToProps = createStructuredSelector({
  appointmentRecords: selectAppointmentRecords,
  currentUser: selectCurrentUser,
  searchedSpecialists: selectSeachedSpecialist,
});

export default connect(mapStateToProps, mapDispatchToProps)(MapCalloutInfo);
