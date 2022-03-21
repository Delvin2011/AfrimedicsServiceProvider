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
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {selectCartItems} from '../../redux/cart/cart-selectors';
import {addItem} from '../../redux/cart/cart-actions';
import {selectWishListItems} from '../../redux/wishList/wishList-selectors';
import {addWishListItem} from '../../redux/wishList/wishList-actions';
import {Block, Text, theme} from 'galio-framework';
import {nowTheme} from '../../constants';
import Button from '../Button';
import Icon from '../Icon';
import Input from '../Input';
const {width, height} = Dimensions.get('screen');
class PharmacyProductCard extends React.Component {
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
      popular,
      cart,
      addItem,
      wishList,
      addWishListItem,
    } = this.props;

    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle,
    ];
    const titleStyles = [styles.cardTitle, titleStyle];
    const cardContainer = [
      popular ? styles.cardPopular : styles.card,
      styles.shadow,
      style,
    ];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow,
    ];
    //console.log(item);
    return (
      <Block style={cardContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate(item.navigate);
          }}>
          <Image
            resizeMode="cover"
            source={{uri: item.imageUrl}}
            style={imageStyles}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('DigitalRecord', {digitalRecord: item});
          }}>
          <Block flex space="between" style={styles.cardDescription}>
            <Block flex>
              <Text
                style={{fontFamily: 'montserrat-regular'}}
                size={14}
                style={titleStyles}
                color={nowTheme.COLORS.PRIMARY}>
                {'$ ' + item.price}
              </Text>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('DigitalRecord', {digitalRecord: item});
          }}>
          <Text
            style={{fontFamily: 'montserrat-regular'}}
            size={14}
            //style={titleStyles}
            color={nowTheme.COLORS.SECONDARY}>
            {item.name.split(' ')[0] + ' ' + item.name.split(' ')[1]}
          </Text>
        </TouchableWithoutFeedback>
        <Block flex={0.5} row middle space="between">
          <Button
            style={{
              width: 60,
              height: 32,
              marginHorizontal: 2,
              elevation: 0,
            }}
            onPress={() => {
              addItem(item, cart);
            }}>
            <Block flex={0.5} row middle space="between">
              <Icon
                family="NowExtra"
                size={16}
                name="simple-add2x"
                color={nowTheme.COLORS['WHITE']}
              />
              <Icon
                family="NowExtra"
                size={16}
                name="cart-simple2x"
                color={nowTheme.COLORS['WHITE']}
              />
            </Block>
          </Button>
          <Block>
            <Input
              placeholder="1"
              shadowless
              custom
              type="numeric"
              rounded={false}
              noIcon
              name="dependantEmail"

              //value={dependantEmail}

              //onChangeText={(dependantEmail) => setDependantEmail(dependantEmail)}
            />
          </Block>
          <Button
            style={{
              width: 60,
              height: 32,
              marginHorizontal: 2,
              elevation: 0,
            }}
            onPress={() => {
              addWishListItem(item, wishList);
            }}>
            <Block flex={0.5} row middle space="between">
              <Icon
                family="NowExtra"
                size={16}
                name="simple-add2x"
                color={nowTheme.COLORS['WHITE']}
              />
              <Icon
                family="NowExtra"
                size={16}
                name="like-22x"
                color={nowTheme.COLORS['WHITE']}
              />
            </Block>
          </Button>
        </Block>
      </Block>
    );
  }
}

PharmacyProductCard.propTypes = {
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
    width: (width - 40) / 2 - 10,
  },
  cardPopular: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 160,
    marginBottom: 4,
    width: width * 0.65,
  },

  cardTitle: {
    paddingHorizontal: 9,
    //paddingTop: 7,
    //paddingBottom: 15,
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
    borderRadius: 3,
  },
  horizontalImage: {
    height: 200,
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
});

//export default withNavigation(PharmacyProductCard);

const mapDispatchToProps = dispatch => ({
  addItem: (itemToAdd, cart) => dispatch(addItem(itemToAdd, cart)),
  addWishListItem: (itemToAdd, wishList) =>
    dispatch(addWishListItem(itemToAdd, wishList)),
});

const mapStateToProps = createStructuredSelector({
  cart: selectCartItems,
  wishList: selectWishListItems,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigation(PharmacyProductCard));
