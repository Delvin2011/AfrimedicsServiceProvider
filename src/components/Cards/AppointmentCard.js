import React from 'react';
import {withNavigation} from '@react-navigation/compat';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Block, Text, theme, Button} from 'galio-framework';
import {nowTheme} from '../../constants';
import {Images} from '../../constants';

const {width, height} = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3.75;
class AppointmentCard extends React.Component {
  state = {
    paymentStatus: false,
  };
  constructor(props) {
    super(props);
  }

  render() {
    const {
      navigation,
      item,
      full,
      style,
      ctaColor,
      imageStyle,
      ctaRight,
      titleStyle,
      horizontal,
    } = this.props;

    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle,
    ];
    const titleStyles = [styles.cardTitle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow,
    ];

    return (
      <Block card flex style={cardContainer}>
        <Block row={horizontal}>
          <TouchableWithoutFeedback>
            <Block flex space="between" style={styles.cardDescription}>
              <Block>
                <Text
                  //style={}
                  size={14}
                  style={styles.appointment}
                  color={nowTheme.COLORS.SECONDARY}>
                  {new Date(item.DateTime._seconds * 1000)
                    .toString()
                    .replace(':00 GMT+0200 (SAST)', '')}
                </Text>
                <Text
                  style={{fontFamily: 'montserrat-regular'}}
                  size={14}
                  style={titleStyles}
                  color={nowTheme.COLORS.SECONDARY}>
                  {item.SpecialistsName}
                </Text>
                <Text
                  style={{fontFamily: 'montserrat-regular'}}
                  size={14}
                  style={titleStyles}
                  color={nowTheme.COLORS.SECONDARY}>
                  {item.PracticeName}
                </Text>
                <Text
                  style={{fontFamily: 'montserrat-regular'}}
                  size={14}
                  style={titleStyles}
                  color={nowTheme.COLORS.SECONDARY}>
                  Appointment {item.VisitationStatus}
                </Text>
              </Block>
            </Block>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <Block flex space="between" style={styles.cardDescription}>
              <Block middle>
                <Image source={Images.ProfilePicture} style={styles.avatar} />
              </Block>
            </Block>
          </TouchableWithoutFeedback>
        </Block>
        <Block
          row
          middle
          style={{
            marginTop: theme.SIZES.BASE * 2.5,
            marginBottom: theme.SIZES.BASE * 1,
          }}>
          <Block row={horizontal} style={{marginTop: -25}}>
            <Block flex space="between" style={styles.cardDescription}>
              <Block middle style={{marginTop: -15}}>
                <Text
                  size={14}
                  style={styles.appointment}
                  color={nowTheme.COLORS.SECONDARY}>
                  Booked for Tiks
                </Text>
              </Block>
            </Block>
            <Block flex space="between" style={styles.cardDescription}>
              <Block middle>
                {Date.now() < new Date(item.DateTime._seconds * 1000) ? (
                  <Button
                    shadowless
                    style={styles.button}
                    color={nowTheme.COLORS.PRIMARY}
                    onPress={() =>
                      navigation.navigate('Login', {
                        username: 'user2@call-test.tkaydelvin',
                        password: '!234User2',
                        specialistName: item.SpecialistsName,
                      })
                    }>
                    <Text
                      style={{fontFamily: 'montserrat-bold', fontSize: 14}}
                      color={theme.COLORS.WHITE}>
                      CONNECT TO Dr...
                    </Text>
                  </Button>
                ) : (
                  <Button
                    shadowless
                    style={styles.button}
                    color={nowTheme.COLORS.PRIMARY}
                    //onPress={() => navigation.navigate('Login')}
                  >
                    <Text
                      style={{fontFamily: 'montserrat-bold', fontSize: 14}}
                      color={theme.COLORS.WHITE}>
                      BOOK AGAIN
                    </Text>
                  </Button>
                )}
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

AppointmentCard.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4,
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 2,
    paddingBottom: 2,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
    //paddingBottom: -10,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 300,
    width: 'auto',
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  createButtonOptions: {
    width: width * 0.275,
  },
  createButton: {
    width: width * 0.5,
  },
  button: {
    position: 'absolute',
    width: width - theme.SIZES.BASE * 15,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
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
  appointment: {
    fontWeight: '900',
    paddingHorizontal: 9,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default withNavigation(AppointmentCard);

/*              <Block flex>
                <Text
                  style={{fontFamily: 'montserrat-regular'}}
                  size={14}
                  style={titleStyles}
                  color={nowTheme.COLORS.SECONDARY}>
                  {item.AppointmentType}
                </Text>
              </Block>*/
