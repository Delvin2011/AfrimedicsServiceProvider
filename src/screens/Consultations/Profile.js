import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import {Block, Text, theme, View, Button as GaButton} from 'galio-framework';

import Button from '../../components/Button';
import {Images, nowTheme} from '../../constants';

const {width, height} = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
let colorChoiceEd = 'info';
let colorChoiceEx = 'primary';
let colorChoiceReg = 'primary';
const Profile = props => {
  const [isEducation, setEducationInfo] = useState(true);
  const [isExperience, setExperienceInfo] = useState(false);
  const [isRegistration, setRegistrationInfo] = useState(false);
  const {details} = props;

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
  return (
    <Block flex>
      <Block
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <Block flex={0.6}>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}>
            <Block flex style={styles.profileCard}>
              <Block
                style={{
                  position: 'absolute',
                  width: width,
                  zIndex: 5,
                  paddingHorizontal: 20,
                }}>
                <Block middle style={{top: height * 0.15}}>
                  <Image source={Images.ProfilePicture} style={styles.avatar} />
                </Block>
                <Block style={{top: height * 0.2}}>
                  <Block middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-bold',
                        marginBottom: theme.SIZES.BASE / 2,
                        fontWeight: '900',
                        fontSize: 26,
                      }}
                      color="#ffffff">
                      {details.title}
                    </Text>

                    <Text
                      size={16}
                      color="white"
                      style={{
                        marginTop: 5,
                        fontFamily: 'montserrat-bold',
                        lineHeight: 20,
                        fontWeight: 'bold',
                        fontSize: 18,
                        opacity: 0.8,
                      }}>
                      {details.speciality}
                    </Text>
                  </Block>
                  <Block style={styles.info}>
                    <Block row space="around">
                      <Block middle>
                        <Text
                          size={18}
                          color="white"
                          style={{
                            marginBottom: 4,
                            fontFamily: 'montserrat-bold',
                          }}>
                          R 500
                        </Text>
                        <Text
                          style={{fontFamily: 'montserrat-regular'}}
                          size={14}
                          color="white">
                          Consultation
                        </Text>
                      </Block>

                      <Block middle>
                        <Text
                          color="white"
                          size={18}
                          style={{
                            marginBottom: 4,
                            fontFamily: 'montserrat-bold',
                          }}>
                          4.9
                        </Text>
                        <Text
                          style={{fontFamily: 'montserrat-regular'}}
                          size={14}
                          color="white">
                          Ratings
                        </Text>
                      </Block>

                      <Block middle>
                        <Text
                          color="white"
                          size={18}
                          style={{
                            marginBottom: 4,
                            fontFamily: 'montserrat-bold',
                          }}>
                          48
                        </Text>
                        <Text
                          style={{fontFamily: 'montserrat-regular'}}
                          size={14}
                          color="white">
                          Comments
                        </Text>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>

              <Block
                middle
                row
                style={{
                  position: 'absolute',
                  width: width,
                  top: height * 0.6 - 26,
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
                  Education
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
                  Experience
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
                  Registration
                </Button>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
        <Block />
        <Block flex={0.4} style={{padding: theme.SIZES.BASE, marginTop: 90}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block flex style={{marginTop: 50}}>
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
                    An artist of considerable range, named Ryan — the name has
                    taken by Melbourne has raised, Brooklyn-based Nick Murphy —
                    writes, performs and records all of his own music.
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
      </Block>
    </Block>
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
});

export default Profile;

/*              <Text
                style={{
                  color: '#2c2c2c',
                  fontWeight: 'bold',
                  fontSize: 19,
                  fontFamily: 'montserrat-bold',
                  marginTop: 15,
                  marginBottom: 30,
                  zIndex: 2,
                }}
              >
                About me
              </Text>*/
