import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {Block, Text, theme, Button} from 'galio-framework';
import {nowTheme} from '../../constants';
import {Rating, AirbnbRating} from 'react-native-ratings';

const {width, height} = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3.75;

class ReviewCard extends React.Component {
  state = {
    modalVisible: false,
  };
  constructor(props) {
    super(props);
  }

  render() {
    const {item, full, style, imageStyle, horizontal} = this.props;
    const titleStyles = [styles.cardTitle];
    const cardContainer = [styles.card, styles.shadow, style];

    return (
      <Block card flex style={cardContainer}>
        <Block row={horizontal}>
          <TouchableWithoutFeedback>
            <Block flex style={styles.cardDescription}>
              <Block>
                <Rating
                  ratingCount={5}
                  imageSize={25}
                  showRating
                  onFinishRating={this.ratingCompleted}
                  readonly={true}
                  startingValue={item.Rating}
                />
                <Text
                  style={{fontFamily: 'montserrat-regular'}}
                  size={14}
                  style={styles.cardTitleBold}
                  color={nowTheme.COLORS.SECONDARY}>
                  Comments :
                </Text>
                <Text
                  style={{fontFamily: 'montserrat-regular'}}
                  size={14}
                  style={titleStyles}
                  color={nowTheme.COLORS.SECONDARY}>
                  {item.Comments}
                </Text>
              </Block>
            </Block>
          </TouchableWithoutFeedback>
        </Block>
      </Block>
    );
  }
}

ReviewCard.propTypes = {
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
    marginHorizontal: 9,
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
    //paddingBottom: -10,
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  appointment: {
    fontWeight: '900',
    paddingHorizontal: 9,
    paddingTop: 2,
    paddingBottom: 2,
  },
});
export default ReviewCard;
