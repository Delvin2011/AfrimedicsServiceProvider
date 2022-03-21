import {createSelector} from 'reselect';

const selectPhamarcy = state => state.pharmacy;

export const selectCollections = createSelector(
  [selectPhamarcy], //input (takes in)
  pharmacy => pharmacy.collections, //output
);

export const selectPharmacyOrders = createSelector(
  [selectPhamarcy], //input (takes in)
  pharmacy => pharmacy.pharmacyOrders, //output
);

export const selectedPhamarcyLocation = createSelector(
  [selectPhamarcy], //array of input selectors
  pharmacy => pharmacy.location, //outputs of the input selectors
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  pharmacy => (pharmacy ? Object.keys(pharmacy).map(key => pharmacy[key]) : []), //returning mens, womes, hats etc if the collections is not empty
  //const test = {a:1, b:2, c:3} => Object.keys(test) => ["a", "b", "c"]
);

export const selectSearchedPhamarcy = createSelector(
  [selectPhamarcy], //array of input selectors
  pharmacy => pharmacy.searchPhamarcyInput, //outputs of the input selectors
);

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    //find collection.id matching the url parameter of our collection id map
    collections => (collections ? collections[collectionUrlParam] : null), //passing URL into our selector and our selector goes into the new collections objects and gets the correspondning value
  );

//bcoz e are using an object, and we are using the object bcoz the URL parameter is a string and the id we want to match is a number
//so we write a map, which is an object where the string value goes to the id
//we then map over the collections, by selecting it and passing into our new select collection via collectionUrlParam
//Which in return, createSelector (curryed function) which is a function that returns another function

export const selectIsCollectionFetching = createSelector(
  [selectPhamarcy],
  pharmacy => pharmacy.isFetching,
);

//checks to see if collections are loaded
//if no collections, cillectionsLoaded is false
export const selectIsCollectionsLoaded = createSelector(
  [selectPhamarcy],
  pharmacy => !!pharmacy.collections, //if our collections is loaded we get tru, otherwise false
);
