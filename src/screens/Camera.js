import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, View, Image, ScrollView} from 'react-native';
//import {useIsFocused} from '@react-navigation/native';
import {Block, Text, Button as GaButton, theme} from 'galio-framework';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  selectAddRecordHidden,
  selectRecords,
  selectCurrentUser,
} from '../redux/user/user-selectors';

import {
  toggleAddRecord,
  fetchMedicalrecords,
  addMedicalRecord,
} from '../redux/user/user-actions';

// Now UI themed components
import {nowTheme} from '../constants';
import Button from '../components/Button';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/core';

const {width} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

function CameraScreen(props) {
  const {navigation} = props;
  //const {camSide, screen} = props.camOptions;
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null); //to display the image
  const [cameraImageLoading, setImageLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  //let camOption =
  //camSide == 1 ? Camera.Constants.Type.back : Camera.Constants.Type.front;
  //const [type, setType] = useState(camOption);
  const isFocused = useIsFocused();
  const [upLoading, setUpLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');

  const devices = useCameraDevices();
  const device = devices.front;

  // check if camera page is active
  const isFocussed = useIsFocused();
  //const isForeground = useIsForeground();
  const isActive = isFocussed; // && isForeground;

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(null);
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      //console.log('TIME LEFT IS {0}', timeLeft);
      if (timeLeft == 1) {
        setImageLoading(!cameraImageLoading);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermission();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  /*const childPath = screen == 'Account'
      ? `post/${auth().currentUser.uid}/${Math.random().toString(36)}`
      : screen == 'MedicalRecords'
      ? `records/${auth().currentUser.uid}/${Math.random().toString(36)}`
      :  null*/ const childPath = `post/${
    auth().currentUser.uid
  }/${Math.random().toString(36)}`;

  const takePicture = async () => {
    if (camera) {
      //if camera exists and contains something
      setImageLoading(!cameraImageLoading);
      const data = await camera.takePhoto();
      setImage('file://' + data.path); //when camera takes pictures, the phone stores the picture in a temporary folder. Can access that using data.uri
      setImageLoading(!cameraImageLoading);
    }
  };

  const uploadImage = async () => {
    const uri = image;
    const response = await fetch(uri); //fetch will be responsible for the fetching the image uri data
    const blob = await response.blob(); //responsible for uploading the image. Will create a blog of the image  to upload to firestore
    //know the information of the upload process
    const task = storage().ref().child(childPath).put(blob);
    //const {addMedicalRecord, records, navigation} = props;
    setUpLoading(true);
    const taskProgress = snapshot => {
      console.log(`transferred: ${snapshot.byteTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then(snapshot => {
        saveProfileData(snapshot);
        /*if (screen == 'Account') {
          saveProfileData(snapshot);
        } else if (screen == 'MedicalRecords') {
          const itemToAdd = {
            downLoadURL: snapshot,
            caption: 'Prescription',
            creation: firebase.firestore.FieldValue.serverTimestamp(),
          };
          addMedicalRecord(itemToAdd, records);
          setUpLoading(false);
          setImage(null);
          setDownloadLink('');
          navigation.navigate('MedicalRecords');
          //saveRecordsData(snapshot);
        }*/
        setDownloadLink(snapshot);
      });
    };

    const taskError = snapshot => {
      console.log(snapshot);
    };
    //Listens for events on this task. - Events have three callback functions (referred to as next, error, and complete).
    task.on('state_changed', taskProgress, taskError, taskCompleted);
  };

  const saveProfileData = downLoadURL => {
    firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({
        profileURL: downLoadURL,
      })
      .then(function () {
        setUpLoading(false);
        setImage(null);
        setDownloadLink('');
        navigation.goBack(); //because this will go to the beginning route of app component e.g (Main), ignoring any middle screens
      });
  };
  /*
  const redirectWithImageUri = () => {
    navigation.navigate('AddDependants', {
      dependantProfileImage: image,
    });
  };



  const saveRecordsData = downLoadURL => {
    firebase
      .firestore()
      .collection('records')
      .doc(firebase.auth().currentUser.uid)
      .collection('userRecords')
      .add({
        downLoadURL,
        caption: 'Prescription',
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        setUpLoading(false);
        setImage(null);
        setDownloadLink('');
        navigation.navigate('MedicalRecords'); //because this will go to the beginning route of app component e.g (Main), ignoring any middle screens
      });
  };
*/
  /*if (hasCameraPermission === null) {
    //display if access hasn't been granted to either.
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }*/

  const imageStyles = [styles.horizontalImage];
  const imgContainer = [
    styles.imageContainer,
    styles.horizontalStyles,
    styles.shadow,
  ];
  return (
    <View style={{flex: 1}}>
      <View style={styles.cameraContainer}>
        {device != null ? (
          <Camera
            ref={ref => setCamera(ref)}
            style={styles.fixedRatio}
            isActive={isActive}
            device={device}
            photo={true}
            ratio={'1:1'}
          />
        ) : null}
      </View>
      {image && (
        <Block row space="between">
          <Block flex style={imgContainer}>
            <Image
              resizeMode="cover"
              source={{uri: image}}
              style={imageStyles}
            />
          </Block>
          <Block flex>
            {!upLoading && !downloadLink ? (
              <Button
                shadowless
                style={{marginBottom: 36}}
                onPress={() => uploadImage()}>
                Save
              </Button>
            ) : upLoading && !downloadLink ? (
              <Button shadowless style={{marginBottom: 36}}>
                Uploading...
              </Button>
            ) : (
              <Button shadowless style={{marginBottom: 36}}>
                Done
              </Button>
            )}
          </Block>
        </Block>
      )}
      <Block row space="between">
        {cameraImageLoading ? (
          <Button shadowless style={{marginBottom: 36}}>
            Loading...
          </Button>
        ) : (
          <Button
            shadowless
            style={{marginBottom: 36}}
            onPress={() => {
              takePicture();
              setTimeLeft(4);
            }}>
            Take Photo
          </Button>
        )}

        <Button shadowless style={{marginBottom: 36}}>
          Rotate
        </Button>
      </Block>
    </View>
  );
}

const mapDispatchToProps = dispatch => ({
  toggleAddRecord: () => dispatch(toggleAddRecord()),
  fetchMedicalrecords: () => dispatch(fetchMedicalrecords()),
  addMedicalRecord: (itemToAdd, records) =>
    dispatch(addMedicalRecord(itemToAdd, records)),
});

const mapStateToProps = createStructuredSelector({
  hidden: selectAddRecordHidden, //to show or hide the cart.
  records: selectRecords,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);

const styles = StyleSheet.create({
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER,
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
