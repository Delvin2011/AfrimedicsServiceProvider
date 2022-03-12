import { createSelector } from 'reselect';

//input selector is a function that gets the whole state and returns a slice of it.

const selectWishList = (state) => state.wishList;

export const selectWishListItems = createSelector(
  [selectWishList], //array of input selectors
  (wishList) => wishList.wishListItems //outputs of the input selectors
);

export const selectWishListHidden = createSelector(
  [selectWishList], //array of input selectors
  (wishList) => wishList.hidden //outputs of the input selectors
);

export const selectWishListItemsCount = createSelector(
  [selectWishListItems],
  (
    wishListItems //returns the total quantity of items
  ) =>
    wishListItems.reduce(
      (accumulatedQuantity, wishListItem) => accumulatedQuantity + wishListItem.quantity,
      0
    ) //accumulating the quantity of each of our wishList items
);

export const selectWishListTotal = createSelector(
  [selectWishListItems],
  (
    wishListItems //returns the total quantity of items
  ) =>
    wishListItems.reduce(
      (accumulatedQuantity, wishListItem) =>
        accumulatedQuantity + wishListItem.quantity * wishListItem.price,
      0
    ) //accumulating the quantity of each of our wishList items
);

export const selectWishListTotalWeight = createSelector(
  [selectWishListItems],
  (
    wishListItems //returns the total quantity of items
  ) =>
    wishListItems.reduce(
      (accumulatedQuantity, wishListItem) =>
        accumulatedQuantity + wishListItem.quantity * wishListItem.size.split('k')[0],
      0
    ) //accumulating the quantity of each of our wishList items
);
/*Flow
- Passing the reducer state in to the selector and gets the wishList object.
- Passed into the wishList => wishList.wishListItems function which passes the wishListItems.
- selectWishListItemsCount, relying on the selctor, passes the wishListItems function which reduces and finaly procues the item count value
- value passed as a prop into the wishListIcon component.
*/
