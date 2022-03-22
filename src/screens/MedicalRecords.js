import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  View,
  Image,
} from 'react-native';
import {Block, Text, Button as GaButton, theme} from 'galio-framework';

// Now UI themed components
import nowTheme from '../constants/Theme';
import Select from '../components/Select';
import * as ImagePicker from 'react-native-image-picker';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  selectAddRecordHidden,
  selectRecords,
  selectCurrentUser,
  selectTabOptionChange,
  selectDigitalRecords,
  selectDigitalRecords2,
  selectUserQuotations,
} from '../redux/user/user-selectors';
import {
  toggleAddRecord,
  fetchMedicalrecords,
  addMedicalRecord,
  fetchDigitalMedicalrecords,
  fetchDigitalMedicalrecords2,
  fetchQuotationsRequest,
} from '../redux/user/user-actions';
//import { fetchCollectionsStartAsync } from '../redux/pharmacy/pharmacy-actions';

import MedicalRecordsCard from '../components/Cards/MedicalRecordsCard';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const {width} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

function MedicalRecords(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [recordTypeModal, setRecordTypeModal] = useState(false);
  //navigation is a prop that will be propagated from App.js
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null); //to display the image
  //const [type, setType] = useState(Camera.Constants.Type.back);
  const [openCamera, setOpenCamera] = useState(false);
  const [upLoading, setUpLoading] = useState(false);
  const isFocused = useIsFocused();

  /*useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);*/

  /*useEffect(() => {
    (async () => {
      const {
        records,
        fetchMedicalrecords,
        fetchDigitalMedicalrecords,
        //fetchCollectionsStartAsync,
      } = props;
      fetchMedicalrecords();
      fetchDigitalMedicalrecords();
      fetchDigitalMedicalrecords2();
      //fetchCollectionsStartAsync();
    })();
  }, [count]);*/
  useEffect(() => {
    (async () => {
      const {
        fetchDigitalMedicalrecords,
        fetchDigitalMedicalrecords2,
        fetchMedicalrecords,
        fetchQuotationsRequest,
      } = props;
      fetchDigitalMedicalrecords();
      fetchDigitalMedicalrecords2();
      fetchMedicalrecords();
      fetchQuotationsRequest();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const {
        fetchMedicalrecords,
        fetchDigitalMedicalrecords,
        fetchDigitalMedicalrecords2,
        fetchQuotationsRequest,
      } = props;
      fetchMedicalrecords();
      fetchDigitalMedicalrecords();
      fetchDigitalMedicalrecords2();
      fetchQuotationsRequest();
      //fetchCollectionsStartAsync();
    })();
  }, [isFocused]);

  const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  };

  const pickImage = () => {
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImage(response.assets[0].uri);
        setRecordTypeModal(true);
      }
    });
  };
  const childPath = `records/${auth().currentUser.uid}/${Math.random().toString(
    36,
  )}`;

  const uploadImage = async () => {
    setUpLoading(true);
    const uri = image;
    const response = await fetch(uri); //fetch will be responsible for the fetching the image uri data
    const blob = await response.blob(); //responsible for uploading the image. Will create a blog of the image  to upload to firestore
    const task = storage().ref().child(childPath).put(blob);
    const {addMedicalRecord, records, navigation} = props;

    const taskProgress = snapshot => {
      console.log(`transferred: ${snapshot.byteTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then(snapshot => {
        const itemToAdd = {
          downLoadURL: snapshot,
          caption: 'Prescription',
          creation: Date.now(),
        };
        addMedicalRecord(itemToAdd, records);
        setUpLoading(false);
        setRecordTypeModal(false);
      });
    };

    const taskError = snapshot => {
      console.log(snapshot);
    };
    //Listens for events on this task. - Events have three callback functions (referred to as next, error, and complete).
    task.on('state_changed', taskProgress, taskError, taskCompleted);
  };

  const renderRecords = () => {
    const {
      navigation,
      route,
      hidden,
      toggleAddRecord,
      records,
      tabOption,
      digitalRecords,
      digitalRecords2,
      details,
      quotations,
    } = props;
    return (
      <Block>
        <Block style={styles.container}>
          {tabOption.tabOption == 'physical'
            ? records.map((item, index) => {
                return (
                  <MedicalRecordsCard
                    key={index}
                    item={item}
                    items={records}
                    horizontal
                    titleStyle={styles.title}
                    imageStyle={{height: '100%', width: '100%'}}
                    remove
                    physical
                    details={details}
                  />
                );
              })
            : tabOption.tabOption == 'digital'
            ? digitalRecords2.map((item, index) => (
                <>
                  {item.digitalRecords.map((record, index) => {
                    return (
                      <MedicalRecordsCard
                        key={index}
                        item={record}
                        horizontal
                        titleStyle={styles.title}
                        imageStyle={{height: '100%', width: '100%'}}
                        digital
                        details={details}
                      />
                    );
                  })}
                </>
              ))
            : quotations.map((item, index) => {
                return (
                  <MedicalRecordsCard
                    key={index}
                    item={item}
                    items={quotations}
                    horizontal
                    titleStyle={styles.title}
                    imageStyle={{height: '100%', width: '100%'}}
                    remove
                    quotations
                    details={details}
                  />
                );
              })}
        </Block>
        <Modal
          animationType="slide"
          transparent={true}
          visible={!hidden}
          onRequestClose={() => toggleAddRecord()}>
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => toggleAddRecord()}>
            <TouchableOpacity style={styles.modal} activeOpacity={1}>
              <Text style={styles.modalText}>Add record</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  toggleAddRecord();
                  navigation.navigate('Camera', {
                    camOptions: {
                      camSide: 1,
                      screen: 'MedicalRecords',
                    },
                  });
                }}>
                <Text style={styles.textStyle}>Take a Picture</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  pickImage();
                  toggleAddRecord();
                }}>
                <Text style={styles.textStyle}>Upload from Gallery</Text>
              </Pressable>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={recordTypeModal}
          onRequestClose={() => setRecordTypeModal(false)}>
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => setRecordTypeModal(false)}>
            <TouchableOpacity style={styles.modal} activeOpacity={1}>
              {/*              <Text style={styles.modalText}>Select Record Type</Text>
              <Block
                style={{paddingHorizontal: theme.SIZES.BASE, marginTop: 5}}>
                <Select
                  defaultIndex={1}
                  options={['Friend', 'Relative', 'Parent', 'Child', 'Other']}
                />
              </Block>*/}
              {!upLoading ? (
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    uploadImage();
                    //toggleAddRecord();
                  }}>
                  <Text style={styles.textStyle}>Upload</Text>
                </Pressable>
              ) : (
                <Pressable style={[styles.button, styles.buttonClose]}>
                  <Text style={styles.textStyle}>Loading...</Text>
                </Pressable>
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </Block>
    );
  };

  return (
    <Block flex center>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, width}}>
        {renderRecords()}
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SIZES.BASE,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER,
  },
  productTitle: {
    color: nowTheme.COLORS.PRIMARY,
    textAlign: 'center',
    fontFamily: 'montserrat-bold',
    fontSize: 18,
  },
  notify: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 8,
    right: 50,
  },
  addButton: {
    padding: 12,
    position: 'relative',
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
  },
  addButton: {
    padding: 12,
    position: 'absolute',

    top: 0,
    left: 10,
  },
  notify: {
    backgroundColor: nowTheme.COLORS.SUCCESS,
    borderRadius: 10,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
    marginHorizontal: 10,
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
  productTitle: {
    color: nowTheme.COLORS.PRIMARY,
    textAlign: 'center',
    fontFamily: 'montserrat-bold',
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  imageContainer: {
    marginBottom: 30,
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 150,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

const mapDispatchToProps = dispatch => ({
  toggleAddRecord: () => dispatch(toggleAddRecord()),
  fetchMedicalrecords: () => dispatch(fetchMedicalrecords()),
  fetchDigitalMedicalrecords: () => dispatch(fetchDigitalMedicalrecords()),
  fetchDigitalMedicalrecords2: () => dispatch(fetchDigitalMedicalrecords2()),
  fetchQuotationsRequest: () => dispatch(fetchQuotationsRequest()),

  addMedicalRecord: (itemToAdd, records) =>
    dispatch(addMedicalRecord(itemToAdd, records)),
  //fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

const mapStateToProps = createStructuredSelector({
  hidden: selectAddRecordHidden, //to show or hide the cart.
  records: selectRecords,
  currentUser: selectCurrentUser,
  tabOption: selectTabOptionChange,
  digitalRecords: selectDigitalRecords,
  digitalRecords2: selectDigitalRecords2,
  quotations: selectUserQuotations,
});

export default connect(mapStateToProps, mapDispatchToProps)(MedicalRecords);
