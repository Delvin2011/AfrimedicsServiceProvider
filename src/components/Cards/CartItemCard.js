import React from 'react';
import {withNavigation} from '@react-navigation/compat';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native';
import {Block, Text, theme} from 'galio-framework';
import {nowTheme} from '../../constants';
import Icon from '../Icon';
import Button from '../Button';
import Input from '../Input';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {addItem, removeItem} from '../../redux/cart/cart-actions';

const {width, height} = Dimensions.get('screen');
class CartItemCard extends React.Component {
  state = {
    paymentStatus: false,
    modalVisible: false,
  };
  constructor(props) {
    super(props);
  }

  render() {
    const {
      navigation,
      item,
      items,
      full,
      style,
      ctaColor,
      imageStyle,
      ctaRight,
      titleStyle,
      horizontal,
      addItem,
      removeItem,
    } = this.props;

    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle,
    ];
    const titleStyles = [styles.cardTitle, titleStyle];
    const cardContainer = [styles.card, styles.shadow];
    const imgContainer = [styles.imageContainer, styles.shadow];

    return (
      <Block row flex style={styles.card}>
        <Block style={imgContainer}>
          <Image source={{uri: item.imageUrl}} style={imageStyles} />
        </Block>
        <Block style={styles.cardDescription}>
          <Text
            style={{fontFamily: 'montserrat-regular'}}
            size={14}
            style={titleStyles}
            color={nowTheme.COLORS.SECONDARY}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.name}
          </Text>
          <Text
            style={{fontFamily: 'montserrat-regular'}}
            size={14}
            style={titleStyles}
            color={nowTheme.COLORS.SECONDARY}
            fontWeight="bold">
            $ {item.price}
          </Text>
          <Block flex={0.5} row style={{marginLeft: 30}}>
            <Button
              style={{
                width: 60,
                height: 32,
                marginHorizontal: 2,
                elevation: 0,
              }}
              onPress={() => {
                removeItem(item, items);
              }}>
              <Block flex={0.5} row middle space="between">
                <Icon
                  family="NowExtra"
                  size={16}
                  name="simple-delete2x"
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
                value={item.quantity.toString()}
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
                addItem(item, items);
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
          </Block>
        </Block>
      </Block>
    );
  }
}

CartItemCard.propTypes = {
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
  horizontalImage: {
    flex: 1,
    aspectRatio: 1,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  cardDescription: {
    padding: 5,
    width: '90%',
    marginLeft: -40,
  },
  card: {
    minHeight: 100,
    marginBottom: 3,
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 15,
    overflow: 'hidden',
  },

  imageContainer: {},
  image: {
    borderRadius: 3,
  },

  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {},
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
  buttonDelete: {
    paddingRight: 12,
    position: 'absolute',
    marginLeft: 156,
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapDispatchToProps = dispatch => ({
  addItem: (itemToAdd, cart) => dispatch(addItem(itemToAdd, cart)),
  removeItem: (itemToAdd, cart) => dispatch(removeItem(itemToAdd, cart)),
});

export default withNavigation(connect(null, mapDispatchToProps)(CartItemCard));
