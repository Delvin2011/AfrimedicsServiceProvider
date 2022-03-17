import CartActionTypes from './cart-type';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {addItemToCart, removeItemFromCart} from './cart-utils';

export const addItem = (itemToAdd, cart) => {
  let cartItems = addItemToCart(itemToAdd, cart);
  return dispatch => {
    firestore()
      .collection('pharmacy-carts')
      .doc(auth().currentUser.uid)
      .update({cartItems: cartItems})
      .then(() => {
        dispatch(addItemSuccess(cartItems));
      })
      .catch(error => dispatch(addItemFailure(error.message)));
  };
};

export const addItemSuccess = cart => ({
  type: CartActionTypes.ADD_ITEM_SUCCESS,
  payload: cart,
});

export const addItemFailure = error => ({
  type: CartActionTypes.ADD_ITEM_FAILURE,
  payload: error,
});

export function fetchCartItems() {
  return dispatch => {
    firestore()
      .collection('pharmacy-carts')
      .doc(auth().currentUser.uid)
      .get()
      .then(snapshot => {
        const snapData = snapshot.data();
        const {cartItems} = snapData;
        dispatch({
          type: CartActionTypes.CART_ITEMS_STATE_CHANGE,
          payload: cartItems,
        });
      });
    //.catch((error) => dispatch(fetchCollectionsFailure(error.message)));
  };
}

export const removeItem = (itemToRemove, cart) => {
  let cartItems = removeItemFromCart(itemToRemove, cart);
  return dispatch => {
    firestore()
      .collection('pharmacy-carts')
      .doc(auth().currentUser.uid)
      .update({cartItems: cartItems})
      .then(() => {
        dispatch(removeItemSuccess(cartItems));
      })
      .catch(error => dispatch(removeItemFailure(error.message)));
  };
};

export const removeItemSuccess = cart => ({
  type: CartActionTypes.REMOVE_ITEM_SUCCESS,
  payload: cart,
});

export const removeItemFailure = error => ({
  type: CartActionTypes.REMOVE_ITEM_FAILURE,
  payload: error,
});


export const clearCart = () => {
  return dispatch => {
    firestore()
      .collection('pharmacy-carts')
      .doc(auth().currentUser.uid)
      .update({cartItems: []})
      .then(() => {
        dispatch({type: CartActionTypes.CLEAR_CART});
      })
      .catch(error => dispatch({type: CartActionTypes.CLEAR_CART_ERROR, payload: error}));
  };
};
