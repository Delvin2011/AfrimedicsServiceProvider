import React from 'react';
import {withNavigation} from '@react-navigation/compat';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import {Block, Text, theme, Button} from 'galio-framework';
import {nowTheme} from '../../constants';
import Icon from '../Icon';
import DateTimePicker from '../DateTimePicker';
import Payfast from '../Payfast';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  selectAppointmentRecords,
  selectCurrentUser,
} from '../../redux/user/user-selectors';
import {
  addAppointmentRecord,
  fetchMedicalAppointments,
} from '../../redux/user/user-actions';
import {Images} from '../../constants';
const {width, height} = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3.75;
class SpecialistCard extends React.Component {
  state = {
    date: '',
    paymentStatus: false,
    optionBooking: '',
    modalVisible: false,
  };
  constructor(props) {
    super(props);
    this.getStatus = this.getStatus.bind(this);
    this.renderPayFast = this.renderPayFast.bind(this);
  }

  componentDidMount() {
    this.getStatus;
    this.renderPayFast;
    this.props.fetchMedicalAppointments();
  }
  componentWillUnmount() {
    this.getStatus;
    this.renderPayFast;
  }

  getDate = (dateValue, bookingOption) => {
    this.setModalVisible(true);
    this.setState({date: dateValue, optionBooking: bookingOption});
  };

  setModalVisible = modalVisible => {
    this.setState({modalVisible: modalVisible});
  };

  getStatus = status => {
    this.setState({paymentStatus: status});
    const {item, appointmentRecords, addAppointmentRecord, navigation} =
      this.props;
    let appointmentDetails = {};
    const {date, optionBooking} = this.state;
    if (status) {
      appointmentDetails.DateTime = date;
      appointmentDetails.AppointmentType = optionBooking;
      appointmentDetails.Geometry = item.geometry;
      appointmentDetails.Address = '1234 Crescent Rd Wilgehuewl';
      appointmentDetails.SpecialistsName = item.title;
      appointmentDetails.VisitationStatus = 'Pending';
      appointmentDetails.PracticeName = item.Practice_Name;
      appointmentDetails.PaymentOption = 'Online';

      addAppointmentRecord(appointmentDetails, appointmentRecords);
      navigation.navigate('AppointmentRecords');
    }
  };

  renderPayFast() {
    return (
      <Block flex>
        <Payfast setSuccess={this.getStatus} />
      </Block>
    );
  }

  renderDateTime(buttonColor, bookingOption) {
    //this.setState({ optionBooking: bookingOption });
    return (
      <Block middle>
        <DateTimePicker
          buttonColor={buttonColor}
          bookingOption={bookingOption}
          onConfirmDate={this.getDate}
        />
      </Block>
    );
  }

  render() {
    const {
      navigation,
      item,
      items,
      remove,
      full,
      style,
      ctaColor,
      imageStyle,
      ctaRight,
      titleStyle,
      horizontal,
      removeMedicalRecord,
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

    const virtualConsult =
      item.Virtual_Appointment == 1 ? 'primary' : 'neutral';
    const physicalConsult =
      item.Physical_Appointment == 1 ? 'primary' : 'neutral';
    const homeVisitConsult =
      item.HomeVisit_Appointment == 1 ? 'primary' : 'neutral';

    return (
      <Block card flex style={cardContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Profile', {details: item});
          }}>
          <Block
            row={true}
            style={{borderBottomColor: 'grey', borderBottomWidth: 0.35}}>
            <Block middle flex style={styles.cardDescription}>
              <Image source={Images.ProfilePicture} style={styles.avatar} />
            </Block>
            <Block flex style={styles.cardDescription}>
              <Text
                style={{fontFamily: 'montserrat-regular'}}
                size={14}
                style={styles.cardTitleBold}
                color={nowTheme.COLORS.SECONDARY}>
                {item.title}
              </Text>
              <Text
                style={{fontFamily: 'montserrat-regular'}}
                size={14}
                style={titleStyles}
                color={nowTheme.COLORS.SECONDARY}>
                {item.speciality}
              </Text>
              <Text
                style={{fontFamily: 'montserrat-regular'}}
                size={14}
                style={titleStyles}
                color={nowTheme.COLORS.SECONDARY}>
                {item.Years_Experience} yrs experience
              </Text>
              <Text
                style={{fontFamily: 'montserrat-regular'}}
                size={14}
                style={titleStyles}
                color={nowTheme.COLORS.SECONDARY}>
                {item.Practice_Name}
              </Text>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
        <Block row={true}>
          <Text
            style={{fontFamily: 'montserrat-regular'}}
            size={14}
            style={styles.cardTitleBold}
            color={nowTheme.COLORS.SECONDARY}>
            Consultations
          </Text>
        </Block>
        <Block row={true} middle flex>
          <Block middle flex space="between">
            <Text>~ $ {item.Virtual_Appointment_Fee}</Text>
          </Block>
          <Block middle flex space="between">
            <Text>~ $ {item.Physical_Appointment_Fee}</Text>
          </Block>
          <Block middle flex space="between">
            <Text>~ $ {item.HomeVisit_Appointment_Fee}</Text>
          </Block>
        </Block>
        <Block
          row={true}
          middle
          flex
          style={{
            marginTop: theme.SIZES.BASE * 0.5,
            marginBottom: theme.SIZES.BASE * 1,
          }}>
          {this.renderDateTime(item.Virtual_Appointment, 'Virtual')}
          {this.renderDateTime(item.Physical_Appointment, 'Physical')}
          {this.renderDateTime(item.HomeVisit_Appointment, 'Home Visit')}
        </Block>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}>
          <TouchableOpacity
            activeOpacity={1}
            //onPress={() => this.setModalVisible(false)}
            style={[styles.modal]}>
            <Pressable
              style={[styles.buttonClose]}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
              <Icon
                family="NowExtra"
                size={16}
                name="simple-remove2x"
                //color={nowTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
              />
            </Pressable>
            {this.renderPayFast()}
          </TouchableOpacity>
        </Modal>
      </Block>
    );
  }
}

SpecialistCard.propTypes = {
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
  cardTitleBold: {
    paddingHorizontal: 9,
    paddingTop: 2,
    paddingBottom: 2,
    fontWeight: 'bold',
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
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
    //marginTop: 10,
    //marginBottom: 40,
  },
  createButton: {
    width: width * 0.5,
    //marginTop: 25,
    //marginBottom: 40,
  },
  button: {
    paddingRight: 12,
    position: 'absolute',
    marginLeft: 156,
    marginTop: 20,
  },
  buttonOptions: {
    //position: 'absolute',
    width: 80,
    height: theme.SIZES.BASE * 2.5,
    shadowRadius: 0,
    shadowOpacity: 0,
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
    marginTop: 0,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatar: {
    width: thumbMeasure * 1.25,
    height: thumbMeasure * 1.25,
    borderRadius: 50,
    borderWidth: 0,
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
});

//export default withNavigation(Header);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(SpecialistCard));

//this.state.date ? (
/*        <TouchableWithoutFeedback>
          <Block flex space="between" style={styles.cardDescription}>
            <Block flex>
              <Text
                style={{fontFamily: 'montserrat-regular'}}
                size={14}
                style={titleStyles}
                color={nowTheme.COLORS.SECONDARY}>
                {item.title}
              </Text>
              <Block flex center>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Map', {
                      coordinates: {
                        lat: item.geometry.lat,
                        lng: item.geometry.lng,
                        name: item.title,
                      },
                    })
                  }>
                  <Icon family="NowExtra" size={16} name="basket2x" />
                </TouchableOpacity>
              </Block>
              <Block>
                <Text
                  style={{fontFamily: 'montserrat-regular'}}
                  size={14}
                  style={titleStyles}
                  color={nowTheme.COLORS.SECONDARY}>
                  Consultation Options
                </Text>
                <Block
                  flex={0.5}
                  row
                  middle
                  space="between"
                  style={{marginBottom: 18}}>
                  {this.renderDateTime(item.Virtual_Appointment, 'Virtual')}
                  {this.renderDateTime(item.Physical_Appointment, 'Physical')}
                  </Block>
                  </Block>
                </Block>
              </Block>
            </TouchableWithoutFeedback>*/
