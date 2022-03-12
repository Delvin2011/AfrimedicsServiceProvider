import WishListActionTypes from './wishList-type';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {addItemToWishList, removeItemFromWishList} from './wishList-utils';

export const addWishListItem = (itemToAdd, wishList) => {
  let wishListItems = addItemToWishList(itemToAdd, wishList);
  return dispatch => {
    firestore()
      .collection('pharmacy-wishLists')
      .doc(auth().currentUser.uid)
      .update({wishListItems: wishListItems})
      .then(() => {
        dispatch(addItemSuccess(wishListItems));
      })
      .catch(error => dispatch(addItemFailure(error.message)));
  };
};

export const addItemSuccess = wishList => ({
  type: WishListActionTypes.ADD_WISHITEM_SUCCESS,
  payload: wishList,
});

export const addItemFailure = error => ({
  type: WishListActionTypes.ADD_WISHITEM_FAILURE,
  payload: error,
});

export function fetchWishListItems() {
  return dispatch => {
    firestore()
      .collection('pharmacy-wishLists')
      .doc(auth().currentUser.uid)
      .get()
      .then(snapshot => {
        const snapData = snapshot.data();
        const {wishListItems} = snapData;
        dispatch({
          type: WishListActionTypes.WISHLIST_ITEMS_STATE_CHANGE,
          payload: wishListItems,
        });
      });
    //.catch((error) => dispatch(fetchCollectionsFailure(error.message)));
  };
}

/*export const clearwishList = () => ({
  type: WishListActionTypes.CLEAR_wishList,
});

export const togglewishListHidden = () => ({
  type: WishListActionTypes.TOGGLE_wishList_HIDDEN, //we do not need the payload in this case.
});



//gets an item as a property and set type and payload as the item we need to clear.
//create type, set type into action and create reducer that executes the type and bind to the appropriate component, e.g checkout component.
export const clearItemFromwishList = (item) => ({
  type: WishListActionTypes.CLEAR_ITEM_FROM_wishList,
  payload: item,
});

export const removeItem = (item) => ({
  type: WishListActionTypes.REMOVE_ITEM,
  payload: item,
});



export const updatewishListInFirebase = () => ({
  type: WishListActionTypes.UPDATE_wishList_IN_FIREBASE,
});

export const setwishListFromFirebase = (wishListItems) => ({
  type: WishListActionTypes.SET_wishList_FROM_FIREBASE,
  payload: wishListItems,
});*/
