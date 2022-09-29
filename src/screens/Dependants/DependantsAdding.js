import React, { useContext, useState, useEffect } from "react";
import { Block, Text, theme, View, Button as GaButton } from "galio-framework";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
  Modal,
} from "react-native";
// Now UI themed components
import { Images, nowTheme } from "../../constants";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import Select from "../../components/Select";
import Input from "../../components/Input";
import Switch from "../../components/Switch";

import { useIsFocused } from "@react-navigation/native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectTabOptionChange,
  selectCurrentUser,
  selectUserDependants,
} from "../../redux/user/user-selectors";
import {
  addUserDependant,
  fetchUserDependants,
} from "../../redux/user/user-actions";

import * as ImagePicker from "react-native-image-picker";

import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
let colorChoicePrs = "info";
let colorChoiceMd = "primary";
let colorChoiceLf = "primary";
let uploadingProgress = "";
function DependantsAdding(props) {
  const {
    specialistListsByCity,
    navigation,
    currentUser,
    dependantProfileImage,
  } = props;
  const [isChronic, setIsChronic] = useState(false);
  const toggleIsCronicSwitch = () =>
    setIsChronic((previousState) => !previousState);
  const [isAllergic, setIsAllergic] = useState(false);
  const toggleIsAllergicSwitch = () =>
    setIsAllergic((previousState) => !previousState);
  const [isDisabled, setIsDisabled] = useState(false);
  const toggleIsDisabledSwitch = () =>
    setIsDisabled((previousState) => !previousState);
  const [isHereditary, setIsHereditary] = useState(false);
  const toggleIsHereditarySwitch = () =>
    setIsHereditary((previousState) => !previousState);
  const [isTobacco, setIsTobacco] = useState(false);
  const toggleIsTobaccoSwitch = () =>
    setIsTobacco((previousState) => !previousState);
  const [isExercise, setIsExercise] = useState(false);
  const toggleExerciseSwitch = () =>
    setIsExercise((previousState) => !previousState);
  const [isAlcohol, setIsAlcohol] = useState(false);
  const toggleIsAlcoholSwitch = () =>
    setIsAlcohol((previousState) => !previousState);
  const [dependantName, setDependantName] = useState("");
  const [dependantEmail, setDependantEmail] = useState("");
  const [dependantPhone, setDependantPhone] = useState("");
  const [dependantAddressLine1, setDependantAddressLine1] = useState("");
  const [dependantAddressLine2, setDependantAddressLine2] = useState("");
  const [dependantAddressLine3, setDependantAddressLine3] = useState("");

  const [personalInfo, setPersonalInfo] = useState(true);
  const [medicalInfo, setMedicalInfo] = useState(false);
  const [lifestyleInfo, setLifestyleInfo] = useState(false);

  const handleChange = (option) => {
    if (option == "personalInfo") {
      setPersonalInfo(true);
      setMedicalInfo(false);
      setLifestyleInfo(false);
      colorChoicePrs = "info";
      colorChoiceMd = "primary";
      colorChoiceLf = "primary";
    }
    if (option == "medicalInfo") {
      setPersonalInfo(false);
      setMedicalInfo(true);
      setLifestyleInfo(false);
      colorChoiceMd = "info";
      colorChoicePrs = "primary";
      colorChoiceLf = "primary";
    }
    if (option == "lifestyleInfo") {
      setPersonalInfo(false);
      setMedicalInfo(false);
      setLifestyleInfo(true);
      colorChoiceLf = "info";
      colorChoiceMd = "primary";
      colorChoicePrs = "primary";
    }
  };

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [cameraImageLoading, setImageLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [image, setImage] = useState(null); //to display the image
  const [upLoading, setUpLoading] = useState(false);
  const [isImageProcessing, setIsImageProcessing] = useState(false);
  const [downloadURLprocessed, setDownloadURL] = useState("");
  const isFocused = useIsFocused();
  const dummyProfile =
    "https://firebasestorage.googleapis.com/v0/b/donewithit-db.appspot.com/o/Dummies%2FDummyProfileImage.png?alt=media&token=ef68ecf0-e374-490d-be52-45b79e0d87a1";

  const onSavePersonalDetails = async (imageUrl) => {
    const { addUserDependant, tabOption, dependantsDetails } = props;
    const NumOfDep = typeof dependantsDetails == "undefined"
      ? 0
      : dependantsDetails.length;
    let dependant = {};
    dependant.name = dependantName;
    dependant.value = dependantName;
    dependant.creation = Date.now();
    dependant.personal = {
      email: dependantEmail,
      phoneNumber: dependantPhone,
      addressLine1: dependantAddressLine1,
      addressLine2: dependantAddressLine2,
      addressLine3: dependantAddressLine3,
      profileImage: imageUrl !== null ? imageUrl : dummyProfile,
    };

    dependant.medical = {
      isChronic: isChronic,
      isAllergic: isAllergic,
      isDisabled: isDisabled,
      isHereditary: isHereditary,
    };

    dependant.lifestyle = {
      isTobacco: isTobacco,
      isExercise: isExercise,
      isAlcohol: isAlcohol,
    };

    addUserDependant(dependant, dependantsDetails);
    setUpLoading(false);
    setIsChronic(false);
    setIsAllergic(false);
    setIsDisabled(false);
    setIsHereditary(false);
    setIsTobacco(false);
    setIsExercise(false);
    setIsAlcohol(false);
    setDependantName("");
    setDependantEmail("");
    setDependantPhone("");
    setDependantAddressLine1("");
    setDependantAddressLine2("");
    setDependantAddressLine3("");
    setPersonalInfo(true);
    setMedicalInfo(false);
    setLifestyleInfo(false);
    setImage(null);
    colorChoicePrs = "info";
    colorChoiceMd = "primary";
    colorChoiceLf = "primary";
    navigation.navigate("Dependants");
  };
  /*useEffect(() => {
    (async () => {
      const { fetchUserDependants } = props;
      fetchUserDependants();
    })();
  }, []);*/

  /*useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(null);
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      uploadingProgress = 'Uploading...';
      if (timeLeft == 2) {
        uploadingProgress = 'Done';
        setUpLoading(false);
      }
      if (timeLeft == 1) {
        setIsChronic(false);
        setIsAllergic(false);
        setIsDisabled(false);
        setIsHereditary(false);
        setIsTobacco(false);
        setIsExercise(false);
        setIsAlcohol(false);
        setDependantName('');
        setDependantEmail('');
        setDependantPhone('');
        setDependantAddressLine1('');
        setDependantAddressLine2('');
        setDependantAddressLine3('');
        setPersonalInfo(true);
        setMedicalInfo(false);
        setLifestyleInfo(false);
        setImage(Images.Dummy_Profile);
        colorChoicePrs = 'info';
        colorChoiceMd = 'primary';
        colorChoiceLf = 'primary';
        navigation.navigate('Dependants');
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

 useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (typeof dependantProfileImage.params == 'undefined') {
        setImage(Images.Dummy_Profile);
      } else {
        setImage(dependantProfileImage.params.dependantProfileImage);
        uploadImage(dependantProfileImage.params.dependantProfileImage);
      }
    })();
  }, [isFocused]);*/

  const options = {
    title: "Select Avatar",
    customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
    storageOptions: {
      skipBackup: true,
      path: "images",
    },
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  };

  const pickImage = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        setImage(response.assets[0].uri);
        //setIsImageProcessing();
      }
    });
  };

  const uploadImage = async () => {
    if (image !== null) {
      const childPath = `dependantsProfiles/${auth().currentUser.uid}/${
        Math.random().toString(36)
      }`;
      setUpLoading(true);
      const uri = image;
      const response = await fetch(uri); //fetch will be responsible for the fetching the image uri data
      const blob = await response.blob(); //responsible for uploading the image. Will create a blog of the image  to upload to firestore
      const task = storage().ref().child(childPath).put(blob);
      //
      const taskProgress = (snapshot) => {
        console.log(`transferred: ${snapshot.byteTransferred}`);
      };

      const taskCompleted = () => {
        task.snapshot.ref.getDownloadURL().then((snapshot) => {
          //saveProfileData(snapshot);
          //setDownloadLink(snapshot);
          console.log("complete");
          onSavePersonalDetails(snapshot);
        });
      };

      const taskError = (snapshot) => {
        console.log(snapshot);
      };
      //Listens for events on this task. - Events have three callback functions (referred to as next, error, and complete).
      task.on("state_changed", taskProgress, taskError, taskCompleted);
    } else {
      console.log("here");
      setUpLoading(true);
      onSavePersonalDetails(image);
    }
  };

  const renderDependantsAdding = () => {
    const { tabOption } = props;
    return (
      <Block>
        <Block style={styles.container}>
          <Block
            middle
            row
            style={{
              position: "absolute",
              width: width,
              top: height * 0.025 - 26,
              zIndex: 99,
            }}
          >
            <Button
              style={{
                width: 90,
                height: 44,
                marginHorizontal: 5,
                elevation: 0,
              }}
              textStyle={{ fontSize: 12 }}
              round
              color={colorChoicePrs}
              onPress={() => handleChange("personalInfo")}
            >
              Personal
            </Button>
            <Button
              style={{
                width: 90,
                height: 44,
                marginHorizontal: 5,
                elevation: 0,
              }}
              textStyle={{ fontSize: 12 }}
              round
              color={colorChoiceMd}
              onPress={() => handleChange("medicalInfo")}
            >
              Medical
            </Button>
            <Button
              style={{
                width: 90,
                height: 44,
                marginHorizontal: 5,
                elevation: 0,
              }}
              textStyle={{ fontSize: 12 }}
              round
              color={colorChoiceLf}
              onPress={() => handleChange("lifestyleInfo")}
            >
              Lifestyle
            </Button>
          </Block>

          {personalInfo
            ? (
              <Block flex style={styles.group}>
                <Block row middle space="between" style={{ marginTop: 50 }}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{
                      paddingHorizontal: theme.SIZES.BASE,
                      marginTop: 0,
                      marginLeft: 30,
                    }}
                  >
                    {image === null
                      ? (
                        <Image
                          source={{
                            uri:
                              "https://firebasestorage.googleapis.com/v0/b/donewithit-db.appspot.com/o/Dummies%2FDummyProfileImage.png?alt=media&token=ef68ecf0-e374-490d-be52-45b79e0d87a1",
                          }}
                          style={styles.avatar}
                        />
                      )
                      : (
                        <Image source={{ uri: image }} style={styles.avatar} />
                      )}
                  </TouchableOpacity>
                  <Block
                    style={{
                      paddingHorizontal: theme.SIZES.BASE,
                      marginRight: 25,
                    }}
                  >
                    <Text size={14} style={styles.title}>
                      Relationship
                    </Text>
                    <Block
                      style={{
                        paddingHorizontal: theme.SIZES.BASE,
                        marginTop: 5,
                      }}
                    >
                      <Select
                        defaultIndex={1}
                        options={[
                          "Friend",
                          "Relative",
                          "Parent",
                          "Child",
                          "Other",
                        ]}
                      />
                    </Block>
                  </Block>
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                  <Input
                    placeholder="John Smith"
                    shadowless
                    label="Name & Surname"
                    name="dependantName"
                    value={dependantName}
                    iconContent={<Icon
                      size={11}
                      style={{ marginRight: 10 }}
                      color={nowTheme.COLORS.ICON}
                      name="single"
                      family="NowExtra"
                    />}
                    onChangeText={(dependantName) =>
                      setDependantName(dependantName)}
                  />
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                  <Input
                    placeholder="johnsmith@gmail.com"
                    shadowless
                    type="email-address"
                    label="Email Address"
                    name="dependantEmail"
                    value={dependantEmail}
                    iconContent={<Icon
                      size={11}
                      style={{ marginRight: 10 }}
                      color={nowTheme.COLORS.ICON}
                      name="single"
                      family="NowExtra"
                    />}
                    onChangeText={(dependantEmail) =>
                      setDependantEmail(dependantEmail)}
                  />
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                  <Input
                    placeholder="Left Font Awesome Icon"
                    shadowless
                    label="Phone Number"
                    type="phone-pad"
                    name="dependantPhone"
                    value={dependantPhone}
                    iconContent={<Icon
                      size={11}
                      style={{ marginRight: 10 }}
                      color={nowTheme.COLORS.ICON}
                      name="single"
                      family="NowExtra"
                    />}
                    onChangeText={(dependantPhone) =>
                      setDependantPhone(dependantPhone)}
                  />
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                  <Input
                    placeholder="Address line 1"
                    shadowless
                    label="Physical Address"
                    name="dependantAddressLine1"
                    value={dependantAddressLine1}
                    iconContent={<Icon
                      size={11}
                      style={{ marginRight: 10 }}
                      color={nowTheme.COLORS.ICON}
                      name="single"
                      family="NowExtra"
                    />}
                    onChangeText={(dependantAddressLine1) =>
                      setDependantAddressLine1(dependantAddressLine1)}
                  />
                  <Input
                    placeholder="Address line 2"
                    shadowless
                    name="dependantAddressLine2"
                    value={dependantAddressLine2}
                    iconContent={<Icon
                      size={11}
                      style={{ marginRight: 10 }}
                      color={nowTheme.COLORS.ICON}
                      name="single"
                      family="NowExtra"
                    />}
                    onChangeText={(dependantAddressLine2) =>
                      setDependantAddressLine2(dependantAddressLine2)}
                  />
                  <Input
                    placeholder="Address line 3"
                    shadowless
                    name="dependantAddressLine3"
                    value={dependantAddressLine3}
                    iconContent={<Icon
                      size={11}
                      style={{ marginRight: 10 }}
                      color={nowTheme.COLORS.ICON}
                      name="single"
                      family="NowExtra"
                    />}
                    onChangeText={(dependantAddressLine3) =>
                      setDependantAddressLine3(dependantAddressLine3)}
                  />
                </Block>

                <Block center>
                  <Button
                    textStyle={{
                      fontFamily: "montserrat-regular",
                      fontSize: 12,
                    }}
                    color="primary"
                    style={styles.button}
                    onPress={() => handleChange("medicalInfo")}
                  >
                    NEXT
                  </Button>
                </Block>
              </Block>
            )
            : medicalInfo
            ? (
              <Block flex style={styles.group}>
                <Block style={{ marginTop: 50 }}>
                  <Text size={16} style={styles.title}>
                    Optional Entries
                  </Text>
                  <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Block row middle space="between">
                      <Text
                        style={{ fontFamily: "montserrat-regular" }}
                        size={14}
                        color={nowTheme.COLORS.TEXT}
                      >
                        Chronic Illness
                      </Text>
                      <Switch
                        onValueChange={toggleIsCronicSwitch}
                        value={isChronic}
                      />
                    </Block>
                    <Block row middle space="between">
                      <Text
                        style={{ fontFamily: "montserrat-regular" }}
                        size={14}
                        color={nowTheme.COLORS.TEXT}
                      >
                        Allergies
                      </Text>
                      <Switch
                        onValueChange={toggleIsAllergicSwitch}
                        value={isAllergic}
                      />
                    </Block>
                    <Block row middle space="between">
                      <Text
                        style={{ fontFamily: "montserrat-regular" }}
                        size={14}
                        color={nowTheme.COLORS.TEXT}
                      >
                        Disability
                      </Text>
                      <Switch
                        onValueChange={toggleIsDisabledSwitch}
                        value={isDisabled}
                      />
                    </Block>
                    <Block row middle space="between">
                      <Text
                        style={{ fontFamily: "montserrat-regular" }}
                        size={14}
                        color={nowTheme.COLORS.TEXT}
                      >
                        Hereditary Illness
                      </Text>
                      <Switch
                        onValueChange={toggleIsHereditarySwitch}
                        value={isHereditary}
                      />
                    </Block>
                    <Block center>
                      <Button
                        textStyle={{
                          fontFamily: "montserrat-regular",
                          fontSize: 12,
                        }}
                        color="primary"
                        style={styles.button}
                        onPress={() => handleChange("lifestyleInfo")}
                      >
                        NEXT
                      </Button>
                    </Block>
                  </Block>
                </Block>
              </Block>
            )
            : (
              <Block flex style={styles.group}>
                <Block style={{ marginTop: 50 }}>
                  <Text size={16} style={styles.title}>
                    Optional Entries
                  </Text>
                  <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Block row middle space="between">
                      <Text
                        style={{ fontFamily: "montserrat-regular" }}
                        size={14}
                        color={nowTheme.COLORS.TEXT}
                      >
                        Tobacco
                      </Text>
                      <Switch
                        onValueChange={toggleIsTobaccoSwitch}
                        value={isTobacco}
                      />
                    </Block>
                    <Block row middle space="between">
                      <Text
                        style={{ fontFamily: "montserrat-regular" }}
                        size={14}
                        color={nowTheme.COLORS.TEXT}
                      >
                        Exercise
                      </Text>
                      <Switch
                        onValueChange={toggleExerciseSwitch}
                        value={isExercise}
                      />
                    </Block>
                    <Block row middle space="between">
                      <Text
                        style={{ fontFamily: "montserrat-regular" }}
                        size={14}
                        color={nowTheme.COLORS.TEXT}
                      >
                        Alcohol
                      </Text>
                      <Switch
                        onValueChange={toggleIsAlcoholSwitch}
                        value={isAlcohol}
                      />
                    </Block>
                    {upLoading
                      ? (
                        <Block center>
                          <Button
                            textStyle={{
                              fontFamily: "montserrat-regular",
                              fontSize: 12,
                            }}
                            color="primary"
                            style={styles.button}
                          >
                            Loading...
                          </Button>
                        </Block>
                      )
                      : (
                        <Block center>
                          <Button
                            textStyle={{
                              fontFamily: "montserrat-regular",
                              fontSize: 12,
                            }}
                            color="primary"
                            style={styles.button}
                            onPress={() => {
                              //onSavePersonalDetails();
                              uploadImage();
                              //setTimeLeft(4);
                            }}
                          >
                            SAVE
                          </Button>
                        </Block>
                      )}
                  </Block>
                </Block>
              </Block>
            )}
        </Block>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => setModalVisible(false)}
          >
            <TouchableOpacity style={styles.modal} activeOpacity={1}>
              <Text style={styles.modalText}>Add Profile Picture</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate("Camera", {
                    camOptions: {
                      camSide: 1,
                      screen: "AddDependants",
                    },
                  });
                }}
              >
                <Text style={styles.textStyle}>Take a Picture</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  pickImage();
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Upload from Gallery</Text>
              </Pressable>
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
        contentContainerStyle={{ paddingBottom: 30, width }}
      >
        {renderDependantsAdding()}
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SIZES.BASE,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  title: {
    //fontFamily: 'montserrat-bold',
    paddingBottom: 1,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 0,
    color: nowTheme.COLORS.HEADER,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center",
  },
  group: {
    paddingTop: theme.SIZES.BASE * 1,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
    width: thumbMeasure,
    height: thumbMeasure,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
    marginTop: 25,
  },
  optionsButton: {
    width: "auto",
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
    height: "100%",
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBlock: {
    overflow: "hidden",
    borderRadius: 4,
    marginHorizontal: 10,
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: 64,
    height: 64,
  },
  productTitle: {
    color: nowTheme.COLORS.PRIMARY,
    textAlign: "center",
    fontFamily: "montserrat-bold",
    fontSize: 18,
  },
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
    position: "relative",
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
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});
const mapDispatchToProps = (dispatch) => ({
  fetchUserDependants: () => dispatch(fetchUserDependants()),
  addUserDependant: (option, dependantDetailsToAdd, dependantsRecords) =>
    dispatch(
      addUserDependant(option, dependantDetailsToAdd, dependantsRecords),
    ),
});

const mapStateToProps = createStructuredSelector({
  dependantsDetails: selectUserDependants,
  currentUser: selectCurrentUser,
  tabOption: selectTabOptionChange,
});

export default connect(mapStateToProps, mapDispatchToProps)(DependantsAdding);
