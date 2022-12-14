import React from 'react';
import {withNavigation} from '@react-navigation/compat';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {Block, Text, theme, Button} from 'galio-framework';
import {nowTheme} from '../../constants';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectTravelTimeInfo} from '../../redux/ambulance/ambulance-selectors';

//const Intl = require('react-native-intl');

const {width, height} = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3.75;

class AmbulanceCard extends React.Component {
  state = {
    modalVisible: false,
  };
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation, item, full, style, imageStyle, horizontal, travelInfo} =
      this.props;

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
    const SURGE_CHARGE_RATE = 1.5;
    const buttonColors = 'primary';

    /*const x = new Intl.NumberFormat('en-gb', {
      style: 'currency',
      currency: 'ZAR',
    }).format(
      (travelInfo?.duration.value * SURGE_CHARGE_RATE * item.multiplier) / 100,
    );
    console.log(x);*/
    const cost =
      (travelInfo?.duration.value * SURGE_CHARGE_RATE * item.multiplier) / 100;
    return (
      <Block card flex style={cardContainer}>
        <TouchableWithoutFeedback>
          <Block
            row={true}
            style={{borderBottomColor: 'grey', borderBottomWidth: 0.35}}>
            <Block left flex style={styles.cardDescription}>
              <Image source={{uri: item.logo}} style={styles.avatar} />
            </Block>
            <Block flex left style={(styles.cardDescription, styles.margin)}>
              <Text
                style={{fontFamily: 'montserrat-regular'}}
                size={14}
                style={styles.cardTitleBold}
                color={nowTheme.COLORS.SECONDARY}>
                {item.name}
              </Text>
              <Text
                style={{fontFamily: 'montserrat-regular'}}
                size={14}
                style={titleStyles}
                color={nowTheme.COLORS.SECONDARY}>
                {item.registration_number}
              </Text>
              <Text
                style={{fontFamily: 'montserrat-regular'}}
                size={14}
                style={titleStyles}
                color={nowTheme.COLORS.SECONDARY}>
                Ratings: 4
              </Text>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
        <Block row={true} middle flex>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              marginTop: 10,
            }}>
            Travel Cost : ${cost.toFixed(0)}
          </Text>
        </Block>
        <Block
          row={true}
          middle
          flex
          style={
            {
              //marginTop: theme.SIZES.BASE * 0.5,
              //marginBottom: theme.SIZES.BASE * 1,
              // borderBottomColor: 'grey',
              // borderBottomWidth: 0.35,
            }
          }>
          <Button
            shadowless
            onPress={() => {
              navigation.navigate('Pharmacy');
            }}
            style={{
              width: 180,
              height: 44,
              elevation: 0,
              shadowRadius: 0,
              shadowOpacity: 0,
            }}
            textStyle={{fontSize: 16}}
            color={buttonColors}>
            Book Ambulance
          </Button>
        </Block>
      </Block>
    );
  }
}

AmbulanceCard.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  travelInfo: selectTravelTimeInfo,
});
export default connect(mapStateToProps, null)(AmbulanceCard);

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
  margin: {
    padding: theme.SIZES.BASE / 2,
    marginLeft: -50,
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
    zIndex: 50,
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
    zIndex: 50,
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
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 5,
    backgroundColor: '#2196F3',
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
    marginTop: 200,
    marginBottom: 200,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    //padding: 35,
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
    width: thumbMeasure * 1,
    height: thumbMeasure * 1,
    borderRadius: 50,
    borderWidth: 0,
  },
  modalImage: {
    width: thumbMeasure * 2,
    height: thumbMeasure * 2,
    marginBottom: 2,
  },
});
