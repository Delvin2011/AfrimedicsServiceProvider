import PhamarcyActionTypes from './pharmacy-types';
import {convertCollectionsSnapshotToMap} from '../../firebase/firebase-utils';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {addNewOrder} from './pharmacy-utils';

export const fetchCollectionsStart = () => ({
  type: PhamarcyActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: PhamarcyActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = erroMessage => ({
  type: PhamarcyActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: erroMessage,
});

export const phamarcyLocation = location => {
  return dispatch => {
    dispatch({
      type: PhamarcyActionTypes.PHAMARCY_LOCATION,
      payload: location,
    });
  };
};

export const searchPhamarcy = phamarcy => {
  return dispatch => {
    dispatch({
      type: PhamarcyActionTypes.SEARCH_PHAMARCY,
      payload: {phamarcy},
    });
  };
};

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    //dispatching the moment the function is called
    const collectionRef = firestore().collection('pharmacy-collections');
    dispatch(fetchCollectionsStart()); //will switch the isFetching to true in  shop-reducer

    collectionRef
      .get()
      .then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot); //want to store this in shop reducer
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(error => dispatch(fetchCollectionsFailure(error.message)));
  };
};
//Thunks are action creator that returns a function that gets the dispatch

export function fetchPharmacyOrderItems() {
  return dispatch => {
    firestore()
      .collection('pharmacy-orders')
      .doc(auth().currentUser.uid)
      .get()
      .then(snapshot => {
        const snapData = snapshot.data();
        const {orderItems} = snapData;
        dispatch({
          type: PhamarcyActionTypes.FETCH_PHARMACYORDER_SUCCESS,
          payload: orderItems,
        });
      })
      .catch(error =>
        dispatch({
          type: PhamarcyActionTypes.FETCH_PHARMACYORDER_FAILURE,
          payload: error.message,
        }),
      );
  };
}

export const addPharmacyOrderItem = (orderToAdd, Orders) => {
  let orderItems = addNewOrder(orderToAdd, Orders);
  return dispatch => {
    firestore()
      .collection('pharmacy-orders')
      .doc(auth().currentUser.uid)
      .update({orderItems: orderItems})
      .then(() => {
        dispatch(addPharmacyOrderItemSuccess(orderItems));
      })
      .catch(error => dispatch(addPharmacyOrderItemFailure(error.message)));
  };
};

export const addPharmacyOrderItemSuccess = Orders => ({
  type: PhamarcyActionTypes.ADD_PHARMACYORDER_SUCCESS,
  payload: Orders,
});

export const addPharmacyOrderItemFailure = error => ({
  type: PhamarcyActionTypes.ADD_PHARMACYORDER_FAILURE,
  payload: error,
});
