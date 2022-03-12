import React, {useContext, useState, useEffect} from 'react';
import {Block, Text, theme, View, Button as GaButton} from 'galio-framework';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
  TouchableOpacity,
  Modal,
} from 'react-native';
// Now UI themed components
import {Images, nowTheme, articles, tabs} from '../../constants';
import Button from '../../components/Button';
import {useIsFocused} from '@react-navigation/native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  selectCartTotal,
  selectCartItemsCount,
  selectCartItems,
} from '../../redux/cart/cart-selectors';
import CartItemCard from '../../components/Cards/CartItemCard';
const {width, height} = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;
function PharmacyCart(props) {
  const {cartTotal, cartItemsCount, cartItems, navigation} = props;

  /*useEffect(() => {
    (async () => {
      const { fetchUserDependants } = props;
      fetchUserDependants();
    })();
  }, []);*/

  const renderDependantsAdding = () => {
    return (
      <Block style={styles.container}>
        <Block flex row space="between">
          <Text
            size={16}
            color="#9A9A9A"
            style={{
              marginTop: 10,
              fontFamily: 'montserrat-bold',
              lineHeight: 20,
              fontWeight: 'bold',
              fontSize: 18,
              opacity: 0.8,
            }}>
            Items Count
          </Text>
          <Text
            size={16}
            color="#9A9A9A"
            style={{
              marginTop: 10,
              fontFamily: 'montserrat-bold',
              lineHeight: 20,
              fontWeight: 'bold',
              fontSize: 18,
              opacity: 0.8,
            }}>
            {cartItemsCount}
          </Text>
        </Block>
        <Block flex row space="between">
          <Text
            size={16}
            color="#9A9A9A"
            style={{
              marginTop: 10,
              fontFamily: 'montserrat-bold',
              lineHeight: 20,
              fontWeight: 'bold',
              fontSize: 18,
              opacity: 0.8,
            }}>
            Total Cost
          </Text>
          <Text
            size={16}
            color="#9A9A9A"
            style={{
              marginTop: 10,
              fontFamily: 'montserrat-bold',
              lineHeight: 20,
              fontWeight: 'bold',
              fontSize: 18,
              opacity: 0.8,
            }}>
            $ {cartTotal}
          </Text>
        </Block>
        <Block center>
          <Button
            textStyle={{fontFamily: 'montserrat-regular', fontSize: 12}}
            color="primary"
            style={styles.button}
            onPress={() => {
              navigation.navigate('PhamarcyOrderRecipient');
            }}>
            CHECKOUT
          </Button>
        </Block>

        {typeof cartItems === 'undefined' ? (
          <Text>Loading...</Text>
        ) : (
          cartItems.map((item, index) => {
            return (
              <CartItemCard
                key={index}
                item={item}
                items={cartItems}
                horizontal
                titleStyle={styles.title}

                //remove
              />
            );
          })
        )}
      </Block>
    );
  };
  return (
    <Block flex center>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, width}}>
        {renderDependantsAdding()}
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SIZES.BASE,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  title: {
    //fontFamily: 'montserrat-bold',
    paddingBottom: 1,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 0,
    color: nowTheme.COLORS.HEADER,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
  group: {
    paddingTop: theme.SIZES.BASE * 1,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
    width: thumbMeasure,
    height: thumbMeasure,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
    marginTop: 25,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
    marginHorizontal: 10,
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: 64,
    height: 64,
  },
  productTitle: {
    color: nowTheme.COLORS.PRIMARY,
    textAlign: 'center',
    fontFamily: 'montserrat-bold',
    fontSize: 18,
  },
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
});
/*const mapDispatchToProps = (dispatch) => ({
  fetchUserDependants: () => dispatch(fetchUserDependants()),
  addUserDependant: (option, dependantDetailsToAdd, dependantsRecords) =>
    dispatch(addUserDependant(option, dependantDetailsToAdd, dependantsRecords)),
});*/

const mapStateToProps = createStructuredSelector({
  cartTotal: selectCartTotal,
  cartItemsCount: selectCartItemsCount,
  cartItems: selectCartItems,
});

export default connect(mapStateToProps, null)(PharmacyCart);
