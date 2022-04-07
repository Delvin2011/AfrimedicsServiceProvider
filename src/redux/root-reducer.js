import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './user/user-reducer';
import pharmacyReducer from './pharmacy/pharmacy-reducer';
import cartReducer from './cart/cart-reducer';
import wishListReducer from './wishList/wishList-reducer';
import ambulanceReducer from './ambulance/ambulance-reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user: userReducer,
  pharmacy: pharmacyReducer,
  cart: cartReducer,
  wishList: wishListReducer,
  ambulance: ambulanceReducer,
});

export default persistReducer(persistConfig, rootReducer);
