import CartActionTypes from './cart-type';

const INITIAL_STATE = {
  hidden: true,
  cartItems: [], //adding or removing cart items
  error: null,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: action.payload, //addItemToCart(state.cartItems, action.payload), //add new items to the existing list
      };
    case CartActionTypes.ADD_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload, //addItemToCart(state.cartItems, action.payload), //add new items to the existing list
      };
    case CartActionTypes.CART_ITEMS_STATE_CHANGE:
      return {
        ...state,
        cartItems: action.payload, //addItemToCart(state.cartItems, action.payload), //add new items to the existing list
      };
    case CartActionTypes.REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        cartItems: action.payload, //addItemToCart(state.cartItems, action.payload), //add new items to the existing list
      };
    case CartActionTypes.REMOVE_ITEM_FAILURE:
      return {
        ...state,
        error: action.payload, //addItemToCart(state.cartItems, action.payload), //add new items to the existing list
      };
    default:
      return state;
  }
};

export default cartReducer;
