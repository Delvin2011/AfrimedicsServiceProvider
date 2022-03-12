import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '../../constants';
import Icon from '../Icon';

const { width, height } = Dimensions.get('screen');
class CarouselCard extends React.Component {
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

    const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
    const titleStyles = [styles.cardTitle, titleStyle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow,
    ];

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('PharmacyCategory', { category: item.title });
          }}
        >
          <Image resizeMode="cover" source={{ uri: item.imageUrl }} style={imageStyles} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Block flex space="between" style={styles.cardDescription}>
            <Block flex>
              <Text
                style={{ fontFamily: 'montserrat-regular' }}
                size={14}
                //style={titleStyles}
                color={nowTheme.COLORS.SECONDARY}
              >
                {item.title}
              </Text>
            </Block>
            <Block right={ctaRight ? true : false}>
              <Text
                style={styles.articleButton}
                size={12}
                muted={!ctaColor}
                color={ctaColor || nowTheme.COLORS.ACTIVE}
                bold
              >
                View more...
              </Text>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

CarouselCard.propTypes = {
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
    paddingTop: 7,
    paddingBottom: 15,
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
    shadowOffset: { width: 0, height: 1 },
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
});

export default withNavigation(CarouselCard);
