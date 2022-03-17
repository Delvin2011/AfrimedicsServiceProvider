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
import Icon from '../Icon';

const {width, height} = Dimensions.get('screen');
class PharmacyOrderCard extends React.Component {
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
    const DateTime = item.DateTime ? new Date(item.DateTime) : '02 Feb 2022';
    const dateTime = DateTime.toString();
    return (
      <Block card flex style={cardContainer}>
        <Block row={horizontal} style={styles.cardDescription}>
          <Block flex style={{marginTop: 25}}>
            <Text
              size={14}
              style={styles.cardTitleBold}
              color={nowTheme.COLORS.SECONDARY}>
              {item.InvoiceNumber}
            </Text>
          </Block>
          <Block flex left>
            <Button
              shadowless
              style={styles.button}
              color={nowTheme.COLORS.PRIMARY}
              onPress={() => navigation.navigate('Login')}>
              <Text
                style={{fontFamily: 'montserrat-bold', fontSize: 14}}
                color={theme.COLORS.WHITE}>
                {item.DeliveryStatus}
              </Text>
            </Button>
          </Block>
        </Block>
        <Block
          row={horizontal}
          style={
            (styles.cardDescription,
            {
              marginTop: theme.SIZES.BASE * 2.5,
              marginBottom: theme.SIZES.BASE * 1,
            })
          }>
          <Block flex>
            <Text
              size={14}
              style={styles.cardTitle}
              color={nowTheme.COLORS.SECONDARY}>
              Medication for {item.ReceiverName.split(' ')[0]}
            </Text>
          </Block>
          <Block flex>
            <Text
              size={14}
              style={styles.cardTitleBold}
              color={nowTheme.COLORS.SECONDARY}>
              {dateTime.substring(0, 15)}
            </Text>
          </Block>
        </Block>
      </Block>
    );
  }
}

PharmacyOrderCard.propTypes = {
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
    position: 'absolute',
    width: width - theme.SIZES.BASE * 18,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  cardTitleBold: {
    fontWeight: '900',
    paddingHorizontal: 9,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default withNavigation(PharmacyOrderCard);
