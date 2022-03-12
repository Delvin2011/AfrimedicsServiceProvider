/*utility functions allow us to keep files clean and organize functions that we may need in multiple files in one location */
export const addItemToWishList = (wishListItemToAdd, wishListItems) => {
  //we will check if the wishListItem exist
  const existingwishListItem = wishListItems.find(
    (wishListItem) => wishListItem.id === wishListItemToAdd.id
  );

  if (existingwishListItem) {
    return wishListItems.map((wishListItem) =>
      wishListItem.id === wishListItemToAdd.id
        ? { ...wishListItem, quantity: wishListItem.quantity + 1 }
        : wishListItem
    );
  }
  //if wishListItem is not found in the array, we want to return
  // new array with all the existing wishListItems, but also with the an object wishListItemToAdd with a base quantity of 1
  //In this way, any of the subsiquent items will reference the base quantity base value
  return [...wishListItems, { ...wishListItemToAdd, quantity: 1 }];
};

export const removeItemFromWishList = (wishListItems, wishListItemToRemove) => {
  //we will check if the wishListItem exist
  const existingwishListItem = wishListItems.find(
    (wishListItem) => wishListItem.id === wishListItemToRemove.id
  );

  if (existingwishListItem.quantity === 1) {
    return wishListItems.filter((wishListItem) => wishListItem.id !== wishListItemToRemove.id);
  }

  return wishListItems.map((wishListItem) =>
    wishListItem.id === wishListItemToRemove.id
      ? { ...wishListItem, quantity: wishListItem.quantity - 1 }
      : wishListItem
  );
};
