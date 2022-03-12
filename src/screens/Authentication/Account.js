import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Block, Text, theme, View, Button as GaButton} from 'galio-framework';
import Button from '../../components/Button';
import nowTheme from '../../constants/Theme';
import Images from '../../constants/Images';
//import {HeaderHeight} from '../constants/utils';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  selectCurrentUser,
  selectCurrentUserProfileImage,
} from '../../redux/user/user-selectors';
import {fetchProfileImages} from '../../redux/user/user-actions';
import {useNavigation} from '@react-navigation/native';
import Login from './LoginScreen';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import * as ImagePicker from 'react-native-image-picker';

const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
let colorChoiceEd = 'info';
let colorChoiceEx = 'primary';
let colorChoiceReg = 'primary';

const Account = props => {
  const {navigation, currentUser} = props;
  const [isEducation, setEducationInfo] = useState(true);
  const [isExperience, setExperienceInfo] = useState(false);
  const [isRegistration, setRegistrationInfo] = useState(false);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraImageLoading, setImageLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [image, setImage] = useState(null); //to display the image
  const [upLoading, setUpLoading] = useState(false);

  const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
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
        uploadImage(response.assets[0].uri);
      }
    });
  };

  const handleChange = option => {
    if (option == 'education') {
      setEducationInfo(true);
      setExperienceInfo(false);
      setRegistrationInfo(false);
      colorChoiceEd = 'info';
      colorChoiceEx = 'primary';
      colorChoiceReg = 'primary';
    }
    if (option == 'experience') {
      setEducationInfo(false);
      setExperienceInfo(true);
      setRegistrationInfo(false);
      colorChoiceEx = 'info';
      colorChoiceEd = 'primary';
      colorChoiceReg = 'primary';
    }
    if (option == 'registration') {
      setEducationInfo(false);
      setExperienceInfo(false);
      setRegistrationInfo(true);
      colorChoiceReg = 'info';
      colorChoiceEx = 'primary';
      colorChoiceEd = 'primary';
    }
  };

  const uploadImage = async storedImage => {
    const childPath = `post/${auth().currentUser.uid}/${Math.random().toString(
      36,
    )}`;
    const uri = storedImage;
    const response = await fetch(uri); //fetch will be responsible for the fetching the image uri data
    const blob = await response.blob(); //responsible for uploading the image. Will create a blog of the image  to upload to firestore
    const task = storage().ref().child(childPath).put(blob);
    setUpLoading(true);
    const taskProgress = snapshot => {
      console.log(`transferred: ${snapshot.byteTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then(snapshot => {
        saveProfileData(snapshot);
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

  return (
    <>
      {currentUser ? (
        <Block flex>
          <Block
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Block flex={0.6}>
              <Block flex style={styles.profileCard}>
                <Block
                  style={{
                    position: 'absolute',
                    width: width,
                    zIndex: 5,
                    paddingHorizontal: 20,
                  }}>
                  <Block middle style={{top: height * 0.05}}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                      {upLoading ? (
                        <Image
                          source={Images.Profile_Loader}
                          style={styles.avatar}
                        />
                      ) : (
                        <Image
                          source={{uri: currentUser.profileURL}}
                          style={styles.avatar}
                        />
                      )}
                    </TouchableOpacity>
                  </Block>
                  <Block style={{top: height * 0.1}}>
                    <Block middle>
                      <Text
                        style={{
                          fontFamily: 'montserrat-bold',
                          marginBottom: theme.SIZES.BASE / 2,
                          fontWeight: '900',
                          fontSize: 26,
                        }}
                        color="#9A9A9A">
                        {currentUser.email}
                      </Text>

                      <Text
                        size={16}
                        color="#9A9A9A"
                        style={{
                          marginTop: 5,
                          fontFamily: 'montserrat-bold',
                          lineHeight: 20,
                          fontWeight: 'bold',
                          fontSize: 18,
                          opacity: 0.8,
                        }}>
                        Records
                      </Text>
                    </Block>
                  </Block>
                </Block>
                <Block
                  middle
                  row
                  style={{
                    position: 'absolute',
                    width: width,
                    top: height * 0.35 - 26,
                    zIndex: 99,
                  }}>
                  <Button
                    style={{
                      width: 90,
                      height: 44,
                      marginHorizontal: 5,
                      elevation: 0,
                    }}
                    textStyle={{fontSize: 12}}
                    round
                    color={colorChoiceEd}
                    onPress={() => handleChange('education')}>
                    Personal
                  </Button>
                  <Button
                    style={{
                      width: 90,
                      height: 44,
                      marginHorizontal: 5,
                      elevation: 0,
                    }}
                    textStyle={{fontSize: 12}}
                    round
                    color={colorChoiceEx}
                    onPress={() => handleChange('experience')}>
                    Medical
                  </Button>
                  <Button
                    style={{
                      width: 90,
                      height: 44,
                      marginHorizontal: 5,
                      elevation: 0,
                    }}
                    textStyle={{fontSize: 12}}
                    round
                    color={colorChoiceReg}
                    onPress={() => handleChange('registration')}>
                    Lifestyle
                  </Button>
                </Block>
              </Block>
            </Block>
            <Block />
            <Block
              flex={0.4}
              style={{
                position: 'absolute',
                width: width,
                top: height * 0.425 - 26,
                zIndex: 99,
              }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Block flex>
                  <Block middle>
                    {isEducation ? (
                      <Text
                        size={16}
                        muted
                        style={{
                          textAlign: 'center',
                          fontFamily: 'montserrat-regular',
                          zIndex: 2,
                          lineHeight: 25,
                          color: '#9A9A9A',
                          paddingHorizontal: 15,
                        }}>
                        An artist of considerable range, named Ryan — the name
                        has taken by Melbourne has raised, Brooklyn-based Nick
                        Murphy — writes, performs and records all of his own
                        music.
                      </Text>
                    ) : isExperience ? (
                      <Text
                        size={16}
                        muted
                        style={{
                          textAlign: 'center',
                          fontFamily: 'montserrat-regular',
                          zIndex: 2,
                          lineHeight: 25,
                          color: '#9A9A9A',
                          paddingHorizontal: 15,
                        }}>
                        {`\u2022`}Test 2.
                      </Text>
                    ) : isRegistration ? (
                      <Text
                        size={16}
                        muted
                        style={{
                          textAlign: 'center',
                          fontFamily: 'montserrat-regular',
                          zIndex: 2,
                          lineHeight: 25,
                          color: '#9A9A9A',
                          paddingHorizontal: 15,
                        }}>
                        {`\u2022`}Test 3.
                      </Text>
                    ) : null}
                  </Block>
                </Block>
              </ScrollView>
            </Block>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}>
              <TouchableOpacity
                style={styles.modalContainer}
                onPress={() => setModalVisible(false)}>
                <TouchableOpacity style={styles.modal} activeOpacity={1}>
                  <Text style={styles.modalText}>Add Profile Picture</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.navigate(
                        'Login' /*Camera, {
                        camOptions: {
                          camSide: 0,
                          screen: 'Account',
                        },
                      }*/,
                      );
                    }}>
                    <Text style={styles.textStyle}>Take a Picture</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      pickImage();
                      setModalVisible(!modalVisible);
                    }}>
                    <Text style={styles.textStyle}>Upload from Gallery</Text>
                  </Pressable>
                </TouchableOpacity>
              </TouchableOpacity>
            </Modal>
          </Block>
        </Block>
      ) : (
        <Login navigation={navigation} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    width,
    height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width,
    height: height * 0.6,
  },

  info: {
    marginTop: 30,
    paddingHorizontal: 10,
    height: height * 0.8,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80,
  },
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
  social: {
    width: nowTheme.SIZES.BASE * 3,
    height: nowTheme.SIZES.BASE * 3,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: 'center',
    zIndex: 99,
    marginHorizontal: 5,
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
});

const mapDispatchToProps = dispatch => ({
  fetchProfileImages: currentUser =>
    dispatch(fetchProfileImages({currentUser})),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentUserProfileImage: selectCurrentUserProfileImage,
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);

//export default Account;
