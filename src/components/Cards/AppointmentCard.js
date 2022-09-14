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
import ImageView from 'react-native-image-viewing';

//redux
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  appointmentConnect,
  updateAppointmentRecord,
  addAppointmentRecords,
} from '../../redux/user/user-actions';
import {selectAppointmentRecords} from '../../redux/user/user-selectors';
import Appointments from '../../constants/Appointments.json';
const {width, height} = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3.75;

const Appointment = Appointments.icons;
class AppointmentCard extends React.Component {
  state = {
    paymentStatus: false,
    showImage: false,
  };
  constructor(props) {
    super(props);
  }

  _appointmentConnect = item => {
    const {appointmentConnect} = this.props;
    const connectDetails = {
      loginCredentials: {
        username: 'user2@call-test.tkaydelvin',
        password: '!234User2',
      },
      patientDetails: item,
    };
    appointmentConnect(connectDetails);
  };

  handleShowImage(status) {
    this.setState({showImage: !status});
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
      appointmentRecords,
      updateAppointmentRecord,
      addAppointmentRecords,
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

    const Start = {
      StartTime: Date.now(),
      Status: 'In Progress',
    };
    const End = {
      EndTime: Date.now(),
      Status: 'Complete',
    };

    const images = [
      {
        uri: item.profileURL.replace(
          'https://firebasestorage.googleapis.com/v0/b/',
          'https://ik.imagekit.io/qlvke6f9z/tr:w-h-300,w-400/v0/b/',
        ),
      },
    ];

    return (
      <Block>
        {item.AppointmentType == 'Physical' ? (
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
                      {new Date(item.DateTime)
                        .toString()
                        .replace(':00 GMT+0200', '')}
                    </Text>

                    <Text
                      style={{fontFamily: 'montserrat-regular'}}
                      size={14}
                      style={titleStyles}
                      color={nowTheme.COLORS.SECONDARY}>
                      Gender : {item.Gender}
                    </Text>
                    <Text
                      style={{fontFamily: 'montserrat-regular'}}
                      size={14}
                      style={titleStyles}
                      color={nowTheme.COLORS.SECONDARY}>
                      Status : {item.Status}
                    </Text>
                    <Text
                      style={{fontFamily: 'montserrat-regular'}}
                      size={14}
                      style={titleStyles}
                      color={nowTheme.COLORS.SECONDARY}>
                      Appointment for :
                    </Text>
                  </Block>
                </Block>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <Block flex space="between" style={styles.cardDescription}>
                  <Block middle>
                    <TouchableOpacity
                      onPress={() => this.setState({showImage: true})}>
                      <Image
                        source={{
                          uri: item.profileURL.replace(
                            'https://firebasestorage.googleapis.com/v0/b/',
                            'https://ik.imagekit.io/qlvke6f9z/tr:w-h-300,w-400/v0/b/',
                          ),
                        }}
                        style={styles.avatar}
                      />
                    </TouchableOpacity>
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
                      {item.Name}
                    </Text>
                  </Block>
                </Block>
                <Block flex space="between" style={styles.cardDescription}>
                  <Block middle>
                    {Date.now() < new Date(item.DateTime) &&
                    item.Status === 'Pending' ? (
                      <Button
                        shadowless
                        style={styles.button}
                        color={nowTheme.COLORS.PRIMARY}
                        onPress={() => {
                          updateAppointmentRecord(
                            Start,
                            item,
                            appointmentRecords,
                          );
                        }}>
                        <Text
                          style={{fontFamily: 'montserrat-bold', fontSize: 14}}
                          color={theme.COLORS.WHITE}>
                          START APPOINTMENT
                        </Text>
                      </Button>
                    ) : Date.now() > new Date(item.DateTime) &&
                      item.Status === 'Pending' ? (
                      <Button
                        shadowless
                        style={styles.button}
                        color={nowTheme.COLORS.PRIMARY}
                        onPress={() =>
                          addAppointmentRecords(Appointment, appointmentRecords)
                        }>
                        <Text
                          style={{fontFamily: 'montserrat-bold', fontSize: 14}}
                          color={theme.COLORS.WHITE}>
                          APPOINTMENT OVERDUE
                        </Text>
                      </Button>
                    ) : Date.now() > new Date(item.DateTime) &&
                      item.Status === 'Completed' ? (
                      <Button
                        shadowless
                        style={styles.button}
                        color={nowTheme.COLORS.PRIMARY}
                        onPress={() =>
                          navigation.navigate('MedicalRecords', {
                            details: {patientDetails: item, option: 'new'},
                          })
                        }>
                        <Text
                          style={{fontFamily: 'montserrat-bold', fontSize: 14}}
                          color={theme.COLORS.WHITE}>
                          ADD PRESCRIPTION
                        </Text>
                      </Button>
                    ) : item.Status === 'In Progress' ? (
                      <Button
                        shadowless
                        style={styles.button}
                        color={nowTheme.COLORS.PRIMARY}
                        onPress={() => {
                          updateAppointmentRecord(
                            End,
                            item,
                            appointmentRecords,
                          );
                        }}>
                        <Text
                          style={{fontFamily: 'montserrat-bold', fontSize: 14}}
                          color={theme.COLORS.WHITE}>
                          END APPOINTMENT
                        </Text>
                      </Button>
                    ) : null}
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        ) : item.AppointmentType == 'Virtual' ? (
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
                      {new Date(item.DateTime)
                        .toString()
                        .replace(':00 GMT+0200', '')}
                    </Text>

                    <Text
                      style={{fontFamily: 'montserrat-regular'}}
                      size={14}
                      style={titleStyles}
                      color={nowTheme.COLORS.SECONDARY}>
                      Gender : {item.Gender}
                    </Text>
                    <Text
                      style={{fontFamily: 'montserrat-regular'}}
                      size={14}
                      style={titleStyles}
                      color={nowTheme.COLORS.SECONDARY}>
                      Status : {item.Status}
                    </Text>
                    <Text
                      style={{fontFamily: 'montserrat-regular'}}
                      size={14}
                      style={titleStyles}
                      color={nowTheme.COLORS.SECONDARY}>
                      Appointment for :
                    </Text>
                  </Block>
                </Block>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <Block flex space="between" style={styles.cardDescription}>
                  <Block middle>
                    <TouchableOpacity
                      onPress={() => this.setState({showImage: true})}>
                      <Image
                        source={{
                          uri: item.profileURL.replace(
                            'https://firebasestorage.googleapis.com/v0/b/',
                            'https://ik.imagekit.io/qlvke6f9z/tr:w-h-300,w-400/v0/b/',
                          ),
                        }}
                        style={styles.avatar}
                      />
                    </TouchableOpacity>
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
                      {item.Name}
                    </Text>
                  </Block>
                </Block>
                <Block flex space="between" style={styles.cardDescription}>
                  <Block middle>
                    {Date.now() < new Date(item.DateTime) &&
                    item.Status === 'Pending' ? (
                      <Button
                        shadowless
                        style={styles.button}
                        color={nowTheme.COLORS.PRIMARY}
                        onPress={() => {
                          navigation.navigate('Login');
                          this._appointmentConnect(item);
                        }}>
                        <Text
                          style={{fontFamily: 'montserrat-bold', fontSize: 14}}
                          color={theme.COLORS.WHITE}>
                          CONNECT...
                        </Text>
                      </Button>
                    ) : Date.now() > new Date(item.DateTime) &&
                      item.Status === 'Pending' ? (
                      <Button
                        shadowless
                        style={styles.button}
                        color={nowTheme.COLORS.PRIMARY}
                        onPress={() =>
                          addAppointmentRecords(Appointment, appointmentRecords)
                        }>
                        <Text
                          style={{fontFamily: 'montserrat-bold', fontSize: 14}}
                          color={theme.COLORS.WHITE}>
                          APPOINTMENT OVERDUE
                        </Text>
                      </Button>
                    ) : Date.now() > new Date(item.DateTime) &&
                      item.Status === 'Completed' ? (
                      <Button
                        shadowless
                        style={styles.button}
                        color={nowTheme.COLORS.PRIMARY}
                        onPress={() =>
                          navigation.navigate('MedicalRecords', {
                            details: {patientDetails: item, option: 'new'},
                          })
                        }>
                        <Text
                          style={{fontFamily: 'montserrat-bold', fontSize: 14}}
                          color={theme.COLORS.WHITE}>
                          ADD PRESCRIPTION
                        </Text>
                      </Button>
                    ) : null}
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        ) : null}
        <ImageView
          images={images}
          imageIndex={0}
          visible={this.state.showImage}
          onRequestClose={() => this.handleShowImage(this.state.showImage)}
        />
      </Block>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  appointmentConnect: connectDetails =>
    dispatch(appointmentConnect(connectDetails)),
  updateAppointmentRecord: (toUpdate, record, records) =>
    dispatch(updateAppointmentRecord(toUpdate, record, records)),
  addAppointmentRecords: (items, appointmentRecords) =>
    dispatch(addAppointmentRecords(items, appointmentRecords)),
});
const mapStateToProps = createStructuredSelector({
  appointmentRecords: selectAppointmentRecords,
});
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

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(AppointmentCard),
);

//export default withNavigation(AppointmentCard);

/*              <Block flex>
                <Text
                  style={{fontFamily: 'montserrat-regular'}}
                  size={14}
                  style={titleStyles}
                  color={nowTheme.COLORS.SECONDARY}>
                  {item.AppointmentType}
                </Text>
              </Block>*/
