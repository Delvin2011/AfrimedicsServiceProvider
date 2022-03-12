import WishListActionTypes from './wishList-type';

const INITIAL_STATE = {
  hidden: true,
  wishListItems: [], //adding or removing cart items
  error: null,
};

const wishListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WishListActionTypes.ADD_WISHITEM_SUCCESS:
      return {
        ...state,
        wishListItems: action.payload, //addItemToCart(state.wishListItems, action.payload), //add new items to the existing list
      };
    case WishListActionTypes.ADD_WISHITEM_FAILURE:
      return {
        ...state,
        error: action.payload, //addItemToCart(state.wishListItems, action.payload), //add new items to the existing list
      };
    case WishListActionTypes.WISHLIST_ITEMS_STATE_CHANGE:
      return {
        ...state,
        wishListItems: action.payload, //addItemToCart(state.wishListItems, action.payload), //add new items to the existing list
      };
    default:
      return state;
  }
};

export default wishListReducer;
